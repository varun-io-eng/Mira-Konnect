"use client";

import { useActionState } from "react";
import { publisherLoginAction, type ActionResult } from "@/actions/publisher-auth";
import { Button } from "@/components/ui/button";
import { DEFAULT_PUBLISHER_EMAIL } from "@/lib/auth/publisher-credentials";
import { cn } from "@/lib/utils";

const initial: ActionResult = { ok: true };

const inputClass =
  "mt-1 w-full rounded-lg border border-mk-navy/15 bg-white px-3 py-2 text-sm text-mk-navy shadow-sm focus:border-mk-teal focus:outline-none focus:ring-2 focus:ring-mk-teal/20";

const labelClass = "text-sm font-medium text-mk-navy";

export function AdminPublisherLoginForm() {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult, formData: FormData) => publisherLoginAction(formData),
    initial,
  );

  return (
    <form action={action} className="space-y-3.5">
      <input type="hidden" name="next" value="/admin/publish" />
      {!state.ok ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {state.error}
        </p>
      ) : null}
      <div>
        <label className={labelClass} htmlFor="publisher-email">Email address</label>
        <input
          id="publisher-email"
          name="email"
          type="email"
          required
          readOnly
          autoComplete="email"
          className={cn(inputClass, "bg-mk-sand/40 text-mk-navy")}
          defaultValue={DEFAULT_PUBLISHER_EMAIL}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="publisher-password">Password</label>
        <input
          id="publisher-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
          placeholder="Publisher password"
        />
      </div>
      <Button
        type="submit"
        className="h-11 w-full text-sm font-semibold uppercase tracking-wide"
        disabled={pending}
      >
        {pending ? "Signing in…" : "Continue"}
      </Button>
    </form>
  );
}
