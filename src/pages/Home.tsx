import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/* LOCAL IMAGES */

import brownie1 from "../assets/brownie1.png";
import brownie2 from "../assets/brownie2.png";
import brownie3 from "../assets/brownie3.png";

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

    title: "Brownies Almond",

    desc: "Brownies premium dengan topping almond crunchy favorit customer.",
  },

  {
    image: brownie3,

    badge: "🎁 Special Hampers",

    title: "Brownies Mix Topping",

    desc: "Perpaduan topping premium untuk sweet moments spesial.",
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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-16 pb-16 sm:pb-20">

        <div className="grid lg:grid-cols-2 gap-7 lg:gap-14 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-[#f4e3d4] px-4 py-2.5 rounded-full">

              <span className="text-sm">
                🍫
              </span>

              <span className="text-[13px] sm:text-sm font-medium text-[#8b5f47]">

                Premium Brownies & Hampers

              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-[42px] leading-[0.92] sm:text-[72px] lg:text-[90px] font-black tracking-[-2px] sm:tracking-[-3px] mt-6 text-[#3b2b26]">

              Crafted

              <span className="block text-[#c38358]">

                For Sweet

              </span>

              Moments

            </h1>

            {/* DESCRIPTION */}

            <p className="text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-xl mt-6">

              Handmade brownies premium dengan rasa rich chocolate,
              packaging aesthetic,
              dan sentuhan elegan untuk setiap momen spesialmu ✨

            </p>

            {/* MOBILE SLIDER */}

            <div className="mt-7 lg:hidden">

              <HeroSlider />

            </div>

            {/* MOBILE BUTTON */}

            <div className="flex flex-wrap gap-3 mt-7 lg:hidden">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium"
              >

                Order Sekarang

              </a>

              <Link
                to="/menu"
                className="bg-white border border-[#ead8c7] px-5 py-3 rounded-xl text-sm font-medium"
              >

                View Menu

              </Link>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-2 mt-9 max-w-lg">

              <div>

                <h3 className="text-2xl sm:text-4xl font-black text-[#c38358]">

                  290+

                </h3>

                <p className="text-[12px] sm:text-base text-gray-500 mt-1">

                  Happy Clients

                </p>

              </div>

              <div>

                <h3 className="text-2xl sm:text-4xl font-black text-[#c38358]">

                  4.9

                </h3>

                <p className="text-[12px] sm:text-base text-gray-500 mt-1">

                  Rating

                </p>

              </div>

              <div>

                <h3 className="text-2xl sm:text-4xl font-black text-[#c38358]">

                  100%

                </h3>

                <p className="text-[12px] sm:text-base text-gray-500 mt-1">

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

    <div className="relative bg-white rounded-[26px] p-2 shadow-xl overflow-hidden">

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
        className="rounded-[22px] overflow-hidden"
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div className="relative w-full h-[250px] sm:h-[560px] overflow-hidden rounded-[22px]">

              {/* IMAGE */}

              <img
                src={slide.image}
                alt={slide.title}
                draggable={false}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 p-4 sm:p-8 text-white z-10">

                <div className="inline-flex bg-white text-[#3b2b26] text-[11px] sm:text-xs font-semibold px-3 py-2 rounded-full mb-3 shadow">

                  {slide.badge}

                </div>

                <h2 className="text-xl sm:text-4xl font-black leading-tight">

                  {slide.title}

                </h2>

                <p className="mt-2 text-white/90 text-[13px] sm:text-base max-w-md leading-relaxed">

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