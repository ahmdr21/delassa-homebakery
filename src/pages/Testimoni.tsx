import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getAllReviews, addProductReview } from "../utils/supabase";
import type { Review } from "../utils/supabase";

import "swiper/css";

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
  "Roasted Milk Tea"
];

export default function Testimoni() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState("Umum / Bakery");
  const [submitting, setSubmitting] = useState(false);

  // Filter states
  const [filterProduct, setFilterProduct] = useState("Semua");
  const [filterSource, setFilterSource] = useState("all");

  useEffect(() => {
    let isCurrent = true;

    getAllReviews()
      .then((data) => {
        if (isCurrent) {
          setReviews(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load reviews:", err);
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

  const handleSubmitReview = async () => {
    if (!name.trim() || !reviewText.trim()) {

      return;
    }

    setSubmitting(true);
    try {
      await addProductReview({
        product_title: selectedProduct,
        reviewer_name: name,
        reviewer_username: username.trim() 
          ? (username.startsWith("@") ? username : `@${username}`) 
          : "@pembeli",
        rating,
        review: reviewText,
        source: "website",
      });

      setName("");
      setUsername("");
      setReviewText("");
      setRating(5);
      setSelectedProduct("Umum / Bakery");

    } catch (err) {
      console.error(err);

    } finally {
      setSubmitting(false);
    }
  };

  // Filter logic
  const filteredReviews = reviews.filter((r) => {
    const matchProduct = filterProduct === "Semua" || r.product_title === filterProduct;
    const matchSource = filterSource === "all" || r.source === filterSource;
    return matchProduct && matchSource;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
      {/* HEADER */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-[#f3e5d8] px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-[#c38358]" />
          <p className="text-[11px] sm:text-[12px] tracking-[3px] uppercase font-bold text-[#9b6a50]">
            ULASAN PELANGGAN
          </p>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-[#3b2b26]">
          Apa Kata Mereka ✨
        </h2>
        <p className="text-gray-500 text-sm sm:text-lg mt-4 max-w-2xl mx-auto">
          Kepuasan pelanggan adalah prioritas kami. Berikut adalah review manis dari pembeli 
          setia Delassa Home Bakery dari berbagai media. 🤎
        </p>
      </div>

      {/* SWIPER FEATURED - Top rated reviews */}
      {reviews.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={reviews.length >= 3}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-8"
          >
            {reviews.slice(0, 8).map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#fffdfb] rounded-3xl p-6 sm:p-8 border border-[#ead8c7]/50 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-yellow-400 text-xl">
                        {"★".repeat(item.rating)}
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fff5ef] text-[#c38358] border border-[#ead8c7]/30">
                        {item.product_title}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-5 leading-relaxed text-sm sm:text-base min-h-[90px]">
                      “{item.review}”
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 mt-6 border-t border-[#ead8c7]/20 pt-4">
                    <div className="w-11 h-11 rounded-full bg-[#c38358] text-white flex items-center justify-center font-bold text-md">
                      {item.reviewer_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#3b2b26] text-sm sm:text-base leading-none">
                        {item.reviewer_name}
                      </h4>
                      <p className="text-gray-400 text-xs mt-1">
                        {item.reviewer_username}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* FILTER & EXPLORE SECTION (Tampilan Tersendiri) */}
      <div className="mt-16 sm:mt-24 border-t border-[#ead8c7]/40 pt-12 sm:pt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#3b2b26]">
              Jelajahi Ulasan Produk 🔎
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Filter ulasan berdasarkan varian menu atau sumber review.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <label className="text-[11px] font-bold text-[#7a6a62]">Pilih Produk</label>
              <select
                value={filterProduct}
                onChange={(e) => setFilterProduct(e.target.value)}
                className="bg-white border border-[#ead8c7] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#3b2b26] outline-none focus:border-[#c38358] font-semibold cursor-pointer w-full sm:w-48"
              >
                <option value="Semua">Semua Produk</option>
                {productsList.map((prod) => (
                  <option key={prod} value={prod}>{prod}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 w-full sm:w-auto">
              <label className="text-[11px] font-bold text-[#7a6a62]">Sumber</label>
              <div className="flex bg-[#f3e5d8]/40 border border-[#ead8c7]/60 p-1 rounded-xl">
                {[
                  { id: "all", label: "Semua" },
                  { id: "instagram", label: "Instagram" },
                  { id: "whatsapp", label: "WhatsApp" },
                  { id: "website", label: "Website" }
                ].map((src) => (
                  <button
                    key={src.id}
                    onClick={() => setFilterSource(src.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filterSource === src.id 
                        ? "bg-[#c38358] text-white shadow-sm" 
                        : "text-[#7a6a62] hover:text-[#c38358]"
                    }`}
                  >
                    {src.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS GRID LIST */}
        {loading ? (
          <div className="text-center py-16 text-[#7a6a62] font-semibold">
            Memuat ulasan...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#ead8c7]/80 text-[#7a6a62] font-medium max-w-4xl mx-auto">
            Belum ada ulasan yang cocok dengan kriteria filter.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-white p-6 rounded-2xl border border-[#ead8c7]/30 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#fff5ef] text-[#c38358] border border-[#ead8c7]/30">
                      {rev.product_title}
                    </span>
                    {rev.source === "instagram" ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100 flex items-center gap-1">
                        📸 Instagram
                      </span>
                    ) : rev.source === "whatsapp" ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                        💬 WhatsApp
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#c38358] border border-amber-100 flex items-center gap-1">
                        ✨ Website
                      </span>
                    )}
                  </div>
                  <div className="text-yellow-400 text-md mb-2">
                    {"★".repeat(rev.rating)}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    “{rev.review}”
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-6 border-t border-[#ead8c7]/10 pt-4">
                  <div className="w-8 h-8 rounded-full bg-[#f3e5d8] text-[#c38358] flex items-center justify-center font-extrabold text-xs">
                    {rev.reviewer_name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-[#3b2b26] text-xs leading-none">
                      {rev.reviewer_name}
                    </h5>
                    <p className="text-gray-400 text-[10px] mt-0.5">
                      {rev.reviewer_username}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FORM INPUT */}
      <div className="bg-white rounded-[30px] sm:rounded-[35px] p-6 sm:p-10 shadow-lg mt-16 sm:mt-28 max-w-3xl mx-auto border border-[#ead8c7]/40">
        <h3 className="text-2xl sm:text-3xl font-black text-[#3b2b26]">
          Beri Review Kamu 🤎
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
          Tulis ulasan jujur untuk membantu kami meningkatkan kualitas produk Delassa.
        </p>

        <div className="flex flex-col gap-4 sm:gap-5 mt-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7a6a62]">Nama Lengkap *</label>
              <input
                type="text"
                placeholder="Nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#fdf7f2] px-4 py-3 rounded-xl border border-[#ead8c7]/60 outline-none text-sm focus:border-[#c38358] transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7a6a62]">Username Instagram / Kontak</label>
              <input
                type="text"
                placeholder="Cth: @nama.kamu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#fdf7f2] px-4 py-3 rounded-xl border border-[#ead8c7]/60 outline-none text-sm focus:border-[#c38358] transition"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#7a6a62]">Pilih Produk yang Diulas *</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="bg-[#fdf7f2] px-4 py-3 rounded-xl border border-[#ead8c7]/60 outline-none text-sm focus:border-[#c38358] font-medium cursor-pointer transition w-full"
              >
                {productsList.map((prod) => (
                  <option key={prod} value={prod}>{prod}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 justify-center">
              <label className="text-[11px] font-bold text-[#7a6a62]">Beri Rating Bintang</label>
              <div className="flex gap-2.5 text-3xl mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition hover:scale-110 ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#7a6a62]">Review / Ulasan Kamu *</label>
            <textarea
              placeholder="Ceritakan rasa brownies/bolu/minuman yang kamu nikmati..."
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              className="bg-[#fdf7f2] px-4 py-3 rounded-xl border border-[#ead8c7]/60 outline-none text-sm focus:border-[#c38358] resize-none transition w-full"
            ></textarea>
          </div>

          <button
            onClick={handleSubmitReview}
            disabled={submitting}
            className="bg-[#3b2b26] hover:bg-black text-white py-4 rounded-xl font-bold transition shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer mt-2 text-sm sm:text-base"
          >
            {submitting ? "Sedang mengirim..." : "Kirim Ulasan 🚀"}
          </button>
        </div>
      </div>
    </section>
  );
}
