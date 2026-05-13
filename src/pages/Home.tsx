import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


import brownie1 from "../assets/brownie1.png";
import brownie2 from "../assets/brownie2.png";
import brownie3 from "../assets/brownie3.png";

const slides = [
  {
    image: brownie1,
    title: "Premium Brownies",
    subtitle: "Handmade With Love",
  },
  {
    image: brownie2,
    title: "Brownies Almond",
    subtitle: "Crunchy & Elegant",
  },
  {
    image: brownie3,
    title: "Mix Topping Series",
    subtitle: "Best Seller Delassa",
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

      <section className="relative w-full min-h-screen overflow-hidden">

        {/* BACKGROUND */}

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

                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />

                  {/* OVERLAY */}

                  <div className="absolute inset-0 bg-black/55"></div>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>
         {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 min-h-screen flex items-center">

          <div className="max-w-3xl pt-28 sm:pt-24">

            {/* BADGE */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-full"
            >

              <span>
                🍫
              </span>

              <span className="text-[12px] sm:text-sm tracking-wide font-medium uppercase">
                Premium Homebakery Bekasi
              </span>

            </motion.div>

            {/* TITLE */}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-7 text-[42px] sm:text-[64px] lg:text-[110px] leading-[0.92] font-black tracking-[-2px] text-white"
            >

              DELASSA

              <span className="block text-[#f3c6a3]">
                HOMEBAKERY
              </span>

            </motion.h1>

            {/* DESC */}

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-6 text-[14px] sm:text-lg text-white/85 leading-relaxed max-w-2xl"
            >

              Handmade brownies premium dengan rasa rich chocolate,
              topping melimpah,
              packaging aesthetic,
              dan kualitas terbaik untuk setiap sweet moments ✨

            </motion.p>

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

                Order Sekarang

              </a>

              <Link
                to="/menu"
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium"
              >

                View Menu

              </Link>

            </motion.div>
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