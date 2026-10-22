"use client";

import { useActionState, useState, useEffect } from "react";
import { loginAction, registerAction, type ActionResult } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const initial: ActionResult | null = null;

function ErrorBox({ result }: { result: ActionResult | null }) {
  if (!result || result.ok) return null;
  return (
    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
      {result.error}
    </p>
  );
}

const inputClass =
  "mt-1 w-full rounded-lg border border-mk-navy/15 bg-white px-3 py-2.5 text-sm text-mk-navy shadow-sm focus:border-mk-teal focus:outline-none focus:ring-2 focus:ring-mk-teal/20";

const inputClassCompact =
  "mt-1 w-full rounded-lg border border-mk-navy/15 bg-white px-3 py-2 text-sm text-mk-navy shadow-sm focus:border-mk-teal focus:outline-none focus:ring-2 focus:ring-mk-teal/20";

const labelClass = "text-sm font-medium text-mk-navy";

type AuthFormVariant = "default" | "jobSeeker";

export function LoginForm({
  next,
  variant = "default",
}: {
  next?: string;
  variant?: AuthFormVariant;
}) {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => loginAction(formData),
    initial,
  );
  const [showPassword, setShowPassword] = useState(false);

  const jobSeeker = variant === "jobSeeker";

  const fieldClass = jobSeeker ? inputClassCompact : inputClass;
  const formGap = jobSeeker ? "space-y-3.5" : "space-y-5";

  return (
    <form action={action} className={formGap}>
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <ErrorBox result={state} />
      <div>
        <label className={labelClass} htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="password">Password</label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className={fieldClass}
            placeholder="Your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mk-slate hover:text-mk-navy"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button
        type="submit"
        className={cn("w-full", jobSeeker && "h-11 text-sm font-semibold uppercase tracking-wide")}
        disabled={pending}
      >
        {pending ? "Signing in…" : jobSeeker ? "Continue" : "Sign in"}
      </Button>
    </form>
  );
}

export function RegisterForm({
  next,
  variant = "default",
}: {
  next?: string;
  variant?: AuthFormVariant;
}) {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => registerAction(formData),
    initial,
  );
  const [showPassword, setShowPassword] = useState(false);

  const jobSeeker = variant === "jobSeeker";

  const fieldClass = jobSeeker ? inputClassCompact : inputClass;
  const formGap = jobSeeker ? "space-y-3.5" : "space-y-5";

  // Note: Register action now redirects automatically on success, so success message won't be shown
  return (
    <form action={action} className={formGap}>
      {next ? <input type="hidden" name="next" value={next} /> : null}
      {jobSeeker ? <input type="hidden" name="accountType" value="candidate" /> : null}
      <ErrorBox result={state} />

      {!jobSeeker ? (
        <div>
          <label className={labelClass} htmlFor="accountType">I am a</label>
          <select id="accountType" name="accountType" className={fieldClass} defaultValue="candidate">
            <option value="candidate">Job seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
      ) : null}

      <div>
        <label className={labelClass} htmlFor="name">Full name</label>
        <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Full name" />
      </div>
      <div>
        <label className={labelClass} htmlFor="reg-email">Email address</label>
        <input
          id="reg-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="phone">
          Mobile number {jobSeeker ? <span className="text-red-600">*</span> : "(optional)"}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required={jobSeeker}
          autoComplete="tel"
          className={fieldClass}
          placeholder="10-digit mobile"
        />
      </div>

      {!jobSeeker ? (
        <div>
          <label className={labelClass} htmlFor="companyName">Company name (employers)</label>
          <input id="companyName" name="companyName" className={fieldClass} />
        </div>
      ) : null}

      <div>
        <label className={labelClass} htmlFor="reg-password">Password</label>
        <div className="relative">
          <input
            id="reg-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            className={fieldClass}
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mk-slate hover:text-mk-navy"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button
        type="submit"
        className={cn("w-full", jobSeeker && "h-11 text-sm font-semibold uppercase tracking-wide")}
        disabled={pending}
      >
        {pending ? "Creating account…" : jobSeeker ? "Continue" : "Create account"}
      </Button>
    </form>
  );
}
