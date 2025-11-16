import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects - Fetch all projects
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const projects = await prisma.project.findMany({
      where: {
        ...(status && { status: status as any }),
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

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      shortDescription,
      image,
      github,
      link,
      status,
      order,
      technologyIds,
    } = body;

    // Validation
    if (!name || !shortDescription || !image || !link) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        name,
        shortDescription,
        image,
        github,
        link,
        status,
        order,
        ...(technologyIds && {
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
