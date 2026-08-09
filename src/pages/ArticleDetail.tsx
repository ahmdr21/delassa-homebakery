import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleBySlug } from "../utils/supabase";
import type { DBArticle } from "../utils/supabase";
import { Calendar, ChevronLeft, FileText, Share2 } from "lucide-react";
import { showToast } from "../components/Toast";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<DBArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getArticleBySlug(slug);
        // Only show if article exists and is active
        if (data && data.is_active) {
          setArticle(data);
        } else {
          setArticle(null);
        }
      } catch (err) {
        console.error("Gagal memuat detail artikel:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  // Dinamis SEO (Title & Description)
  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Delassa Home Bakery`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        const plainTextExcerpt = article.content.replace(/<[^>]*>/g, "").slice(0, 155) + "...";
        metaDesc.setAttribute('content', plainTextExcerpt);
      }
    }
    
    return () => {
      document.title = "Delassa Home Bakery | Brownies Homemade Bekasi";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          "Delassa Home Bakery menyediakan brownies homemade di Bekasi dengan rich chocolate, topping melimpah, dan packaging aesthetic untuk hampers, hadiah spesial, dan sweet moments favoritmu."
        );
      }
    };
  }, [article]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => showToast("Link artikel berhasil disalin!", "success"))
      .catch(() => showToast("Gagal menyalin link.", "error"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center pt-24 pb-20">
        <div className="w-12 h-12 border-4 border-[#c38358] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <main className="bg-[#faf7f2] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center bg-white rounded-[32px] border border-[#ead8c7]/50 p-10 shadow-sm">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-xl font-black text-[#2f221d]">Artikel Tidak Ditemukan</h1>
          <p className="text-xs text-gray-400 mt-2">
            Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus oleh administrator.
          </p>
          <div className="mt-8">
            <Link
              to="/artikel"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#c38358] px-6 py-3 text-xs font-black text-white hover:bg-[#a66a42] transition shadow-md shadow-[#c38358]/10"
            >
              <ChevronLeft size={16} />
              <span>Lihat Semua Artikel</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#faf7f2] min-h-screen pt-10 sm:pt-14 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-[800px] mx-auto bg-white rounded-[32px] border border-[#ead8c7]/40 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        {/* Back navigation */}
        <div className="px-6 sm:px-10 py-5 bg-[#fdf9f6] border-b border-[#ead8c7]/20 flex justify-between items-center">
          <Link
            to="/artikel"
            className="inline-flex items-center gap-1 text-xs font-black text-[#c38358] hover:text-[#a66a42] transition"
          >
            <ChevronLeft size={16} />
            <span>Kembali ke Artikel</span>
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7a6a62] hover:text-[#c38358] transition cursor-pointer"
            title="Bagikan Artikel"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="h-[250px] sm:h-[400px] w-full relative overflow-hidden bg-gray-50 border-b border-[#ead8c7]/10">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Details */}
        <div className="px-6 sm:px-10 py-8 sm:py-12">
          {/* Meta Information */}
          <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
            <Calendar size={13} className="text-[#c38358]" />
            <span>
              {new Date(article.created_at).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-2xl sm:text-4xl font-black text-[#2f221d] leading-tight">
            {article.title}
          </h1>

          <div className="h-[1px] bg-[#ead8c7]/30 my-8"></div>

          {/* Article Text Content */}
          <div
            className="article-rich-text text-[#3b2b26] text-[15px] sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: /<[a-z][\s\S]*>/i.test(article.content)
                ? article.content
                : article.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>"),
            }}
          />
        </div>
      </article>
    </main>
  );
}
