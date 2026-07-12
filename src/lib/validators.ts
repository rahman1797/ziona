import { z } from "zod";

export const productSchema = z.object({
  slug: z.string().min(2).max(90).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(120),
  description: z.string().min(20).max(1200),
  category: z.enum(["heels", "flats", "sandals", "loafers", "sneakers"]),
  basePrice: z.number().positive(),
  price: z.number().positive(),
  colors: z.array(z.string()).min(1),
  sizes: z.array(z.string()),
  images: z.array(z.string().url()).min(1),
  stock: z.number().int().min(0),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(80),
  slug: z.enum(["heels", "flats", "sandals", "loafers", "sneakers"]),
  image: z.string().url(),
});

export const testimonialSchema = z.object({
  customerName: z.string().min(2).max(80),
  city: z.string().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(12).max(500),
  image: z.string().url(),
});

export const heroBannerSchema = z.object({
  headline: z.string().min(2).max(80),
  subheadline: z.string().min(20).max(240),
  image: z.string().url(),
  ctaLabel: z.string().min(2).max(40),
  ctaHref: z.string().min(1).max(120),
});
