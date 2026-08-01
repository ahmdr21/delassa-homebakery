import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/* =====================================================
   REVIEW TYPE
===================================================== */

export interface Review {
  id: string;
  product_title: string;
  reviewer_name: string;
  reviewer_username: string | null;
  review: string;
  rating: number;
  source: "website" | "instagram" | "whatsapp" | "direct";
  is_approved: boolean;
  created_at: string;
  updated_at?: string;
}

export type ReviewSource = Review["source"];

/* =====================================================
   GET SEMUA REVIEW YANG SUDAH DISETUJUI
===================================================== */

export async function getAllReviews(): Promise<Review[]> {
  if (!supabase) {
    console.warn("Supabase is not configured. Reviews will not be loaded.");
    return [];
  }
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get Reviews Error:", error);
    throw error;
  }

  return data ?? [];
}

/* =====================================================
   GET REVIEW BERDASARKAN PRODUK
===================================================== */

export async function getProductReviews(
  productTitle: string
): Promise<Review[]> {
  if (!supabase) {
    return [];
  }
  const cleanTitle = productTitle.trim();
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .ilike("product_title", cleanTitle)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get Product Reviews Error:", error);
    throw error;
  }

  return data ?? [];
}

/* =====================================================
   TAMBAH REVIEW
===================================================== */

export interface NewReview {
  product_title: string;
  reviewer_name: string;
  reviewer_username?: string;
  review: string;
  rating: number;
  source?: ReviewSource;
}

export async function addProductReview(review: NewReview): Promise<boolean> {
  if (!supabase) {
    console.warn("Supabase is not configured. Cannot add review.");
    return false;
  }
  const { error } = await supabase
    .from("product_reviews")
    .insert({
      product_title: review.product_title.trim(),
      reviewer_name: review.reviewer_name.trim(),
      reviewer_username: review.reviewer_username?.trim() || null,
      review: review.review.trim(),
      rating: review.rating,
      source: review.source ?? "website",
      is_approved: false,
    });

  if (error) {
    console.error("Insert Review Error:", error);
    throw error;
  }

  return true;
}

/* =====================================================
   ADMIN REVIEW MODERATION
===================================================== */

export type ProductReviewUpdate = Partial<
  Pick<
    Review,
    | "product_title"
    | "reviewer_name"
    | "reviewer_username"
    | "review"
    | "rating"
    | "source"
    | "is_approved"
  >
>;

export async function getAllReviewsForAdmin(): Promise<Review[]> {
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get Admin Reviews Error:", error);
    throw error;
  }

  return data ?? [];
}

export async function updateProductReview(
  id: string,
  updates: ProductReviewUpdate
): Promise<Review> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { data, error } = await supabase
    .from("product_reviews")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update Review Error:", error);
    throw error;
  }

  return data;
}

export async function deleteProductReview(id: string): Promise<void> {
  if (!supabase) {
    return;
  }
  const { error } = await supabase
    .from("product_reviews")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete Review Error:", error);
    throw error;
  }
}

/* =====================================================
   HITUNG RATING
===================================================== */

export async function getProductRating(productTitle: string) {
  const reviews = await getProductReviews(productTitle);

  if (!reviews.length) {
    return {
      average: 0,
      total: 0,
    };
  }

  const totalRating = reviews.reduce(
    (sum, item) => sum + item.rating,
    0
  );

  return {
    average: Number((totalRating / reviews.length).toFixed(2)),
    total: reviews.length,
  };
}

/* =====================================================
   CATEGORIES, PRODUCTS & BUNDLE PROMOS DATABASE OPERATIONS
   ===================================================== */

export interface DBCategory {
  id: string;
  name: string;
  description: string | null;
  order_index: number;
  created_at?: string;
}

export interface DBProduct {
  id: string;
  category_id: string;
  title: string;
  price: number;
  badge: string | null;
  description: string | null;
  image_url: string;
  images: string[];
  rating: number;
  sold_count: string;
  is_active: boolean;
  order_index: number;
  created_at?: string;
}

export interface DBBundlePromo {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  promo_prices: Record<string, number>;
  drink_upgrades: Record<string, number>;
  created_at?: string;
}

