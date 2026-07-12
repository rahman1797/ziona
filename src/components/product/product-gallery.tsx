"use client";

import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { blurDataUrl } from "@/lib/constants";
import { cn } from "@/utils/cn";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(images[0]);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="grid gap-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
        <Image
          src={active}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
        <Button
          variant="secondary"
          className="absolute bottom-4 right-4 h-11 w-11 px-0"
          aria-label="Perbesar gambar produk"
          onClick={() => setZoomed(true)}
        >
          <ZoomIn size={18} />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(image)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md border bg-secondary",
              active === image ? "border-primary" : "border-transparent",
            )}
          >
            <Image src={image} alt={name} fill sizes="25vw" className="object-cover" />
          </button>
        ))}
      </div>
      {zoomed ? (
        <div className="fixed inset-0 z-50 bg-black/85 p-4" role="dialog" aria-modal="true">
          <Button
            variant="secondary"
            className="absolute right-4 top-4 h-11 w-11 px-0"
            aria-label="Tutup gambar besar"
            onClick={() => setZoomed(false)}
          >
            <X size={18} />
          </Button>
          <div className="relative mx-auto h-full max-w-5xl">
            <Image src={active} alt={name} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
