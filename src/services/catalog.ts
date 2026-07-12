import {
  categories as fallbackCategories,
  heroBanner,
  products as fallbackProducts,
  testimonials as fallbackTestimonials,
} from "@/lib/seed-data";
import { getProductsJson } from "@/services/api";
import { mapProductsJson } from "@/services/product-mapper";
import type { Category, HeroBanner, Product, Testimonial } from "@/types";

export async function getProducts() {
  const sheetProducts = await getSheetProducts();
  return sheetProducts ?? fallbackProducts;
}

async function getSheetProducts() {
  try {
    const payload = await getProductsJson();
    if (!payload) return null;

    const products = mapProductsJson(payload);
    return products.length ? products : null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to read products from Google Sheets API.", error);
    }

    return null;
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
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