export interface DBPromo {
  id: string;
  title: string;
  promo_type: "diskon_langsung" | "beli1gratis1" | "bundle" | "hari_tertentu";
  discount_type: "nominal" | "persen" | null;
  discount_value: number;
  active_days: string[];
  badge_label: string | null;
  description: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
  priority: number;
  buy_quantity: number;
  free_quantity: number;
  free_product_id: string | null;
  created_at: string;
}

export interface DBPromoWithProducts extends DBPromo {
  product_ids: string[];
  // product_id -> harga promo (null = tidak ada override harga)
  product_prices: Record<string, number | null>;
}

// FETCH FUNCTIONS
export async function getCategories(): Promise<DBCategory[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Get Categories Error:", error);
    throw error;
  }
  return data ?? [];
}

export async function getProducts(onlyActive = true): Promise<DBProduct[]> {
  if (!supabase) return [];
  let query = supabase.from("products").select("*");
  if (onlyActive) {
    query = query.eq("is_active", true);
  }
  const { data, error } = await query.order("order_index", { ascending: true });

  if (error) {
    console.error("Get Products Error:", error);
    throw error;
  }
  return data ?? [];
}

export async function getBundlePromo(id = "brownies-drink-bundle"): Promise<DBBundlePromo | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("bundle_promos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Get Bundle Promo Error:", error);
    throw error;
  }
  return data;
}

// ADMIN CRUD FUNCTIONS
export async function createProduct(product: Omit<DBProduct, "id" | "created_at">): Promise<DBProduct> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("Create Product Error:", error);
    throw error;
  }
  return data;
}

export async function updateProduct(id: string, updates: Partial<DBProduct>): Promise<DBProduct> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update Product Error:", error);
    throw error;
  }
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete Product Error:", error);
    throw error;
  }
}

export async function updateBundlePromo(id: string, updates: Partial<DBBundlePromo>): Promise<DBBundlePromo> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("bundle_promos")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update Bundle Promo Error:", error);
    throw error;
  }
  return data;
}

export async function createBundlePromo(promo: Omit<DBBundlePromo, "created_at">): Promise<DBBundlePromo> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("bundle_promos")
    .insert(promo)
    .select()
    .single();

  if (error) {
    console.error("Create Bundle Promo Error:", error);
    throw error;
  }
  return data;
}

export async function deleteBundlePromo(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("bundle_promos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete Bundle Promo Error:", error);
    throw error;
  }
}

export async function getBundlePromos(): Promise<DBBundlePromo[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("bundle_promos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get Bundle Promos Error:", error);
    throw error;
  }
  return data ?? [];
}

export async function createCategory(category: DBCategory): Promise<DBCategory> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select()
    .single();

  if (error) {
    console.error("Create Category Error:", error);
    throw error;
  }
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete Category Error:", error);
    throw error;
  }
}


// IMAGE UPLOAD FUNCTION FOR STORAGE
export async function uploadProductImage(file: File, fileName: string): Promise<string> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const cleanFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const { data, error } = await supabase.storage
    .from("products")
    .upload(cleanFileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Upload Image Error:", error);
    throw error;
  }

  const { data: publicData } = supabase.storage
    .from("products")
    .getPublicUrl(data.path);

  return publicData.publicUrl;
}

/* =====================================================
   PROMOS (SISTEM PROMO DINAMIS)
   ===================================================== */

// Cek apakah promo aktif hari ini
function isPromoActiveToday(promo: DBPromo): boolean {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

  // Cek tanggal range
  if (todayStr < promo.start_date || todayStr > promo.end_date) return false;

  // Cek hari aktif (hari_tertentu)
  if (promo.promo_type === "hari_tertentu" && promo.active_days.length > 0 && !promo.active_days.includes("all")) {
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const todayName = dayNames[today.getDay()];
    return promo.active_days.includes(todayName);
  }

  return true;
}

