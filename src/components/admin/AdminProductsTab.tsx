import { useEffect, useState } from "react";
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct, uploadProductImage, createCategory, deleteCategory } from "../../utils/supabase";
import type { DBCategory, DBProduct } from "../../utils/supabase";
import { showToast } from "../Toast";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, FolderOpen } from "lucide-react";

export default function AdminProductsTab() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [categories, setCategories] = useState<DBCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form modal state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DBProduct | null>(null);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [rating, setRating] = useState(5.0);
  const [soldCount, setSoldCount] = useState("0+");
  const [isActive, setIsActive] = useState(true);
  const [orderIndex, setOrderIndex] = useState(0);
  
  // Loading upload state
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Category Manager modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [submittingCat, setSubmittingCat] = useState(false);



  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allProducts, allCategories] = await Promise.all([
        getProducts(false), // Fetch all products (including inactive)
        getCategories()
      ]);
      setProducts(allProducts);
      setCategories(allCategories);
      if (allCategories.length > 0) {
        setCategoryId(allCategories[0].id);
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat data produk & kategori.", "error");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setTitle("");
    setPrice(0);
    setCategoryId(categories[0]?.id || "");
    setNewCategoryName("");
    setNewCategoryDesc("");
    setBadge("");
    setDescription("");
    setImageUrl("");
    setImages([]);
    setRating(5.0);
    setSoldCount("0+");
    setIsActive(true);
    setOrderIndex(products.length);
    setShowModal(true);
  };

  const openEditModal = (p: DBProduct) => {
    setEditingProduct(p);
    setTitle(p.title);
    setPrice(p.price);
    setCategoryId(p.category_id);
    setNewCategoryName("");
    setNewCategoryDesc("");
    setBadge(p.badge || "");
    setDescription(p.description || "");
    setImageUrl(p.image_url);
    setImages(p.images || []);
    setRating(p.rating);
    setSoldCount(p.sold_count);
    setIsActive(p.is_active);
    setOrderIndex(p.order_index);
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    try {
      if (isGallery) {
        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const uploadedUrl = await uploadProductImage(file, file.name);
          uploadedUrls.push(uploadedUrl);
        }
        setImages((prev) => [...prev, ...uploadedUrls]);
        showToast(`${files.length} gambar berhasil diunggah!`, "success");
      } else {
        const file = files[0];
        const uploadedUrl = await uploadProductImage(file, file.name);
        setImageUrl(uploadedUrl);
        showToast("Gambar utama berhasil diunggah!", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal mengunggah gambar.", "error");
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl) {
      showToast("Nama produk dan gambar utama wajib diisi.", "error");
      return;
    }

    setSubmitting(true);
    
    let finalCategoryId = categoryId;
    if (categoryId === "NEW_CATEGORY") {
      if (!newCategoryName.trim()) {
        showToast("Nama kategori baru wajib diisi.", "error");
        setSubmitting(false);
        return;
      }

      // Generate slug from category name
      const slug = newCategoryName.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
      const existing = categories.find((c) => c.id === slug);
      if (existing) {
        finalCategoryId = existing.id;
      } else {
        try {
          await createCategory({
            id: slug,
            name: newCategoryName.trim(),
            description: newCategoryDesc.trim() || null,
            order_index: categories.length,
          });
          finalCategoryId = slug;
        } catch (err) {
          console.error(err);
          showToast("Gagal membuat kategori baru.", "error");
          setSubmitting(false);
          return;
        }
      }
    }

    const payload = {
      category_id: finalCategoryId,
      title: title.trim(),
      price: Number(price),
      badge: badge.trim() || null,
      description: description.trim() || null,
      image_url: imageUrl,
      images: images.length > 0 ? images : [imageUrl],
      rating: Number(rating),
      sold_count: soldCount.trim() || "0+",
      is_active: isActive,
      order_index: Number(orderIndex),
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        showToast("Produk berhasil diperbarui!", "success");
      } else {
        await createProduct(payload);
        showToast("Produk baru berhasil ditambahkan!", "success");
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan data produk.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus produk "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    
    try {
      await deleteProduct(id);
      showToast("Produk berhasil dihapus.", "success");
      loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus produk.", "error");
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    // Cek apakah kategori masih dipakai oleh produk
    const hasProducts = products.some((p) => p.category_id === id);
    if (hasProducts) {
      alert(`Kategori "${name}" tidak bisa dihapus karena masih digunakan oleh produk. Silakan ubah kategori produk-produk tersebut terlebih dahulu.`);
      return;
    }

    if (!confirm(`Yakin ingin menghapus kategori "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;

    try {
      await deleteCategory(id);
      showToast("Kategori berhasil dihapus.", "success");
      loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus kategori.", "error");
    }
  };

  const handleQuickCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      showToast("Nama kategori wajib diisi.", "error");
      return;
    }

    setSubmittingCat(true);
    const slug = newCatName.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
    const existing = categories.find((c) => c.id === slug);
    if (existing) {
      showToast("Kategori dengan nama serupa sudah ada.", "error");
      setSubmittingCat(false);
      return;
    }

    try {
      await createCategory({
        id: slug,
        name: newCatName.trim(),
        description: newCatDesc.trim() || null,
        order_index: categories.length,
      });
      showToast("Kategori baru berhasil ditambahkan!", "success");
      setNewCatName("");
      setNewCatDesc("");
      loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal membuat kategori baru.", "error");
    } finally {
      setSubmittingCat(false);
    }
  };


  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#2f221d]">Daftar Produk</h2>
          <p className="text-xs text-[#7a6a62] mt-0.5">Kelola menu makanan dan kategori bakery di sini.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-2 rounded-xl border border-[#c38358] text-[#c38358] hover:bg-[#fff5ef] px-4 py-2.5 text-sm font-bold shadow-sm transition cursor-pointer"
          >
            <FolderOpen size={16} />
            Kelola Kategori
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-[#c38358] hover:bg-[#a96d45] text-white px-4 py-2.5 text-sm font-bold shadow-md transition cursor-pointer"
          >
            <Plus size={16} />
            Tambah Produk
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-[#ead8c7] bg-white p-8 text-center text-[#7a6a62] font-semibold">
          Memuat data produk...
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ead8c7] bg-white p-12 text-center text-[#7a6a62]">
          Belum ada produk di database. Klik tombol "Tambah Produk" untuk memulai.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const categoryName = categories.find((c) => c.id === p.category_id)?.name || p.category_id;
            return (
              <div key={p.id} className={`rounded-2xl border bg-white overflow-hidden shadow-sm flex flex-col justify-between transition ${
                p.is_active ? "border-[#ead8c7]" : "border-red-200 opacity-75"
              }`}>
                <div>
                  <div className="relative h-48 bg-[#f5ede5]">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-[#c38358] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                    <span className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      p.is_active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                    }`}>
                      {p.is_active ? <CheckCircle size={10} /> : <XCircle size={10} />}
                      {p.is_active ? "Aktif" : "Sembunyi"}
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-extrabold text-[#c38358] uppercase tracking-wider">{categoryName}</span>
                    <h3 className="text-lg font-black text-[#2f221d] mt-1">{p.title}</h3>
                    <p className="text-[#c38358] font-bold mt-2">Rp{p.price.toLocaleString("id-ID")}</p>
                    <p className="text-xs text-[#7a6a62] mt-3 line-clamp-3 leading-relaxed">{p.description || "Tidak ada deskripsi."}</p>
                    
                    <div className="flex gap-4 mt-4 pt-3 border-t border-[#fcf4ec] text-xs text-[#7a6a62] font-semibold">
                      <span>⭐ {p.rating} / 5.0</span>
                      <span>Terjual {p.sold_count}</span>
                      <span>Index: {p.order_index}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#fffaf5] border-t border-[#fcf4ec] flex gap-3">
                  <button
                    onClick={() => openEditModal(p)}
                    className="flex-grow flex items-center justify-center gap-1.5 rounded-xl border border-[#c38358] text-[#c38358] hover:bg-[#fff5ef] py-2 text-xs font-bold transition"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="flex-grow flex items-center justify-center gap-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 py-2 text-xs font-bold transition"
                  >
                    <Trash2 size={12} />
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT/ADD MODAL OVERLAY */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-[#ead8c7]/50 mb-6">
              <h3 className="text-xl font-black text-[#2f221d]">
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Nama Produk *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Contoh: Brownies Matcha Almond"
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Harga (Rupiah) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    placeholder="Contoh: 65000"
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Kategori *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358] font-semibold cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                    <option value="NEW_CATEGORY">+ Tambah Kategori Baru...</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Lencana / Badge (Opsional)</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Contoh: Best Seller, New, Premium"
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                  />
                </div>
              </div>

              {categoryId === "NEW_CATEGORY" && (
                <div className="grid gap-4 sm:grid-cols-2 bg-[#fffcf9] p-4 rounded-2xl border border-[#ead8c7]/50">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#7a6a62]">Nama Kategori Baru *</label>
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Contoh: Pudding, Cookies"
                      className="w-full rounded-xl border border-[#ead8c7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#7a6a62]">Deskripsi Kategori Baru</label>
                    <input
                      type="text"
                      value={newCategoryDesc}
                      onChange={(e) => setNewCategoryDesc(e.target.value)}
                      placeholder="Deskripsi singkat kategori baru..."
                      className="w-full rounded-xl border border-[#ead8c7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#7a6a62]">Deskripsi Produk</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Masukkan deskripsi rasa, tekstur, dan topping produk..."
                  rows={3}
                  className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358] resize-none"
                />
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="grid gap-4 sm:grid-cols-2 border-t border-b border-[#ead8c7]/30 py-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Gambar Utama Produk *</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    placeholder="Link URL gambar produk"
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2 text-xs outline-none focus:border-[#c38358]"
                  />
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold bg-[#c38358] text-white py-1.5 px-3 rounded-lg cursor-pointer hover:bg-[#a96d45] transition">
                      Upload File
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
                    </label>
                    {uploading && <span className="text-[10px] text-[#7a6a62] animate-pulse">Mengunggah...</span>}
                  </div>
                  {imageUrl && (
                    <img src={imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded-xl mt-2 border border-[#ead8c7]" />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Gambar Galeri (Slideshow)</label>
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold bg-[#fdf7f2] border border-[#ead8c7] text-[#c38358] py-1.5 px-3 rounded-lg cursor-pointer hover:bg-[#fff5ef] transition">
                      Tambah Foto Galeri
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, true)} />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative w-12 h-12 border border-[#ead8c7] rounded-xl overflow-hidden group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Rating (Skala 5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Jumlah Terjual</label>
                  <input
                    type="text"
                    value={soldCount}
                    onChange={(e) => setSoldCount(e.target.value)}
                    required
                    placeholder="Contoh: 150+"
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#7a6a62]">Urutan Tampil (Index)</label>
                  <input
                    type="number"
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2] px-4 py-2.5 text-sm outline-none focus:border-[#c38358]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-[#c38358] border-[#ead8c7] rounded focus:ring-[#c38358]"
                />
                <label htmlFor="isActive" className="text-sm font-bold text-[#2f221d] cursor-pointer">
                  Aktif & Tampilkan di Website
                </label>
              </div>

              <div className="pt-4 border-t border-[#ead8c7]/50 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="rounded-xl bg-[#c38358] hover:bg-[#a96d45] text-white px-6 py-3 text-sm font-bold shadow-md transition disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ========== MODAL KELOLA KATEGORI ========== */}
      {showCategoryModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCategoryModal(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#ead8c7]/50 shrink-0">
              <h3 className="text-lg font-black text-[#2f221d]">📂 Kelola Kategori Menu</h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 flex-1 space-y-6" style={{ scrollbarWidth: "none" }}>
              {/* Form Tambah Cepat */}
              <form onSubmit={handleQuickCreateCategory} className="bg-[#fffaf5] border border-[#ead8c7]/60 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-black text-[#2f221d] uppercase tracking-wider">Tambah Kategori Baru</h4>
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Nama Kategori (cth: Cakes, Pastry)*"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#ead8c7] bg-white px-3 py-2 text-xs outline-none focus:border-[#c38358] font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="Deskripsi Singkat (Opsional)"
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full rounded-xl border border-[#ead8c7] bg-white px-3 py-2 text-xs outline-none focus:border-[#c38358]"
                  />
                  <button
                    type="submit"
                    disabled={submittingCat}
                    className="bg-[#c38358] hover:bg-[#a96d45] text-white rounded-xl text-xs font-bold py-2 px-4 shadow-sm transition disabled:opacity-60 cursor-pointer self-end flex items-center gap-1.5"
                  >
                    <Plus size={12} />
                    {submittingCat ? "Menambahkan..." : "Tambah Kategori"}
                  </button>
                </div>
              </form>

              {/* Daftar Kategori */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#2f221d] uppercase tracking-wider mb-3">Daftar Kategori Saat Ini</h4>
                {categories.length === 0 ? (
                  <p className="text-xs text-[#7a6a62] italic text-center py-4">Belum ada kategori.</p>
                ) : (
                  <div className="divide-y divide-[#ead8c7]/30 border border-[#ead8c7]/50 rounded-2xl overflow-hidden bg-white">
                    {categories.map((cat) => {
                      const count = products.filter((p) => p.category_id === cat.id).length;
                      return (
                        <div key={cat.id} className="flex items-center justify-between p-4 hover:bg-[#fffcf9] transition-colors">
                          <div className="min-w-0 pr-4">
                            <p className="text-sm font-bold text-[#2f221d] truncate">{cat.name}</p>
                            {cat.description && (
                              <p className="text-[11px] text-[#7a6a62] truncate mt-0.5">{cat.description}</p>
                            )}
                            <span className="inline-block mt-1 text-[10px] bg-[#ead8c7]/30 text-[#7a6a62] font-semibold px-2 py-0.5 rounded-full">
                              {count} produk
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            className="w-8 h-8 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 flex items-center justify-center transition cursor-pointer shrink-0"
                            title="Hapus Kategori"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#ead8c7]/50 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
