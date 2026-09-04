import { apiPost } from "@/lib/api-client";
import type { ContactInput } from "@/lib/validations/contact";

export const contactService = {
  send(message: ContactInput): Promise<{ message: string }> {
    return apiPost<{ message: string }>("/api/contact", message);
  },
};
