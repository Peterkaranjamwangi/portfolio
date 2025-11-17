import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PostStatus } from '@prisma/client';
import { requireAuth } from '@/lib/auth';
import { sanitizeHtml, sanitizeText, sanitizeUrl } from '@/lib/sanitize';

// GET /api/posts/[id] - Fetch a single post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(params.id),
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

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PATCH /api/posts/[id] - Update a post (requires authentication)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      categoryIds,
      tagIds,
    } = body;

    // Sanitize inputs to prevent XSS attacks
    const sanitizedData: any = {};
    if (title) sanitizedData.title = sanitizeText(title);
    if (subtitle !== undefined) sanitizedData.subtitle = subtitle ? sanitizeText(subtitle) : null;
    if (content) sanitizedData.content = sanitizeHtml(content);
    if (slug) sanitizedData.slug = sanitizeText(slug);
    if (image !== undefined) sanitizedData.image = image ? sanitizeUrl(image) : null;
    if (status) sanitizedData.status = status;
    if (status === PostStatus.PUBLISHED) sanitizedData.publishedAt = new Date();

    const post = await prisma.post.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...sanitizedData,
        ...(categoryIds && {
          categories: {
            set: [],
            connect: categoryIds.map((id: number) => ({ id })),
          },
        }),
        ...(tagIds && {
          tags: {
            set: [],
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

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post (requires authentication)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const authResult = await requireAuth();
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    await prisma.post.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
