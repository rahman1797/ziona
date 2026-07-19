import type { Category, HeroBanner, Testimonial } from "@/types";

export const heroBanner: HeroBanner = {
  headline: "Ziona",
  subheadline:
    "Sepatu wanita premium untuk elegansi yang tenang, nyaman dipakai harian, dan ritme kota Indonesia.",
  image:
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1600&q=85",
  ctaLabel: "Lihat Koleksi",
  ctaHref: "/products",
};

export const categories: Category[] = [
  {
    id: "cat-heels",
    name: "Heels",
    slug: "heels",
    image:
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cat-flats",
    name: "Flatshoes",
    slug: "flats",
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    customerName: "Alya Rahma",
    city: "Jakarta",
    rating: 5,
    review:
      "Aurora Slingback terlihat rapi tanpa membuat kaki sakit setelah rapat. Kemasannya juga terasa sangat premium.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t-2",
    customerName: "Nadia Putri",
    city: "Bandung",
    rating: 5,
    review:
      "Aku membeli Nara Loafer untuk kerja. Tampilannya mahal, ukurannya pas, dan cocok dengan banyak busana.",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "t-3",
    customerName: "Clara Santoso",
    city: "Surabaya",
    rating: 5,
    review:
      "Desainnya minimal, solnya nyaman, dan warnanya persis seperti foto. Jadi sering banget aku pakai.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
];
