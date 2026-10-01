"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { validateFields } from "@/lib/validation";
import type { AuthField } from "@/types";

const SIMULATED_REQUEST_MS = 1200;

type Status = "idle" | "submitting" | "success";

type AuthFormProps = {
  fields: readonly AuthField[];
  submitLabel: string;
  successMessage: string;
};

/**
 * Client-side validated auth form. There is no backend yet, so a successful submit waits briefly,
 * shows the success message and clears the form — nothing leaves the browser.
 */
export function AuthForm({ fields, submitLabel, successMessage }: AuthFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validateFields(fields, new FormData(form));
    setErrors(nextErrors);

    const firstInvalid = fields.find((field) => nextErrors[field.name]);
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_REQUEST_MS));
    form.reset();
    setStatus("success");
  }

  function clearError(name: string) {
    if (status === "success") setStatus("idle");
    if (!errors[name]) return;
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          type={field.type}
          label={field.label}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          error={errors[field.name]}
          onChange={() => clearError(field.name)}
        />
      ))}

      <Button type="submit" disabled={submitting} className="mt-1 self-end px-7">
        {submitting && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
        {submitting ? "Please wait…" : submitLabel}
      </Button>

      <p role="status" className="min-h-5 text-right text-sm font-medium text-brand">
        {status === "success" && successMessage}
      </p>
    </form>
  );
}
