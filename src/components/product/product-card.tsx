"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/types";
import { cn } from "@/utils/cn";
import { formatCategory, formatColor, formatPrice } from "@/utils/format";

const swatches: Record<string, string> = {
  black: "#1c1c1c",
  ivory: "#F1EFEA",
  sage: "#9CA48D",
  taupe: "#9D8F80",
  espresso: "#4A3328",
  gold: "#B8925A",
  white: "#FFFFFF",
  cream: "#F1EFEA",
  brown: "#6D4C3D",
  beige: "#D8C8B4",
};

export function ProductCard({ product }: { product: Product }) {
  const price = product.price;
  const variants = useMemo(() => getVariants(product), [product]);
  const [activeColor, setActiveColor] = useState(variants[0]?.color ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const activeVariant =
    variants.find((variant) => variant.color === activeColor) ?? variants[0];
  const image = activeVariant?.image ?? product.images[0] ?? "";

  return (
    <article className="group bg-white rounded-2xl p-4 ring-2 ring-[#5D5E4D]/10 flex flex-col gap-4">
      <div onClick={() => setIsOpen(true)} className="flex w-full flex-col gap-4 text-left flex-1">
        <div className="relative overflow-hidden rounded-lg bg-secondary">
          <img src={image} alt={product.name} className="w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white bg-[#5D5E4D]">
            {product.category}
          </span>
        </div>
        <h3 className="font-medium text-foreground">{product.name}</h3>
        <div className="flex flex-col items-start justify-between pt-4 gap-4 border-t-2 border-[#5D5E4D]/10">
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="font-semibold line-through">{formatPrice(product.basePrice)}</span>
              <span className="font-semibold">{formatPrice(product.price)}</span>
            </div>
            <p className="text-sm text-gray-500">
              {product.description}
            </p>
        </div>
      </div>
      {variants.length ? (
        <div className="mt-3 flex flex-wrap gap-2" aria-label={`Warna ${product.name}`}>
          {variants.map((variant) => (
            <button
              key={variant.color}
              type="button"
              onClick={() => setActiveColor(variant.color)}
              className={cn(
                "h-7 w-7 rounded-full border p-0.5 transition cursor-pointer",
                activeVariant?.color === variant.color
                  ? "border-primary"
                  : "border-border hover:border-muted",
              )}
              aria-label={`Tampilkan warna ${formatColor(variant.color)}`}
              title={formatColor(variant.color)}
            >
              <span
                className="block h-full w-full rounded-full border border-black/10"
                style={{
                  backgroundColor:
                    normalizeHexColor(variant.colorHex) ??
                    swatchColor(variant.color),
                }}
              />
            </button>
          ))}
        </div>
      ) : null}
      {isOpen ? (
        <ProductModal
          product={product}
          image={image}
          price={price}
          variants={variants}
          activeColor={activeColor}
          onColorChange={setActiveColor}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </article>
  );
}

function ProductModal({
  product,
  image,
  price,
  variants,
  activeColor,
  onColorChange,
  onClose,
}: {
  product: Product;
  image: string;
  price: number;
  variants: ProductVariant[];
  activeColor: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-${product.id}-title`}
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[90svh] w-full max-w-4xl overflow-y-auto rounded-lg bg-surface shadow-soft md:grid-cols-[1fr_0.9fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-surface/95 text-foreground shadow-sm transition hover:bg-secondary"
          aria-label="Tutup detail produk"
        >
          <X size={20} />
        </button>
        <div className="bg-secondary">
          <img
            src={image}
            alt={product.name}
            className="aspect-[5/5] h-full w-full object-cover"
          />
        </div>
        <div className="p-6 md:p-8">
          <p className="text-sm font-semibold text-primary">
            {formatCategory(product.category)}
          </p>
          <h2
            id={`product-${product.id}-title`}
            className="mt-2 text-2xl font-semibold text-foreground"
          >
            {product.name}
          </h2>
          <div className="mt-4 flex items-center gap-2 text-base">
            <span className="font-semibold">{formatPrice(price)}</span>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted">
            {product.description}
          </p>
          {variants.length ? (
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">Warna</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.color}
                    type="button"
                    onClick={() => onColorChange(variant.color)}
                    className={cn(
                      "h-8 w-8 rounded-full border p-0.5 transition",
                      activeColor === variant.color
                        ? "border-primary"
                        : "border-border hover:border-muted",
                    )}
                    aria-label={`Tampilkan warna ${formatColor(variant.color)}`}
                    title={formatColor(variant.color)}
                  >
                    <span
                      className="block h-full w-full rounded-full border border-black/10"
                      style={{
                        backgroundColor:
                          normalizeHexColor(variant.colorHex) ??
                          swatchColor(variant.color),
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getVariants(product: Product): ProductVariant[] {
  if (product.variants?.length) return product.variants;

  return product.colors.map((color, index) => ({
    color,
    image: product.images[index] ?? product.images[0] ?? "",
    images: [product.images[index] ?? product.images[0] ?? ""],
    sizes: product.sizes,
    stock: product.stock,
  }));
}

function swatchColor(color: string) {
  return swatches[color.toLowerCase().replace(/[^a-z0-9]+/g, "")] ?? "#DDD7CA";
}

function normalizeHexColor(value: string | undefined) {
  const match = value?.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);

  return match ? `#${match[1]}` : undefined;
}
