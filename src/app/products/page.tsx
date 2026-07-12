import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogFilters } from "@/components/product/catalog-filters";
import { Pagination } from "@/components/product/pagination";
import { ProductGrid, ProductGridSkeleton } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { brand } from "@/lib/constants";
import { getProducts } from "@/services/firestore";
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
      <section className="bg-secondary py-14 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="Katalog"
            title="Pilih pasangan berikutnya"
            description="Filter berdasarkan kategori, warna, urutan, dan rentang harga untuk menemukan sepatu harian yang rapi dan nyaman."
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
  const products = await getProducts();
  const categoryOptions = [
    ...new Set(products.map((product) => product.category)),
  ].sort((a, b) => formatCategory(a).localeCompare(formatCategory(b)));
  const filters = normalizeFilters(params, categoryOptions);
  const colorOptions = [
    ...new Set(products.flatMap((product) => product.colors)),
  ].sort((a, b) => a.localeCompare(b));
  const result = filterProducts(products, filters);
  return (
    <>
      <CatalogFilters
        filters={filters}
        categoryOptions={categoryOptions}
        colorOptions={colorOptions}
      />
      <div className="mt-8 flex items-center justify-between gap-4 text-sm text-muted">
        <p>{result.total} produk</p>
        <p>
          Halaman {result.currentPage} dari {result.totalPages}
        </p>
      </div>
      <div className="mt-8">
        <ProductGrid products={result.products} />
      </div>
      <Pagination
        filters={{ ...filters, page: result.currentPage }}
        totalPages={result.totalPages}
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
