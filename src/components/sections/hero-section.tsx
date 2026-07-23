import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { blurDataUrl } from "@/lib/constants";
import type { HeroBanner } from "@/types";
import logo from "../../../public/assets/logo_ziona_black_transparent.png";

export function HeroSection({ banner }: { banner: HeroBanner }) {
  return (
    <section className="hero pb-32 md:pb-0">
      <div className="page-center pt-10 md:pt-20 pb-52 md:pb-32">
        <Reveal className="max-w-xl flex flex-col gap-4">
          <div className="flex flex-col justify-center items-center md:items-start gap-2">
            <div className="w-max text-center flex flex-col justify-center md:justify-start items-center md:items-start">
              <Image src={logo} alt="Ziona" className="h-20 lg:h-[7.5rem] w-auto ml-0" />
              <h1 className="poppins uppercase font-bold text-lg md:text-lg lg:text-2xl">Style Meets Comfort</h1>
            </div>
          </div>
          <p className="text-gray-600 text-sm md:text-lg text-center md:text-left md:max-w-[22rem] lg:max-w-7xl">
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
