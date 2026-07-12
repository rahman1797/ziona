import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const faqs = [
  {
    question: "Bagaimana cara memilih ukuran?",
    answer:
      "Sebagian besar model Ziona mengikuti ukuran Indonesia. Jika ukuran kakimu berada di antara dua nomor atau lebih lebar, pilih ukuran yang lebih besar.",
  },
  {
    question: "Apakah Ziona mengirim ke seluruh Indonesia?",
    answer:
      "Ya. Pesanan dikirim dari Jakarta dengan layanan terlacak ke kota besar dan alamat daerah.",
  },
  {
    question: "Apakah produk bisa ditukar?",
    answer:
      "Penukaran tersedia untuk produk yang belum dipakai, masih dengan kemasan asli, dalam tujuh hari setelah diterima.",
  },
  {
    question: "Bagaimana cara merawat sepatu?",
    answer:
      "Lap perlahan dengan kain kering yang lembut setelah dipakai, lalu simpan jauh dari panas langsung atau paparan matahari lama.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-secondary py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="FAQ"
            title="Detail sebelum memesan"
            description="Informasi ukuran, pengiriman, perawatan, dan penukaran agar pengalaman belanja lebih lancar."
          />
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <Reveal key={faq.question} className="rounded-lg bg-surface p-6">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
