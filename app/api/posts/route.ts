import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PostStatus } from '@prisma/client';
import { requireAuth } from '@/lib/auth';
import { sanitizeHtml, sanitizeText, sanitizeUrl } from '@/lib/sanitize';

// GET /api/posts - Fetch all posts with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const limit = searchParams.get('limit');

    const posts = await prisma.post.findMany({
      where: {
        ...(status && { status: status as PostStatus }),
        ...(category && {
          categories: {
            some: {
              name: category,
            },
          },
        }),
        ...(tag && {
          tags: {
            some: {
              name: tag,
            },
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...(limit && { take: parseInt(limit) }),
    });

    return NextResponse.json({ posts, count: posts.length }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post (requires authentication)
export async function POST(request: NextRequest) {
  // Check authentication
  const authResult = await requireAuth();
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const body = await request.json();
    const {
      title,
      subtitle,
      content,
      slug,
      image,
      status,
      authorId,
      categoryIds,
      tagIds,
    } = body;

    // Validation
    if (!title || !content || !slug || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS attacks
    const sanitizedTitle = sanitizeText(title);
    const sanitizedSubtitle = subtitle ? sanitizeText(subtitle) : null;
    const sanitizedContent = sanitizeHtml(content);
    const sanitizedImage = image ? sanitizeUrl(image) : null;
    const sanitizedSlug = sanitizeText(slug);

    const post = await prisma.post.create({
      data: {
        title: sanitizedTitle,
        subtitle: sanitizedSubtitle,
        content: sanitizedContent,
        slug: sanitizedSlug,
        image: sanitizedImage,
        status: status || PostStatus.DRAFT,
        authorId,
        ...(status === PostStatus.PUBLISHED && { publishedAt: new Date() }),
        ...(categoryIds && {
          categories: {
            connect: categoryIds.map((id: number) => ({ id })),
          },
        }),
        ...(tagIds && {
          tags: {
            connect: tagIds.map((id: number) => ({ id })),
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
        tags: true,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
