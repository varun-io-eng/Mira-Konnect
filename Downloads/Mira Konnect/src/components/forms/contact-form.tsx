"use client";

import { useActionState } from "react";
import { submitContactAction, type ActionResult } from "@/actions/contact";
import { Button } from "@/components/ui/button";

const inputClass =
  "mt-1 w-full rounded-lg border border-mk-navy/15 px-3 py-2 text-sm focus:border-mk-teal focus:outline-none focus:ring-1 focus:ring-mk-teal";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    async (_prev: ActionResult | null, formData: FormData) => submitContactAction(formData),
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-mk-teal/30 bg-mk-teal/5 p-6 text-center">
        <p className="font-semibold text-mk-navy">Thank you — we received your message.</p>
        <p className="mt-2 text-sm text-mk-slate">Our HR team will respond shortly.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state && !state.ok ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{state.error}</p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-mk-navy" htmlFor="name">Name</label>
          <input id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium text-mk-navy" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-mk-navy" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium text-mk-navy" htmlFor="company">Company</label>
          <input id="company" name="company" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-mk-navy" htmlFor="subject">Subject</label>
        <input id="subject" name="subject" className={inputClass} />
      </div>
      <div>
        <label className="text-sm font-medium text-mk-navy" htmlFor="message">Message</label>
        <textarea id="message" name="message" required rows={5} className={inputClass} />
      </div>
      <Button type="submit" disabled={pending}>{pending ? "Sending…" : "Send message"}</Button>
    </form>
  );
}
