import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ContactInfoSidebar() {
  const { email, phone, addressLines } = siteConfig.contact;

  return (
    <aside className="w-full shrink-0 lg:w-[300px]">
      <div className="overflow-hidden border border-mk-navy/10 bg-white shadow-sm">
        <div className="bg-[#1e4d7b] px-4 py-3 text-white">
          <h2 className="text-sm font-bold uppercase tracking-wide">Reach us</h2>
          <p className="mt-1 text-xs text-white/80">Mira Konnect HR team</p>
        </div>
        <ul className="divide-y divide-mk-navy/8 p-4 text-sm text-mk-slate">
          <li className="flex gap-3 pb-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1e4d7b]" aria-hidden />
            <div>
              <p className="font-semibold text-mk-navy">Office address</p>
              <address className="mt-1 not-italic leading-relaxed text-mk-muted">
                {addressLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
            </div>
          </li>
          <li className="flex gap-3 py-4">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#1e4d7b]" aria-hidden />
            <div>
              <p className="font-semibold text-mk-navy">Mobile</p>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 block text-mk-teal hover:underline">
                {phone}
              </a>
            </div>
          </li>
          <li className="flex gap-3 pt-4">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#1e4d7b]" aria-hidden />
            <div>
              <p className="font-semibold text-mk-navy">Email</p>
              <a href={`mailto:${email}`} className="mt-1 block break-all text-mk-teal hover:underline">
                {email}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
