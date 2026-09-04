import { z } from "zod";

/**
 * The contact form's contract, shared by the form and the route so a message
 * that passes in the browser cannot fail differently on the server.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tell me who you are")
    .max(120, "That name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "An email address is required")
    .email("Enter a complete email address")
    .max(200),
  subject: z
    .string()
    .trim()
    .min(3, "Add a short subject")
    .max(200, "Keep the subject under 200 characters"),
  message: z
    .string()
    .trim()
    .min(10, "A few more words would help me reply properly")
    .max(4000, "Keep it under 4000 characters"),
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactInput = z.output<typeof contactSchema>;
