import { Camera, Gift, MessageCircle, Ruler, ShoppingBag } from "lucide-react";
import type { CatalogItem } from "@/components/catalog/catalog-shared";
import { formatCatalogPrice } from "@/components/catalog/catalog-shared";
import { brand } from "@/lib/constants";

export function CatalogPageView({ items }: { items: CatalogItem[] }) {
  return (
    <div className="min-h-screen bg-[#F1EFEA] py-0 text-[#222222] md:py-8">
      <section
        id="catalog-sheet"
        className="mx-auto w-full max-w-[1080px] overflow-hidden bg-[#F8F7F3] shadow-2xl shadow-black/10 md:rounded-sm"
      >
        <CatalogHero />

        <div className="px-5 py-7 md:px-11">
          <div className="mx-auto max-w-2xl text-center mb-5">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Step into elegance, every day.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#222222]/80 md:text-lg">
              Koleksi sepatu wanita Ziona dirancang untuk menemani setiap langkah Anda
              dengan perpaduan sempurna antara gaya dan kenyamanan.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="w-60 h-0.5 bg-[#5D5E4D]"></span>
              <div className="w-max text-2xl leading-none text-[#5D5E4D]">✤</div>
              <span className="w-60 h-0.5 bg-[#5D5E4D]"></span>
            </div>
          </div>

          {items.length ? (
            <div className="mt-3 flex flex-wrap justify-center gap-4 md:gap-5">
              {items.map((item) => (
                <CatalogProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-[#DDD7CA] bg-white/75 p-8 text-center text-sm text-[#5D5E4D]">
              Produk belum tersedia untuk katalog.
            </div>
          )}

          <InfoPanel />
          <CatalogFooter />
        </div>
      </section>
    </div>
  );
}

function CatalogHero() {
  return (
    <header className="flex items-center justify-between bg-[#5D5E4D] px-7 py-8 text-[#F1EFEA] md:px-16 md:py-10">
      <div>
        <img className="h-24" src="https://lh3.googleusercontent.com/d/1Xx8N6aAeb83eUQcI29ZgIhGJ6a8MayBX" alt="" />
        <div className="mt-1 text-xl tracking-wide text-[#F1EFEA]/90 md:text-xl uppercase">
          style meets comfort
        </div>
      </div>
      <div className="text-right">
        <div className="text-4xl leading-none md:text-5xl">Catalog</div>
        <div className="mt-3 text-base font-medium text-[#F1EFEA]/90 md:text-2xl">
          #BanggaProdukIndonesia
        </div>
      </div>
    </header>
  );
}

function CatalogProductCard({ item }: { item: CatalogItem }) {
  return (
    <article className="relative flex w-full max-w-[305px] flex-col rounded-2xl border border-[#DDD7CA] bg-white/72 p-4 shadow-[0_2px_12px_rgba(34,34,34,0.04)]">
      <span className="absolute left-4 top-4 z-10 rounded-md bg-[#5D5E4D] px-2 py-1 font-mono text-lg font-bold leading-none text-white shadow-md">
        {item.number}
      </span>

      <div className="flex h-[220px] items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="max-h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="mt-2 flex flex-1 flex-col">
        <h2 className="text-xl font-bold tracking-wide">{item.title}</h2>
        <div className="mt-3 border-t border-[#DDD7CA] pt-3">
          <div className="flex items-center gap-5 text-base">
            {item.basePrice > item.price ? (
              <span className="font-medium text-[#222222]/65 line-through">
                {formatCatalogPrice(item.basePrice)}
              </span>
            ) : null}
            <span className="font-bold">{formatCatalogPrice(item.price)}</span>
          </div>
          <p className="mt-3 min-h-[54px] text-sm font-medium leading-6 text-[#222222]/78">
            {item.description}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-bold text-[#222222]/75">
          <span
            className="h-4 w-4 rounded-full border border-black/10"
            style={{ backgroundColor: item.colorHex }}
          />
          {item.colorLabel}
        </div>
      </div>
    </article>
  );
}

function InfoPanel() {
  return (
    <section className="mt-5 rounded-xl border border-[#DDD7CA] bg-white/55 p-6 md:p-7">
      <div className="grid gap-7 md:grid-cols-2 md:divide-x md:divide-[#DDD7CA]">
        <div className="flex gap-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#5D5E4D] text-[#F1EFEA]">
            <Ruler size={34} />
          </span>
          <div>
            <h2 className="text-xl font-bold">TERSEDIA UKURAN</h2>
            <div className="mt-2 text-3xl font-semibold">36 - 41</div>
            <p className="mt-2 text-sm font-medium leading-5 text-[#222222]/75">
              (Mohon konfirmasi terlebih dahulu ketersediaan stok)
            </p>
          </div>
        </div>
        <div className="flex gap-5 md:pl-10">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#5D5E4D] text-[#F1EFEA]">
            <Gift size={34} />
          </span>
          <div>
            <h2 className="text-xl font-bold">CATATAN</h2>
            <ul className="mt-3 space-y-2 text-sm font-medium leading-5 text-[#222222]/80">
              <li>Harga belum termasuk biaya ongkir.</li>
              <li>Harga spesial untuk pembelian partai, hubungi WA untuk info selanjutnya.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CatalogFooter() {
  return (
    <footer className="mt-5 border-t border-[#DDD7CA] pt-5">
      <div className="grid gap-5 text-sm font-semibold leading-5 text-[#222222]/78 md:grid-cols-3 md:divide-x md:divide-[#DDD7CA]">
        <div className="flex items-center gap-4">
          <IconCircle>
            <MessageCircle size={33} />
          </IconCircle>
          <div>
            <div>Whatsapp :</div>
            <div>{brand.phone.replace(/\s/g, "")}</div>
            <div>(Whatsapp Text Only)</div>
          </div>
        </div>
        <div className="flex items-center gap-4 md:pl-8">
          <IconCircle>
            <Camera size={33} />
          </IconCircle>
          <div>
            <div>@ziona.collection</div>
            <div>#StyleMeetsComfort</div>
            <div>#BanggaProdukIndonesia</div>
          </div>
        </div>
        <div className="flex items-center gap-4 md:pl-8">
          <IconCircle>
            <ShoppingBag size={33} />
          </IconCircle>
          <div>Terima kasih telah memilih Ziona sebagai bagian dari gaya hidup Anda.</div>
        </div>
      </div>
    </footer>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5D5E4D] text-[#F1EFEA]">
      {children}
    </span>
  );
}
