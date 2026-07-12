import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Admin",
  description: "Panel admin Ziona.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="max-w-3xl">
        <SectionHeader
          eyebrow="Admin"
          title="Admin dinonaktifkan"
          description="Panel admin lama sudah dihapus untuk deploy Vercel. Katalog publik saat ini dibaca dari sumber data eksternal dan fallback lokal."
        />
      </Container>
    </section>
  );
}
