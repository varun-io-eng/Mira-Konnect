import { Footer } from "@/components/marketing/footer";
import { JourneyCtaGate } from "@/components/marketing/journey-cta-gate";
import { HeaderGate } from "@/components/marketing/site-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderGate />
      <main className="flex-1">{children}</main>
      <JourneyCtaGate />
      <Footer />
    </>
  );
}
