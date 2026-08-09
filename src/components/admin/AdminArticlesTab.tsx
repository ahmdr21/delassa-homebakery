import { useEffect, useState } from "react";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
} from "../../utils/supabase";
import type { DBArticle } from "../../utils/supabase";
import { showToast } from "../Toast";
import { Plus, Edit2, Trash2, FileText, Calendar, Eye, EyeOff, Search } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

export default function AdminArticlesTab() {
  const [articles, setArticles] = useState<DBArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Form modal state
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<DBArticle | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Loading states
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const allArticles = await getArticles(false); // Fetch all articles (including inactive)
      setArticles(allArticles);
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat data artikel.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Auto generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingArticle) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .trim()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/-+/g, "-"); // remove duplicate dashes
      setSlug(generatedSlug);
    }
  };

  const openAddModal = () => {
    setEditingArticle(null);
    setTitle("");
    setSlug("");
    setContent("");
    setCoverImage("");
    setIsActive(true);
    setShowModal(true);
  };

  const openEditModal = (a: DBArticle) => {
    setEditingArticle(a);
    setTitle(a.title);
    setSlug(a.slug);
    setContent(a.content);
    setCoverImage(a.cover_image || "");
    setIsActive(a.is_active);
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0];
      const uploadedUrl = await uploadArticleImage(file, file.name);
      setCoverImage(uploadedUrl);
      showToast("Gambar cover artikel berhasil diunggah dan dikompres!", "success");
    } catch (err) {
      console.error(err);
      showToast("Gagal mengunggah gambar cover.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) {
      showToast("Judul, Slug, dan Konten artikel wajib diisi.", "error");
      return;
    }

    setSubmitting(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      content: content.trim(),
      cover_image: coverImage.trim() || null,
      is_active: isActive,
    };

    try {
      if (editingArticle) {
        const updated = await updateArticle(editingArticle.id, payload);
        setArticles((prev) =>
          prev.map((art) => (art.id === editingArticle.id ? updated : art))
        );
        showToast("Artikel berhasil diperbarui!", "success");
      } else {
        const created = await createArticle(payload);
        setArticles((prev) => [created, ...prev]);
        showToast("Artikel baru berhasil dibuat!", "success");
      }
      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      if (err.code === "23505") {
        showToast("Slug sudah digunakan oleh artikel lain. Harap gunakan slug unik.", "error");
      } else {
        showToast("Gagal menyimpan artikel.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    const confirm = window.confirm(`Apakah Anda yakin ingin menghapus artikel "${itemTitle}"?`);
    if (!confirm) return;

    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((art) => art.id !== id));
      showToast("Artikel berhasil dihapus!", "success");
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus artikel.", "error");
    }
  };

  const toggleActiveStatus = async (art: DBArticle) => {
    try {
      const updated = await updateArticle(art.id, { is_active: !art.is_active });
      setArticles((prev) =>
        prev.map((item) => (item.id === art.id ? updated : item))
      );
      showToast(
        `Artikel telah di${updated.is_active ? "aktifkan (Publik)" : "nonaktifkan (Draft)"}!`,
        "success"
      );
    } catch (err) {
      console.error(err);
      showToast("Gagal mengubah status aktif artikel.", "error");
    }
  };

  const filteredArticles = articles.filter((art) =>
    art.title.toLowerCase().includes(query.toLowerCase()) ||
    art.slug.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-8 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-3xl border border-[#ead8c7]/30 shadow-sm">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} className="text-[#c38358]" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel berdasarkan judul atau slug..."
            className="w-full rounded-2xl border border-[#ead8c7] bg-[#fdf7f2]/50 pl-10 pr-4 py-2.5 text-xs font-bold outline-none focus:border-[#c38358] focus:bg-white transition-all"
          />
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#c38358] px-5 py-2.5 text-xs font-black text-white hover:bg-[#a66a42] transition cursor-pointer active:scale-95 shadow-md shadow-[#c38358]/10"
        >
          <Plus size={15} />
          <span>Tambah Artikel</span>
        </button>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-3xl border border-[#ead8c7]/30">
          <div className="w-10 h-10 border-4 border-[#c38358] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#ead8c7]/30">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-sm font-black text-[#6f615a]">Belum ada artikel.</p>
          <p className="text-xs text-gray-400 mt-1">Klik tombol "Tambah Artikel" di atas untuk membuat artikel pertama.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className={`bg-white rounded-3xl border ${
                art.is_active ? "border-[#ead8c7]/30" : "border-dashed border-red-200"
              } shadow-sm overflow-hidden flex flex-col`}
            >
              {/* Cover Image */}
              <div className="h-44 bg-[#fdf7f2] relative overflow-hidden shrink-0 border-b border-[#ead8c7]/20">
                {art.cover_image ? (
                  <img
                    src={art.cover_image}
                    alt={art.title}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <FileText size={40} />
                    <span className="text-[10px] mt-1 font-bold">Tidak ada cover image</span>
                  </div>
                )}
                {/* Status Badge */}
                <button
                  onClick={() => toggleActiveStatus(art)}
                  className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider uppercase cursor-pointer transition ${
                    art.is_active
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
                      : "bg-red-50 text-red-700 border border-red-100 hover:bg-red-100"
                  }`}
                  title="Klik untuk mengubah status aktif"
                >
                  {art.is_active ? (
                    <>
                      <Eye size={12} />
                      <span>Publik</span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={12} />
                      <span>Draft</span>
                    </>
                  )}
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold">
                    <Calendar size={12} />
                    <span>{new Date(art.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" })}</span>
                  </div>
                  <h3 className="mt-2 text-base font-black text-[#2f221d] line-clamp-2 leading-tight">
                    {art.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-[#c38358] font-bold break-all">
                    /{art.slug}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#6f615a] line-clamp-3">
                    {art.content.replace(/<[^>]*>/g, "") /* Strip HTML tags for list excerpt */}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-[#ead8c7]/20 pt-4">
                  <button
                    onClick={() => openEditModal(art)}
                    className="flex items-center gap-1 text-xs font-black text-[#c38358] hover:text-[#a66a42] cursor-pointer"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(art.id, art.title)}
                    className="flex items-center gap-1 text-xs font-black text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden border border-[#ead8c7]/50 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#ead8c7]/30 bg-[#fdf9f6] flex justify-between items-center shrink-0">
              <h2 className="text-lg font-black text-[#2f221d]">
                {editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-[#2f221d] font-bold text-sm"
              >
                Tutup
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Cover Image Upload */}
              <div>
                <label className="block text-xs font-black text-[#2f221d] uppercase tracking-wider mb-2">
                  Cover Image
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-32 h-20 bg-[#fdf7f2] rounded-xl border border-[#ead8c7]/40 overflow-hidden flex items-center justify-center shrink-0">
                    {coverImage ? (
                      <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <FileText size={24} className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                      id="coverImageInput"
                    />
                    <label
                      htmlFor="coverImageInput"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#c38358] bg-white px-4 py-2 text-xs font-bold text-[#c38358] hover:bg-[#fff5ef] transition cursor-pointer active:scale-98 shadow-sm"
                    >
                      {uploading ? "Mengunggah..." : "Pilih File Gambar (WebP Kompresi Otomatis)"}
                    </label>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Mendukung PNG, JPG, WebP. Gambar akan otomatis dikonversi ke WebP & dikompresi agar hemat space.
                    </p>
                  </div>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black text-[#2f221d] uppercase tracking-wider mb-1.5">
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="Contoh: Manfaat Coklat untuk Brownies Premium"
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/50 px-4 py-2.5 text-xs font-bold outline-none focus:border-[#c38358] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#2f221d] uppercase tracking-wider mb-1.5">
                    Slug Artikel (URL Path)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    required
                    placeholder="contoh-manfaat-coklat"
                    className="w-full rounded-xl border border-[#ead8c7] bg-[#fdf7f2]/50 px-4 py-2.5 text-xs font-bold outline-none focus:border-[#c38358] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-black text-[#2f221d] uppercase tracking-wider mb-1.5">
                  Isi Artikel (WordPress-Style Editor)
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Ketik artikel di sini. Anda bisa menggunakan peralatan editor di atas untuk merapikan tulisan..."
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActiveCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-[#c38358] focus:ring-[#c38358] border-[#ead8c7]"
                />
                <label htmlFor="isActiveCheck" className="text-xs font-black text-[#2f221d] cursor-pointer">
                  Terbitkan Langsung (Aktif/Publik). Jika dimatikan, akan menjadi Draft.
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-[#ead8c7]/20 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="rounded-xl bg-[#c38358] px-5 py-2.5 text-xs font-black text-white hover:bg-[#a66a42] transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? "Menyimpan..." : "Simpan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
