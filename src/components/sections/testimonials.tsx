import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { blurDataUrl } from "@/lib/constants";
import type { Testimonial } from "@/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-secondary py-20">
      <Container>
        <SectionHeader
          eyebrow="Pelanggan"
          title="Dipakai dalam ritme hari Indonesia"
          description="Cerita nyata dari perempuan yang memilih Ziona untuk kerja, akhir pekan, dan momen istimewa."
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Reveal
              key={testimonial.id}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">
                &ldquo;{testimonial.review}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.customerName}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
                <div>
                  <p className="font-medium">{testimonial.customerName}</p>
                  <p className="text-sm text-muted">{testimonial.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
