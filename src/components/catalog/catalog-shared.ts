import type { Product, ProductVariant } from "@/types";
import { formatColor } from "@/utils/format";

export type CatalogItem = {
  id: string;
  number: string;
  code: string;
  color: string;
  colorLabel: string;
  colorHex: string;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  price: number;
  freeInsole?: string;
};

const fallbackSwatches: Record<string, string> = {
  black: "#0B0B0B",
  hitam: "#0B0B0B",
  cream: "#DDB58B",
  ivory: "#F1EFEA",
  beige: "#D9B489",
  tan: "#C49A6C",
  brown: "#6D4C3D",
  white: "#FFFFFF",
  gold: "#B8925A",
};

export function getCatalogItems(products: Product[]) {
  const items = products.flatMap((product) => {
    const variants = getProductVariants(product);

    return variants.map((variant) => {
      const colorLabel = formatColor(variant.color).toUpperCase();

      return {
        id: `${product.id}-${slugPart(variant.color)}`,
        code: product.name,
        color: variant.color,
        colorLabel,
        colorHex: variant.colorHex || swatchFor(variant.color),
        title: `${product.name}-${colorLabel}`,
        description: product.description,
        image: variant.image || product.images[0] || "",
        basePrice: product.basePrice,
        price: product.price,
        freeInsole: product.freeInsole,
      };
    });
  });

  return items.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, "0"),
  }));
}

export function formatCatalogPrice(value: number) {
  return `Rp. ${new Intl.NumberFormat("id-ID").format(value)}`;
}

function getProductVariants(product: Product) {
  const variants = product.variants?.length
    ? product.variants
    : product.images.map<ProductVariant>((image, index) => ({
        color: product.colors[index] ?? product.colors[0] ?? "Default",
        image,
        images: [image],
        sizes: product.sizes,
        stock: product.stock,
      }));

  return variants.length
    ? variants
    : [
        {
          color: product.colors[0] ?? "Default",
          image: product.images[0] ?? "",
          images: product.images,
          sizes: product.sizes,
          stock: product.stock,
        },
      ];
}

function swatchFor(color: string) {
  return fallbackSwatches[slugPart(color)] ?? "#D9B489";
}

function slugPart(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
