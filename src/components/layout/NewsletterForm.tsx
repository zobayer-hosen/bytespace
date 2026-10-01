"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { isValidEmail } from "@/lib/validation";

type Status = "idle" | "error" | "success";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={status === "error"}
            aria-describedby="newsletter-status"
            onChange={() => status !== "idle" && setStatus("idle")}
            className="h-12 w-full rounded-full border border-line px-6 text-sm text-ink placeholder:text-ink/60 focus:border-brand focus:outline-none"
          />
        </label>
        <Button type="submit" size="lg" className="px-7">
          Search
        </Button>
      </div>
      <p id="newsletter-status" role="status" className="mt-2 min-h-5 text-xs">
        {status === "error" && <span className="text-red-600">Please enter a valid email address.</span>}
        {status === "success" && <span className="text-brand">Thanks for subscribing!</span>}
      </p>
    </form>
  );
}
