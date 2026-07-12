import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Ziona untuk data pelanggan, analitik, dan dukungan pesanan.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="max-w-3xl">
        <SectionHeader
          eyebrow="Privasi"
          title="Kebijakan Privasi"
          description="Kami hanya mengumpulkan informasi yang dibutuhkan untuk mendukung aktivitas browsing, pesanan, layanan pelanggan, analitik, dan operasional admin yang aman."
        />
        <div className="mt-10 space-y-8 text-sm leading-7 text-muted">
          <p>
            Ziona dapat memproses detail kontak pelanggan, catatan pesanan, aktivitas analitik, dan pesan dukungan untuk membantu proses pembelian.
          </p>
          <p>
            Konten produk dan testimoni dapat dikelola melalui sumber data eksternal yang digunakan oleh tim Ziona.
          </p>
          <p>
            Pelanggan dapat meminta koreksi atau penghapusan informasi dukungan pribadi dengan menghubungi Ziona secara langsung.
          </p>
        </div>
      </Container>
    </section>
  );
}
