import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { brand } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Ziona untuk bantuan ukuran, pesanan, kolaborasi, dan pertanyaan seputar sepatu wanita lokal Indonesia.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const contacts = [
    { icon: Mail, label: brand.email, href: `mailto:${brand.email}` },
    { icon: Phone, label: brand.phone, href: brand.whatsapp },
    { icon: ExternalLink, label: "Instagram", href: brand.instagram },
  ];

  return (
    <section className="bg-secondary py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Kontak"
          title="Kami siap membantu ukuran, perawatan, dan pesanan"
          description="Hubungi kami untuk panduan ukuran, penukaran, kolaborasi, atau pertanyaan seputar koleksi."
        />
        <div className="rounded-lg bg-surface p-6 md:p-8">
          <div className="grid gap-4">
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 rounded-md border border-border p-4 transition hover:border-primary"
              >
                <item.icon size={20} className="text-primary" />
                <span>{item.label}</span>
              </a>
            ))}
            <div className="flex items-center gap-4 rounded-md border border-border p-4 text-muted">
              <MapPin size={20} className="text-primary" />
              <span>{brand.address}</span>
            </div>
          </div>
          <div className="mt-8">
            <LinkButton href={brand.whatsapp} className="w-full">
              Mulai Chat WhatsApp
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
