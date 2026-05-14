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

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* IMAGE */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            {/* GLOW */}

            <div className="absolute inset-0 bg-[#f3cfb7] opacity-30 blur-[100px] rounded-full"></div>

            {/* IMAGE */}

            <div className="relative overflow-hidden rounded-[32px]">

              <img
                src={brownie2}
                alt="Delassa Brownies"
                className="w-full h-[320px] sm:h-[620px] object-cover"
              />

            </div>

          </motion.div>

          {/* CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-[#f3e5d8] px-5 py-3 rounded-full">

              <span className="w-2 h-2 rounded-full bg-[#c38358]"></span>

              <p className="text-[12px] tracking-[2px] uppercase font-semibold text-[#9b6a50]">

                About Delassa

              </p>

            </div>

            {/* TITLE */}

            <h1 className="mt-7 text-[42px] sm:text-[72px] leading-[0.92] tracking-[-3px] font-black text-[#2f221d]">

              More Than
              Dessert

              <span className="block text-[#c38358]">

                It’s An Experience

              </span>

            </h1>

            {/* DESC */}

            <p className="mt-7 text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">

              Delassa hadir untuk menghadirkan brownies premium
              dengan rich chocolate,
              tekstur moist,
              dan sentuhan handmade
              yang dibuat fresh setiap hari

            </p>

            <p className="mt-5 text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">

              Bukan hanya dessert,
              tapi bagian dari hadiah spesial,
              hampers aesthetic,
              dan sweet moments favoritmu.

            </p>

            {/* POINTS */}

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-8 text-sm text-[#7a6a62]">

              <div>✔ Premium ingredients</div>

              <div>✔ Made by order</div>

              <div>✔ Handmade daily</div>

            </div>

            {/* CTA */}

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-10 bg-[#3b2b26] hover:bg-black text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:-translate-y-[2px]"
            >

              Order Sekarang

            </a>

          </motion.div>

        </div>

      </section>

    </main>

  );
}