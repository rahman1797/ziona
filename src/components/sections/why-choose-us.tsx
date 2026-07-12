import { BadgeCheck, Leaf, Ruler, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const points = [
  {
    icon: Sparkles,
    title: "Mewah yang minimal",
    copy: "Garis bersih, proporsi seimbang, dan warna yang tetap relevan lintas musim.",
  },
  {
    icon: Ruler,
    title: "Fit yang mengutamakan nyaman",
    copy: "Insole empuk, hak stabil, dan bentuk yang diuji untuk gerak harian.",
  },
  {
    icon: Leaf,
    title: "Material yang dipilih cermat",
    copy: "Kulit vegan tahan lama, lining yang nyaman, dan outsole anti-slip yang dapat diandalkan.",
  },
  {
    icon: BadgeCheck,
    title: "Dukungan lokal",
    copy: "Bantuan cepat di Indonesia untuk ukuran, perawatan, dan pertanyaan setelah pembelian.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Mengapa Ziona"
            title="Dibuat agar tampak rapi dan terasa ringan"
            description="Fondasi gaya premium untuk perempuan yang membutuhkan sepatu nyaman sepanjang hari, bukan hanya satu jam pertama."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <Reveal
                key={point.title}
                className="rounded-lg border border-white/15 bg-white/8 p-6"
              >
                <point.icon size={24} className="text-accent" />
                <h3 className="mt-5 text-lg font-semibold">{point.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">{point.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
