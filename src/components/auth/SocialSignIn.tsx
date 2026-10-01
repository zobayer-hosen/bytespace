"use client";

import { useState } from "react";
import { FacebookIcon, GoogleIcon } from "./BrandIcons";

const providers = [
  { name: "Facebook", icon: FacebookIcon },
  { name: "Google", icon: GoogleIcon },
];

/** "or" divider plus social provider buttons (providers are not connected yet). */
export function SocialSignIn() {
  const [notice, setNotice] = useState("");

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 text-sm text-muted">
        <span aria-hidden className="h-px flex-1 bg-line" />
        or
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-10 flex justify-center gap-5">
        {providers.map(({ name, icon: Icon }) => (
          <button
            key={name}
            type="button"
            aria-label={`Sign in with ${name}`}
            onClick={() => setNotice(`${name} sign-in is not connected yet.`)}
            className="grid size-16 place-items-center rounded-2xl border border-line text-ink transition-colors hover:border-ink/25 hover:bg-surface"
          >
            <Icon className="size-7" />
          </button>
        ))}
      </div>

      <p role="status" className="mt-3 min-h-5 text-center text-xs text-muted">
        {notice}
      </p>
    </div>
  );
}
