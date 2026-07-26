import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Wallet,
  MapPin,
  ShoppingBag,
  Plus,
  Minus,
} from "lucide-react";
import { getAllReviews, addProductReview } from "../utils/supabase";
import type { Review } from "../utils/supabase";

/* ====================================================== */
/* ASSETS */
/* ====================================================== */

/* HERO BANNERS */
import banner1 from "../assets/bannerdesktop13.webp";
import banner2 from "../assets/bannerdesktop14.webp";
import banner3 from "../assets/bannerdesktop15.webp";
import banner4 from "../assets/bannerdesktop17.webp";

/* FRESH SECTION */
import freshImage from "../assets/fresh.webp";

/* PRODUCT IMAGES (Reusable for product list and popups) */
import almond1 from "../assets/browniesalmond1.webp";
import almond2 from "../assets/browniesalmond2.webp";

import cookies1 from "../assets/browniescoockies1.webp";
import cookies2 from "../assets/browniescoockies2.webp";

import mixImg from "../assets/mixtopping3.webp";
import mix1 from "../assets/mixtopping1.webp";
import mix2 from "../assets/mixtopping2.webp";

/* ====================================================== */
/* DATA */
/* ====================================================== */

const banners = [
  banner4,
  banner1,
  banner2,
  banner3,
];

type Product = {
  title: string;
  price: string;
  badge: string | null;
  description: string;
  image: string;
  images: string[];
  rating?: number;
  soldCount?: string;
};

type ProductRatingSummary = {
  average: number;
  total: number;
};

const products: Product[] = [
  {
    title: "Brownies Almond",
    price: "Rp65.000",
    badge: "Premium",
    image: almond1,
    description:
      "Perpaduan brownies premium dengan topping almond crunchy yang gurih dan elegan.",
    images: [
      almond1,
      almond2,
    ],
    rating: 4.8,
    soldCount: "80+",
  },

  {
    title: "Brownies Cookies",
    price: "Rp68.000",
    badge: "Best Seller",
    image: cookies1,
    description:
      "Kombinasi brownies moist dengan topping cookies favorit untuk sweet moments spesial.",
    images: [
      cookies1,
      cookies2,
    ],
    rating: 4.9,
    soldCount: "200+",
  },

  {
    title: "Brownies Mix Topping",
    price: "Rp70.000",
    badge: "Recommended",
    image: mixImg,
    description:
      "Rich chocolate brownies dengan topping caramel biscuit, choco ball, sliced almond, chocolate cream biscuit, dan roasted peanut crumble.",
    images: [
      mix1,
      mix2,
    ],
    rating: 4.8,
    soldCount: "120+",
  },
];

const trustSignals = [
  {
    icon: Clock,
    title: "Pre-order H-1",
    description: "Pesanan dibuat fresh sesuai jadwal pickup.",
  },
  {
    icon: Wallet,
    title: "QRIS & Transfer",
    description: "Pembayaran fleksibel setelah admin konfirmasi.",
  },
  {
    icon: MapPin,
    title: "Pickup Bekasi",
    description: "Opsi pickup dan pengiriman dibantu admin.",
  },
];

