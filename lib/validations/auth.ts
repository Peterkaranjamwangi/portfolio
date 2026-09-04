import { z } from "zod";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "An email address is required")
  .email("Enter a complete email address")
  .max(200);

/** Step one: where to send the code. */
export const otpRequestSchema = z.object({ email });

/**
 * Step two: the code itself.
 *
 * Supabase sends six digits. Whitespace is stripped before validation because
 * a pasted code routinely arrives with a trailing space, and rejecting that
 * would be a needless dead end.
 */
export const otpVerifySchema = z.object({
  email,
  token: z
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(
      z
        .string()
        .length(6, "The code is six digits")
        .regex(/^\d+$/, "The code is six digits"),
    ),
});

export type OtpRequestValues = z.infer<typeof otpRequestSchema>;
export type OtpVerifyValues = z.infer<typeof otpVerifySchema>;
