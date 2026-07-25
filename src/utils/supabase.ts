import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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