import { Reveal } from "@/components/ui/reveal";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeader } from "@/components/ui/section-header";
import type { Product } from "@/types";

export function FeaturedCollection({ products }: { products: Product[] }) {
  return (
    <section className="">
      <div className="page-center py-10 flex flex-col gap-6">
        <SectionHeader 
          title="Koleksi Kami" 
          description="Temukan model yang sesuai dengan kebutuhanmu" 
          align="center"
        />

        <Reveal>
          <ProductGrid products={products} />
        </Reveal>
      </div>
    </section>
  );
}
