import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { brand } from "@/lib/constants";

const faqs = [
  {
    question: "Ukuran apa saja yang tersedia?",
    answer:
      "Ziona menyediakan ukuran mulai dari 36 hingga 41. Harap perhatikan panduan ukuran di halaman produk untuk memilih yang paling pas.",
  },
  {
    question: "Bagaimana cara memesan produk Ziona?",
    answer: (
      <>
        Saat ini pemesanan dilakukan secara manual melalui WhatsApp. Silakan hubungi kami melalui kontak yang tertera{" "}
        <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="font-medium text-primary underline">
          di sini
        </a>
        .
      </>
    ),
  },
  {
    question: "Jika ukuran yang saya inginkan tidak tersedia, berapa lama produk akan tersedia kembali?",
    answer: (
      <>
        Produk kami restock setiap 1-2 minggu sekali. Silahkan hubungi kami melalui kontak yang tertera <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="font-medium text-primary underline">
          di sini
        </a>.
      </>
    ),
  },
  {
    question: "Apakah jika saya membeli dalam jumlah banyak, ada harga spesial yang bisa saya dapatkan?",
    answer:
      "Ya, kami menyediakan opsi pembelian partai dalam jumlah banyak. Untuk info selengkapnya harap hubungi kami melalui kontak yang tertera ",
  },
];

export function FaqSection() {
  return (
    <section className="bg-secondary">
      
        <div className="page-center flex flex-col gap-4 md:gap-10 py-10">
          <SectionHeader
            title="Paling Sering Ditanyakan"
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
    </section>
  );
}
