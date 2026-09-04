"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SuccessState } from "@/components/patterns/states";
import { Toaster } from "@/components/ui/toaster";
import { useMutation } from "@/hooks/use-mutation";
import { contactService } from "@/services";
import {
  contactSchema,
  type ContactFormValues,
  type ContactInput,
} from "@/lib/validations/contact";

/**
 * The contact form, with the four states the States canvas specifies:
 * empty, invalid, sending, sent.
 *
 * Validation is react-hook-form driven by the same zod schema the route parses,
 * so a message that passes here cannot be rejected for a different reason on
 * the server — and if it is, `useMutation` writes the server's message back
 * onto the field that caused it.
 */
export function ContactForm({
  whatsappUrl = "https://wa.link/1sqigc",
}: {
  whatsappUrl?: string;
}) {
  const form = useForm<ContactFormValues, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    // Validating on blur rather than on change means a half-typed email is not
    // called wrong while it is still being typed.
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const [sentTo, setSentTo] = React.useState<string | null>(null);

  const { mutate, isPending } = useMutation<ContactInput, { message: string }, ContactFormValues>(
    (values) => contactService.send(values),
    {
      setFormError: form.setError,
      onSuccess: () => {
        setSentTo(form.getValues("name")?.trim().split(" ")[0] ?? null);
        form.reset();
      },
    },
  );

  if (sentTo !== null) {
    return (
      <SuccessState
        title="Message sent."
        description={`Thanks${sentTo ? ` ${sentTo}` : ""}. I reply within a day, usually faster on WhatsApp.`}
        actions={
          <>
            <Button variant="signal" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Continue on WhatsApp
              </a>
            </Button>
            <Button variant="surface" onClick={() => setSentTo(null)}>
              Send another message
            </Button>
          </>
        }
      />
    );
  }

  return (
    <>
      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutate(values))}
          noValidate
          className="space-y-5 border-2 border-ink bg-surface-container p-4 text-on-surface sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="name" placeholder="Grace Wanjiru" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="grace.wanjiru@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="How can I help you?" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    placeholder="We need an Android app for clinic bookings…"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="signal" size="lg" block disabled={isPending}>
            <Send aria-hidden="true" className={isPending ? "animate-pulse" : undefined} />
            {isPending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </Form>
    </>
  );
}
