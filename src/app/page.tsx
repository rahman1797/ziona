import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/product/product-grid";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedCollection } from "@/components/sections/featured-collection";
import { HeroSection } from "@/components/sections/hero-section";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { brand } from "@/lib/constants";
import {
  getCategories,
  getHeroBanner,
  getProducts,
  getTestimonials,
} from "@/services/firestore";

export const revalidate = 300;

export default async function Home() {
  const [banner, categories, testimonials] = await Promise.all([
    getHeroBanner(),
    getCategories(),
    getTestimonials(),
  ]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ShoeStore",
    name: brand.name,
    url: brand.url,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Jakarta",
    },
    sameAs: [brand.instagram],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection banner={banner} />
      <Suspense fallback={<HomeProductsSkeleton />}>
        <HomeProducts />
      </Suspense>
      {/* <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <FaqSection /> */}
    </>
  );
}

async function HomeProducts() {
  const products = await getProducts();

  return <FeaturedCollection products={products} />;
}

function HomeProductsSkeleton() {
  return (
    <section>
      <div className="page-center flex flex-col gap-6 py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="h-5 w-32 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-72 max-w-full animate-pulse rounded bg-secondary" />
        </div>
        <ProductGridSkeleton />
      </div>
    </section>
  );
}
