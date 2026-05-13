import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import brownie1 from "../assets/brownie1.jpg";

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

    <main className="bg-[#f8f4ef] overflow-hidden">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 sm:pt-16 pb-20 min-h-screen flex items-center">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-[#f2e3d6] text-[#8b5f47] px-5 py-3 rounded-full">

              <span>
                🍫
              </span>

              <span className="text-[12px] sm:text-sm uppercase tracking-[2px] font-semibold">

                Fresh Baked Everyday

              </span>

            </div>

            {/* TITLE */}

            <h1 className="mt-7 text-[42px] sm:text-[68px] lg:text-[88px] leading-[0.9] tracking-[-2px] font-black text-[#2f221d]">

              Brownies Premium

              <span className="block text-[#c38358]">

                Untuk Sweet Moments ✨

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-7 text-[15px] sm:text-lg text-[#6e5e57] leading-relaxed max-w-xl">

              Handmade brownies dengan rich chocolate premium,
              tekstur moist lumer,
              topping melimpah,
              dan packaging aesthetic yang cocok untuk hampers,
              hadiah spesial,
              atau teman ngopi favoritmu.

            </p>

            {/* SOCIAL PROOF */}

            <div className="flex flex-wrap items-center gap-3 mt-7">

              <div className="bg-white shadow-lg border border-[#f0dfd2] px-4 py-2 rounded-full text-sm font-semibold text-[#3b2b26]">

                ⭐ 4.9 Rating Customer

              </div>

              <div className="bg-[#3b2b26] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">

                🔥 Best Seller Bekasi

              </div>

            </div>

            {/* BUTTON */}

            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] hover:bg-black transition-all duration-300 text-white px-7 sm:px-9 py-4 rounded-2xl font-semibold shadow-2xl hover:-translate-y-1"
              >

                Pesan via WhatsApp

              </a>

              <Link
                to="/menu"
                className="bg-white border border-[#ead8c7] hover:bg-[#fff8f3] transition-all duration-300 text-[#3b2b26] px-7 sm:px-9 py-4 rounded-2xl font-semibold shadow-lg"
              >

                Lihat Menu

              </Link>

            </div>

            {/* BENEFITS */}

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-9 text-sm text-[#7a6a62]">

              <div>
                ✔ Premium ingredients
              </div>

              <div>
                ✔ Fresh from oven
              </div>

              <div>
                ✔ Same day order
              </div>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-5 mt-12 max-w-xl">

              <div>

                <h3 className="text-[28px] sm:text-[42px] font-black text-[#c38358] leading-none">

                  290+

                </h3>

                <p className="text-[12px] sm:text-base text-[#7a6a62] mt-2">

                  Happy Clients

                </p>

              </div>

              <div>

                <h3 className="text-[28px] sm:text-[42px] font-black text-[#c38358] leading-none">

                  4.9

                </h3>

                <p className="text-[12px] sm:text-base text-[#7a6a62] mt-2">

                  Customer Rating

                </p>

              </div>

              <div>

                <h3 className="text-[28px] sm:text-[42px] font-black text-[#c38358] leading-none">

                  100%

                </h3>

                <p className="text-[12px] sm:text-base text-[#7a6a62] mt-2">

                  Handmade

                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            {/* GLOW */}

            <div className="absolute inset-0 bg-[#f1d2bd] blur-[120px] opacity-40 rounded-full"></div>

            {/* MAIN IMAGE */}

            <div className="relative bg-white p-3 sm:p-5 rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.12)] overflow-hidden">

              <img
                src={brownie1}
                alt="Brownies Premium"
                className="w-full h-[340px] sm:h-[520px] object-cover rounded-[28px]"
              />

            </div>

            {/* FLOATING BEST SELLER */}

            <div className="absolute -top-4 sm:top-6 -left-2 sm:-left-10 bg-white rounded-2xl shadow-2xl p-4 sm:p-5 border border-[#f1e3d7]">

              <p className="text-[11px] uppercase tracking-[2px] text-[#c38358] font-bold">

                Best Seller

              </p>

              <h3 className="text-lg sm:text-xl font-black text-[#3b2b26] mt-1">

                Brownies Almond

              </h3>

              <p className="text-sm text-gray-500 mt-1">

                Rich chocolate & crunchy almond ✨

              </p>

            </div>

            {/* FLOATING REVIEW */}

            <div className="absolute -bottom-4 sm:bottom-8 right-0 sm:-right-10 bg-[#3b2b26] text-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-[240px]">

              <div className="flex items-center gap-1 text-[#f3c6a3] text-sm">

                ⭐⭐⭐⭐⭐

              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/90">

                “Brownies paling moist yang pernah aku coba 😭✨”

              </p>

              <p className="mt-3 text-sm text-[#f3c6a3] font-semibold">

                - Nadya, Bekasi

              </p>

            </div>

          </motion.div>

        </div>

      </section>

    </main>

  );
}