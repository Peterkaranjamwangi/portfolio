import { randomBytes } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { priceSelection, PricingError } from "@/lib/pricing/engine";
import { estimateRequestSchema } from "@/lib/validations/estimate";

/**
 * POST /api/estimate — prices the selection again and stores the brief.
 *
 * The request carries what the visitor *chose*, never what it cost: the price
 * written to the row is computed here, so a tampered payload can only change
 * the scope it is asking about, not the quote attached to it.
 */
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body" }, { status: 400 });
  }

  const validated = estimateRequestSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: validated.error.errors.map((e) => ({
          // `lead.email` is the request's path, but the form field is `email`;
          // dropping the prefix is what lets the message land on the input.
          field: e.path.join(".").replace(/^lead\./, ""),
          message: e.message,
        })),
      },
      { status: 400 },
    );
  }

  const { lead, ...selection } = validated.data;

  let breakdown;
  try {
    breakdown = priceSelection(selection);
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
    throw error;
  }

  const reference = buildReference();

  try {
    const estimate = await prisma.estimate.create({
      data: {
        reference,

        industrySlug: breakdown.industrySlug,
        industryLabel: breakdown.industryLabel,
        industryMultiplier: breakdown.industryMultiplier,
        projectTypeSlug: breakdown.projectTypeSlug,
        projectTypeLabel: breakdown.projectTypeLabel,
        featureSlugs: selection.featureSlugs,
        customFeatures: selection.customFeatures,
        breakdown: JSON.parse(JSON.stringify(breakdown)),

        currency: breakdown.currency,
        subtotalKes: breakdown.subtotalKes,
        rangeLowKes: breakdown.rangeLowKes,
        rangeHighKes: breakdown.rangeHighKes,
        estimatedWeeks: breakdown.estimatedWeeks,

        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone || null,
        company: lead.company || null,
        country: lead.country || "KE",
        message: lead.message || null,
      },
      select: { reference: true },
    });

    // TODO: notify by email. The row is the record of truth either way, so a
    // mail failure must never fail the request the visitor is waiting on.
    return NextResponse.json({ estimateId: estimate.reference }, { status: 201 });
  } catch (error) {
    console.error("Error saving estimate:", error);
    return NextResponse.json(
      { error: "Could not save your brief. Try again in a moment." },
      { status: 500 },
    );
  }
}

/**
 * A short, unambiguous reference the visitor can quote back.
 *
 * Crockford's alphabet: no I, L, O or U, so nothing is misread over the phone
 * or mistyped as a digit.
 */
function buildReference(): string {
  const alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const bytes = randomBytes(8);
  let code = "";
  for (const byte of bytes) code += alphabet[byte % alphabet.length];
  return `EST-${code}`;
}
