import { useEffect, useState } from "react";
import { getAllPromosAdmin, createPromo, updatePromo, deletePromo, getProducts } from "../../utils/supabase";
import type { DBPromo, DBPromoWithProducts, DBProduct } from "../../utils/supabase";
import { showToast } from "../Toast";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Calendar, Tag, Gift, Package, ArrowUp } from "lucide-react";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const PROMO_TYPE_LABELS: Record<string, string> = {
  diskon_langsung: "Diskon Langsung",
  beli1gratis1: "Beli X Gratis Y",
  bundle: "Bundle / Paket",
  hari_tertentu: "Promo Hari Tertentu",
};

const PROMO_TYPE_DESC: Record<string, string> = {
  diskon_langsung: "Atur harga promo per produk (atau diskon massal) — tampil harga coret di menu.",
  beli1gratis1: "Beli X item gratis Y item — tampil badge diskon dinamis di kartu produk.",
  bundle: "Paket bundling dengan harga spesial — atur harga paket per produk & pilih menu minuman.",
  hari_tertentu: "Promo aktif hanya di hari tertentu — atur harga promo & pilih hari.",
};

const PROMO_TYPE_COLORS: Record<string, string> = {
  diskon_langsung: "bg-emerald-50 text-emerald-700 border-emerald-200",
  beli1gratis1: "bg-purple-50 text-purple-700 border-purple-200",
  bundle: "bg-blue-50 text-blue-700 border-blue-200",
  hari_tertentu: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function AdminPromosTab() {
  const [promos, setPromos] = useState<DBPromoWithProducts[]>([]);
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<DBPromoWithProducts | null>(null);

  // --- Form fields ---
  const [title, setTitle] = useState("");
  const [promoType, setPromoType] = useState<DBPromo["promo_type"]>("diskon_langsung");
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [badgeLabel, setBadgeLabel] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [isActive, setIsActive] = useState(true);
  const [priority, setPriority] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [freeQuantity, setFreeQuantity] = useState(1);

  // product_id -> harga promo (string untuk input, null = tidak diisi)
  const [productPriceInputs, setProductPriceInputs] = useState<Record<string, string>>({});

  // Helper untuk mass discount (opsional di UI)
  const [massDiscountType, setMassDiscountType] = useState<"none" | "persen" | "nominal">("none");
  const [massDiscountValue, setMassDiscountValue] = useState("");

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allPromos, allProducts] = await Promise.all([getAllPromosAdmin(), getProducts(false)]);
      setPromos(allPromos);
      setProducts(allProducts);
    } catch {
      showToast("Gagal memuat data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setPromoType("diskon_langsung");
    setActiveDays([]);
    setBadgeLabel("");
    setDescription("");
    setStartDate(new Date().toISOString().split("T")[0]);
    setEndDate(new Date().toISOString().split("T")[0]);
    setIsActive(true);
    setPriority(0);
    setBuyQuantity(1);
    setFreeQuantity(1);
    setProductPriceInputs({});
    setMassDiscountType("none");
    setMassDiscountValue("");
    setEditingPromo(null);
  };

  const openAddModal = () => { resetForm(); setShowModal(true); };

  const openEditModal = (p: DBPromoWithProducts) => {
    setEditingPromo(p);
    setTitle(p.title);
    setPromoType(p.promo_type);
    setActiveDays(p.active_days ?? []);
    setBadgeLabel(p.badge_label ?? "");
    setDescription(p.description ?? "");
    setStartDate(p.start_date);
    setEndDate(p.end_date);
    setIsActive(p.is_active);
    setPriority(p.priority ?? 0);
    setBuyQuantity(p.buy_quantity ?? 1);
    setFreeQuantity(p.free_quantity ?? 1);
    setMassDiscountType("none");
    setMassDiscountValue("");

    // Populate per-product price inputs
    const inputs: Record<string, string> = {};
    (p.product_ids ?? []).forEach((pid) => {
      const pp = p.product_prices?.[pid];
      inputs[pid] = pp != null ? String(pp) : "";
    });
    setProductPriceInputs(inputs);
    setShowModal(true);
  };

  const toggleDay = (day: string) =>
    setActiveDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);

  const toggleProduct = (id: string) => {
    setProductPriceInputs((prev) => {
      if (id in prev) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: "" };
    });
  };

  const setProductPrice = (id: string, val: string) =>
    setProductPriceInputs((prev) => ({ ...prev, [id]: val }));

  const selectedProductIds = Object.keys(productPriceInputs);

  const selectAllProducts = () => {
    const next: Record<string, string> = {};
    products.forEach((p) => { next[p.id] = productPriceInputs[p.id] ?? ""; });
    setProductPriceInputs(next);
  };
  const clearAllProducts = () => setProductPriceInputs({});

  // Fungsi pembantu untuk mengisi harga secara massal
  const applyMassDiscount = () => {
    const val = Number(massDiscountValue.replace(/[^0-9]/g, ""));
    if (!val || val <= 0) {
      showToast("Masukkan nilai diskon massal terlebih dahulu.", "error");
      return;
    }

    const nextInputs = { ...productPriceInputs };
    selectedProductIds.forEach((pid) => {
      const prod = products.find((p) => p.id === pid);
      if (!prod) return;

      if (massDiscountType === "persen") {
        const discounted = Math.max(0, Math.round(prod.price * (1 - val / 100)));
        nextInputs[pid] = String(discounted);
      } else if (massDiscountType === "nominal") {
        const discounted = Math.max(0, prod.price - val);
        nextInputs[pid] = String(discounted);
      }
    });

    setProductPriceInputs(nextInputs);
    showToast("Diskon massal berhasil diaplikasikan ke semua produk terpilih!", "success");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { showToast("Judul promo wajib diisi.", "error"); return; }
    if (!startDate || !endDate) { showToast("Tanggal aktif wajib diisi.", "error"); return; }
    if (selectedProductIds.length === 0) { showToast("Pilih minimal 1 produk yang berlaku.", "error"); return; }
    if (promoType === "hari_tertentu" && activeDays.length === 0) {
      showToast("Pilih minimal 1 hari untuk promo hari tertentu.", "error"); return;
    }

    // Build productPrices map: product_id -> number | null
    const productPrices: Record<string, number | null> = {};
    for (const pid of selectedProductIds) {
      const raw = productPriceInputs[pid]?.trim();
      productPrices[pid] = raw ? Number(raw.replace(/[^0-9]/g, "")) || null : null;
    }

    setSubmitting(true);
    const payload: Omit<DBPromo, "id" | "created_at"> = {
      title: title.trim(),
      promo_type: promoType,
      discount_type: null,
      discount_value: 0,
      active_days: promoType === "hari_tertentu" ? activeDays : [],
      badge_label: badgeLabel.trim() || null,
      description: description.trim() || null,
      start_date: startDate,
      end_date: endDate,
      is_active: isActive,
      priority: Number(priority) || 0,
      buy_quantity: promoType === "beli1gratis1" ? Number(buyQuantity) || 1 : 1,
      free_quantity: promoType === "beli1gratis1" ? Number(freeQuantity) || 1 : 1,
    };

    try {
      if (editingPromo) {
        await updatePromo(editingPromo.id, payload, productPrices);
        showToast("Promo berhasil diperbarui!", "success");
      } else {
        await createPromo(payload, productPrices);
        showToast("Promo baru berhasil dibuat!", "success");
      }
      setShowModal(false);
      loadData();
    } catch {
      showToast("Gagal menyimpan promo.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin hapus promo "${name}"?`)) return;
    try {
      await deletePromo(id);
      showToast("Promo berhasil dihapus.", "success");
      loadData();
    } catch {
      showToast("Gagal menghapus promo.", "error");
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#2f221d]">Daftar Promo</h2>
          <p className="text-xs text-[#7a6a62] mt-1">Kelola aturan promo dengan prioritas & konfigurasi harga fleksibel.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 rounded-xl bg-[#c38358] hover:bg-[#a96d45] text-white px-4 py-2.5 text-sm font-bold shadow-md transition">
          <Plus size={16} /> Buat Promo
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#ead8c7] bg-white p-8 text-center text-[#7a6a62] font-semibold">Memuat...</div>
      ) : promos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ead8c7] bg-white p-12 text-center text-[#7a6a62]">
          <Gift size={40} className="mx-auto mb-4 text-[#ead8c7]" />
          <p className="font-bold text-[#2f221d]">Belum ada promo</p>
          <p className="text-sm mt-1">Klik "Buat Promo" untuk mulai.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {promos.map((p) => {
            const appliedProducts = products.filter((prod) => (p.product_ids ?? []).includes(prod.id));
            return (
              <div key={p.id} className={`rounded-2xl border bg-white overflow-hidden shadow-sm flex flex-col justify-between ${p.is_active ? "border-[#ead8c7]" : "border-red-200 opacity-70"}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${PROMO_TYPE_COLORS[p.promo_type]}`}>
                        {PROMO_TYPE_LABELS[p.promo_type]}
                      </span>
                      <h3 className="text-base font-black text-[#2f221d] mt-2">{p.title}</h3>
                    </div>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${p.is_active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                      {p.is_active ? <CheckCircle size={10} /> : <XCircle size={10} />}
                      {p.is_active ? "Aktif" : "Mati"}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#7a6a62] mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-[#c38358] shrink-0" />
                      <span>{p.start_date} s/d {p.end_date}</span>
                    </div>
                    {p.promo_type === "hari_tertentu" && (p.active_days ?? []).length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Tag size={11} className="text-[#c38358] shrink-0" />
                        <span>Hari: {p.active_days.join(", ")}</span>
                      </div>
                    )}
                    {p.badge_label && (
                      <div className="flex items-center gap-1.5">
                        <Tag size={11} className="text-[#c38358] shrink-0" />
                        <span>Badge: <b>{p.badge_label}</b></span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <ArrowUp size={11} className="text-[#c38358] shrink-0" />
                      <span>Prioritas: <b className="text-[#2f221d]">{p.priority ?? 0}</b></span>
                    </div>
                    {p.promo_type === "beli1gratis1" && (
                      <div className="flex items-center gap-1.5">
                        <Gift size={11} className="text-[#c38358] shrink-0" />
                        <span>Aturan: <b className="text-purple-700">Beli {p.buy_quantity ?? 1} Gratis {p.free_quantity ?? 1}</b></span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Package size={11} className="text-[#c38358] shrink-0" />
                      <span>{appliedProducts.length} produk berlaku</span>
                    </div>
                  </div>

                  {/* Preview per-product prices */}
                  {appliedProducts.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {p.promo_type === "bundle" ? (() => {
                        const mainProducts = appliedProducts.filter(prod => p.product_prices?.[prod.id] != null);
                        const companionProducts = appliedProducts.filter(prod => p.product_prices?.[prod.id] == null);
                        return (
                          <>
                            {mainProducts.length > 0 && (
                              <>
                                <div className="text-[9px] font-bold text-[#9b6a50] uppercase tracking-wider mb-1">Produk Utama (harga bundle):</div>
                                {mainProducts.map((prod) => {
                                  const pp = p.product_prices?.[prod.id]!;
                                  return (
                                    <div key={prod.id} className="flex items-center justify-between text-[10px] bg-blue-50 rounded-lg px-2.5 py-1.5">
                                      <span className="text-blue-800 font-semibold truncate max-w-[55%]">🎁 {prod.title}</span>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="text-gray-400 line-through">Rp{prod.price.toLocaleString("id-ID")}</span>
                                        <span className="text-red-600 font-bold">Rp{pp.toLocaleString("id-ID")}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )}
                            {companionProducts.length > 0 && (
                              <>
                                <div className="text-[9px] font-bold text-[#9b6a50] uppercase tracking-wider mt-2 mb-1">Minuman Pilihan ({companionProducts.length} varian):</div>
                                <div className="flex flex-wrap gap-1">
                                  {companionProducts.map((prod) => (
                                    <span key={prod.id} className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-800 rounded-full px-2 py-0.5 font-semibold">
                                      ☕ {prod.title}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        );
                      })() : (
                        <>
                          {appliedProducts.slice(0, 4).map((prod) => {
                            const pp = p.product_prices?.[prod.id];
                            return (
                              <div key={prod.id} className="flex items-center justify-between text-[10px] bg-[#f5ede5] rounded-lg px-2.5 py-1.5">
                                <span className="text-[#7a6a62] font-semibold truncate max-w-[60%]">{prod.title}</span>
                                {pp != null ? (
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="text-gray-400 line-through">Rp{prod.price.toLocaleString("id-ID")}</span>
                                    <span className="text-red-600 font-bold">Rp{pp.toLocaleString("id-ID")}</span>
                                  </div>
                                ) : (
                                  <span className="text-[#c38358] font-bold">Rp{prod.price.toLocaleString("id-ID")}</span>
                                )}
                              </div>
                            );
                          })}
                          {appliedProducts.length > 4 && (
                            <div className="text-[10px] text-[#c38358] font-bold text-center">+{appliedProducts.length - 4} produk lainnya</div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#fffaf5] border-t border-[#fcf4ec] flex gap-3">
                  <button onClick={() => openEditModal(p)} className="flex-grow flex items-center justify-center gap-1.5 rounded-xl border border-[#c38358] text-[#c38358] hover:bg-[#fff5ef] py-2 text-xs font-bold transition">
                    <Edit2 size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id, p.title)} className="flex-grow flex items-center justify-center gap-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 py-2 text-xs font-bold transition">
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========== MODAL ========== */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: "92vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b border-[#ead8c7]/50 shrink-0">
              <h3 className="text-xl font-black text-[#2f221d]">{editingPromo ? "Edit Promo" : "Buat Promo Baru"}</h3>
              <button onClick={() => setShowModal(false)} className="text-2xl text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer">×</button>
            </div>

            {/* Modal Body — scrollable */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-5 flex-1" style={{ scrollbarWidth: "none" }}>
              <form id="promo-form" onSubmit={handleSubmit} className="space-y-5">

                {/* JUDUL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Judul Promo *</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Contoh: Promo Kemerdekaan, Diskon Jumat" className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]" />
                </div>

                {/* JENIS PROMO */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Jenis Promo *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["diskon_langsung", "beli1gratis1", "bundle", "hari_tertentu"] as const).map((type) => (
                      <button key={type} type="button" onClick={() => setPromoType(type)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-left transition leading-snug ${promoType === type ? "bg-[#c38358] text-white border-[#c38358]" : "bg-[#fdf7f2] text-[#7a6a62] border-[#ead8c7] hover:border-[#c38358]"}`}>
                        {PROMO_TYPE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#a08070] mt-0.5">{PROMO_TYPE_DESC[promoType]}</p>
                </div>

                {/* BELI X GRATIS Y CONFIGURATION */}
                {promoType === "beli1gratis1" && (
                  <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Kuantitas Beli (X)</label>
                      <input type="number" min={1} value={buyQuantity} onChange={(e) => setBuyQuantity(Math.max(1, Number(e.target.value)))} required className="w-full rounded-xl border border-[#ead8c7] bg-white px-4 py-2 text-sm outline-none focus:border-[#c38358]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Kuantitas Gratis (Y)</label>
                      <input type="number" min={1} value={freeQuantity} onChange={(e) => setFreeQuantity(Math.max(1, Number(e.target.value)))} required className="w-full rounded-xl border border-[#ead8c7] bg-white px-4 py-2 text-sm outline-none focus:border-[#c38358]" />
                    </div>
                  </div>
                )}

                {/* PRIORITAS & BADGE LABEL */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Prioritas Promo *</label>
                    <input type="number" value={priority} onChange={(e) => setPriority(Number(e.target.value))} required className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]" />
                    <p className="text-[10px] text-[#a08070]">Semakin tinggi angka, semakin didahulukan jika bertabrakan.</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Label Badge (Opsional)</label>
                    <input type="text" value={badgeLabel} onChange={(e) => setBadgeLabel(e.target.value)}
                      placeholder={promoType === "beli1gratis1" ? `Beli ${buyQuantity} Gratis ${freeQuantity}` : promoType === "hari_tertentu" ? "Promo Jumat" : "Sale, Diskon..."}
                      className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]" />
                    <p className="text-[10px] text-[#a08070]">Badge teks di atas gambar produk di menu.</p>
                  </div>
                </div>

                {/* HARI AKTIF — hanya untuk hari_tertentu */}
                {promoType === "hari_tertentu" && (
                  <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                    <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider block mb-2">Pilih Hari Berlaku *</label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS.map((day) => (
                        <button key={day} type="button" onClick={() => toggleDay(day)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${activeDays.includes(day) ? "bg-amber-500 text-white border-amber-500" : "bg-white text-[#7a6a62] border-[#ead8c7] hover:border-amber-400"}`}>
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* DESKRIPSI */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Catatan Internal / Deskripsi</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
                    placeholder="Deskripsi promo ini..." className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358] resize-none" />
                </div>

                {/* TANGGAL */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Tanggal Mulai *</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Tanggal Selesai *</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]" />
                  </div>
                </div>

                {/* STATUS AKTIF */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                    <div className={`w-10 h-5 rounded-full transition-colors ${isActive ? "bg-[#c38358]" : "bg-gray-300"}`} />
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm font-bold text-[#2f221d]">{isActive ? "Promo Aktif" : "Promo Tidak Aktif"}</span>
                </label>

                {/* ===== PRODUK + HARGA PROMO ===== */}
                <div className="border-t border-[#ead8c7]/30 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider">Produk & Harga Promo *</label>
                      <p className="text-[10px] text-[#a08070] mt-0.5">Centang produk yang ingin diikutkan ke dalam promo ini.</p>
                    </div>
                    <div className="flex gap-3 text-[10px] shrink-0">
                      <button type="button" onClick={selectAllProducts} className="font-bold text-[#c38358] hover:underline">Pilih Semua</button>
                      <button type="button" onClick={clearAllProducts} className="font-bold text-gray-400 hover:underline">Hapus Semua</button>
                    </div>
                  </div>

                  {/* BUNDLE HINT */}
                  {promoType === "bundle" && (
                    <div className="mb-4 bg-blue-50 border border-blue-100 rounded-xl p-3.5 space-y-1.5 text-[11px]">
                      <p className="font-black text-blue-800">📋 Cara Setup Promo Bundle:</p>
                      <p className="text-blue-700">
                        <span className="font-bold">1. Produk Utama (Brownies)</span> — centang &amp; isi <span className="font-bold">Harga Bundle</span> (total harga paket, misal Rp65.000)
                      </p>
                      <p className="text-blue-700">
                        <span className="font-bold">2. Minuman Pilihan</span> — centang saja, <span className="font-bold">kosongkan harga promo</span> → ini akan jadi pilihan minuman yang bisa dipilih pembeli
                      </p>
                    </div>
                  )}

                  {/* MASS DISCOUNT CONTROLS */}
                  {selectedProductIds.length > 0 && promoType !== "bundle" && (
                    <div className="mb-4 bg-emerald-50/80 border border-emerald-100 rounded-xl p-3.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-black text-emerald-800 text-[11px] uppercase tracking-wider">⚡ Alat Bantu Diskon Massal</p>
                        <span className="text-[9px] text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                          {selectedProductIds.length} produk terpilih
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <div className="flex rounded-lg border border-[#ead8c7] overflow-hidden bg-white shrink-0">
                          {(["none", "persen", "nominal"] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => { setMassDiscountType(type); setMassDiscountValue(""); }}
                              className={`px-3 py-1.5 text-[11px] font-bold transition-all ${
                                massDiscountType === type
                                  ? "bg-emerald-600 text-white"
                                  : "bg-white text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {type === "none" ? "Manual" : type === "persen" ? "% Diskon" : "Potongan Rp"}
                            </button>
                          ))}
                        </div>

                        {massDiscountType !== "none" && (
                          <>
                            <div className="relative flex-grow">
                              {massDiscountType === "nominal" && (
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-700">Rp</span>
                              )}
                              <input
                                type="text"
                                value={massDiscountValue}
                                onChange={(e) => setMassDiscountValue(e.target.value.replace(/[^0-9]/g, ""))}
                                placeholder={massDiscountType === "persen" ? "Contoh: 10 (%)" : "Contoh: 5000 (Rupiah)"}
                                className={`w-full rounded-lg border border-[#ead8c7] py-1.5 pr-2.5 text-xs font-bold text-[#2f221d] outline-none focus:border-emerald-500 ${
                                  massDiscountType === "nominal" ? "pl-8" : "pl-3.5"
                                }`}
                              />
                              {massDiscountType === "persen" && (
                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-700">%</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={applyMassDiscount}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold px-3.5 py-2.5 shrink-0 transition"
                            >
                              Terapkan
                            </button>
                          </>
                        )}
                      </div>
                      {massDiscountType === "none" && (
                        <p className="text-[10px] text-emerald-700">
                          Pilih "<b>% Diskon</b>" atau "<b>Potongan Rp</b>" untuk mengisi harga promo semua produk sekaligus, atau edit kotak harga satu per satu di bawah.
                        </p>
                      )}
                    </div>
                  )}

                  {/* PRODUCT SELECTION SCROLL BOX */}
                  <div className="rounded-2xl border border-[#ead8c7]/60 divide-y divide-[#ead8c7]/30 overflow-hidden">
                    {products.map((prod) => {
                      const checked = prod.id in productPriceInputs;
                      return (
                        <div key={prod.id} className={`flex items-center gap-3 px-4 py-3 transition-colors ${checked ? "bg-[#fff8f0]" : "bg-white hover:bg-[#fffaf5]"}`}>
                          {/* Checkbox */}
                          <button type="button" onClick={() => toggleProduct(prod.id)}
                            className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center transition ${checked ? "bg-[#c38358] border-[#c38358]" : "border-[#ead8c7]"}`}>
                            {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </button>

                          {/* Product info */}
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-bold text-[#2f221d] truncate">{prod.title}</p>
                            <p className="text-[10px] text-[#7a6a62]">Harga jual: Rp{prod.price.toLocaleString("id-ID")}</p>
                          </div>

                          {/* Harga promo input — hanya tampil kalau dipilih */}
                          {checked && (
                            <div className="shrink-0 flex items-center gap-1.5">
                              <span className="text-[10px] text-[#7a6a62] font-semibold whitespace-nowrap">Harga Promo:</span>
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[#9b6a50] font-bold">Rp</span>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={productPriceInputs[prod.id]}
                                  onChange={(e) => setProductPrice(prod.id, e.target.value.replace(/[^0-9]/g, ""))}
                                  placeholder={String(prod.price)}
                                  className="w-28 pl-7 pr-2 py-1.5 rounded-lg border border-[#ead8c7] bg-white text-xs font-bold text-[#2f221d] outline-none focus:border-[#c38358] text-right"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {selectedProductIds.length > 0 && (
                    <p className="text-[10px] text-[#a08070] mt-2">{selectedProductIds.length} produk dipilih</p>
                  )}
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-5 border-t border-[#ead8c7]/50 flex gap-3 justify-end shrink-0">
              <button type="button" onClick={() => setShowModal(false)} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50 transition cursor-pointer">
                Batal
              </button>
              <button type="submit" form="promo-form" disabled={submitting}
                className="rounded-xl bg-[#c38358] hover:bg-[#a96d45] text-white px-6 py-2.5 text-sm font-bold shadow-md transition disabled:opacity-60 cursor-pointer">
                {submitting ? "Menyimpan..." : "Simpan Promo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
