import type { Metadata } from "next";
import { CatalogDownloadButton } from "@/components/catalog/catalog-download-button";
import { CatalogPageView } from "@/components/catalog/catalog-page-view";
import { getCatalogItems } from "@/components/catalog/catalog-shared";
import { brand } from "@/lib/constants";
import { getProducts } from "@/services/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Katalog visual Ziona berisi koleksi sepatu wanita dengan warna sebagai card produk terpisah.",
  alternates: {
    canonical: "/catalog",
  },
};

export const revalidate = 300;

export default async function CatalogPage() {
  const result = await getProducts();
  const products = result.ok ? result.products : [];
  const items = getCatalogItems(products);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Catalog Ziona",
    url: `${brand.url}/catalog`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CatalogPageView items={items} />
      <CatalogDownloadButton />
    </>
  );
}