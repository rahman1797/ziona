"use client";

import { ImageUp, Loader2, LogOut, Save, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input, Label, Select, Textarea } from "@/components/ui/field";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { heroBanner as fallbackHero } from "@/lib/seed-data";
import {
  deleteCategory,
  deleteProduct,
  deleteTestimonial,
  getCategories,
  getHeroBanner,
  getProducts,
  getTestimonials,
  saveCategory,
  saveHeroBanner,
  saveProduct,
  saveTestimonial,
  uploadCatalogImage,
} from "@/services/firestore";
import type { Category, HeroBanner, Product, ProductCategory, Testimonial } from "@/types";
import { formatCategory, formatPrice } from "@/utils/format";

const categoryOptions: ProductCategory[] = [
  "heels",
  "flats",
  "sandals",
  "loafers",
  "sneakers",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function csv(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminDashboard() {
  const { user, loading, login, logout } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [hero, setHero] = useState<HeroBanner>(fallbackHero);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadAdminData() {
    const [nextProducts, nextCategories, nextTestimonials, nextHero] = await Promise.all([
      getProducts(),
      getCategories(),
      getTestimonials(),
      getHeroBanner(),
    ]);
    return { nextProducts, nextCategories, nextTestimonials, nextHero };
  }

  async function refresh() {
    const { nextProducts, nextCategories, nextTestimonials, nextHero } =
      await loadAdminData();
    setProducts(nextProducts);
    setCategories(nextCategories);
    setTestimonials(nextTestimonials);
    setHero(nextHero);
  }

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (!user) return;
      const { nextProducts, nextCategories, nextTestimonials, nextHero } =
        await loadAdminData();
      if (cancelled) return;
      setProducts(nextProducts);
      setCategories(nextCategories);
      setTestimonials(nextTestimonials);
      setHero(nextHero);
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setStatus("");
    try {
      await login(String(form.get("email")), String(form.get("password")));
      setStatus("Berhasil masuk.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal masuk.");
    } finally {
      setBusy(false);
    }
  }

  async function handleProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name"));
    const images = csv(form.get("images"));
    setBusy(true);
    try {
      await saveProduct({
        slug: slugify(String(form.get("slug")) || name),
        name,
        description: String(form.get("description")),
        category: String(form.get("category")) as ProductCategory,
        basePrice: Number(form.get("basePrice")),
        price: Number(form.get("price")),
        colors: csv(form.get("colors")) as Product["colors"],
        sizes: csv(form.get("sizes")) as Product["sizes"],
        images,
        stock: Number(form.get("stock")),
      });
      event.currentTarget.reset();
      await refresh();
      setStatus("Produk tersimpan.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal menyimpan produk.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      await saveCategory({
        name: String(form.get("name")),
        slug: String(form.get("slug")) as ProductCategory,
        image: String(form.get("image")),
      });
      event.currentTarget.reset();
      await refresh();
      setStatus("Kategori tersimpan.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal menyimpan kategori.");
    } finally {
      setBusy(false);
    }
  }

  async function handleTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      await saveTestimonial({
        customerName: String(form.get("customerName")),
        city: String(form.get("city")),
        rating: Number(form.get("rating")),
        review: String(form.get("review")),
        image: String(form.get("image")),
      });
      event.currentTarget.reset();
      await refresh();
      setStatus("Testimoni tersimpan.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal menyimpan testimoni.");
    } finally {
      setBusy(false);
    }
  }

  async function handleHero(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      await saveHeroBanner({
        headline: String(form.get("headline")),
        subheadline: String(form.get("subheadline")),
        image: String(form.get("image")),
        ctaLabel: String(form.get("ctaLabel")),
        ctaHref: String(form.get("ctaHref")),
      });
      await refresh();
      setStatus("Banner hero tersimpan.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal menyimpan banner hero.");
    } finally {
      setBusy(false);
    }
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>, folder: "products" | "categories" | "hero") {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadCatalogImage(file, folder);
      await navigator.clipboard.writeText(url);
      setStatus("Gambar terunggah. URL sudah disalin ke clipboard.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal mengunggah gambar.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  if (loading) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-secondary">
        <Loader2 className="animate-spin text-primary" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-secondary py-16">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-lg bg-surface p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Admin
          </p>
          <h1 className="mt-3 font-serif text-4xl">Masuk</h1>
          <div className="mt-8 grid gap-4">
            <Label>
              Email
              <Input name="email" type="email" required autoComplete="email" />
            </Label>
            <Label>
              Kata sandi
              <Input name="password" type="password" required autoComplete="current-password" />
            </Label>
            <Button disabled={busy}>{busy ? "Masuk..." : "Masuk"}</Button>
          </div>
          {status ? <p className="mt-4 text-sm text-danger">{status}</p> : null}
        </form>
      </section>
    );
  }

  return (
    <section className="bg-background py-10">
      <Container>
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Admin
            </p>
            <h1 className="mt-2 font-serif text-4xl">Manajemen Katalog</h1>
            <p className="mt-2 text-sm text-muted">
              {products.length} produk, {categories.length} kategori
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut size={17} /> Keluar
          </Button>
        </div>

        {status ? (
          <div className="mt-6 rounded-md border border-border bg-surface p-4 text-sm text-muted">
            {status}
          </div>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={handleProduct} className="rounded-lg bg-surface p-5">
            <h2 className="font-serif text-3xl">Produk</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Label>
                Nama
                <Input name="name" required />
              </Label>
              <Label>
                Slug
                <Input name="slug" placeholder="otomatis-dari-nama" />
              </Label>
              <Label>
                Kategori
                <Select name="category" required>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {formatCategory(category)}
                    </option>
                  ))}
                </Select>
              </Label>
              <Label>
                Harga Dasar
                <Input name="basePrice" type="number" min="1" required />
              </Label>
              <Label>
                Harga
                <Input name="price" type="number" min="1" required />
              </Label>
              <Label>
                Stok
                <Input name="stock" type="number" min="0" required />
              </Label>
              <Label className="md:col-span-2">
                Deskripsi
                <Textarea name="description" required />
              </Label>
              <Label>
                Warna
                <Input name="colors" placeholder="Black, Ivory" required />
              </Label>
              <Label>
                Ukuran
                <Input name="sizes" placeholder="36, 37, 38" />
              </Label>
              <Label className="md:col-span-2">
                URL Gambar
                <Input name="images" placeholder="Pisahkan beberapa URL gambar dengan koma" required />
              </Label>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button disabled={busy}>
                <Save size={17} /> Simpan produk
              </Button>
              <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold">
                <ImageUp size={17} /> Unggah gambar
                <input
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleUpload(event, "products")}
                />
              </label>
            </div>
          </form>

          <div className="grid gap-8">
            <form onSubmit={handleHero} className="rounded-lg bg-surface p-5">
              <h2 className="font-serif text-3xl">Banner Hero</h2>
              <div className="mt-5 grid gap-4">
                <Label>
                  Judul utama
                  <Input name="headline" defaultValue={hero.headline} required />
                </Label>
                <Label>
                  Deskripsi hero
                  <Textarea name="subheadline" defaultValue={hero.subheadline} required />
                </Label>
                <Label>
                  URL Gambar
                  <Input name="image" type="url" defaultValue={hero.image} required />
                </Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <Label>
                    Teks CTA
                    <Input name="ctaLabel" defaultValue={hero.ctaLabel} required />
                  </Label>
                  <Label>
                    Href CTA
                    <Input name="ctaHref" defaultValue={hero.ctaHref} required />
                  </Label>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button disabled={busy}>
                  <Save size={17} /> Simpan hero
                </Button>
                <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold">
                  <ImageUp size={17} /> Unggah hero
                  <input
                    className="sr-only"
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleUpload(event, "hero")}
                  />
                </label>
              </div>
            </form>

            <form onSubmit={handleCategory} className="rounded-lg bg-surface p-5">
              <h2 className="font-serif text-3xl">Kategori</h2>
              <div className="mt-5 grid gap-4">
                <Label>
                  Nama
                  <Input name="name" required />
                </Label>
                <Label>
                  Slug
                  <Select name="slug" required>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {formatCategory(category)}
                      </option>
                    ))}
                  </Select>
                </Label>
                <Label>
                  URL Gambar
                  <Input name="image" type="url" required />
                </Label>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button disabled={busy}>Simpan kategori</Button>
                <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold">
                  <ImageUp size={17} /> Unggah kategori
                  <input
                    className="sr-only"
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleUpload(event, "categories")}
                  />
                </label>
              </div>
            </form>

            <form onSubmit={handleTestimonial} className="rounded-lg bg-surface p-5">
              <h2 className="font-serif text-3xl">Testimoni</h2>
              <div className="mt-5 grid gap-4">
                <Label>
                  Pelanggan
                  <Input name="customerName" required />
                </Label>
                <Label>
                  Kota
                  <Input name="city" required />
                </Label>
                <Label>
                  Penilaian
                  <Input name="rating" type="number" min="1" max="5" defaultValue="5" required />
                </Label>
                <Label>
                  Ulasan
                  <Textarea name="review" required />
                </Label>
                <Label>
                  URL Gambar
                  <Input name="image" type="url" required />
                </Label>
              </div>
              <Button className="mt-5" disabled={busy}>
                Simpan testimoni
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <AdminList
            title="Produk"
            items={products.map((product) => ({
              id: product.id,
              title: product.name,
              meta: `${formatCategory(product.category)} - ${formatPrice(product.price)}`,
            }))}
            onDelete={async (id) => {
              await deleteProduct(id);
              await refresh();
            }}
          />
          <AdminList
            title="Kategori"
            items={categories.map((category) => ({
              id: category.id,
              title: category.name,
              meta: formatCategory(category.slug),
            }))}
            onDelete={async (id) => {
              await deleteCategory(id);
              await refresh();
            }}
          />
          <AdminList
            title="Testimoni"
            items={testimonials.map((testimonial) => ({
              id: testimonial.id,
              title: testimonial.customerName,
              meta: testimonial.city,
            }))}
            onDelete={async (id) => {
              await deleteTestimonial(id);
              await refresh();
            }}
          />
        </div>
      </Container>
    </section>
  );
}

function AdminList({
  title,
  items,
  onDelete,
}: {
  title: string;
  items: { id: string; title: string; meta: string }[];
  onDelete: (id: string) => Promise<void>;
}) {
  return (
    <section className="rounded-lg bg-surface p-5">
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="truncate text-xs text-muted">{item.meta}</p>
            </div>
            <Button
              variant="ghost"
              className="h-9 w-9 shrink-0 px-0 text-danger"
              onClick={() => void onDelete(item.id)}
              aria-label={`Hapus ${item.title}`}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
