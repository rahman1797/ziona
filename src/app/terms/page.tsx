import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Ketentuan",
  description: "Ketentuan website Ziona, informasi produk, pengiriman, dan panduan penukaran.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container className="max-w-3xl">
        <SectionHeader
          eyebrow="Ketentuan"
          title="Syarat dan Ketentuan"
          description="Ketentuan ini berlaku untuk penggunaan website Ziona dan pembelian produk melalui kanal penjualan yang didukung."
        />
        <div className="mt-10 space-y-8 text-sm leading-7 text-muted">
          <p>
            Ketersediaan produk, harga, dan penawaran promosi dapat berubah tanpa pemberitahuan sebelumnya. Kami berupaya menjaga informasi katalog tetap akurat.
          </p>
          <p>
            Penukaran tersedia untuk produk yang belum dipakai dan masih dengan kemasan asli dalam periode penukaran yang telah diinformasikan.
          </p>
          <p>
            Gambar produk dikelola warnanya secermat mungkin, tetapi perbedaan layar dapat memengaruhi persepsi warna.
          </p>
        </div>
      </Container>
    </section>
  );
}
