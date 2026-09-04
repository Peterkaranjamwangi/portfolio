import { NextRequest, NextResponse } from "next/server";

import { priceSelection, PricingError } from "@/lib/pricing/engine";
import { selectionSchema } from "@/lib/validations/estimate";

/**
 * POST /api/estimate/price — prices a selection without storing anything.
 *
 * The wizard calls this on every change, which is the point: the browser never
 * multiplies anything itself, so the figure on screen is always one the server
 * would stand behind.
 */
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body" }, { status: 400 });
  }

  const validated = selectionSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: validated.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(priceSelection(validated.data), { status: 200 });
  } catch (error) {
    if (error instanceof PricingError) {
      return NextResponse.json(
        {
          error: error.message,
          details: [{ field: error.field, message: error.message }],
        },
        { status: 400 },
      );
    }

    console.error("Error pricing estimate:", error);
    return NextResponse.json(
      { error: "Could not price that selection. Try again in a moment." },
      { status: 500 },
    );
  }
}
