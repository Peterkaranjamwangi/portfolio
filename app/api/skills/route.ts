import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { skillSchema } from '@/lib/validations/schemas';
import { SkillType } from '@prisma/client';

// GET /api/skills - Fetch all skills
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    const skills = await prisma.skill.findMany({
      where: {
        ...(type && { type: type as SkillType }),
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ skills, count: skills.length }, { status: 200 });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST /api/skills - Create a new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validated = skillSchema.safeParse(body);
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

    const skill = await prisma.skill.create({
      data: validated.data,
    });

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
