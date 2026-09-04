import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a shilling figure the way a Kenyan reader expects it: grouped
 * thousands, no decimals. Quotes are round numbers, and cents in a six-figure
 * estimate read as false precision.
 *
 * `symbol: false` drops the "KSh" for the second half of a range, where
 * repeating it ("KSh 525,300 – KSh 710,700") just adds noise.
 */
export function formatKes(
  amount: number,
  { symbol = true }: { symbol?: boolean } = {},
): string {
  const value = Math.round(Number.isFinite(amount) ? amount : 0);
  const grouped = value.toLocaleString("en-KE", { maximumFractionDigits: 0 });
  return symbol ? `KSh ${grouped}` : grouped;
}

/** "8 weeks", "8.5 weeks", "1 week" — half-weeks survive, trailing ".0" does not. */
export function formatWeeks(weeks: number): string {
  const value = Math.round((Number.isFinite(weeks) ? weeks : 0) * 2) / 2;
  const label = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return `${label} ${value === 1 ? "week" : "weeks"}`;
}
