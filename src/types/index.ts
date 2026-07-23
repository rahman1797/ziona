export type ProductCategory =
  "heels" | "flats" | "sandals" | "loafers" | "sneakers";

export type ProductColor = string;

export type ProductSize = string;

export type ProductVariant = {
  color: ProductColor;
  colorHex?: string;
  image: string;
  images: string[];
  sizes: ProductSize[];
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  basePrice: number;
  price: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  variants?: ProductVariant[];
  freeInsole?: string;
  stock: number;
};

export type Category = {
  id: string;
  name: string;
  slug: ProductCategory;
  image: string;
};

export type Testimonial = {
  id: string;
  customerName: string;
  city: string;
  rating: number;
  review: string;
  image: string;
};

export type HeroBanner = {
  headline: string;
  subheadline: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

export type CatalogFilters = {
  category?: string;
  color?: string;
  min?: number;
  max?: number;
  sort?: string;
  page?: number;
};
