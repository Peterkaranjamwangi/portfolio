import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validations/schemas';
import { ProjectStatus } from '@prisma/client';
import { requireAuth } from '@/lib/auth';

// GET /api/projects - Fetch all projects (public access)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const projects = await prisma.project.findMany({
      where: {
        ...(status && { status: status as ProjectStatus }),
      },
      include: {
        technologies: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ projects, count: projects.length }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project (requires authentication)
export async function POST(request: NextRequest) {
  // Check authentication
  const authResult = await requireAuth();
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const body = await request.json();

    // Validate with Zod
    const validated = projectSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validated.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      );
    }

    const { technologyIds, ...projectData } = validated.data;

    const project = await prisma.project.create({
      data: {
        ...projectData,
        ...(technologyIds && technologyIds.length > 0 && {
          technologies: {
            connect: technologyIds.map((id: number) => ({ id })),
          },
        }),
      },
      include: {
        technologies: true,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
