import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogFilters } from "@/components/product/catalog-filters";
import { Pagination } from "@/components/product/pagination";
import {
  ProductGrid,
  ProductGridSkeleton,
  ProductLoadError,
} from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { brand } from "@/lib/constants";
import { getProducts } from "@/services/catalog";
import { filterProducts, normalizeFilters } from "@/utils/filters";
import { formatCategory } from "@/utils/format";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Belanja sepatu hak dan flat Ziona dengan filter kategori, warna, urutan, dan rentang harga.",
  alternates: {
    canonical: "/products",
  },
};

export const revalidate = 300;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Katalog Produk Ziona",
    url: `${brand.url}/products`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-secondary py-10 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Katalog"
            title="Temukan Pasangan Favoritmu"
            description="Jelajahi koleksi Ziona dan gunakan filter untuk menemukan model yang paling sesuai dengan gaya dan kebutuhanmu."
          />
        </Container>
      </section>
      <section className="bg-background py-10 md:py-14">
        <Container>
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductsContent params={params} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}

async function ProductsContent({
  params,
}: {
  params: Record<string, string | string[] | undefined>;
}) {
  const result = await getProducts();
  if (!result.ok) {
    return <ProductLoadError message={result.error} />;
  }

  const products = result.products;
  const categoryOptions = [
    ...new Set(products.map((product) => product.category)),
  ].sort((a, b) => formatCategory(a).localeCompare(formatCategory(b)));
  const filters = normalizeFilters(params, categoryOptions);
  const colorOptions = [
    ...new Set(products.flatMap((product) => product.colors)),
  ].sort((a, b) => a.localeCompare(b));
  const filteredProducts = filterProducts(products, filters);
  return (
    <>
      <CatalogFilters
        filters={filters}
        categoryOptions={categoryOptions}
        colorOptions={colorOptions}
      />
      <div className="mt-8 flex items-center justify-between gap-4 text-sm text-muted">
        <p>{filteredProducts.total} produk</p>
        <p>
          Halaman {filteredProducts.currentPage} dari {filteredProducts.totalPages}
        </p>
      </div>
      <div className="mt-8">
        <ProductGrid products={filteredProducts.products} />
      </div>
      <Pagination
        filters={{ ...filters, page: filteredProducts.currentPage }}
        totalPages={filteredProducts.totalPages}
      />
    </>
  );
}

function ProductsSkeleton() {
  return (
    <>
      <div className="grid gap-4 rounded-lg border border-border bg-surface p-4 md:grid-cols-2 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="grid gap-2">
            <div className="h-4 w-20 animate-pulse rounded bg-secondary" />
            <div className="h-11 animate-pulse rounded-md bg-secondary" />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="h-4 w-20 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-28 animate-pulse rounded bg-secondary" />
      </div>
      <div className="mt-8">
        <ProductGridSkeleton count={10} />
      </div>
    </>
  );
}
