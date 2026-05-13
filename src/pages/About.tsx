import { motion } from "framer-motion";

import brownie2 from "../assets/brownie2.png";

export default function About() {

  const message = encodeURIComponent(`Halo Delassa

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih`);

  return (

    <main className="bg-[#faf7f2] overflow-hidden">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            {/* GLOW */}

            <div className="absolute inset-0 bg-[#f0cdb3] opacity-40 blur-[100px] rounded-full"></div>

            {/* IMAGE CARD */}

            <div className="relative bg-white p-3 rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.12)]">

              <img
                src={brownie2}
                alt="Delassa Brownies"
                className="w-full h-[320px] sm:h-[580px] object-cover rounded-[24px]"
              />

            </div>

          </motion.div>

          {/* CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-[#f3e5d8] px-5 py-3 rounded-full">

              <span className="uppercase tracking-[3px] text-[11px] sm:text-sm font-semibold text-[#8b5f47]">

                About Delassa

              </span>

            </div>

            {/* TITLE */}

            <h1 className="mt-6 text-[42px] sm:text-[68px] leading-[0.95] tracking-[-2px] font-black text-[#2f221d]">

              Crafted With Detail

              <span className="block text-[#c38358]">

                For Sweet Moments

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">

              Delassa menghadirkan brownies premium
              dengan rich chocolate,
              tekstur moist,
              dan sentuhan handmade
              untuk setiap momen spesialmu.

            </p>

            <p className="mt-5 text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">

              Setiap brownies dibuat fresh setelah pesanan masuk,
              menggunakan premium ingredients pilihan
              dengan kualitas rasa yang selalu terjaga.

            </p>

            {/* FEATURES */}

            <div className="grid sm:grid-cols-3 gap-4 mt-10">

              <div className="bg-white border border-[#f1e3d7] rounded-[24px] p-5 shadow-lg">

                <div className="text-3xl">

                  🍫

                </div>

                <h3 className="mt-4 text-lg font-black text-[#3b2b26]">

                  Premium Ingredients

                </h3>

                <p className="mt-2 text-sm text-[#7a6a62] leading-relaxed">

                  Menggunakan bahan pilihan berkualitas premium.

                </p>

              </div>

              <div className="bg-white border border-[#f1e3d7] rounded-[24px] p-5 shadow-lg">

                <div className="text-3xl">

                  ✨

                </div>

                <h3 className="mt-4 text-lg font-black text-[#3b2b26]">

                  Made By Order

                </h3>

                <p className="mt-2 text-sm text-[#7a6a62] leading-relaxed">

                  Dibuat fresh setelah pesanan masuk.

                </p>

              </div>

              <div className="bg-white border border-[#f1e3d7] rounded-[24px] p-5 shadow-lg">

                <div className="text-3xl">

                  🤎

                </div>

                <h3 className="mt-4 text-lg font-black text-[#3b2b26]">

                  Handmade Daily

                </h3>

                <p className="mt-2 text-sm text-[#7a6a62] leading-relaxed">

                  Diproses handmade dengan detail di setiap brownies.

                </p>

              </div>

            </div>

            {/* BUTTON */}

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-10 bg-[#3b2b26] hover:bg-black text-white px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

              Order Sekarang

            </a>

          </motion.div>

        </div>

      </section>

    </main>

  );
}