// Helper: bangun relMap dan priceMap dari hasil query promo_products
function buildRelAndPriceMaps(relations: Array<{ promo_id: string; product_id: string; promo_price: number | null }>) {
  const relMap: Record<string, string[]> = {};
  const priceMap: Record<string, Record<string, number | null>> = {};
  (relations ?? []).forEach(({ promo_id, product_id, promo_price }) => {
    if (!relMap[promo_id]) relMap[promo_id] = [];
    relMap[promo_id].push(product_id);
    if (!priceMap[promo_id]) priceMap[promo_id] = {};
    priceMap[promo_id][product_id] = promo_price ?? null;
  });
  return { relMap, priceMap };
}

// Ambil semua promo yang aktif hari ini + product_ids + product_prices
export async function getActivePromos(): Promise<DBPromoWithProducts[]> {
  if (!supabase) return [];

  const today = new Date().toISOString().split("T")[0];
  const { data: promos, error } = await supabase
    .from("promos")
    .select("*")
    .eq("is_active", true)
    .lte("start_date", today)
    .gte("end_date", today)
    .order("priority", { ascending: false });

  if (error) { console.error("Get Active Promos Error:", error); return []; }
  if (!promos || promos.length === 0) return [];

  const { data: relations } = await supabase
    .from("promo_products")
    .select("promo_id, product_id, promo_price")
    .in("promo_id", promos.map((p) => p.id));

  const { relMap, priceMap } = buildRelAndPriceMaps(
    (relations ?? []) as Array<{ promo_id: string; product_id: string; promo_price: number | null }>
  );

  return promos
    .filter((p) => isPromoActiveToday(p as DBPromo))
    .map((p) => ({
      ...(p as DBPromo),
      product_ids: relMap[p.id] ?? [],
      product_prices: priceMap[p.id] ?? {},
    }));
}

// Ambil semua promo (untuk admin, termasuk yang nonaktif)
export async function getAllPromosAdmin(): Promise<DBPromoWithProducts[]> {
  if (!supabase) return [];

  const { data: promos, error } = await supabase
    .from("promos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) { console.error("Get All Promos Error:", error); throw error; }
  if (!promos || promos.length === 0) return [];

  const { data: relations } = await supabase
    .from("promo_products")
    .select("promo_id, product_id, promo_price")
    .in("promo_id", promos.map((p) => p.id));

  const { relMap, priceMap } = buildRelAndPriceMaps(
    (relations ?? []) as Array<{ promo_id: string; product_id: string; promo_price: number | null }>
  );

  return promos.map((p) => ({
    ...(p as DBPromo),
    product_ids: relMap[p.id] ?? [],
    product_prices: priceMap[p.id] ?? {},
  }));
}

// Buat promo baru + relasi produk dengan harga promo per produk
export async function createPromo(
  promo: Omit<DBPromo, "id" | "created_at">,
  productPrices: Record<string, number | null>   // product_id -> promo_price
): Promise<DBPromoWithProducts> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.from("promos").insert(promo).select().single();
  if (error) { console.error("Create Promo Error:", error); throw error; }

  const productIds = Object.keys(productPrices);
  if (productIds.length > 0) {
    const relations = productIds.map((pid) => ({
      promo_id: data.id,
      product_id: pid,
      promo_price: productPrices[pid] ?? null,
    }));
    const { error: relError } = await supabase.from("promo_products").insert(relations);
    if (relError) console.error("Link Promo Products Error:", relError);
  }

  return { ...(data as DBPromo), product_ids: productIds, product_prices: productPrices };
}

// Update promo + update relasi produk dengan harga promo per produk
export async function updatePromo(
  id: string,
  updates: Partial<Omit<DBPromo, "id" | "created_at">>,
  productPrices: Record<string, number | null>   // product_id -> promo_price
): Promise<DBPromoWithProducts> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase.from("promos").update(updates).eq("id", id).select().single();
  if (error) { console.error("Update Promo Error:", error); throw error; }

  // Hapus relasi lama, insert relasi baru dengan harga promo
  await supabase.from("promo_products").delete().eq("promo_id", id);
  const productIds = Object.keys(productPrices);
  if (productIds.length > 0) {
    const relations = productIds.map((pid) => ({
      promo_id: id,
      product_id: pid,
      promo_price: productPrices[pid] ?? null,
    }));
    await supabase.from("promo_products").insert(relations);
  }

  return { ...(data as DBPromo), product_ids: productIds, product_prices: productPrices };
}

