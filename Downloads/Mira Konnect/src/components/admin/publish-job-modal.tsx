"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AdminPublishJobForm } from "@/components/admin/admin-publish-job-form";

type IndustryOption = { id: string; name: string };

type PublishJobModalProps = {
  open: boolean;
  industries: IndustryOption[];
  onClose: () => void;
};

export function PublishJobModal({ open, industries, onClose }: PublishJobModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[200] m-0 h-full max-h-full w-full max-w-full border-0 bg-black/50 p-4 backdrop:bg-black/50 open:flex open:items-start open:justify-center open:overflow-y-auto sm:p-8"
      onClose={() => onClose()}
    >
      <div className="relative my-4 w-full max-w-4xl rounded-xl bg-white shadow-2xl sm:my-8">
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full p-2 text-mk-muted hover:bg-mk-sand/80 hover:text-mk-navy"
          aria-label="Close"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-mk-navy/10 px-6 py-5 pr-14 sm:px-8">
          <h2 className="font-display text-xl font-semibold text-mk-navy sm:text-2xl">
            Post a job opening for your client
          </h2>
          <p className="mt-1.5 text-sm text-mk-muted">
            Fill in the role details below—the same clear layout candidates see when they share
            their profile.
          </p>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <AdminPublishJobForm industries={industries} inModal onCancel={onClose} />
        </div>
      </div>
    </dialog>
  );
}
