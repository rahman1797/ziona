import type { MetadataRoute } from "next";
import { brand } from "@/lib/constants";
import { getProducts } from "@/services/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const staticRoutes = ["", "/products", "/about", "/contact", "/privacy", "/terms"];
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${brand.url}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${brand.url}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: product.images.slice(0, 1),
    })),
  ];
}
