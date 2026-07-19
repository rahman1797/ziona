import type { Product } from "@/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="rounded-lg border border-border bg-surface p-10 text-center text-muted">
        Tidak ada produk yang cocok dengan filter pilihanmu.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductLoadError({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-[#B8925A]/35 bg-[#F1EFEA] p-8 text-center text-[#5D5E4D]">
      <p className="font-semibold text-[#222222]">Produk belum bisa ditampilkan.</p>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}

export function ProductGridSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-white p-4 ring-2 ring-[#5D5E4D]/10"
        >
          <div className="aspect-[4/5] animate-pulse rounded-lg bg-secondary" />
          <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-secondary" />
          <div className="mt-4 border-t-2 border-[#5D5E4D]/10 pt-4">
            <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
            <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-secondary" />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="h-7 w-7 animate-pulse rounded-full bg-secondary" />
            <span className="h-7 w-7 animate-pulse rounded-full bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}
