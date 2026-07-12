import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { blurDataUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kenali Ziona, brand sepatu wanita lokal Indonesia yang berfokus pada kenyamanan elegan dan desain premium minimalis.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-secondary py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Tentang Ziona"
            title="Desain lokal dengan percaya diri yang tenang"
            description="Ziona menciptakan sepatu wanita untuk rutinitas Indonesia: cukup rapi untuk kerja dan acara, cukup nyaman untuk setiap langkah di antaranya."
          />
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-background">
            <Image
              src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1200&q=85"
              alt="Detail sepatu Ziona"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />
          </div>
        </Container>
      </section>
      <section className="bg-background py-16">
        <Container className="grid gap-8 md:grid-cols-3">
          {[
            ["01", "Elegan yang tertahan", "Bentuknya minimal, terarah, dan mudah dipadukan."],
            ["02", "Nyaman dipakai", "Setiap pasang dirancang dengan fit stabil dan bantalan yang mendukung."],
            ["03", "Ritme Indonesia", "Koleksi Ziona mempertimbangkan cuaca lokal, mobilitas kota, dan gaya harian."],
          ].map(([number, title, copy]) => (
            <article key={title} className="border-t border-border pt-6">
              <p className="text-sm font-semibold text-primary">{number}</p>
              <h2 className="mt-4 font-serif text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
