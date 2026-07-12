import { currencyFormatter } from "@/lib/constants";
import type { ProductCategory, ProductColor } from "@/types";

const categoryLabels: Record<ProductCategory, string> = {
  heels: "Sepatu Hak",
  flats: "Flat",
  sandals: "Sandal",
  loafers: "Loafer",
  sneakers: "Sneaker",
};

const colorLabels: Record<string, string> = {
  Black: "Hitam",
  Ivory: "Gading",
  Sage: "Hijau Sage",
  Taupe: "Taupe",
  Espresso: "Espresso",
  Gold: "Emas",
};

export function formatPrice(value: number) {
  return currencyFormatter.format(value);
}

export function formatCategory(value: ProductCategory) {
  return categoryLabels[value];
}

export function formatColor(value: ProductColor) {
  return colorLabels[value] ?? toTitleCase(value);
}

export function toTitleCase(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
