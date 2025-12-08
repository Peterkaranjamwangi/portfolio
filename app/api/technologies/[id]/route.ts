import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { technologyUpdateSchema } from '@/lib/validations/schemas';
import { requireAuth } from '@/lib/auth';

// GET /api/technologies/[id] - Fetch a single technology
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const technologyId = parseInt(id, 10);
    if (isNaN(technologyId)) {
      return NextResponse.json({ error: 'Invalid technology ID' }, { status: 400 });
    }

    const technology = await prisma.technology.findUnique({
      where: { id: technologyId },
      include: { projects: true },
    });

    if (!technology) {
      return NextResponse.json({ error: 'Technology not found' }, { status: 404 });
    }

    return NextResponse.json({ technology }, { status: 200 });
  } catch (error) {
    console.error('Error fetching technology:', error);
    return NextResponse.json({ error: 'Failed to fetch technology' }, { status: 500 });
  }
}

// PATCH /api/technologies/[id] - Update technology (requires authentication)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const authResult = await requireAuth();
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const { id } = await params;
    const technologyId = parseInt(id, 10);
    if (isNaN(technologyId)) {
      return NextResponse.json({ error: 'Invalid technology ID' }, { status: 400 });
    }

    const body = await request.json();

    // Validate with Zod
    const validated = technologyUpdateSchema.safeParse(body);
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

    const technology = await prisma.technology.update({
      where: { id: technologyId },
      data: validated.data,
    });

    return NextResponse.json({ technology }, { status: 200 });
  } catch (error) {
    console.error('Error updating technology:', error);
    return NextResponse.json({ error: 'Failed to update technology' }, { status: 500 });
  }
}

// DELETE /api/technologies/[id] - Delete technology (requires authentication)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const authResult = await requireAuth();
  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const { id } = await params;
    const technologyId = parseInt(id, 10);
    if (isNaN(technologyId)) {
      return NextResponse.json({ error: 'Invalid technology ID' }, { status: 400 });
    }

    await prisma.technology.delete({
      where: { id: technologyId },
    });

    return NextResponse.json({ message: 'Technology deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return NextResponse.json({ error: 'Failed to delete technology' }, { status: 500 });
  }
}
