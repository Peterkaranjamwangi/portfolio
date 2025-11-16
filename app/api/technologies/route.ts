import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/technologies - Fetch all technologies
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const technologies = await prisma.technology.findMany({
      where: {
        ...(category && { category: category as any }),
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
    const { label, value, icon, href, category } = body;

    // Validation
    if (!label) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const technology = await prisma.technology.create({
      data: {
        label,
        value,
        icon,
        href,
        category,
      },
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
