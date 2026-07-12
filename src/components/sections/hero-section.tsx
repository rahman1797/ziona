import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { blurDataUrl } from "@/lib/constants";
import type { HeroBanner } from "@/types";

export function HeroSection({ banner }: { banner: HeroBanner }) {
  return (
    <section className="hero pb-32 md:pb-0">
      <div className="page-center py-10">
        <Reveal className="max-w-xl flex flex-col gap-4">
          <div className="flex flex-col justify-center items-center md:items-start gap-2">
            <div className="w-max text-center flex flex-col justify-center items-center">
              <img className="h-20 md:h-[7.5rem]" src="https://lh3.googleusercontent.com/d/169u2J3RFy02_s2MbXKiSqZ5_U51pnC6H" alt="Ziona" />
              <h1 className="uppercase font-bold text-lg md:text-2xl">Style Meets Comfort</h1>
            </div>
          </div>
          <p className="leading-8 text-muted text-sm md:text-lg text-center md:text-left">
            {banner.subheadline}
          </p>
          <div className="flex flex-wrap items-center md:justify-start justify-center gap-3">
            <LinkButton href={banner.ctaHref} className="cursor-pointer px-8">
              {banner.ctaLabel}
              <ArrowRight size={18} />
            </LinkButton>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
