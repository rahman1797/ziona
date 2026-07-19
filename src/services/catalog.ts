import {
  categories as fallbackCategories,
  heroBanner,
  testimonials as fallbackTestimonials,
} from "@/lib/seed-data";
import { getProductsJson } from "@/services/api";
import { mapProductsJson } from "@/services/product-mapper";
import type { Category, HeroBanner, Product, Testimonial } from "@/types";

export type ProductsResult =
  | { ok: true; products: Product[] }
  | { ok: false; products: []; error: string };

export async function getProducts(): Promise<ProductsResult> {
  try {
    const payload = await getProductsJson();
    if (!payload) {
      return {
        ok: false,
        products: [],
        error: "Konfigurasi API produk belum tersedia.",
      };
    }

    const products = mapProductsJson(payload);
    if (!products.length) {
      return {
        ok: false,
        products: [],
        error: "Data produk dari Google Sheets masih kosong.",
      };
    }

    return { ok: true, products };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to read products from Google Sheets API.", error);
    }

    return {
      ok: false,
      products: [],
      error: "Gagal membaca data produk dari Google Sheets.",
    };
  }
}

export async function getProductBySlug(slug: string) {
  const result = await getProducts();
  if (!result.ok) return null;

  return result.products.find((product) => product.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return fallbackCategories;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fallbackTestimonials;
}

export async function getHeroBanner(): Promise<HeroBanner> {
  return heroBanner;
}
