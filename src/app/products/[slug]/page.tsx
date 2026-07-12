import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Heart, Package } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { brand } from "@/lib/constants";
import { getProductBySlug, getProducts } from "@/services/catalog";
import { formatCategory, formatColor, formatPrice } from "@/utils/format";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
    };
  }

  const previousImages = (await parent).openGraph?.images ?? [];
  const image = product.images[0] ?? "";

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Ziona`,
      description: product.description,
      url: `${brand.url}/products/${product.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 1500,
          alt: product.name,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Ziona`,
      description: product.description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([getProductBySlug(slug), getProducts()]);

  if (!product) notFound();

  const related = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
  const price = product.price;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${brand.url}/products/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-background py-10 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <ProductGallery images={product.images} name={product.name} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {formatCategory(product.category)}
            </p>
            <h1 className="mt-4 text-5xl leading-tight text-foreground">
              {product.name}
            </h1>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-2xl font-semibold">{formatPrice(price)}</span>
            </div>
            <p className="mt-6 text-base leading-8 text-muted">{product.description}</p>

            <div className="mt-8 grid gap-6 border-y border-border py-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Warna
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-border px-3 py-1 text-sm"
                    >
                      {formatColor(color)}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Ukuran
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-muted">
              <p className="flex gap-3">
                <Package size={18} className="text-primary" /> Stok: {product.stock} pasang
              </p>
              <p className="flex gap-3">
                <Heart size={18} className="text-primary" /> Nyaman untuk dipakai harian
              </p>
            </div>

            <LinkButton href={brand.whatsapp} className="mt-8 w-full">
              Tanya via WhatsApp
            </LinkButton>
          </div>
        </Container>
      </section>
      {related.length ? (
        <section className="bg-secondary py-16">
          <Container>
            <SectionHeader
              eyebrow="Terkait"
              title="Pilihan lain di kategori ini"
              description="Siluet serupa dari koleksi Ziona saat ini."
            />
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
