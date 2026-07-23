import type { Product, ProductCategory, ProductVariant } from "@/types";

type ProductApiRow = {
  productCode?: unknown;
  color?: unknown;
  colorHex?: unknown;
  image?: unknown;
  embedUrl?: unknown;
  category?: unknown;
  basePrice?: unknown;
  discount?: unknown;
  price?: unknown;
  description?: unknown;
  ready?: unknown;
  freeInsole?: unknown;
};

type ProductGroup = {
  code: string;
  rows: ProductApiRow[];
  variants: Map<string, ProductVariant>;
  colors: Set<string>;
  images: Set<string>;
  stock: number;
};

export function mapProductsJson(payload: unknown): Product[] {
  if (!Array.isArray(payload)) return [];

  const groups = new Map<string, ProductGroup>();

  payload
    .filter(isProductApiRow)
    .filter(isReadyRow)
    .forEach((row) => {
      const code = readString(row.productCode);
      const category = normalizeCategory(
        readString(row.category),
        readString(row.description),
      );
      const image = readImage(row);

      if (!code || !category || !image) return;

      const color = toTitle(readString(row.color) || "Default");
      const colorHex = normalizeHexColor(readString(row.colorHex));
      const variantKey = normalizeKey(color);

      if (!groups.has(code)) {
        groups.set(code, {
          code,
          rows: [],
          variants: new Map(),
          colors: new Set(),
          images: new Set(),
          stock: 0,
        });
      }

      const group = groups.get(code);
      if (!group) return;

      const existingVariant = group.variants.get(variantKey);
      const variantImages = unique([...(existingVariant?.images ?? []), image]);

      group.rows.push(row);
      group.colors.add(color);
      group.images.add(image);
      group.stock += 1;
      group.variants.set(variantKey, {
        color,
        ...(colorHex ? { colorHex } : {}),
        image: variantImages[0],
        images: variantImages,
        sizes: [],
        stock: (existingVariant?.stock ?? 0) + 1,
      });
    });

  return [...groups.values()]
    .map(groupToProduct)
    .filter((product): product is Product => Boolean(product));
}

function groupToProduct(group: ProductGroup): Product | null {
  const firstRow = group.rows[0];
  const category = normalizeCategory(
    readString(firstRow.category),
    readString(firstRow.description),
  );
  const variants = [...group.variants.values()];
  const images = [...group.images];

  if (!category || !variants.length || !images.length) return null;

  return {
    id: slugify(group.code),
    slug: slugify(group.code),
    name: group.code,
    description:
      readString(firstRow.description) ||
      `${group.code} dari Ziona dengan desain rapi dan nyaman untuk dipakai harian.`,
    category,
    basePrice: readNumber(firstRow.basePrice),
    price: readNumber(firstRow.price) || readNumber(firstRow.basePrice),
    colors: [...group.colors],
    sizes: [],
    images,
    variants,
    freeInsole: group.rows.some((row) => isYes(row.freeInsole)) ? "yes" : "",
    stock: group.stock,
  };
}

function isProductApiRow(value: unknown): value is ProductApiRow {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isReadyRow(row: ProductApiRow) {
  return (
    isYes(row.ready) ||
    ["ready", "available", "ada"].includes(readString(row.ready).toLowerCase())
  );
}

function isYes(value: unknown) {
  return ["yes", "y", "true", "1", "ya"].includes(
    readString(value).toLowerCase(),
  );
}

function readImage(row: ProductApiRow) {
  return (
    readString(row.embedUrl) || normalizeDriveImageUrl(readString(row.image))
  );
}

function normalizeCategory(
  value: string,
  description: string,
): ProductCategory | null {
  const normalized = normalizeKey(value);
  const searchable = `${normalized} ${normalizeKey(description)}`;

  if (["heels", "heel", "hak", "sepatuhak"].includes(normalized))
    return "heels";
  if (
    ["flats", "flat", "flatshoes", "flatshoe", "sepatuflat"].includes(
      normalized,
    )
  )
    return "flats";
  if (
    ["sandals", "sandal", "sandalwanita", "slides", "slide"].includes(
      normalized,
    )
  )
    return "sandals";
  if (["loafers", "loafer", "pennyloafer", "sepatuformal"].includes(normalized))
    return "loafers";
  if (
    ["sneakers", "sneaker", "sepatuolahraga", "sepatusantai"].includes(
      normalized,
    )
  )
    return "sneakers";

  if (
    searchable.includes("heel") ||
    searchable.includes("hak") ||
    searchable.includes("mule")
  ) {
    return "heels";
  }
  if (searchable.includes("flat")) return "flats";
  if (searchable.includes("sandal") || searchable.includes("slide"))
    return "sandals";
  if (searchable.includes("loafer")) return "loafers";
  if (searchable.includes("sneaker")) return "sneakers";

  return null;
}

function readString(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function readNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (value === null || value === undefined) return 0;

  const numeric = String(value).replace(/[^0-9,.-]+/g, "");
  const separators = numeric.match(/[,.]/g) ?? [];
  const lastSeparator = Math.max(
    numeric.lastIndexOf("."),
    numeric.lastIndexOf(","),
  );
  const decimalLength =
    lastSeparator >= 0
      ? numeric.slice(lastSeparator + 1).replace(/[^0-9]/g, "").length
      : 0;
  const normalized =
    separators.length > 1 || decimalLength === 3
      ? numeric.replace(/[,.]/g, "")
      : numeric.replace(",", ".");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeDriveImageUrl(value: string) {
  const fileMatch = value.match(/\/file\/d\/([^/]+)/);
  const idMatch = value.match(/[?&]id=([^&]+)/);
  const id = fileMatch?.[1] ?? idMatch?.[1];

  return id ? `https://lh3.googleusercontent.com/d/${id}` : value;
}

function normalizeHexColor(value: string) {
  const match = value.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  return match ? `#${match[1].toUpperCase()}` : "";
}

function normalizeKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}

function toTitle(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}
