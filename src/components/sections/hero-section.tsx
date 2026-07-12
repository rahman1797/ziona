import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { blurDataUrl } from "@/lib/constants";
import type { HeroBanner } from "@/types";

export function HeroSection({ banner }: { banner: HeroBanner }) {
  return (
    <section className="hero">
      <div className="page-center py-10">
        <Reveal className="max-w-xl">
          <div className="flex flex-col gap-2">
            <div className="w-max grid text-center">
              <img className="h-[7.5rem]" src="https://lh3.googleusercontent.com/d/169u2J3RFy02_s2MbXKiSqZ5_U51pnC6H" alt="Ziona" />
              <h1 className="uppercase font-bold text-2xl">Style Meets Comfort</h1>
            </div>
          </div>
          <p className="mt-6 text-lg leading-8 text-muted md:text-xl">
            {banner.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href={banner.ctaHref}>
              {banner.ctaLabel}
              <ArrowRight size={18} />
            </LinkButton>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
