"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-login";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const emailId = "login-email";
  const passwordId = "login-password";
  const emailErrorId = "login-email-error";
  const passwordErrorId = "login-password-error";

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      noValidate
    >
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor={emailId}
            className="block text-sm font-medium text-foreground mb-1"
          >
            Email address
          </label>
          <Input
            id={emailId}
            type="email"
            placeholder="Email address"
            autoComplete="email"
            invalid={!!errors.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? emailErrorId : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id={emailErrorId} className="text-xs text-primary mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={passwordId}
            className="block text-sm font-medium text-foreground mb-1"
          >
            Password
          </label>
          <Input
            id={passwordId}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            invalid={!!errors.password}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? passwordErrorId : undefined}
            {...register("password")}
          />
          {errors.password && (
            <p id={passwordErrorId} className="text-xs text-primary mt-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Logging in..." : "Log in"}
        </Button>
      </div>

      <div className="mt-4 rounded-field bg-surface-alt text-muted text-xs p-3">
        Demo credentials — eve.holt@reqres.in / cityslicka
      </div>
    </form>
  );
}