// Hapus promo (cascade ke promo_products)
export async function deletePromo(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("promos").delete().eq("id", id);
  if (error) { console.error("Delete Promo Error:", error); throw error; }
}

/* =====================================================
   ORDER LOG TYPES & OPERATIONS
===================================================== */
export interface DBOrderItem {
  title: string;
  qty: number;
  price: number;
}

export interface DBOrderLog {
  id: string;
  customer_name: string;
  phone: string | null;
  pickup_date: string | null;
  items: DBOrderItem[];
  total_amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string | null;
  created_at: string;
  ongkir?: number;
}

// Log order baru ke database saat checkout
export async function logOrder(order: Omit<DBOrderLog, "id" | "created_at">): Promise<void> {
  if (!supabase) {
    console.warn("Supabase is not configured. Order logging skipped.");
    return;
  }
  const { error } = await supabase.from("order_logs").insert({
    customer_name: order.customer_name,
    phone: order.phone,
    pickup_date: order.pickup_date,
    items: order.items,
    total_amount: order.total_amount,
    status: order.status,
    notes: order.notes,
    ongkir: order.ongkir || 0,
  });

  if (error) {
    console.error("Log Order Error:", error);
    throw error;
  }
}

// Mengambil seluruh data log order (untuk admin)
export async function getOrderLogs(): Promise<DBOrderLog[]> {
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from("order_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get Order Logs Error:", error);
    throw error;
  }

  return data ?? [];
}

// Update data log order secara fleksibel (oleh admin)
export async function updateOrderLog(
  id: string,
  updates: Partial<Omit<DBOrderLog, "id" | "created_at">>
): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("order_logs")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Update Order Log Error:", error);
    throw error;
  }
}

// Hapus log order (oleh admin)
export async function deleteOrderLog(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("order_logs")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete Order Log Error:", error);
    throw error;
  }
}

// Ambil log order berdasarkan ID (untuk struk digital publik)
export async function getOrderLogById(id: string): Promise<DBOrderLog | null> {
  if (!supabase) {
    console.warn("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase
    .from("order_logs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Get Order Log By ID Error:", error);
    throw error;
  }

  return data as DBOrderLog | null;
}

// Encode order log to a URL-safe base64 string
export function encodeOrderToUrl(order: DBOrderLog): string {
  try {
    const shortOrder = {
      id: order.id,
      n: order.customer_name,
      p: order.phone,
      d: order.pickup_date,
      i: (order.items || []).map(item => ({
        t: item.title,
        q: item.qty,
        p: item.price
      })),
      o: order.ongkir || 0,
      no: order.notes,
      s: order.status
    };
    const jsonStr = JSON.stringify(shortOrder);
    const bytes = new TextEncoder().encode(jsonStr);
    let binString = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binString);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (err) {
    console.error("Encode Order Error:", err);
    return "";
  }
}

// Decode URL-safe base64 string back to DBOrderLog
export function decodeOrderFromUrl(base64Str: string): DBOrderLog | null {
  try {
    let base64 = base64Str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const binString = atob(base64);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    const shortOrder = JSON.parse(jsonStr);
    
    return {
      id: shortOrder.id || "temp",
      customer_name: shortOrder.n || "",
      phone: shortOrder.p || null,
      pickup_date: shortOrder.d || null,
      items: (shortOrder.i || []).map((item: any) => ({
        title: item.t || "",
        qty: item.q || 0,
        price: item.p || 0
      })),
      ongkir: shortOrder.o || 0,
      total_amount: (shortOrder.i || []).reduce((sum: number, item: any) => sum + (item.p * item.q), 0) + (shortOrder.o || 0),
      status: shortOrder.s || "completed",
      notes: shortOrder.no || null,
      created_at: new Date().toISOString()
    };
  } catch (err) {
    console.error("Decode Order Error:", err);
    return null;
  }
}