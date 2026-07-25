import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../utils/auth";
import { useEffect, useMemo, useState } from "react";
import {
  getAllReviewsForAdmin,
  updateProductReview,
  deleteProductReview,
} from "../utils/supabase";
import type {
  ProductReviewUpdate,
  Review,
  ReviewSource,
} from "../utils/supabase";

const productsList = [
  "Umum / Bakery",
  "Brownies Classic",
  "Brownies Almond",
  "Brownies Cookies",
  "Brownies Mix Topping",
  "Bolu Pandan",
  "Bolu Pandan Keju",
  "Bolu Keju",
  "Choco Bliss",
  "Mocha Bliss",
  "Butterscotch Bliss",
  "Kopi Susu Gula Aren",
  "Roasted Milk Tea",
];

const sources: ReviewSource[] = ["website", "instagram", "whatsapp", "direct"];
type ReviewFilter = "all" | "pending" | "approved";

const emptyReview: Review = {
  id: "",
  product_title: "Umum / Bakery",
  reviewer_name: "",
  reviewer_username: "",
  review: "",
  rating: 5,
  source: "website",
  is_approved: false,
  created_at: "",
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review>(emptyReview);
  const [filter, setFilter] = useState<ReviewFilter>("pending");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const loadReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllReviewsForAdmin();
      setReviews(data);
      setSelectedReview((current) => {
        if (current.id && data.some((review) => review.id === current.id)) {
          return data.find((review) => review.id === current.id) ?? data[0] ?? emptyReview;
        }

        return data[0] ?? emptyReview;
      });
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data review. Pastikan policy Supabase admin sudah mengizinkan read.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  let isCurrent = true;

  // Ambil email admin yang sedang login
  getCurrentUser().then((user) => {
    if (!isCurrent) return;
    setAdminEmail(user?.email ?? "");
  });

  // Ambil data review
  getAllReviewsForAdmin()
    .then((data) => {
      if (!isCurrent) return;

      setReviews(data);
      setSelectedReview(data[0] ?? emptyReview);
    })
    .catch((err) => {
      if (!isCurrent) return;

      console.error(err);
      setError(
        "Gagal memuat data review. Pastikan policy Supabase admin sudah mengizinkan read."
      );
    })
    .finally(() => {
      if (isCurrent) {
        setLoading(false);
      }
    });

  return () => {
    isCurrent = false;
  };
}, []);

  const counts = useMemo(() => {
    return {
      all: reviews.length,
      pending: reviews.filter((review) => !review.is_approved).length,
      approved: reviews.filter((review) => review.is_approved).length,
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "pending" && !review.is_approved) ||
        (filter === "approved" && review.is_approved);

      const haystack = [
        review.product_title,
        review.reviewer_name,
        review.reviewer_username,
        review.review,
        review.source,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [filter, query, reviews]);

  const updateSelectedField = <Key extends keyof ProductReviewUpdate>(
    field: Key,
    value: ProductReviewUpdate[Key]
  ) => {
    setSelectedReview((review) => ({
      ...review,
      [field]: value,
    }));
  };

  const saveReview = async (updates: ProductReviewUpdate = {}) => {
    if (!selectedReview.id) return;

    if (!selectedReview.reviewer_name.trim() || !selectedReview.review.trim()) {
      alert("Nama dan isi ulasan wajib diisi.");
      return;
    }

    const payload: ProductReviewUpdate = {
      product_title: selectedReview.product_title,
      reviewer_name: selectedReview.reviewer_name.trim(),
      reviewer_username:
  (selectedReview.reviewer_username ?? "").trim() || "@pembeli",
      review: selectedReview.review.trim(),
      rating: Number(selectedReview.rating),
      source: selectedReview.source,
      is_approved: selectedReview.is_approved,
      ...updates,
    };

    setSaving(true);
    setError("");
    try {
      const updatedReview = await updateProductReview(selectedReview.id, payload);
      setReviews((current) =>
        current.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        )
      );
      setSelectedReview(updatedReview);
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan review. Cek permission update pada tabel product_reviews.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
  await logout();
  navigate("/admin/login");
};

const handleDeleteReview = async () => {
  if (!selectedReview.id) return;

  const confirmDelete = window.confirm(
    `Yakin ingin menghapus review dari "${selectedReview.reviewer_name}"?`
  );

  if (!confirmDelete) return;

  try {
    await deleteProductReview(selectedReview.id);

    const updatedReviews = reviews.filter(
      (review) => review.id !== selectedReview.id
    );

    setReviews(updatedReviews);
    setSelectedReview(updatedReviews[0] ?? emptyReview);
  } catch (err) {
    console.error(err);
    alert("Gagal menghapus review.");
  }
};

  return (
    <main className="min-h-screen bg-[#faf7f2] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-[#ead8c7] pb-6 lg:flex-row lg:items-end lg:justify-between">
  <div>
    <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#c38358]">
      Admin Review
    </p>

    <h1 className="mt-3 text-3xl font-black text-[#2f221d] sm:text-4xl">
      Moderasi Ulasan Produk
    </h1>

    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#7a6a62]">
      Review baru dari user masuk sebagai pending. Edit bila perlu, lalu pilih review mana yang ditampilkan di website.
    </p>
  </div>

  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">

    <div className="text-right">
      <p className="text-xs text-gray-500">
        Login sebagai
      </p>

      <p className="font-semibold text-[#2f221d]">
        {adminEmail}
      </p>
    </div>

    <button
      type="button"
      onClick={loadReviews}
      disabled={loading}
      className="rounded-xl border border-[#c38358] bg-white px-5 py-3 text-sm font-bold text-[#c38358] transition hover:bg-[#fff5ef] disabled:opacity-60"
    >
      {loading ? "Memuat..." : "Refresh Data"}
    </button>

    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white hover:bg-red-600 transition"
    >
      Logout
    </button>

  </div>
</div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-5 lg:grid-cols-[380px_1fr]">
          <aside className="rounded-2xl border border-[#ead8c7] bg-white p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "pending", label: "Pending", count: counts.pending },
                { id: "approved", label: "Tampil", count: counts.approved },
                { id: "all", label: "Semua", count: counts.all },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id as ReviewFilter)}
                  className={`rounded-xl px-3 py-2 text-left text-xs font-bold transition ${
                    filter === item.id
                      ? "bg-[#c38358] text-white"
                      : "bg-[#fdf7f2] text-[#7a6a62] hover:bg-[#fff5ef]"
                  }`}
                >
                  {item.label}
                  <span className="mt-1 block text-lg leading-none">{item.count}</span>
                </button>
              ))}
            </div>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama, produk, atau isi review..."
              className="mt-4 w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-3 text-sm outline-none focus:border-[#c38358]"
            />

            <div className="mt-4 flex max-h-[620px] flex-col gap-2 overflow-y-auto pr-1">
              {loading ? (
                <div className="rounded-xl bg-[#fdf7f2] p-4 text-sm font-semibold text-[#7a6a62]">
                  Memuat review...
                </div>
              ) : filteredReviews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#ead8c7] p-4 text-sm font-semibold text-[#7a6a62]">
                  Tidak ada review pada filter ini.
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <button
                    key={review.id}
                    type="button"
                    onClick={() => setSelectedReview(review)}
                    className={`rounded-xl border p-4 text-left transition ${
                      selectedReview.id === review.id
                        ? "border-[#c38358] bg-[#fff5ef]"
                        : "border-[#ead8c7]/70 bg-white hover:bg-[#fdf7f2]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-[#2f221d]">
                        {review.reviewer_name || "Tanpa nama"}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          review.is_approved
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {review.is_approved ? "Tampil" : "Pending"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-[#c38358]">
                      {review.product_title} - {review.rating}/5
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#7a6a62]">
                      {review.review}
                    </p>
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className="rounded-2xl border border-[#ead8c7] bg-white p-5 shadow-sm sm:p-6">
            {selectedReview.id ? (() => {
              const [parsedReview, parsedReply] = (selectedReview.review || "").split('[seller_reply]');
              return (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[2px] text-[#c38358]">
                        Editor Review
                      </p>
                      <h2 className="mt-1 text-2xl font-black text-[#2f221d]">
                        {selectedReview.is_approved ? "Sedang Tampil" : "Menunggu Persetujuan"}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => saveReview({ is_approved: false })}
                        disabled={saving}
                        className="rounded-xl border border-[#ead8c7] bg-white px-4 py-2.5 text-sm font-bold text-[#7a6a62] transition hover:bg-[#fdf7f2] disabled:opacity-60 cursor-pointer"
                      >
                        Sembunyikan
                      </button>
                      <button
                        type="button"
                        onClick={() => saveReview({ is_approved: true })}
                        disabled={saving}
                        className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
                      >
                        Tampilkan
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteReview}
                        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                      Nama Reviewer
                      <input
                        value={selectedReview.reviewer_name}
                        onChange={(event) => updateSelectedField("reviewer_name", event.target.value)}
                        className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-3 text-sm font-medium text-[#2f221d] outline-none focus:border-[#c38358]"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                      Username / Kontak
                      <input
                        value={selectedReview.reviewer_username ?? ""}
                        onChange={(event) => updateSelectedField("reviewer_username", event.target.value)}
                        className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-3 text-sm font-medium text-[#2f221d] outline-none focus:border-[#c38358]"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                      Produk
                      <select
                        value={selectedReview.product_title}
                        onChange={(event) => updateSelectedField("product_title", event.target.value)}
                        className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-3 text-sm font-medium text-[#2f221d] outline-none focus:border-[#c38358]"
                      >
                        {productsList.map((product) => (
                          <option key={product} value={product}>
                            {product}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                      Sumber
                      <select
                        value={selectedReview.source}
                        onChange={(event) => updateSelectedField("source", event.target.value as ReviewSource)}
                        className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-3 text-sm font-medium text-[#2f221d] outline-none focus:border-[#c38358]"
                      >
                        {sources.map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                    Rating
                    <div className="flex gap-2 rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => updateSelectedField("rating", star)}
                          className={`text-2xl leading-none cursor-pointer transition-transform hover:scale-110 ${
                            star <= selectedReview.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          aria-label={`Rating ${star}`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="ml-2 self-center text-sm font-bold text-[#7a6a62]">
                        {selectedReview.rating}/5
                      </span>
                    </div>
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                    Isi Ulasan Pembeli
                    <textarea
                      rows={4}
                      value={parsedReview || ""}
                      onChange={(event) => {
                        const val = event.target.value;
                        updateSelectedField("review", parsedReply ? `${val}[seller_reply]${parsedReply}` : val);
                      }}
                      placeholder="Masukkan isi ulasan pembeli..."
                      className="resize-none rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-3 text-sm leading-relaxed text-[#2f221d] outline-none focus:border-[#c38358]"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-[#c38358]">
                    💬 Balasan Penjual (Owner Reply)
                    <textarea
                      rows={4}
                      value={parsedReply || ""}
                      onChange={(event) => {
                        const val = event.target.value;
                        updateSelectedField("review", val ? `${parsedReview || ""}[seller_reply]${val}` : parsedReview || "");
                      }}
                      placeholder="Tulis balasan toko kamu di sini..."
                      className="resize-none rounded-xl border border-[#c38358]/45 bg-[#fffaf5] px-4 py-3 text-sm leading-relaxed text-[#2f221d] outline-none focus:border-[#c38358] placeholder-[#b07b5d]/60"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => saveReview()}
                    disabled={saving}
                    className="rounded-xl bg-[#3b2b26] px-5 py-3 text-sm font-bold text-white transition hover:bg-black disabled:opacity-60 cursor-pointer"
                  >
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              );
            })() : (
              <div className="rounded-xl border border-dashed border-[#ead8c7] p-8 text-center text-sm font-semibold text-[#7a6a62]">
                Pilih review dari daftar untuk mulai mengedit.
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
