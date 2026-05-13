import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [

  {
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",

    badge: "✨ Fresh baked everyday",

    title: "Premium Chocolate Brownies",

    desc: "Rich chocolate brownies dengan tekstur moist dan lumer di setiap gigitan.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop",

    badge: "🔥 Best Seller",

    title: "Brownies Mix Topping",

    desc: "Perpaduan topping premium favorit customer Delassa.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop",

    badge: "🎁 Special Hampers",

    title: "Elegant Dessert Box",

    desc: "Perfect untuk hadiah spesial dan sweet moments bersama orang tersayang.",
  },

];

export default function Home() {

  const message = encodeURIComponent(`Halo Delassa 👋

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih ✨`);

  return (

    <main className="bg-[#fdf7f2] min-h-screen overflow-hidden">

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* BADGE */}

          <div className="inline-flex items-center gap-3 bg-[#f4e3d4] px-5 py-3 rounded-full">

            <span className="text-lg">
              🍫
            </span>

            <span className="text-sm font-medium text-[#8b5f47]">

              Premium Brownies & Hampers

            </span>

          </div>

          {/* TITLE */}

          <h1 className="text-[52px] sm:text-[72px] lg:text-[90px] font-black leading-[0.9] tracking-[-3px] mt-7 text-[#3b2b26]">

            Crafted

            <span className="block text-[#c38358]">

              For Sweet

            </span>

            Moments

          </h1>

          {/* DESC */}

          <p className="text-[#6f615a] text-base sm:text-lg leading-relaxed max-w-xl mt-7">

            Handmade brownies premium dengan rasa rich chocolate,
            packaging aesthetic,
            dan sentuhan elegan untuk setiap momen spesialmu ✨

          </p>

          {/* DESKTOP BUTTON */}

          <div className="hidden lg:flex flex-wrap gap-4 mt-9">

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#3b2b26] hover:bg-black text-white px-7 py-4 rounded-2xl transition-all duration-500 shadow-xl hover:-translate-y-1"
            >

              Order Sekarang

            </a>

            <Link
              to="/menu"
              className="bg-white border border-[#ead8c7] hover:bg-[#fff8f3] px-7 py-4 rounded-2xl transition"
            >

              View Menu

            </Link>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-5 mt-12 max-w-lg">

            <div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#c38358]">

                290+

              </h3>

              <p className="text-sm sm:text-base text-gray-500 mt-2">

                Happy Clients

              </p>

            </div>

            <div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#c38358]">

                4.9

              </h3>

              <p className="text-sm sm:text-base text-gray-500 mt-2">

                Rating

              </p>

            </div>

            <div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#c38358]">

                100%

              </h3>

              <p className="text-sm sm:text-base text-gray-500 mt-2">

                Handmade

              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          {/* BLUR */}

          <div className="absolute -top-10 -right-10 w-52 h-52 bg-[#f2ddcb] rounded-full blur-3xl opacity-60"></div>

          {/* SLIDER */}

          <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-[36px] p-3 shadow-2xl">

            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              className="rounded-[30px] overflow-hidden"
            >

              {slides.map((slide, index) => (

                <SwiperSlide key={index}>

                  <div className="relative">

                    {/* IMAGE */}

                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[300px] sm:h-[560px] object-cover"
                    />

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                    {/* CONTENT */}

                    <div className="absolute bottom-0 left-0 p-5 sm:p-8 text-white">

                      <div className="inline-flex bg-white text-[#3b2b26] text-xs font-semibold px-4 py-2 rounded-full mb-4">

                        {slide.badge}

                      </div>

                      <h2 className="text-2xl sm:text-4xl font-black leading-tight">

                        {slide.title}

                      </h2>

                      <p className="mt-3 text-white/90 text-sm sm:text-base max-w-md leading-relaxed">

                        {slide.desc}

                      </p>

                    </div>

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>

          </div>

          {/* MOBILE BUTTON */}

          <div className="flex flex-wrap gap-4 mt-8 lg:hidden">

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#3b2b26] hover:bg-black text-white px-6 py-4 rounded-2xl transition-all duration-500 shadow-xl"
            >

              Order Sekarang

            </a>

            <Link
              to="/menu"
              className="bg-white border border-[#ead8c7] hover:bg-[#fff8f3] px-6 py-4 rounded-2xl transition"
            >

              View Menu

            </Link>

          </div>

        </motion.div>

      </section>

    </main>
  );
}