import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/services/[id] - Update service
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, icon, order } = body;

    const service = await prisma.service.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(icon !== undefined && { icon }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE /api/services/[id] - Delete service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
