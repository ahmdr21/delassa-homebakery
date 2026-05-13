import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

/* LOCAL IMAGE */

import brownie1 from "../assets/brownie1.png";
import brownie2 from "../assets/brownie2.png";
import brownie3 from "../assets/brownie3.png";

/* SLIDES */

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

    <main className="bg-[#fdf7f2] overflow-hidden">

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-14 pb-14">

        <div className="grid lg:grid-cols-2 gap-7 lg:gap-14 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-[#f3e2d5] px-4 py-2 rounded-full">

              <span className="text-xs">
                🍫
              </span>

              <span className="text-[12px] sm:text-sm font-medium text-[#8b5f47]">

                Premium Brownies & Hampers

              </span>

            </div>

            {/* TITLE */}

            <h1 className="mt-5 text-[38px] sm:text-[72px] lg:text-[88px] leading-[0.9] tracking-[-2px] font-black text-[#3b2b26]">

              Crafted

              <span className="block text-[#c38358]">

                For Sweet

              </span>

              Moments

            </h1>

            {/* DESC */}

            <p className="mt-5 text-[14px] sm:text-lg text-[#6f615a] leading-relaxed max-w-xl">

              Handmade brownies premium dengan rasa rich chocolate,
              packaging aesthetic,
              dan sentuhan elegan untuk setiap momen spesialmu ✨

            </p>

            {/* MOBILE IMAGE */}

            <div className="mt-5 lg:hidden">

              <HeroSlider />

            </div>

            {/* MOBILE BUTTON */}

            <div className="flex gap-3 mt-6 lg:hidden">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg"
              >

                Order Sekarang

              </a>

              <Link
                to="/menu"
                className="bg-white border border-[#ead8c7] px-4 py-2.5 rounded-xl text-sm font-medium"
              >

                View Menu

              </Link>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-2 mt-8">

              <div>

                <h3 className="text-[24px] sm:text-[40px] font-black text-[#c38358] leading-none">

                  290+

                </h3>

                <p className="text-[11px] sm:text-base text-gray-500 mt-1">

                  Happy Clients

                </p>

              </div>

              <div>

                <h3 className="text-[24px] sm:text-[40px] font-black text-[#c38358] leading-none">

                  4.9

                </h3>

                <p className="text-[11px] sm:text-base text-gray-500 mt-1">

                  Rating

                </p>

              </div>

              <div>

                <h3 className="text-[24px] sm:text-[40px] font-black text-[#c38358] leading-none">

                  100%

                </h3>

                <p className="text-[11px] sm:text-base text-gray-500 mt-1">

                  Handmade

                </p>

              </div>

            </div>

            {/* DESKTOP BUTTON */}

            <div className="hidden lg:flex gap-4 mt-10">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] hover:bg-black text-white px-7 py-4 rounded-2xl transition duration-300 shadow-xl"
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

          </motion.div>

          {/* DESKTOP IMAGE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >

            <HeroSlider />

          </motion.div>

        </div>

      </section>

    </main>
  );
}

/* SLIDER */

function HeroSlider() {

  return (

    <div className="bg-white p-2 rounded-[28px] shadow-xl overflow-hidden">

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
        }}
        className="rounded-[22px] overflow-hidden"
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div className="relative w-full h-[200px] sm:h-[520px] overflow-hidden">

              {/* IMAGE */}

              <img
                src={slide.image}
                alt="Brownies"
                draggable={false}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>

  );
}