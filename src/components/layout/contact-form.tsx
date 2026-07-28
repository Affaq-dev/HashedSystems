"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/cn";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

const fieldClasses =
  "w-full bg-[#1d1d1d] border border-[#4a4a4a] px-[20px] text-[16px] text-white placeholder:text-white focus:outline-none focus:border-white/60 transition-colors";

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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="contact-email" className="sr-only">
          Email address
        </label>
        <input
          id="contact-email"
          {...register("email")}
          type="email"
          placeholder="Email Address"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={cn(fieldClasses, "h-[44px] rounded-[12px]", !!errors.email && "border-primary")}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-primary mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mt-[17px]">
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          placeholder="Message"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(
            fieldClasses,
            "h-[148px] rounded-[10px] py-[15px] resize-none",
            !!errors.message && "border-primary"
          )}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-primary mt-1">
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="mt-[17px] flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center h-[50px] px-[37px] rounded-[10px] bg-primary text-white text-[20px] font-semibold tracking-[-0.6px] hover:bg-primary-hover transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