export default function Home() {

  /* ====================================================== */
  /* STATE */
  /* ====================================================== */

  const [currentSlide, setCurrentSlide] = useState(0);

  const [open, setOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [activeImage, setActiveImage] = useState(0);

  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allProductReviews, setAllProductReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewUsername, setReviewUsername] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const { cart, setCartOpen, addToCart, updateQty } = useCart();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleAddToCart = (product: Product, quantity: number = 1, openDrawer: boolean = false) => {
    const parsedPrice = Number(String(product.price).replace(/[^\d]/g, ""));
    addToCart({ title: product.title, price: parsedPrice, qty: quantity });

    if (openDrawer) {
      setCartOpen(true);
    }
  };

  const handleQtyChange = (product: Product, delta: number) => {
    const parsedPrice = Number(String(product.price).replace(/[^\d]/g, ""));

    if (delta > 0) {
      addToCart({ title: product.title, price: parsedPrice, qty: 1 });
      return;
    }

    updateQty(product.title, -1);
  };

  const getQtyInCart = (title: string) => cart.find((item) => item.title === title)?.qty ?? 0;

  /* ====================================================== */
  /* REVIEWS & RATINGS */
  /* ====================================================== */

  useEffect(() => {
    let isCurrent = true;

    getAllReviews()
      .then((data) => {
        if (isCurrent) {
          setAllProductReviews(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load product rating summaries:", err);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (selectedProduct && allProductReviews.length > 0) {
      const key = selectedProduct.title.trim().toLowerCase();
      const filtered = allProductReviews.filter(
        (r) => r.product_title.trim().toLowerCase() === key
      );
      setReviews(filtered);
      setLoadingReviews(false);
    } else if (selectedProduct && allProductReviews.length === 0) {
      // allProductReviews belum selesai dimuat, tetap loading
      setReviews([]);
    }
  }, [selectedProduct, allProductReviews]);

  const productRatingSummaries = useMemo(() => {
    const totals = allProductReviews.reduce<Record<string, { ratingTotal: number; reviewTotal: number }>>(
      (acc, review) => {
        const key = review.product_title.trim().toLowerCase();
        const current = acc[key] ?? {
          ratingTotal: 0,
          reviewTotal: 0,
        };

        return {
          ...acc,
          [key]: {
            ratingTotal: current.ratingTotal + review.rating,
            reviewTotal: current.reviewTotal + 1,
          },
        };
      },
      {}
    );

    return Object.entries(totals).reduce<Record<string, ProductRatingSummary>>(
      (acc, [key, summary]) => ({
        ...acc,
        [key]: {
          average: Number((summary.ratingTotal / summary.reviewTotal).toFixed(1)),
          total: summary.reviewTotal,
        },
      }),
      {}
    );
  }, [allProductReviews]);

  const getProductRatingSummary = (product: Product): ProductRatingSummary => {
    const key = product.title.trim().toLowerCase();
    const summary = productRatingSummaries[key];
    if (summary && summary.total > 0) {
      return summary;
    }
    return {
      average: 0,
      total: 0,
    };
  };

  const modalRatingSummary = useMemo(() => {
    if (!selectedProduct) return { average: 0, total: 0 };
    if (reviews.length > 0) {
      const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
      return { average: Number(avg.toFixed(1)), total: reviews.length };
    }
    return getProductRatingSummary(selectedProduct);
  }, [selectedProduct, reviews, productRatingSummaries]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    if (!reviewName.trim() || !reviewText.trim()) {
      alert("Nama dan ulasan wajib diisi! ✨");
      return;
    }
    setSubmittingReview(true);
    try {
      await addProductReview({
        product_title: selectedProduct.title,
        reviewer_name: reviewName,
        reviewer_username: reviewUsername.trim()
          ? (reviewUsername.startsWith("@") ? reviewUsername : `@${reviewUsername}`)
          : "@pembeli_delassa",
        rating: reviewRating,
        review: reviewText,
        source: "website",
      });
      setReviewName("");
      setReviewUsername("");
      setReviewRating(5);
      setReviewText("");
      setShowWriteForm(false);
      alert("Terima kasih! Ulasan kamu sudah dikirim dan akan muncul setelah disetujui admin 🤎");
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim ulasan. Coba lagi ya.");
    } finally {
      setSubmittingReview(false);
    }
  };

  /* ====================================================== */
  /* AUTO SLIDE */
  /* ====================================================== */

  useEffect(() => {

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <main className="bg-[#f7f3ef] overflow-hidden">

      {/* ====================================================== */}
      {/* HERO BANNER */}
      {/* ====================================================== */}

      <section className="w-full px-3 sm:px-5 lg:px-8 pt-3 sm:pt-5">

        <div className="max-w-[1500px] mx-auto">

          <div
            className="
              group
              relative
              overflow-hidden

              rounded-[22px]
              sm:rounded-[34px]

              bg-[#efe7df]
            "
          >

            {/* PREV BUTTON */}
            <button
              onClick={prevSlide}
              className="
                absolute
                left-3 sm:left-6
                top-1/2
                -translate-y-1/2
                z-10
                w-10 h-10 sm:w-12 sm:h-12
                rounded-full
                bg-white/20 hover:bg-white/35
                border border-white/25
                backdrop-blur-md
                text-white
                flex items-center justify-center
                cursor-pointer
                transition-all duration-300
                opacity-0 group-hover:opacity-100
                hover:scale-105
                shadow-lg
              "
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>

            {/* NEXT BUTTON */}
            <button
              onClick={nextSlide}
              className="
                absolute
                right-3 sm:right-6
                top-1/2
                -translate-y-1/2
                z-10
                w-10 h-10 sm:w-12 sm:h-12
                rounded-full
                bg-white/20 hover:bg-white/35
                border border-white/25
                backdrop-blur-md
                text-white
                flex items-center justify-center
                cursor-pointer
                transition-all duration-300
                opacity-0 group-hover:opacity-100
                hover:scale-105
                shadow-lg
              "
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* DESKTOP */}

            <div className="hidden md:block">

              <img
                src={banners[currentSlide]}
                alt="Brownies Premium Delassa Home Bakery Bekasi"

                fetchPriority="high"
                loading="eager"

                className="
                  w-full
                  h-auto

                  object-cover
                  object-center

                  transition-all
                  duration-500
                "
              />

            </div>

            {/* MOBILE */}

            <div className="block md:hidden">

              <img
                src={banners[currentSlide]}
                alt="Brownies Homemade Delassa Bekasi"

                fetchPriority="high"
                loading="eager"

                className="
                  w-full
                  h-auto

                  object-cover
                  object-center

                  transition-all
                  duration-500
                "
              />

            </div>

            {/* DOTS */}

            <div
              className="
                absolute

                bottom-3
                left-1/2
                -translate-x-1/2

                flex
                items-center
                gap-2
              "
            >

              {banners.map((_, index) => (

                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}

                  aria-label={`Slide ${index + 1}`}

                  className={`
                    transition-all
                    duration-300
                    rounded-full

                    ${currentSlide === index
                      ? "w-6 h-2 bg-[#b07b5d]"
                      : "w-2 h-2 bg-white/70 hover:bg-white"
                    }
                  `}
                />

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* ABOUT */}
      {/* ====================================================== */}

      <section className="pt-14 sm:pt-24 px-5 sm:px-8">

        <div className="max-w-[1200px] mx-auto text-center">

          <p
            className="
              text-[#c58b67]

              uppercase
              tracking-[4px]

              text-[11px]
              sm:text-[13px]

              font-semibold
            "
          >

            Brownies Premium Bekasi

          </p>

          <h1
            className="
              mt-4
              sm:mt-5

              text-[#2f221d]

              font-black
              leading-[1]

              text-[34px]
              sm:text-[60px]
              lg:text-[82px]
            "
          >

            Homemade Brownies
            <br />
            With Premium Taste

          </h1>

          <p
            className="
              mt-6
              sm:mt-8

              max-w-[920px]
              mx-auto

              text-[#5f534d]

              leading-relaxed

              text-[15px]
              sm:text-[20px]
            "
          >

            Delassa Home Bakery menghadirkan brownies premium homemade
            di Bekasi dengan tekstur fudgy, rich chocolate,
            dan topping melimpah yang dibuat fresh setiap hari.

          </p>

        </div>

      </section>

      {/* ====================================================== */}
      {/* TRUST SIGNALS */}
      {/* ====================================================== */}

      <section className="pt-8 sm:pt-12 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {trustSignals.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-[24px] border border-[#e8d5c4] bg-white/80 backdrop-blur-sm px-5 py-6 shadow-[0_8px_30px_rgba(195,131,88,0.06)] hover:shadow-[0_16px_40px_rgba(195,131,88,0.14)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fdf5ef] to-[#f4e4d4] border border-[#e8cdb7] shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-[#c38358]" />
                  </div>
                  <div>
                    <p className="text-[15px] font-extrabold text-[#2f221d] tracking-wide">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] leading-relaxed text-[#7a6a62]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================== */}
      {/* FRESH SECTION */}
      {/* ====================================================== */}

      <section className="pt-14 sm:pt-24 px-3 sm:px-8">

        <div className="max-w-[1500px] mx-auto">

          <div
            className="
              relative
              overflow-hidden

              rounded-[24px]
              sm:rounded-[40px]
              rounded-br-[80px]
              sm:rounded-br-[140px]
              shadow-[0_20px_50px_rgba(0,0,0,0.1)]
            "
          >

            <img
              src={freshImage}
              alt="Freshly baked brownies premium"

              loading="lazy"

              className="
                w-full

                h-[500px]
                sm:h-[560px]
                lg:h-[620px]

                object-cover
                object-center
              "
            />

            <div
              className="
    absolute
    inset-0

    bg-gradient-to-r
    from-[#2f221dd9]
    via-[#2f221d55]
    to-[#2f221d10]
  "
            />

            <div
              className="
                absolute
                inset-0

                flex
                items-center
              "
            >

              <div className="px-5 sm:px-12 lg:px-16 max-w-[760px]">

                <p
                  className="
                    text-[#efbb90]

                    uppercase
                    tracking-[4px]

                    text-[11px]
                    sm:text-[14px]

                    font-semibold
                  "
                >

                  Made By Order

                </p>

                <h2
                  className="
                    mt-4

                    text-white

                    font-black
                    leading-[0.92]

                    text-[46px]
                    sm:text-[78px]
                    lg:text-[110px]
                  "
                >

                  Freshly Baked
                  <br />
                  Everyday

                  <p
                    className="
                      mt-6

                      max-w-[560px]

                      text-white/85

                      leading-relaxed

                      font-light

                      tracking-[0.2px]

                      text-[15px]
                      sm:text-[17px]
                      lg:text-[18px]
                    "
                  >

                    Freshly baked by order,
                    karena kualitas brownies terbaik
                    datang dari proses yang fresh.
                    Dipanggang khusus agar rasa lebih rich,
                    tekstur lebih lembut,
                    dan lebih nikmat saat diterima.

                  </p>

                </h2>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* PRODUCTS */}
      {/* ====================================================== */}

      <section
        className="
          pt-14
          sm:pt-24

          pb-14
          sm:pb-20

          px-5
          sm:px-8
        "
      >

        <div className="max-w-[1300px] mx-auto">

          {/* TITLE */}

          <div className="text-center">

            <p
              className="
                text-[#c58b67]

                uppercase
                tracking-[4px]

                text-[11px]
                sm:text-[13px]

                font-semibold
              "
            >

              Our Products

            </p>

            <h2
              className="
                mt-4

                text-[#2f221d]

                font-black
                leading-none

                text-[36px]
                sm:text-[60px]
                lg:text-[72px]
              "
            >

              Best Seller Brownies

            </h2>

          </div>

          {/* GRID */}

          <section aria-label="Product Menu" className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-14">
            {products.map((item: Product, index: number) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col h-full bg-white border border-[#e8d5c4] rounded-[24px] sm:rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(195,131,88,0.15)] transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none cursor-pointer"
                onClick={() => {
                  setShowWriteForm(false);
                  setShowAllReviews(false);
                  setReviews([]);
                  setLoadingReviews(true);
                  setSelectedProduct(item);
                  setActiveImage(0);
                  setQty(1);
                  setOpen(true);
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-square sm:aspect-[16/10] lg:aspect-[16/9] object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  {item.badge && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#d99f73] to-[#b07b5d] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-extrabold uppercase tracking-[1px] shadow-md border border-white/20">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-7 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-[16px] sm:text-[24px] leading-[1.2] tracking-tight font-black text-[#2f221d] line-clamp-2 group-hover:text-[#b07b5d] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between flex-wrap gap-x-1 mt-1 sm:mt-2.5">
                      <p className="text-[#c38358] text-[14px] sm:text-[20px] font-extrabold">{item.price}</p>
                      <div className="flex items-center gap-1 text-[10px] sm:text-[12px] text-[#7a6a62] font-semibold">
                        <span className="text-yellow-500 font-bold">★</span>
                        <span>{getProductRatingSummary(item).average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="hidden sm:block mt-4 text-[#7a6a62] text-[14px] leading-6 line-clamp-3 flex-grow">
                    {item.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-[#f2e6dc] flex flex-col gap-3">
                    {getQtyInCart(item.title) > 0 ? (
                      <div className="flex items-center justify-between rounded-full border border-[#c38358]/35 bg-[#fffaf5] p-1.5 shadow-inner">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQtyChange(item, -1);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#e8d5c4] text-[#c38358] shadow-sm hover:bg-[#fff6f0] active:scale-95 transition-all"
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold text-[#2f221d]">
                          {getQtyInCart(item.title)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQtyChange(item, 1);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c38358] text-white shadow-sm hover:bg-[#a96d45] active:scale-95 transition-all"
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#c38358] hover:bg-[#a96d45] text-white px-5 py-3.5 rounded-full text-[11px] sm:text-[13px] font-extrabold tracking-wide shadow-[0_8px_20px_rgba(195,131,88,0.2)] hover:shadow-[0_12px_24px_rgba(195,131,88,0.3)] hover:-translate-y-[2px] transition-all duration-300"
                      >
                        <ShoppingBag size={16} />
                        <span>Tambah ke Keranjang</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </section>

        </div>

      </section>

      {/* ====================================================== */}
      {/* PRODUCT MODAL */}
      {/* ====================================================== */}

      {/* ====================================================== */}
      {/* PRODUCT MODAL */}
      {/* ====================================================== */}

      {open && selectedProduct && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end lg:items-center justify-center lg:px-5 lg:py-6"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#fffaf5] w-full max-w-[1000px] rounded-t-[28px] lg:rounded-[32px] overflow-hidden shadow-2xl"
            style={{ maxHeight: '92dvh' }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 text-white text-lg sm:text-xl flex items-center justify-center cursor-pointer"
            >
              ×
            </button>
            {(() => {
              const productImages = Array.from(new Set([selectedProduct.image, ...selectedProduct.images].filter(Boolean)));
              return (
                <div className="flex flex-col lg:grid lg:grid-cols-2 overflow-y-auto lg:overflow-hidden" style={{ maxHeight: '92dvh' }}>
                  {/* Left Column: Product Main Image & Shopee-style Thumbnails below it */}
                  <div className="bg-[#f5ede5] p-5 sm:p-8 flex flex-col justify-between lg:h-full lg:overflow-hidden">
                    <div className="flex-grow flex items-center justify-center">
                      <img
                        src={productImages[activeImage] || selectedProduct.image}
                        alt={selectedProduct.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-square max-h-[260px] sm:max-h-[360px] lg:max-h-[420px] object-cover object-center rounded-2xl shadow-md"
                      />
                    </div>

                    {/* Thumbnails row at the bottom of left column */}
                    <div className="flex gap-2 mt-4 sm:mt-6 justify-center overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {productImages.map((img: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`overflow-hidden rounded-xl border-2 transition-all duration-300 w-12 h-12 sm:w-16 sm:h-16 shrink-0 cursor-pointer ${activeImage === index ? "border-[#b07b5d] scale-105 shadow-sm" : "border-[#ead8c7]"
                            }`}
                        >
                          <img src={img} alt={`Preview ${index}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Product Info, Reviews & Action Buttons */}
                  <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <p className="text-[#b07b5d] uppercase tracking-[4px] text-[10px] sm:text-[11px] font-semibold">
                        Delassa Home Bakery
                      </p>
                      <h3 className="mt-3 text-[#2f221d] font-black leading-[1.1] text-[28px] sm:text-[40px]">
                        {selectedProduct.title}
                      </h3>
                      {/* Product Rating Stats */}
                      <div className="mt-3 flex items-center gap-2 text-[13px] sm:text-[14px] font-semibold text-[#7a6a62]">
                        <span className="flex items-center text-yellow-500 font-bold gap-1">
                          ★ {modalRatingSummary.average.toFixed(1)}
                        </span>
                        <span className="text-gray-400 text-xs font-normal">
                          {modalRatingSummary.total > 0 ? `(${modalRatingSummary.total} ulasan)` : "(Belum ada ulasan)"}
                        </span>
                      </div>

                      <p className="mt-4 text-[#c38358] text-[22px] sm:text-[28px] font-black">
                        {selectedProduct.price}
                      </p>
                      <p className="mt-4 text-[#6d5b52] leading-relaxed text-[14px] sm:text-[15px]">
                        {selectedProduct.description}
                      </p>

                      {/* Dynamic Reviews Section */}
                      <div className="mt-6 border-t border-[#ead8c7]/40 pt-5">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-[#2f221d] text-[14px] sm:text-[15px] font-bold">
                            Ulasan Pembeli {reviews.length > 0 && <span className="text-[#c38358]">({reviews.length})</span>}
                          </h4>
                          <button
                            onClick={() => setShowWriteForm(!showWriteForm)}
                            className="text-[11px] sm:text-[12px] font-bold text-[#c38358] hover:text-[#a96d45] underline cursor-pointer"
                          >
                            {showWriteForm ? "✕ Tutup Form" : "+ Tulis Ulasan"}
                          </button>
                        </div>

                        {showWriteForm ? (
                          <form onSubmit={handleSubmitReview} className="bg-white p-4 rounded-xl border border-[#ead8c7]/50 flex flex-col gap-3">
                            <h5 className="text-[12px] sm:text-[13px] font-bold text-[#2f221d]">Beri Ulasan Produk 🤎</h5>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Nama kamu *"
                                value={reviewName}
                                onChange={(e) => setReviewName(e.target.value)}
                                required
                                className="bg-[#faf7f2] px-3 py-2 rounded-lg text-[12px] border border-[#ead8c7] outline-none focus:border-[#c38358] w-full"
                              />
                              <input
                                type="text"
                                placeholder="Username (cth: @sara)"
                                value={reviewUsername}
                                onChange={(e) => setReviewUsername(e.target.value)}
                                className="bg-[#faf7f2] px-3 py-2 rounded-lg text-[12px] border border-[#ead8c7] outline-none focus:border-[#c38358] w-full"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] text-[#7a6a62]">Rating:</span>
                              <div className="flex gap-1.5 text-lg">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    type="button"
                                    key={star}
                                    onClick={() => setReviewRating(star)}
                                    className={`cursor-pointer transition-transform hover:scale-125 ${star <= reviewRating ? "text-yellow-400" : "text-gray-300"}`}
                                  >
                                    ★
                                  </button>
                                ))}
                              </div>
                            </div>
                            <textarea
                              placeholder="Tulis ulasan jujur kamu di sini... *"
                              rows={3}
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              required
                              className="bg-[#faf7f2] px-3 py-2 rounded-lg text-[12px] border border-[#ead8c7] outline-none focus:border-[#c38358] resize-none w-full"
                            />
                            <button
                              type="submit"
                              disabled={submittingReview}
                              className="bg-[#c38358] text-white py-2 rounded-lg font-bold text-[12px] hover:bg-[#a96d45] transition disabled:opacity-50 cursor-pointer"
                            >
                              {submittingReview ? "Mengirim..." : "Kirim Ulasan 🚀"}
                            </button>
                          </form>
                        ) : loadingReviews ? (
                          <div className="flex items-center gap-2.5 py-3 px-4 bg-[#fffcf9] rounded-xl border border-[#ead8c7]/30">
                            <div className="w-4 h-4 border-2 border-[#c38358]/30 border-t-[#c38358] rounded-full animate-spin shrink-0" />
                            <span className="text-[#7a6a62] text-[12px]">Memuat ulasan...</span>
                          </div>
                        ) : reviews.length === 0 ? (
                          <div className="text-center py-5 bg-gradient-to-br from-[#fffcf9] to-[#fdf3eb] rounded-2xl border border-[#ead8c7]/40">
                            <div className="text-2xl mb-1.5">✍️</div>
                            <p className="text-[#7a6a62] text-[12px] sm:text-[13px] font-medium">Belum ada ulasan</p>
                            <p className="text-[#9b8a82] text-[11px] mt-0.5">Jadilah yang pertama memberi ulasan!</p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {/* Latest 1 Review Card - Premium Design */}
                            {(() => {
                              const latestReview = reviews[0];
                              const [buyerReviewText] = (latestReview.review || "").split("[seller_reply]");
                              return (
                                <div className="bg-gradient-to-br from-white to-[#fffcf9] p-4 rounded-2xl border border-[#ead8c7]/60 shadow-[0_4px_16px_rgba(195,131,88,0.06)] relative overflow-hidden">
                                  {/* Decorative quote mark */}
                                  <span className="absolute top-2 right-3 text-[40px] font-serif text-[#c38358]/8 leading-none select-none pointer-events-none">"</span>
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2.5">
                                      {/* Avatar circle with initial */}
                                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c38358] to-[#e8a97a] flex items-center justify-center shrink-0 shadow-md">
                                        <span className="text-white text-[13px] font-black">
                                          {latestReview.reviewer_name.charAt(0).toUpperCase()}
                                        </span>
                                      </div>
                                      <div>
                                        <p className="font-extrabold text-[12px] sm:text-[13px] text-[#2f221d] leading-tight">
                                          {latestReview.reviewer_name}
                                        </p>
                                        <p className="text-[10px] text-[#9b8a82]">{latestReview.reviewer_username}</p>
                                      </div>
                                    </div>
                                    {/* Source badge */}
                                    {latestReview.source === "instagram" ? (
                                      <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border border-pink-100 flex items-center gap-1 shrink-0">
                                        📸 Instagram
                                      </span>
                                    ) : latestReview.source === "whatsapp" ? (
                                      <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1 shrink-0">
                                        💬 WhatsApp
                                      </span>
                                    ) : (
                                      <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-[#c38358] border border-amber-100 flex items-center gap-1 shrink-0">
                                        ✨ Website
                                      </span>
                                    )}
                                  </div>
                                  {/* Star rating row */}
                                  <div className="flex items-center gap-0.5 mt-2.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                      <span key={s} className={`text-[14px] ${s <= latestReview.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                                    ))}
                                    <span className="ml-2 text-[10px] font-bold text-[#c38358] bg-[#fff5ef] px-2 py-0.5 rounded-full">{latestReview.rating}/5</span>
                                  </div>
                                  <p className="text-[#6d5b52] text-[12px] sm:text-[13px] mt-2 leading-relaxed">
                                    {buyerReviewText}
                                  </p>
                                </div>
                              );
                            })()}
                            {/* See All Button */}
                            {reviews.length > 1 && (
                              <button
                                onClick={() => setShowAllReviews(true)}
                                className="w-full mt-0.5 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#ead8c7] bg-[#fffcf9] hover:bg-[#fdf3eb] hover:border-[#c38358]/40 text-[#c38358] text-[12px] font-bold transition-all duration-300 cursor-pointer group"
                              >
                                <span>Lihat Semua {reviews.length} Ulasan</span>
                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector & Actions Panel */}
                    <div className="mt-auto border-t border-[#ead8c7]/40 pt-4 bg-[#fffaf5]">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between pb-4">
                        <span className="text-[#6d5b52] text-[13px] sm:text-[14px] font-bold">Jumlah Pembelian</span>
                        <div className="flex items-center gap-3 bg-[#f3e5d8] px-2.5 py-1 rounded-full">
                          <button
                            type="button"
                            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c38358] text-md font-bold text-white shadow-sm cursor-pointer hover:bg-[#a96d45] transition"
                          >
                            -
                          </button>
                          <span className="text-[13px] sm:text-[14px] font-extrabold text-[#2f221d] w-5 text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty((prev) => prev + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c38358] text-md font-bold text-white shadow-sm cursor-pointer hover:bg-[#a96d45] transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Modal Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            handleAddToCart(selectedProduct, qty, false);
                            setOpen(false);
                          }}
                          className="inline-flex items-center justify-center bg-white border border-[#c38358] text-[#c38358] hover:bg-[#fff5ef] px-4 py-2.5 rounded-full text-[12px] sm:text-[13px] font-bold shadow-sm transition-all duration-300 cursor-pointer"
                        >
                          + Keranjang
                        </button>
                        <button
                          onClick={() => {
                            handleAddToCart(selectedProduct, qty, true);
                            setOpen(false);
                          }}
                          className="inline-flex items-center justify-center bg-[#c38358] hover:bg-[#a96d45] text-white px-4 py-2.5 rounded-full text-[12px] sm:text-[13px] font-bold shadow-[0_6px_18px_rgba(195,131,88,0.25)] hover:-translate-y-[1px] transition-all duration-300 cursor-pointer"
                        >
                          Beli Langsung
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ===== ALL REVIEWS POPUP MODAL ===== */}
      {showAllReviews && selectedProduct && (
        <div
          className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md flex items-center justify-center px-3 sm:px-5 py-6"
          onClick={() => setShowAllReviews(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#fffaf5] w-full max-w-[520px] rounded-[28px] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f5ede5] to-[#fdf3eb] px-6 py-5 border-b border-[#ead8c7]/50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#b07b5d] uppercase tracking-[3px]">Ulasan Pembeli</p>
                  <h3 className="mt-1 text-[18px] sm:text-[22px] font-black text-[#2f221d] leading-tight">{selectedProduct.title}</h3>
                  {/* Overall Rating */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className={`text-[17px] ${s <= Math.round(modalRatingSummary.average) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-[16px] font-black text-[#2f221d]">
                      {modalRatingSummary.average.toFixed(1)}
                    </span>
                    <span className="text-[12px] text-[#9b8a82] font-medium">· {reviews.length} ulasan</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllReviews(false)}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#6d5b52] hover:text-[#2f221d] flex items-center justify-center text-xl transition-all shadow-sm cursor-pointer shrink-0 mt-0.5"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="overflow-y-auto max-h-[65vh] p-5 flex flex-col gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {reviews.map((rev, idx) => {
                const [buyerReviewText, sellerReplyText] = (rev.review || "").split("[seller_reply]");
                return (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.25 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="bg-white rounded-2xl p-4 pb-8 border border-[#ead8c7]/50 shadow-[0_2px_12px_rgba(195,131,88,0.05)] relative">
                      {/* Decorative quote */}
                      <span className="absolute top-2 right-3 text-[48px] font-serif text-[#c38358]/6 leading-none select-none pointer-events-none">"</span>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c38358] to-[#e8a97a] flex items-center justify-center shrink-0 shadow-md">
                            <span className="text-white text-[14px] font-black">
                              {rev.reviewer_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-extrabold text-[13px] sm:text-[14px] text-[#2f221d]">{rev.reviewer_name}</p>
                            <p className="text-[11px] text-[#9b8a82]">{rev.reviewer_username}</p>
                          </div>
                        </div>
                        {/* Source badge */}
                        {rev.source === "instagram" ? (
                          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border border-pink-100 flex items-center gap-1 shrink-0">
                            📸 Instagram
                          </span>
                        ) : rev.source === "whatsapp" ? (
                          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1 shrink-0">
                            💬 WhatsApp
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-[#c38358] border border-amber-100 flex items-center gap-1 shrink-0">
                            ✨ Website
                          </span>
                        )}
                      </div>
                      {/* Stars + rating badge */}
                      <div className="flex items-center gap-0.5 mt-2.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-[15px] ${s <= rev.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                        ))}
                        <span className="ml-2 text-[10px] font-bold text-[#c38358] bg-[#fff5ef] px-2 py-0.5 rounded-full">{rev.rating}/5</span>
                      </div>
                      {/* Review text */}
                      <p className="text-[#5c4d47] text-[13px] sm:text-[13.5px] mt-2.5 leading-relaxed">
                        {buyerReviewText}
                      </p>
                      {/* Index number decoration */}
                      <div className="absolute bottom-3 right-4 text-[10px] text-[#e8d5c4] font-bold">#{idx + 1}</div>
                    </div>

                    {/* Seller reply card nested below */}
                    {sellerReplyText && (
                      <div className="ml-6 bg-[#f5ede5]/70 border border-[#ead8c7]/80 p-3.5 rounded-2xl shadow-sm relative">
                        <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#c38358] uppercase tracking-[1px]">
                          <span>👤</span>
                          <span>Admin</span>
                        </div>
                        <p className="mt-1.5 text-[#5c4d47] text-[11px] sm:text-[12px] leading-relaxed italic">
                          "{sellerReplyText}"
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer CTA */}
            <div className="px-5 py-4 border-t border-[#ead8c7]/40 bg-gradient-to-r from-[#fffcf9] to-[#fdf3eb]">
              <button
                onClick={() => {
                  setShowAllReviews(false);
                  setShowWriteForm(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#c38358] hover:bg-[#a96d45] text-white py-3 rounded-full text-[13px] font-bold shadow-[0_6px_20px_rgba(195,131,88,0.3)] hover:-translate-y-[1px] transition-all duration-300 cursor-pointer"
              >
                <span>✍️</span>
                <span>Tulis Ulasan Kamu</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
