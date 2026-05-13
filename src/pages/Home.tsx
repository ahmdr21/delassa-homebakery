import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

import brownie1 from "../assets/brownie1.jpg";
import brownie2 from "../assets/brownie2.jpg";
import brownie3 from "../assets/brownie3.jpg";

const slides = [
  {
    image: brownie1,
  },

  {
    image: brownie2,
  },

  {
    image: brownie3,
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

    <main className="bg-[#f7f3ef] overflow-hidden">

      {/* HERO */}

      <section className="relative min-h-screen overflow-hidden">

        {/* BACKGROUND SLIDER */}

        <div className="absolute inset-0 z-0">

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="w-full h-screen"
          >

            {slides.map((slide, index) => (

              <SwiperSlide key={index}>

                <div className="relative w-full h-screen">

                  {/* IMAGE */}

                  <img
                    src={slide.image}
                    alt="Brownies"
                    className="w-full h-full object-cover"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-black/60"></div>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 min-h-screen flex items-center">

          <div className="max-w-3xl pt-28 sm:pt-24">

            {/* BADGE */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-full text-white"
            >

              <span>
                🍫
              </span>

              <span className="text-[12px] sm:text-sm uppercase tracking-wide font-medium">

                Fresh Baked Everyday

              </span>

            </motion.div>

            {/* TITLE */}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-7 text-[42px] sm:text-[70px] lg:text-[110px] leading-[0.92] font-black tracking-[-2px] text-white"
            >

              Brownies Premium

              <span className="block text-[#f3c6a3]">

                Untuk Sweet Moments

              </span>

            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 text-[14px] sm:text-lg text-white/85 leading-relaxed max-w-2xl"
            >

              Handmade brownies dengan rich chocolate premium,
              tekstur moist lumer,
              dan packaging aesthetic yang cocok untuk hampers,
              hadiah spesial,
              atau teman ngopi favoritmu ✨

            </motion.p>

            {/* SOCIAL PROOF */}

            <div className="flex flex-wrap items-center gap-3 mt-6">

              <div className="bg-[#f3c6a3] text-[#3b2b26] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

                ⭐ 4.9 Rating Customer

              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">

                🔥 Best Seller Bekasi

              </div>

            </div>

            {/* BUTTON */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="flex flex-wrap gap-4 mt-8"
            >

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] hover:bg-black transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium shadow-2xl"
              >

                Pesan via WhatsApp

              </a>

              <Link
                to="/menu"
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium"
              >

                Lihat Menu

              </Link>

            </motion.div>

            {/* BENEFITS */}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8 text-white/85 text-sm">

              <div>
                ✔ Premium ingredients
              </div>

              <div>
                ✔ Fresh from oven
              </div>

              <div>
                ✔ Same day order available
              </div>

            </div>

            {/* STATS */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-3 gap-4 sm:gap-10 mt-10 sm:mt-14 max-w-xl"
            >

              <div>

                <h3 className="text-[24px] sm:text-[44px] font-black text-[#f3c6a3]">

                  290+

                </h3>

                <p className="text-[11px] sm:text-base text-white/75 mt-1">

                  Happy Clients

                </p>

              </div>

              <div>

                <h3 className="text-[24px] sm:text-[44px] font-black text-[#f3c6a3]">

                  4.9

                </h3>

                <p className="text-[11px] sm:text-base text-white/75 mt-1">

                  Customer Rating

                </p>

              </div>

              <div>

                <h3 className="text-[24px] sm:text-[44px] font-black text-[#f3c6a3]">

                  100%

                </h3>

                <p className="text-[11px] sm:text-base text-white/75 mt-1">

                  Handmade

                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </main>

  );
}