import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serviceSchema } from '@/lib/validations/schemas';

// GET /api/services - Fetch all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ services, count: services.length }, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validated = serviceSchema.safeParse(body);
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

    const service = await prisma.service.create({
      data: validated.data,
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
