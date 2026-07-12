import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import {
  categorySchema,
  heroBannerSchema,
  productSchema,
  testimonialSchema,
} from "@/lib/validators";
import {
  categories as fallbackCategories,
  heroBanner,
  products as fallbackProducts,
  testimonials as fallbackTestimonials,
} from "@/lib/seed-data";
import { getProductsJson } from "@/services/api";
import { mapProductsJson } from "@/services/product-mapper";
import type { Category, HeroBanner, Product, Testimonial } from "@/types";

function fromDoc<T>(snapshot: {
  id: string;
  data: () => Record<string, unknown>;
}) {
  return { id: snapshot.id, ...snapshot.data() } as T;
}

async function readCollection<T>(name: string) {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map((item) => fromDoc<T>(item));
}

export async function getProducts() {
  const sheetProducts = await getSheetProducts();
  if (sheetProducts) return sheetProducts;

  try {
    const snapshot = await getDocs(
      query(
        collection(db, "products"),
        orderBy("createdAt", "desc"),
        limit(100),
      ),
    );
    const data = snapshot.docs.map((item) => fromDoc<Product>(item));
    return data.length ? data : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

async function getSheetProducts() {
  try {
    const payload = await getProductsJson();
    if (!payload) return null;

    const products = mapProductsJson(payload);
    return products.length ? products : null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to read products from Google Sheets API.", error);
    }

    return null;
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategories() {
  try {
    const data = await readCollection<Category>("categories");
    return data.length ? data : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}

export async function getTestimonials() {
  try {
    const data = await readCollection<Testimonial>("testimonials");
    return data.length ? data : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getHeroBanner(): Promise<HeroBanner> {
  try {
    const data = await readCollection<HeroBanner>("banners");
    return data[0] ?? heroBanner;
  } catch {
    return heroBanner;
  }
}

export async function saveHeroBanner(banner: HeroBanner) {
  const parsed = heroBannerSchema.parse(banner);
  await setDoc(doc(db, "banners", "main"), parsed, { merge: true });
}

export async function saveProduct(product: Omit<Product, "id"> & Pick<Partial<Product>, "id">) {
  const parsed = productSchema.parse(product);

  if (product.id) {
    await setDoc(doc(db, "products", product.id), parsed, { merge: true });
    return product.id;
  }

  const created = await addDoc(collection(db, "products"), parsed);
  return created.id;
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, "products", id));
}

export async function saveCategory(
  category: Omit<Category, "id"> & Partial<Category>,
) {
  const parsed = categorySchema.parse(category);

  if (category.id) {
    await updateDoc(doc(db, "categories", category.id), parsed);
    return category.id;
  }

  const created = await addDoc(collection(db, "categories"), parsed);
  return created.id;
}

export async function deleteCategory(id: string) {
  await deleteDoc(doc(db, "categories", id));
}

export async function saveTestimonial(
  testimonial: Omit<Testimonial, "id"> & Partial<Testimonial>,
) {
  const parsed = testimonialSchema.parse(testimonial);

  if (testimonial.id) {
    await updateDoc(doc(db, "testimonials", testimonial.id), parsed);
    return testimonial.id;
  }

  const created = await addDoc(collection(db, "testimonials"), parsed);
  return created.id;
}

export async function deleteTestimonial(id: string) {
  await deleteDoc(doc(db, "testimonials", id));
}

export async function uploadCatalogImage(
  file: File,
  folder: "products" | "categories" | "hero",
) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const storageRef = ref(
    storage,
    `${folder}/${crypto.randomUUID()}-${safeName}`,
  );
  await uploadBytes(storageRef, file, {
    contentType: file.type,
    customMetadata: {
      uploadedBy: "ziona-admin",
    },
  });
  return getDownloadURL(storageRef);
}
