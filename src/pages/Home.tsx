import brownie1 from "../assets/brownie1.png";
import brownie2 from "../assets/brownie2.png";
import brownie3 from "../assets/brownie3.png";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/* SLIDES */

const slides = [

  {
    image: brownie1,

    badge: "✨ Fresh baked everyday",

    title: "Premium Chocolate Brownies",

    desc: "Rich chocolate brownies dengan tekstur moist dan lumer di setiap gigitan.",
  },

  {
    image: brownie2,

    badge: "🔥 Best Seller",

    title: "Brownies Mix Topping",

    desc: "Perpaduan topping premium favorit customer Delassa.",
  },

  {
    image: brownie3,

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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-[#f4e3d4] px-5 py-3 rounded-full">

              <span>
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

            {/* DESCRIPTION */}

            <p className="text-[#6f615a] text-base sm:text-lg leading-relaxed max-w-xl mt-7">

              Handmade brownies premium dengan rasa rich chocolate,
              packaging aesthetic,
              dan sentuhan elegan untuk setiap momen spesialmu ✨

            </p>

            {/* MOBILE SLIDER */}

            <div className="mt-8 lg:hidden">

              <HeroSlider />

            </div>

            {/* MOBILE BUTTON */}

            <div className="flex flex-wrap gap-4 mt-8 lg:hidden">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] text-white px-6 py-4 rounded-2xl shadow-xl"
              >

                Order Sekarang

              </a>

              <Link
                to="/menu"
                className="bg-white border border-[#ead8c7] px-6 py-4 rounded-2xl"
              >

                View Menu

              </Link>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-5 mt-10 max-w-lg">

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

            {/* DESKTOP BUTTON */}

            <div className="hidden lg:flex flex-wrap gap-4 mt-10">

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

          </motion.div>

          {/* DESKTOP SLIDER */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >

            <HeroSlider />

          </motion.div>

        </div>

      </section>

    </main>
  );
}

/* HERO SLIDER */

function HeroSlider() {

  return (

    <div className="relative bg-white rounded-[30px] p-2 shadow-xl overflow-hidden">

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
        className="rounded-[24px] overflow-hidden"
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div className="relative w-full h-[320px] sm:h-[560px] overflow-hidden rounded-[24px]">

              {/* IMAGE */}

              <img
                src={slide.image}
                alt={slide.title}
                 className="w-full h-full object-cover"
  draggable={false}
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 p-5 sm:p-8 text-white z-10">

                <div className="inline-flex bg-white text-[#3b2b26] text-xs font-semibold px-4 py-2 rounded-full mb-4 shadow">

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

  );
}