import type { CatalogFilters, Product, ProductCategory } from "@/types";

const pageSize = 8;

export function normalizeSingle(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCategory(
  value: string | undefined,
  categoryOptions: ProductCategory[] = [],
): string {
  if (!value) return "";
  if (!categoryOptions.length) return value;

  return categoryOptions.includes(value as ProductCategory) ? value : "";
}

export function normalizeFilters(
  searchParams: Record<string, string | string[] | undefined>,
  categoryOptions: ProductCategory[] = [],
): Required<CatalogFilters> {
  const min = Number(normalizeSingle(searchParams.min));
  const max = Number(normalizeSingle(searchParams.max));
  const page = Number(normalizeSingle(searchParams.page));

  return {
    category: normalizeCategory(
      normalizeSingle(searchParams.category),
      categoryOptions,
    ),
    color: normalizeSingle(searchParams.color) ?? "",
    min: Number.isFinite(min) ? min : 0,
    max: Number.isFinite(max) ? max : 0,
    sort: normalizeSingle(searchParams.sort) ?? "newest",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function filterProducts(
  products: Product[],
  filters: Required<CatalogFilters>,
) {
  const filtered = products.filter((product) => {
    const price = product.price;

    return (
      (!filters.category || product.category === filters.category) &&
      (!filters.color || product.colors.includes(filters.color)) &&
      (!filters.min || price >= filters.min) &&
      (!filters.max || price <= filters.max)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;

    if (filters.sort === "price-asc") return priceA - priceB;
    if (filters.sort === "price-desc") return priceB - priceA;
    if (filters.sort === "name") return a.name.localeCompare(b.name);

    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(filters.page, totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    products: sorted.slice(start, start + pageSize),
    total: sorted.length,
    totalPages,
    currentPage,
  };
}

export function updateQueryString(
  filters: Required<CatalogFilters>,
  updates: Partial<Record<keyof Required<CatalogFilters>, string | number>>,
) {
  const params = new URLSearchParams();
  const next = { ...filters, ...updates };
  const min = Number(next.min);
  const max = Number(next.max);
  const page = Number(next.page);

  if (next.category) params.set("category", String(next.category));
  if (next.color) params.set("color", String(next.color));
  if (min) params.set("min", String(min));
  if (max) params.set("max", String(max));
  if (next.sort && next.sort !== "newest")
    params.set("sort", String(next.sort));
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
