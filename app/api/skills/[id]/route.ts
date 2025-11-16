import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { skillUpdateSchema } from '@/lib/validations/schemas';

// PATCH /api/skills/[id] - Update skill
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validated = skillUpdateSchema.safeParse(body);
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

    const skill = await prisma.skill.update({
      where: { id: parseInt(params.id) },
      data: validated.data,
    });

    return NextResponse.json({ skill }, { status: 200 });
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

// DELETE /api/skills/[id] - Delete skill
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.skill.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Skill deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
