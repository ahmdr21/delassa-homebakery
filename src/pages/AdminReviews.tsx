import { useNavigate } from "react-router-dom";
import { showToast } from "../components/Toast";
import { logout, getCurrentUser } from "../utils/auth";
import { useEffect, useMemo, useState } from "react";
import AdminProductsTab from "../components/admin/AdminProductsTab";
import AdminPromosTab from "../components/admin/AdminPromosTab";
import AdminOverviewTab from "../components/admin/AdminOverviewTab";
import logo from "../assets/delassa.webp";
import { MessageSquare, Package, Tag, LogOut, RefreshCw, Trash2, Search, ShieldCheck, EyeOff, LayoutDashboard } from "lucide-react";
import {
  getAllReviewsForAdmin,
  updateProductReview,
  deleteProductReview,
  getProducts,
  getOrderLogs,
  updateOrderLog,
  deleteOrderLog,
} from "../utils/supabase";
import type {
  ProductReviewUpdate,
  Review,
  ReviewSource,
  DBOrderLog,
} from "../utils/supabase";



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
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "products" | "promos">("overview");
  const [productsList, setProductsList] = useState<string[]>([
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
  ]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review>(emptyReview);
  const [filter, setFilter] = useState<ReviewFilter>("pending");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");

  // Order Logs States
  const [orderLogs, setOrderLogs] = useState<DBOrderLog[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await getOrderLogs();
      setOrderLogs(data);
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat histori pesanan.", "error");
    } finally {
      setLoadingOrders(false);
    }
  };

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

  const refreshAllData = async () => {
    await Promise.all([loadReviews(), loadOrders()]);
  };

  useEffect(() => {
    let isCurrent = true;

    getProducts(true).then((data) => {
      if (isCurrent) {
        const titles = data.map((p) => p.title);
        setProductsList(["Umum / Bakery", ...titles.filter((t) => !t.includes("Bundle"))]);
      }
    }).catch(console.error);

    // Ambil email admin yang sedang login
    getCurrentUser().then((user) => {
      if (!isCurrent) return;
      setAdminEmail(user?.email ?? "");
    });

    // Ambil data review & order logs
    Promise.all([
      getAllReviewsForAdmin(),
      getOrderLogs()
    ]).then(([reviewsData, logsData]) => {
      if (!isCurrent) return;
      setReviews(reviewsData);
      setSelectedReview(reviewsData[0] ?? emptyReview);
      setOrderLogs(logsData);
    }).catch((err) => {
      if (!isCurrent) return;
      console.error(err);
      setError("Gagal memuat data dari Supabase. Pastikan database/RLS sudah benar.");
    }).finally(() => {
      if (isCurrent) {
        setLoading(false);
        setLoadingOrders(false);
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
      showToast("Nama dan isi ulasan wajib diisi.", "error");
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
    showToast("Gagal menghapus review.", "error");
  }
};

  return (
    <main className="min-h-screen bg-[#faf7f2] px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        {/* HEADER BAR */}
        <div className="flex flex-col gap-5 border-b border-[#ead8c7] pb-6 lg:flex-row lg:items-center lg:justify-between bg-white rounded-3xl p-6 shadow-sm border border-[#ead8c7]/30">
          <div className="flex items-center gap-4">
            <div className="p-1.5 bg-[#fdf9f6] border border-[#ead8c7]/50 rounded-full shadow-inner shrink-0">
              <img src={logo} alt="Delassa Logo" className="w-16 h-16 object-contain rounded-full" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[3px] text-[#c38358]">
                DELASSA CONTROL CENTER
              </p>
              <h1 className="text-2xl font-black text-[#2f221d] sm:text-3xl leading-tight">
                Dashboard Admin
              </h1>
              <p className="hidden sm:block text-xs text-[#7a6a62] mt-0.5">
                Kelola pesanan, ulasan pelanggan, menu produk, dan paket promo toko Anda.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#fff9f5] border border-[#c38358]/30 rounded-2xl px-4 py-2 text-right">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Masuk Sebagai</p>
              <p className="text-xs font-black text-[#2f221d]">{adminEmail || "Administrator"}</p>
            </div>

            <button
              type="button"
              onClick={refreshAllData}
              disabled={loading || loadingOrders}
              className="flex items-center gap-2 rounded-2xl border border-[#c38358] bg-white px-4 py-2.5 text-xs font-bold text-[#c38358] transition hover:bg-[#fff5ef] disabled:opacity-60 cursor-pointer shadow-sm active:scale-[0.98]"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={(loading || loadingOrders) ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-600 transition cursor-pointer shadow-md shadow-red-100 active:scale-[0.98]"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {/* TABS HEADER */}
        <div className="flex bg-[#f2e7dd]/40 p-1.5 rounded-2xl mt-8 gap-1.5 max-w-2xl border border-[#ead8c7]/40 shadow-inner">
          {[
            { id: "overview", label: "Ringkasan Toko", icon: <LayoutDashboard size={15} /> },
            { id: "reviews", label: "Moderasi Ulasan", icon: <MessageSquare size={15} /> },
            { id: "products", label: "Kelola Produk", icon: <Package size={15} /> },
            { id: "promos", label: "Kelola Promo", icon: <Tag size={15} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center gap-2 flex-1 px-4 py-3 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-[#2f221d] shadow-md border-b-2 border-[#c38358]"
                  : "text-[#7a6a62] hover:text-[#c38358] hover:bg-white/40"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <AdminOverviewTab
            orderLogs={orderLogs}
            loading={loadingOrders}
            onUpdateOrder={async (id, updates) => {
              try {
                await updateOrderLog(id, updates);
                setOrderLogs((prev) =>
                  prev.map((log) => (log.id === id ? { ...log, ...updates } : log))
                );
                showToast("Data pesanan berhasil diperbarui!", "success");
              } catch (err) {
                showToast("Gagal memperbarui data pesanan.", "error");
              }
            }}
            onDelete={async (id) => {
              try {
                await deleteOrderLog(id);
                setOrderLogs((prev) => prev.filter((log) => log.id !== id));
                showToast("Histori pesanan berhasil dihapus!", "success");
              } catch (err) {
                showToast("Gagal menghapus histori pesanan.", "error");
              }
            }}
          />
        )}

        {activeTab === "reviews" && (
          <>
            {error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 animate-shake">
                ⚠️ {error}
              </div>
            )}

            <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
              {/* SIDEBAR LIST */}
              <aside className="rounded-3xl border border-[#ead8c7] bg-white p-5 shadow-sm flex flex-col h-[760px] overflow-hidden">
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "pending", label: "Pending", count: counts.pending, color: "text-amber-600 bg-amber-50" },
                    { id: "approved", label: "Tampil", count: counts.approved, color: "text-emerald-600 bg-emerald-50" },
                    { id: "all", label: "Semua", count: counts.all, color: "text-[#7a6a62] bg-gray-50" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilter(item.id as ReviewFilter)}
                      className={`rounded-2xl p-3 text-center transition cursor-pointer active:scale-95 ${
                        filter === item.id
                          ? "bg-[#c38358] text-white shadow-md shadow-[#c38358]/10"
                          : "bg-[#fdf7f2] text-[#7a6a62] hover:bg-[#fff5ef] border border-[#ead8c7]/30"
                      }`}
                    >
                      <span className="block text-[10px] font-black uppercase tracking-wider leading-none mb-1">{item.label}</span>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-black ${filter === item.id ? "bg-white/30 text-white" : item.color}`}>
                        {item.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative mt-4 shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={16} className="text-[#c38358]" />
                  </span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Cari ulasan..."
                    className="w-full rounded-2xl border border-[#ead8c7] bg-[#fdf7f2]/50 pl-10 pr-4 py-3 text-xs font-bold outline-none focus:border-[#c38358] focus:bg-white transition-all"
                  />
                </div>

                <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: "none" }}>
                  {loading ? (
                    <div className="rounded-2xl bg-[#fdf7f2] p-6 text-center text-xs font-semibold text-[#7a6a62]">
                      Memuat data review...
                    </div>
                  ) : filteredReviews.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#ead8c7] p-8 text-center text-xs font-semibold text-[#7a6a62]">
                      Tidak ada review pada filter ini.
                    </div>
                  ) : (
                    filteredReviews.map((review) => (
                      <button
                        key={review.id}
                        type="button"
                        onClick={() => setSelectedReview(review)}
                        className={`w-full rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                          selectedReview.id === review.id
                            ? "border-[#c38358] bg-[#fff5ef] shadow-sm"
                            : "border-[#ead8c7]/50 bg-white hover:border-[#c38358] hover:bg-[#fffdfb]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-black text-[#2f221d] truncate max-w-[65%]">
                            {review.reviewer_name || "Tanpa nama"}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                              review.is_approved
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}
                          >
                            {review.is_approved ? "Tampil" : "Pending"}
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] font-bold text-[#c38358]">
                          {review.product_title} · {review.rating}/5 ★
                        </p>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#7a6a62]">
                          {review.review}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </aside>

              {/* EDITOR DETAIL PANE */}
              <section className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm min-h-[760px] flex flex-col">
                {selectedReview.id ? (() => {
                  const [parsedReview, parsedReply] = (selectedReview.review || "").split('[seller_reply]');
                  return (
                    <div className="flex flex-col gap-6 flex-grow">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#ead8c7]/30 pb-4">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[2px] text-[#c38358]">
                            EDITOR REVIEW
                          </p>
                          <h2 className="text-xl font-black text-[#2f221d] mt-1">
                            {selectedReview.is_approved ? "Status: Tampil di Menu" : "Status: Menunggu Konfirmasi"}
                          </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => saveReview({ is_approved: false })}
                            disabled={saving}
                            className="flex items-center gap-1.5 rounded-xl border border-[#ead8c7] bg-white px-4 py-2 text-xs font-bold text-[#7a6a62] hover:bg-[#fdf7f2] transition cursor-pointer disabled:opacity-50"
                          >
                            <EyeOff size={13} />
                            Sembunyikan
                          </button>
                          <button
                            type="button"
                            onClick={() => saveReview({ is_approved: true })}
                            disabled={saving}
                            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold transition cursor-pointer disabled:opacity-50"
                          >
                            <ShieldCheck size={13} />
                            Tampilkan
                          </button>
                          <button
                            type="button"
                            onClick={handleDeleteReview}
                            className="flex items-center gap-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-xs font-bold transition cursor-pointer"
                          >
                            <Trash2 size={13} />
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
                            className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/50 px-4 py-3 text-sm font-semibold text-[#2f221d] outline-none focus:border-[#c38358] focus:bg-white transition"
                          />
                        </label>

                        <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                          Username / Kontak (WhatsApp, Instagram...)
                          <input
                            value={selectedReview.reviewer_username ?? ""}
                            onChange={(event) => updateSelectedField("reviewer_username", event.target.value)}
                            className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/50 px-4 py-3 text-sm font-semibold text-[#2f221d] outline-none focus:border-[#c38358] focus:bg-white transition"
                          />
                        </label>

                        <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                          Produk Terkait
                          <select
                            value={selectedReview.product_title}
                            onChange={(event) => updateSelectedField("product_title", event.target.value)}
                            className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/50 px-4 py-3 text-sm font-semibold text-[#2f221d] outline-none focus:border-[#c38358] focus:bg-white transition cursor-pointer"
                          >
                            {productsList.map((product) => (
                              <option key={product} value={product}>
                                {product}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                          Sumber Ulasan
                          <select
                            value={selectedReview.source}
                            onChange={(event) => updateSelectedField("source", event.target.value as ReviewSource)}
                            className="rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/50 px-4 py-3 text-sm font-semibold text-[#2f221d] outline-none focus:border-[#c38358] focus:bg-white transition cursor-pointer"
                          >
                            {sources.map((source) => (
                              <option key={source} value={source}>
                                {source.toUpperCase()}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                        Rating Nilai Bintang
                        <div className="flex gap-2 rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/40 px-4 py-3 align-middle w-fit">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => updateSelectedField("rating", star)}
                              className={`text-2xl leading-none cursor-pointer transition-transform hover:scale-110 active:scale-95 ${
                                star <= selectedReview.rating ? "text-yellow-400" : "text-gray-300"
                              }`}
                              aria-label={`Rating ${star}`}
                            >
                              ★
                            </button>
                          ))}
                          <span className="ml-2 self-center text-xs font-black text-[#2f221d] bg-[#ead8c7]/30 px-2.5 py-0.5 rounded-full">
                            {selectedReview.rating} dari 5 Bintang
                          </span>
                        </div>
                      </label>

                      <label className="flex flex-col gap-1.5 text-xs font-bold text-[#7a6a62]">
                        Isi Ulasan Pembeli
                        <textarea
                          rows={3}
                          value={parsedReview || ""}
                          onChange={(event) => {
                            const val = event.target.value;
                            updateSelectedField("review", parsedReply ? `${val}[seller_reply]${parsedReply}` : val);
                          }}
                          placeholder="Masukkan ulasan pembeli..."
                          className="resize-none rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/50 px-4 py-3 text-sm leading-relaxed text-[#2f221d] outline-none focus:border-[#c38358] focus:bg-white transition"
                        />
                      </label>

                      <label className="flex flex-col gap-1.5 text-xs font-bold text-[#c38358]">
                        💬 Balasan Penjual (Toko Kamu)
                        <textarea
                          rows={3}
                          value={parsedReply || ""}
                          onChange={(event) => {
                            const val = event.target.value;
                            updateSelectedField("review", val ? `${parsedReview || ""}[seller_reply]${val}` : parsedReview || "");
                          }}
                          placeholder="Tulis tanggapan atau ucapan terima kasih toko Anda..."
                          className="resize-none rounded-xl border border-[#c38358]/35 bg-[#fffdfb] px-4 py-3 text-sm leading-relaxed text-[#2f221d] outline-none focus:border-[#c38358] placeholder-[#b07b5d]/50"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => saveReview()}
                        disabled={saving}
                        className="mt-auto rounded-xl bg-[#3b2b26] hover:bg-black text-white px-5 py-3.5 text-sm font-bold shadow-md transition disabled:opacity-60 cursor-pointer text-center"
                      >
                        {saving ? "Menyimpan Ulasan..." : "Simpan Perubahan Ulasan"}
                      </button>
                    </div>
                  );
                })() : (
                  <div className="flex-grow flex flex-col items-center justify-center border border-dashed border-[#ead8c7] rounded-3xl p-12 text-center text-[#7a6a62]">
                    <MessageSquare size={36} className="text-[#ead8c7] mb-3" />
                    <p className="font-bold text-[#2f221d]">Pilih ulasan dari daftar</p>
                    <p className="text-xs mt-1 max-w-xs">Pilih salah satu ulasan dari bilah samping untuk melihat detail dan mengedit.</p>
                  </div>
                )}
              </section>
            </div>
          </>
        )}

        {activeTab === "products" && <AdminProductsTab />}
        {activeTab === "promos" && <AdminPromosTab />}
      </section>
    </main>
  );
}
