import { Reveal } from "@/components/ui/reveal";
import { ProductGrid } from "@/components/product/product-grid";
import type { Product } from "@/types";

export function FeaturedCollection({ products }: { products: Product[] }) {
  return (
    <section className="">
      <div className="page-center py-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-[#5D5E4D] font-bold uppercase">Koleksi Kami</h2>
          <p className="text-[#5D5E4D]">Temukan model yang sesuai dengan kebutuhanmu</p>
        </div>
        
        <Reveal>
          <ProductGrid products={products} />
        </Reveal>
      </div>
    </section>
  );
}
