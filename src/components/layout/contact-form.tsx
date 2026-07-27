"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/ui-store";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const pushToast = useUiStore((s) => s.pushToast);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    pushToast("success", "Message sent — we'll get back to you soon.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <Input
          {...register("email")}
          type="email"
          placeholder="Email Address"
          invalid={!!errors.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="bg-white/5 border-white/15 text-white placeholder:text-faint"
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-primary mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Textarea
          {...register("message")}
          placeholder="Message"
          invalid={!!errors.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="bg-white/5 border-white/15 text-white placeholder:text-faint"
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-primary mt-1">
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="md" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
}
