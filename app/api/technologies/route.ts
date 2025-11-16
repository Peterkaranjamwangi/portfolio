import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { technologySchema } from '@/lib/validations/schemas';
import { TechCategory } from '@prisma/client';

// GET /api/technologies - Fetch all technologies
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const technologies = await prisma.technology.findMany({
      where: {
        ...(category && { category: category as TechCategory }),
      },
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: [
        { value: 'desc' }, // Sort by proficiency
        { label: 'asc' },
      ],
    });

    return NextResponse.json(
      { technologies, count: technologies.length },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technologies' },
      { status: 500 }
    );
  }
}

// POST /api/technologies - Create a new technology
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validated = technologySchema.safeParse(body);
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

    const technology = await prisma.technology.create({
      data: validated.data,
    });

    return NextResponse.json({ technology }, { status: 201 });
  } catch (error) {
    console.error('Error creating technology:', error);
    return NextResponse.json(
      { error: 'Failed to create technology' },
      { status: 500 }
    );
  }
}
