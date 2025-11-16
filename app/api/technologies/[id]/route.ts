import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/technologies/[id] - Update technology
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { label, value, icon, href, category } = body;

    const technology = await prisma.technology.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(label && { label }),
        ...(value !== undefined && { value }),
        ...(icon !== undefined && { icon }),
        ...(href !== undefined && { href }),
        ...(category && { category }),
      },
    });

    return NextResponse.json({ technology }, { status: 200 });
  } catch (error) {
    console.error('Error updating technology:', error);
    return NextResponse.json({ error: 'Failed to update technology' }, { status: 500 });
  }
}

// DELETE /api/technologies/[id] - Delete technology
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.technology.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Technology deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return NextResponse.json({ error: 'Failed to delete technology' }, { status: 500 });
  }
}
