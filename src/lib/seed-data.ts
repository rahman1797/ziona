import type { Category, HeroBanner, Product, Testimonial } from "@/types";

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

type SeedProduct = Omit<Product, "basePrice"> & {
  discountPrice?: number;
  thumbnail?: string;
  featured?: boolean;
  newArrival?: boolean;
  material?: string;
  specifications?: string[];
  createdAt?: string;
  updatedAt?: string;
};

const seedProducts: SeedProduct[] = [
  {
    id: "p-aurora-slingback",
    slug: "aurora-slingback",
    name: "Aurora Slingback",
    description:
      "Slingback berujung lembut dengan hak seimbang 5 cm, dibuat untuk jam kantor, agenda makan malam, dan semua langkah di antaranya.",
    category: "heels",
    price: 729000,
    discountPrice: 649000,
    colors: ["Ivory", "Sage", "Black"],
    sizes: ["36", "37", "38", "39", "40"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    stock: 24,
    featured: true,
    newArrival: true,
    material: "Bagian atas kulit vegan premium, lapisan microsuede berbantalan",
    specifications: ["Hak terbentuk 5 cm", "Sol dalam empuk", "Sol luar anti selip"],
    createdAt: "2026-06-22T08:00:00.000Z",
    updatedAt: "2026-06-22T08:00:00.000Z",
  },
  {
    id: "p-sera-ballet-flat",
    slug: "sera-ballet-flat",
    name: "Sera Ballet Flat",
    description:
      "Ballet flat yang rapi dengan sol fleksibel dan detail pita kotak yang halus untuk tampilan harian yang tertata.",
    category: "flats",
    price: 549000,
    colors: ["Taupe", "Black", "Gold"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=85",
    stock: 39,
    featured: true,
    newArrival: false,
    material: "Kulit vegan bertekstur, lapisan tekstil yang sejuk",
    specifications: ["Hak 1 cm", "Sol fleksibel", "Penopang tumit lembut"],
    createdAt: "2026-05-30T08:00:00.000Z",
    updatedAt: "2026-06-10T08:00:00.000Z",
  },
  {
    id: "p-luna-strappy-sandal",
    slug: "luna-strappy-sandal",
    name: "Luna Strappy Sandal",
    description:
      "Sandal bertali yang bersih dengan gesper pergelangan yang aman dan alas kaki empuk untuk sore Jakarta yang hangat.",
    category: "sandals",
    price: 579000,
    colors: ["Ivory", "Espresso", "Gold"],
    sizes: ["36", "37", "38", "39", "40"],
    images: [
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=85",
    stock: 31,
    featured: false,
    newArrival: true,
    material: "Tali kulit vegan halus, alas kaki sintetis berbantalan",
    specifications: ["Hak bertumpuk 2 cm", "Gesper dapat disesuaikan", "Sol luar karet"],
    createdAt: "2026-06-14T08:00:00.000Z",
    updatedAt: "2026-06-14T08:00:00.000Z",
  },
  {
    id: "p-nara-penny-loafer",
    slug: "nara-penny-loafer",
    name: "Nara Penny Loafer",
    description:
      "Loafer terstruktur dengan topline lembut dan bantalan ringan untuk gaya kerja harian.",
    category: "loafers",
    price: 689000,
    colors: ["Black", "Espresso", "Taupe"],
    sizes: ["37", "38", "39", "40", "41"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=85",
    stock: 18,
    featured: true,
    newArrival: true,
    material: "Kulit vegan mengilap, sol dalam memory foam",
    specifications: ["Sol 2,5 cm", "Jahitan apron", "Model slip-on"],
    createdAt: "2026-06-20T08:00:00.000Z",
    updatedAt: "2026-06-20T08:00:00.000Z",
  },
  {
    id: "p-iris-knit-sneaker",
    slug: "iris-knit-sneaker",
    name: "Iris Knit Sneaker",
    description:
      "Sneaker knit yang sejuk dengan panel tonal rapi dan sol ringan untuk bergerak sepanjang hari.",
    category: "sneakers",
    price: 759000,
    colors: ["Ivory", "Sage", "Taupe"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=85",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    stock: 42,
    featured: false,
    newArrival: true,
    material: "Bagian atas knit daur ulang, sol luar EVA ringan",
    specifications: ["Sol dalam dapat dilepas", "Collar berbantalan", "Model bertali"],
    createdAt: "2026-06-18T08:00:00.000Z",
    updatedAt: "2026-06-18T08:00:00.000Z",
  },
  {
    id: "p-elara-mule",
    slug: "elara-mule",
    name: "Elara Mule",
    description:
      "Mule minimalis dengan hak rendah arsitektural dan ujung kotak lembut untuk gaya yang terasa mudah.",
    category: "heels",
    price: 619000,
    colors: ["Taupe", "Black", "Ivory"],
    sizes: ["36", "37", "38", "39", "40"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1200&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=900&q=85",
    stock: 16,
    featured: false,
    newArrival: false,
    material: "Kulit vegan halus, lapisan sintetis berbantalan",
    specifications: ["Hak 4 cm", "Mudah dipakai", "Ujung kotak"],
    createdAt: "2026-05-11T08:00:00.000Z",
    updatedAt: "2026-05-11T08:00:00.000Z",
  },
  {
    id: "p-mira-slide",
    slug: "mira-slide",
    name: "Mira Slide",
    description:
      "Flat slide yang anggun dengan tali terbentuk dan alas kaki lembut untuk liburan santai dan akhir pekan.",
    category: "sandals",
    price: 459000,
    discountPrice: 399000,
    colors: ["Gold", "Ivory", "Espresso"],
    sizes: ["36", "37", "38", "39", "40"],
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=1200&q=85",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85",
    stock: 28,
    featured: true,
    newArrival: false,
    material: "Bagian atas kulit vegan lembut, alas kaki molded yang nyaman",
    specifications: ["Profil flat", "Ujung terbuka", "Sol luar ringan"],
    createdAt: "2026-04-28T08:00:00.000Z",
    updatedAt: "2026-05-15T08:00:00.000Z",
  },
  {
    id: "p-kaia-mary-jane",
    slug: "kaia-mary-jane",
    name: "Kaia Mary Jane",
    description:
      "Mary Jane modern dengan strap ramping, hak rendah, dan kilau halus untuk gaya feminin harian.",
    category: "flats",
    price: 589000,
    colors: ["Black", "Ivory", "Sage"],
    sizes: ["36", "37", "38", "39", "40"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=1200&q=85",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85",
    stock: 22,
    featured: false,
    newArrival: true,
    material: "Kulit vegan patent, lapisan berbantalan",
    specifications: ["Hak 1,5 cm", "Tali dapat disesuaikan", "Ujung kotak membulat"],
    createdAt: "2026-06-08T08:00:00.000Z",
    updatedAt: "2026-06-08T08:00:00.000Z",
  },
];

export const products: Product[] = seedProducts.map((product) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  description: product.description,
  category: product.category,
  basePrice: product.price,
  price: product.discountPrice ?? product.price,
  colors: product.colors,
  sizes: product.sizes,
  images: product.images,
  stock: product.stock,
}));

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
