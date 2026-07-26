import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { getAllReviews, getProductReviews, addProductReview } from "../utils/supabase";
import type { Review } from "../utils/supabase";

import { isBundlePromoActive, calculateBundlePrice } from "../data/promos";


import classicImg from "../assets/browniesclassic3.webp";
import almondImg from "../assets/browniesalmond1.webp";
import cookiesImg from "../assets/browniescoockies1.webp";
import mixImg from "../assets/mixtopping3.webp";

import classic1 from "../assets/browniesclassic1.webp";
import classic2 from "../assets/browniesclassic2.webp";

import almond1 from "../assets/browniesalmond1.webp";
import almond2 from "../assets/browniesalmond2.webp";

import cookies1 from "../assets/browniescoockies1.webp";
import cookies2 from "../assets/browniescoockies2.webp";

import mix1 from "../assets/mixtopping1.webp";
import mix2 from "../assets/mixtopping2.webp";

import pandan from "../assets/pandan.webp";
import pandan1 from "../assets/pandan1.webp";
import pandan2 from "../assets/pandan2.webp";

import panju from "../assets/panju.webp";
import panju1 from "../assets/panju1.webp";
import panju2 from "../assets/panju2.webp";

import keju1 from "../assets/keju1.webp";
import keju from "../assets/keju.webp";
import keju2 from "../assets/keju2.webp";

import coklat from "../assets/coklat.webp";
import coklat2 from "../assets/coklat2.webp";
import coklat3 from "../assets/coklat3.webp";

import mocha from "../assets/mocha.webp";
import mocha2 from "../assets/mocha2.webp";
import mocha3 from "../assets/mocha3.webp";

import butter from "../assets/butter.webp";
import butter2 from "../assets/butter2.webp";
import butter3 from "../assets/butter3.webp";

import aren from "../assets/aren.webp";
import aren2 from "../assets/aren2.webp";
import aren3 from "../assets/aren3.webp";

import teh from "../assets/teh.webp";
import teh2 from "../assets/teh2.webp";
import teh3 from "../assets/teh3.webp";

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

type Category = {
  id: string;
  name: string;
  description: string;
  products: Product[];
};

type ProductRatingSummary = {
  average: number;
  total: number;
};

