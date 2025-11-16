import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(params.id) },
      include: { technologies: true },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PATCH /api/projects/[id] - Update project
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const project = await prisma.project.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(name && { name }),
        ...(shortDescription && { shortDescription }),
        ...(image && { image }),
        ...(github !== undefined && { github }),
        ...(link && { link }),
        ...(status && { status }),
        ...(order !== undefined && { order }),
        ...(technologyIds && {
          technologies: {
            set: [],
            connect: technologyIds.map((id: number) => ({ id })),
          },
        }),
      },
      include: { technologies: true },
    });

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
