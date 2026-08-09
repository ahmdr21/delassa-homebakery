import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/supabase";
import type { DBArticle } from "../utils/supabase";
import { FileText } from "lucide-react";

export default function Articles() {
  const [articles, setArticles] = useState<DBArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // 4 kolom x 3 baris = 12 artikel

  useEffect(() => {
    async function fetchArticles() {
      try {
        const activeArticles = await getArticles(true); // Only active articles
        setArticles(activeArticles);
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // SEO metadata list artikel
  useEffect(() => {
    document.title = "Artikel & Cerita - Delassa Home Bakery";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Temukan berbagai tips menarik seputar dessert premium, resep pilihan, dan cerita di balik dapur pembuatan kue basah Delassa Home Bakery."
      );
    }
    return () => {
      document.title = "Delassa Home Bakery | Brownies Homemade Bekasi";
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          "Delassa Home Bakery menyediakan brownies homemade di Bekasi dengan rich chocolate, topping melimpah, dan packaging aesthetic untuk hampers, hadiah spesial, dan sweet moments favoritmu."
        );
      }
    };
  }, []);

  return (
    <main className="bg-[#faf7f2] min-h-screen overflow-hidden pb-20 sm:pb-24 pt-10 sm:pt-14">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* HEADER */}
          <div className="text-center">
            <p className="uppercase tracking-[3px] text-[#c38358] text-[11px] font-bold">
              Eksplorasi Rasa
            </p>
            <h1 className="mt-3 text-[#2f221d] font-black leading-tight tracking-tight text-[32px] sm:text-[44px]">
              Artikel & Cerita
              <span className="block text-[#c38358]">Delassa ✨</span>
            </h1>
            <p className="mt-4 text-[#6f615a] text-xs sm:text-sm leading-relaxed max-w-[550px] mx-auto">
              Temukan berbagai tips menarik seputar dessert premium, resep pilihan, dan cerita di balik dapur pembuatan kue basah Delassa Home Bakery.
            </p>
          </div>

          {/* CONTENT GRID */}
          {loading ? (
            <div className="flex justify-center items-center py-20 mt-10">
              <div className="w-10 h-10 border-4 border-[#c38358] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-14 mt-10 bg-white rounded-2xl border border-[#ead8c7]/50 shadow-sm max-w-sm mx-auto">
              <FileText size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-xs font-black text-[#6f615a]">Belum ada artikel yang dipublikasikan.</p>
              <p className="text-[11px] text-gray-400 mt-1">Kami akan segera menerbitkan cerita menarik untuk Anda!</p>
              <Link
                to="/"
                className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#c38358] px-5 py-2.5 text-xs font-black text-white hover:bg-[#a66a42] transition shadow-md shadow-[#c38358]/10"
              >
                Kembali ke Beranda
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
                {articles.slice(0, visibleCount).map((art) => (
                  <article
                    key={art.id}
                    className="flex flex-col group cursor-pointer"
                  >
                    {/* Thumbnail Image Container (16:9 Aspect Ratio) */}
                    <div className="aspect-[16/9] w-full bg-white rounded-2xl border border-[#ead8c7]/30 overflow-hidden relative shrink-0">
                      {art.cover_image ? (
                        <img
                          src={art.cover_image}
                          alt={art.title}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                          <FileText size={24} />
                        </div>
                      )}
                    </div>

                    {/* Details below image */}
                    <div className="mt-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tag */}
                        <span className="text-[10px] tracking-[1.5px] font-bold text-[#c38358] uppercase">
                          DELASSA STORIES
                        </span>

                        {/* Title */}
                        <h2 className="mt-2 text-sm sm:text-base font-black text-[#2f221d] leading-snug group-hover:text-[#c38358] transition duration-200 line-clamp-2">
                          <Link to={`/artikel/${art.slug}`}>{art.title}</Link>
                        </h2>
                      </div>

                      {/* Meta Info (Admin / Date in Uppercase) */}
                      <p className="mt-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        ADMIN &nbsp;/&nbsp;&nbsp;{new Date(art.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).toUpperCase()}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* LOAD MORE BUTTON */}
              {articles.length > visibleCount && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-[#c38358] hover:bg-[#c38358] hover:text-white px-6 py-2.5 text-xs font-black text-[#c38358] transition cursor-pointer active:scale-95 shadow-sm"
                  >
                    Lihat Artikel Lainnya
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