const productCategories: Category[] = [
  {
    id: "brownies",
    name: "Brownies",
    description:
      "Handmade brownies premium dengan rich chocolate, topping melimpah, dan sentuhan aesthetic untuk sweet moments favoritmu.",
    products: [
      {
        title: "Brownies Classic",
        price: "Rp55.000",
        badge: null,
        description:
          "Rich chocolate brownies dengan tekstur moist dan rasa premium yang lembut di setiap gigitan.",
        image: classicImg,
        images: [classic1, classic2],
        rating: 4.9,
        soldCount: "150+",
      },
      {
        title: "Brownies Almond",
        price: "Rp65.000",
        badge: null,
        description:
          "Perpaduan brownies premium dengan topping almond crunchy yang gurih dan elegan.",
        image: almondImg,
        images: [almond1, almond2],
        rating: 4.8,
        soldCount: "80+",
      },
      {
        title: "Brownies Cookies",
        price: "Rp68.000",
        badge: "Best Seller",
        description:
          "Kombinasi brownies moist dengan topping cookies favorit untuk sweet moments spesial.",
        image: cookiesImg,
        images: [cookies1, cookies2],
        rating: 4.9,
        soldCount: "200+",
      },
      {
        title: "Brownies Mix Topping",
        price: "Rp70.000",
        badge: null,
        description:
          "Rich chocolate brownies dengan topping caramel biscuit, choco ball, sliced almond, chocolate cream biscuit, dan roasted peanut crumble.",
        image: mixImg,
        images: [mix1, mix2],
        rating: 4.8,
        soldCount: "120+",
      },
    ],
  },
  {
    id: "cakes",
    name: "Cakes",
    description:
      "Dipanggang fresh setiap hari menggunakan bahan premium pilihan untuk menghadirkan kelembutan dan rasa yang tak terlupakan.",
    products: [
      {
        title: "Bolu Pandan",
        price: "Rp45.000",
        badge: "New",
        description:
          "Bolu pandan tradisional dengan warna hijau alami, tekstur lembut, dan aroma pandan yang khas.",
        image: pandan,
        images: [pandan, pandan1, pandan2],
        rating: 4.7,
        soldCount: "90+",
      },
      {
        title: "Bolu Pandan Keju",
        price: "Rp50.000",
        badge: "New",
        description:
          "Bolu dengan layer keju yang gurih, menciptakan kombinasi manis dan asin yang sempurna.",
        image: panju,
        images: [panju, panju1, panju2],
        rating: 4.8,
        soldCount: "110+",
      },
      {
        title: "Bolu Keju",
        price: "Rp48.000",
        badge: "New",
        description:
          "Bolu coklat legit dengan rasa coklat yang kaya and tekstur yang moist di setiap gigitan.",
        image: keju1,
        images: [keju1, keju, keju2],
        rating: 4.7,
        soldCount: "75+",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    description:
      "Diracik dari bahan premium pilihan untuk menghadirkan kesegaran dan cita rasa yang menyempurnakan setiap momen.",
    products: [
      {
        title: "Choco Bliss",
        price: "Rp17.000",
        badge: "New",
        description:
          "Perpaduan cokelat premium dan susu creamy yang menghadirkan rasa kaya, lembut, dan memanjakan di setiap tegukan.",
        image: coklat,
        images: [coklat, coklat2, coklat3],
        rating: 4.9,
        soldCount: "300+",
      },
      {
        title: "Mocha Bliss",
        price: "Rp16.000",
        badge: "New",
        description:
          "Perpaduan espresso pilihan, cokelat premium, dan susu creamy yang menghadirkan rasa kaya, lembut, dan seimbang di setiap tegukan.",
        image: mocha,
        images: [mocha, mocha2, mocha3],
        rating: 4.8,
        soldCount: "180+",
      },
      {
        title: "Butterscotch Bliss",
        price: "Rp17.000",
        badge: "New",
        description:
          "Perpaduan butterscotch premium dan susu creamy yang menghadirkan rasa manis yang lembut dengan sentuhan karamel di setiap tegukan.",
        image: butter,
        images: [butter, butter2, butter3],
        rating: 4.8,
        soldCount: "140+",
      },
      {
        title: "Kopi Susu Gula Aren",
        price: "Rp15.000",
        badge: "New",
        description:
          "Espresso pilihan berpadu dengan susu creamy dan gula aren asli, menghadirkan rasa manis karamel yang lembut dan seimbang.",
        image: aren,
        images: [aren, aren2, aren3],
        rating: 4.9,
        soldCount: "250+",
      },
      {
        title: "Roasted Milk Tea",
        price: "Rp16.000",
        badge: "New",
        description:
          "Perpaduan teh pilihan dan susu creamy dengan aroma roasted yang lembut, menghasilkan rasa yang kaya dan seimbang.",
        image: teh,
        images: [teh, teh2, teh3],
        rating: 4.7,
        soldCount: "160+",
      },
    ],
  },

  {
    id: "bundles",
    name: "Bundle Hemat",
    description: "Paket bundling spesial brownies pilihan dan minuman segar dengan harga promo lebih hemat.",
    products: [
      {
        title: "Bundle Hemat: Brownies + Minuman",
        price: isBundlePromoActive() ? "Rp65.000 - Rp82.000" : "Rp70.000 - Rp87.000",
        badge: isBundlePromoActive() ? "Promo Bundle" : "Hemat",
        description: "Bebas pilih brownies (Classic/Almond/Cookies/Mix Topping) dan minuman favoritmu. Harga promo lebih hemat!",
        image: mixImg,
        images: [mixImg, aren],
        rating: 5.0,
        soldCount: "50+",
      },
    ],
  },
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  const [selectedBrownies, setSelectedBrownies] = useState("Brownies Mix Topping");
  const [selectedDrink, setSelectedDrink] = useState("Kopi Susu Gula Aren");

  const { cart, setCartOpen, addToCart, updateQty } = useCart();

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.title.includes("Bundle")) {
        setSelectedBrownies("Brownies Mix Topping");
        setSelectedDrink("Kopi Susu Gula Aren");
      }
    }
  }, [selectedProduct]);

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
    if (selectedProduct) {
      getProductReviews(selectedProduct.title).then((data) => {
        setReviews(data);
        setLoadingReviews(false);
      }).catch((err) => {
        console.error("Failed to load reviews:", err);
        setLoadingReviews(false);
      });
    }
  }, [selectedProduct]);

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

  const getAllProducts = () => productCategories.flatMap((cat) => cat.products);

  const getDisplayProducts = (): Product[] => {
    const products = selectedCategory === "all"
      ? getAllProducts()
      : productCategories.find((cat) => cat.id === selectedCategory)?.products || [];

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return products;

    return products.filter((product) => {
      const haystack = `${product.title} ${product.description} ${product.price}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  };

  const getCategoryInfo = () => {
    if (selectedCategory === "all") {
      return {
        name: "All Menu",
        description:
          "Koleksi lengkap premium handmade bakery Delassa. Dari brownies, cakes, hingga minuman istimewa, semua dibuat fresh dengan bahan pilihan untuk moments spesial Anda.",
      };
    }

    return (
      productCategories.find((cat) => cat.id === selectedCategory) || {
        name: "Menu",
        description: "",
      }
    );
  };

  const handleAddToCart = (product: Product, quantity: number = 1, openDrawer: boolean = false, customPrice?: number) => {
    const parsedPrice = customPrice !== undefined
      ? customPrice
      : Number(String(product.price).replace(/[^\d]/g, ""));

    const title = product.title.includes("Bundle")
      ? `${product.title} (${selectedBrownies.replace("Brownies ", "")} + ${selectedDrink})`
      : product.title;

    addToCart({ title, price: parsedPrice, qty: quantity });

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
  const displayProducts = getDisplayProducts();

  return (
    <main className="bg-[#faf7f2]">
      {/* TOOLBAR STICKY */}
      <div className="sticky top-[102px] sm:top-[116px] z-[35] bg-gradient-to-b from-[#faf7f2] via-[#faf7f2]/98 to-[#faf7f2]/95 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-sm border-b border-[#ead8c7]/30">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex justify-center gap-2 sm:gap-2.5 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-1 lg:pb-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-none whitespace-nowrap px-5 sm:px-6 py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-300 cursor-pointer ${selectedCategory === "all"
                ? "bg-[#c38358] text-white shadow-[0_4px_12px_rgba(195,131,88,0.2)]"
                : "bg-white border border-[#c38358]/60 text-[#c38358] hover:bg-[#fff5ef]"
                }`}
            >
              Semua
            </button>
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-none whitespace-nowrap px-5 sm:px-6 py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-all duration-300 cursor-pointer ${selectedCategory === category.id
                  ? "bg-[#c38358] text-white shadow-[0_4px_12px_rgba(195,131,88,0.2)]"
                  : "bg-white border border-[#c38358]/60 text-[#c38358] hover:bg-[#fff5ef]"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <label className="w-full lg:order-2 lg:w-[260px] flex items-center gap-2 rounded-full border border-[#ead8c7] bg-white px-3 py-2 shadow-sm transition focus-within:border-[#c38358]">
            <span className="sr-only">Cari menu</span>
            <svg className="w-4 h-4 text-[#9b6a50] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari menu..."
              className="w-full bg-transparent text-[12px] sm:text-[13px] text-[#3b2b26] outline-none"
            />
          </label>
        </div>
      </div>

      <section className="relative px-3 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-10 sm:pb-20">
        <div className="max-w-[1280px] mx-auto">
          <header className="text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#f3e5d8] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#c38358]" />
              <p className="text-[11px] sm:text-[12px] tracking-[3px] uppercase font-semibold text-[#9b6a50]">
                MENU KAMI
              </p>
            </div>
            <h1 className="mt-5 sm:mt-7 text-[#2f221d] font-black leading-[0.92] tracking-[-2px] sm:tracking-[-4px] text-[34px] sm:text-[58px] lg:text-[78px] xl:text-[92px]">
              Menu Pilihan
              <br />
              <span className="text-[#c38358]">Delassa ✨</span>
            </h1>
            <p className="mt-5 sm:mt-7 text-[#6f615a] text-[13px] sm:text-[19px] leading-relaxed max-w-[820px] mx-auto">
              {getCategoryInfo().description}
            </p>
            <div className="hidden sm:flex flex-wrap justify-center gap-x-7 gap-y-3 mt-10">
              {["✓ Premium ingredients", "✓ Made by order", "✓ Handmade daily"].map((item, index) => (
                <div key={index} className="text-[#7a6a62] text-[14px] sm:text-[16px] font-medium">
                  {item}
                </div>
              ))}
            </div>
          </header>

          <section aria-label="Product Menu" className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16">
            {displayProducts.map((item: Product, index: number) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col h-full bg-white border border-[#ead8c7] rounded-[18px] sm:rounded-[28px] overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none cursor-pointer"
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 25vw"
                    className="w-full aspect-square sm:aspect-[16/10] xl:aspect-[5/4] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  {item.badge && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#c38358] text-white px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[11px] font-bold uppercase tracking-[0.6px] sm:tracking-[1px] shadow-lg">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <div>
                    <h2 className="text-[15px] sm:text-[24px] leading-[1.15] tracking-0 sm:tracking-[-1px] font-black text-[#2f221d] line-clamp-2">
                      {item.title}
                    </h2>
                    <div className="flex items-center justify-between flex-wrap gap-x-1 mt-1 sm:mt-2.5">
                      <p className="text-[#c38358] text-[13px] sm:text-[19px] font-bold">{item.price}</p>
                      <div className="flex items-center gap-1 text-[10px] sm:text-[12px] text-[#7a6a62] font-semibold">
                        <span className="text-yellow-500 font-bold">★</span>
                        <span>{getProductRatingSummary(item).average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="hidden sm:block mt-4 text-[#7a6a62] text-[14px] leading-6 line-clamp-3 flex-grow">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-3 sm:pt-6 flex flex-col gap-3">
                    {getQtyInCart(item.title) > 0 ? (
                      <div className="flex items-center justify-center gap-2 rounded-full border border-[#c38358]/40 bg-[#fff8f0] px-2 py-2 shadow-sm">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQtyChange(item, -1);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-[#c38358] shadow-sm"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-[#2f221d]">
                          {getQtyInCart(item.title)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQtyChange(item, 1);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c38358] text-lg font-semibold text-white shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.title.includes("Bundle")) {
                            setShowWriteForm(false);
                            setShowAllReviews(false);
                            setReviews([]);
                            setLoadingReviews(true);
                            setSelectedProduct(item);
                            setActiveImage(0);
                            setQty(1);
                            setOpen(true);
                          } else {
                            handleAddToCart(item);
                          }
                        }}
                        className="inline-flex items-center justify-center w-full bg-[#c38358] hover:bg-[#a96d45] text-white px-2 sm:px-5 py-2 sm:py-3 rounded-full text-[10px] sm:text-[13px] font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.12)] sm:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] transition-all duration-300"
                      >
                        <span className="sm:hidden">Keranjang</span>
                        <span className="hidden sm:inline">Tambah ke Keranjang</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
            {displayProducts.length === 0 && (
              <div className="col-span-2 xl:col-span-4 rounded-[24px] border border-dashed border-[#e2cbb8] bg-white px-5 py-12 text-center">
                <p className="text-[18px] font-black text-[#2f221d]">Menu tidak ditemukan</p>
                <p className="mt-2 text-[13px] sm:text-[14px] text-[#7a6a62]">
                  Coba pakai kata kunci lain atau pilih kategori berbeda.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>

      {open && selectedProduct && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-end lg:items-center justify-center lg:px-5 lg:py-6"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#fffaf5] w-full max-w-[1000px] rounded-t-[28px] lg:rounded-[32px] overflow-hidden shadow-2xl h-dvh lg:h-[85vh]"
            style={{ maxHeight: '100dvh' }}
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
                <div className="flex flex-col lg:grid lg:grid-cols-2 overflow-y-auto lg:overflow-hidden h-dvh lg:h-full" style={{ maxHeight: '100dvh' }}>
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
                  <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between lg:h-full lg:overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#ead8c7_transparent]">
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

                      {selectedProduct.title.includes("Bundle") ? (() => {
                        const { price, originalPrice, isPromo } = calculateBundlePrice(selectedBrownies, selectedDrink);
                        return (
                          <div className="mt-4 flex flex-col gap-1">
                            <div className="flex items-baseline gap-3">
                              <span className="text-[#c38358] text-[22px] sm:text-[28px] font-black">
                                Rp{price.toLocaleString("id-ID")}
                              </span>
                              <span className="text-gray-400 text-sm sm:text-base line-through">
                                Rp{originalPrice.toLocaleString("id-ID")}
                              </span>
                            </div>
                            {isPromo && (
                              <div className="inline-flex items-center gap-1.5 self-start bg-[#fff5ef] text-[#c38358] px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border border-[#ead8c7]/50 shadow-sm">
                                <span>🔥 PROMO BUNDLE</span>
                                <span>(Hemat Rp5.000)</span>
                              </div>
                            )}
                          </div>
                        );
                      })() : (
                        <p className="mt-4 text-[#c38358] text-[22px] sm:text-[28px] font-black">
                          {selectedProduct.price}
                        </p>
                      )}

                      {!selectedProduct.title.includes("Bundle") ? (
                        <p className="mt-4 text-[#6d5b52] leading-relaxed text-[14px] sm:text-[15px]">
                          {selectedProduct.description}
                        </p>
                      ) : (
                        <div className="mt-6 space-y-5 bg-[#fffaf5] p-4 sm:p-5 rounded-2xl border border-[#ead8c7]/65 shadow-sm">
                          {/* Brownies Selection */}
                          <div>
                            <span className="block text-[#2f221d] text-[13px] sm:text-[14px] font-bold mb-2.5">
                              1. Pilih Varian Brownies
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { name: "Brownies Classic", label: "Classic" },
                                { name: "Brownies Almond", label: "Almond" },
                                { name: "Brownies Cookies", label: "Cookie" },
                                { name: "Brownies Mix Topping", label: "Mix Topping" }
                              ].map((opt) => (
                                <button
                                  key={opt.name}
                                  type="button"
                                  onClick={() => setSelectedBrownies(opt.name)}
                                  className={`px-3 py-2.5 rounded-xl border text-[11px] sm:text-[12px] font-bold transition-all duration-300 cursor-pointer ${
                                    selectedBrownies === opt.name
                                      ? "bg-[#c38358] border-[#c38358] text-white shadow-sm"
                                      : "bg-white border-[#ead8c7] text-[#6d5b52] hover:bg-[#fffbf7]"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Drink Selection */}
                          <div>
                            <span className="block text-[#2f221d] text-[13px] sm:text-[14px] font-bold mb-2.5">
                              2. Pilih Minuman (Bebas Pilih)
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                { name: "Kopi Susu Gula Aren", label: "Kopi Susu Aren" },
                                { name: "Mocha Bliss", label: "Mocha (+Rp1k)" },
                                { name: "Roasted Milk Tea", label: "Roasted Milk Tea (+Rp1k)" },
                                { name: "Butterscotch Bliss", label: "Butterscotch (+Rp2k)" },
                                { name: "Choco Bliss", label: "Coklat (+Rp2k)" }
                              ].map((opt) => (
                                <button
                                  key={opt.name}
                                  type="button"
                                  onClick={() => setSelectedDrink(opt.name)}
                                  className={`px-2.5 py-2.5 rounded-xl border text-[10px] sm:text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                                    selectedDrink === opt.name
                                      ? "bg-[#c38358] border-[#c38358] text-white shadow-sm"
                                      : "bg-white border-[#ead8c7] text-[#6d5b52] hover:bg-[#fffbf7]"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

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

                    {/* Quantity Selector */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#ead8c7]/40 pt-5">
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
                    {(() => {
                      const customPrice = selectedProduct.title.includes("Bundle")
                        ? calculateBundlePrice(selectedBrownies, selectedDrink).price
                        : undefined;
                      return (
                        <div className="grid grid-cols-2 gap-3 mt-6">
                          <button
                            onClick={() => {
                              handleAddToCart(selectedProduct, qty, false, customPrice);
                              setOpen(false);
                            }}
                            className="inline-flex items-center justify-center bg-white border border-[#c38358] text-[#c38358] hover:bg-[#fff5ef] px-4 py-2.5 rounded-full text-[12px] sm:text-[13px] font-bold shadow-sm transition-all duration-300 cursor-pointer"
                          >
                            + Keranjang
                          </button>
                          <button
                            onClick={() => {
                              handleAddToCart(selectedProduct, qty, true, customPrice);
                              setOpen(false);
                            }}
                            className="inline-flex items-center justify-center bg-[#c38358] hover:bg-[#a96d45] text-white px-4 py-2.5 rounded-full text-[12px] sm:text-[13px] font-bold shadow-[0_6px_18px_rgba(195,131,88,0.25)] hover:-translate-y-[1px] transition-all duration-300 cursor-pointer"
                          >
                            Beli Langsung
                          </button>
                        </div>
                      );
                    })()}
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
