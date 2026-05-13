import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import brownie1 from "../assets/brownie1.png";
import brownie2 from "../assets/brownie2.png";
import brownie3 from "../assets/brownie3.png";

const products = [

  {
    title: "Brownies Almond",
    price: "Start From Rp45K",
    image: brownie1,
  },

  {
    title: "Brownies Premium",
    price: "Start From Rp55K",
    image: brownie2,
  },

  {
    title: "Mix Topping",
    price: "Start From Rp60K",
    image: brownie3,
  },

  {
    title: "Chocolate Melt",
    price: "Start From Rp50K",
    image: brownie1,
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

    <main className="bg-[#faf7f2] overflow-hidden">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-14">

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            {/* GLOW */}

            <div className="absolute inset-0 bg-[#f0cdb3] opacity-40 blur-[100px] rounded-full"></div>

            {/* IMAGE */}

            <div className="relative bg-white p-3 rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.12)]">

              <img
                src={brownie1}
                alt="Brownies"
                className="w-full h-[320px] sm:h-[580px] object-cover rounded-[24px]"
              />

            </div>

            {/* FLOATING CARD */}

            <div className="absolute -bottom-5 sm:bottom-8 -right-2 sm:-right-8 bg-white rounded-2xl shadow-2xl p-5 max-w-[230px] border border-[#f1e3d7]">

              <p className="text-[11px] uppercase tracking-[2px] text-[#c38358] font-bold">

                DELASSA SIGNATURE

              </p>

              <h3 className="mt-2 text-xl font-black text-[#3b2b26]">

                Rich Chocolate Brownies

              </h3>

              <p className="mt-2 text-sm text-[#7a6a62] leading-relaxed">

                Moist texture dengan premium chocolate topping ✨

              </p>

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-[#f3e5d8] px-5 py-3 rounded-full">

              <span>
                🍫
              </span>

              <span className="uppercase tracking-[3px] text-[11px] sm:text-sm font-semibold text-[#8b5f47]">

                Fresh Baked Everyday

              </span>

            </div>

            {/* TITLE */}

            <h1 className="mt-6 text-[42px] sm:text-[72px] leading-[0.9] tracking-[-2px] font-black text-[#2f221d]">

              Brownies Premium

              <span className="block text-[#c38358]">

                Untuk Sweet Moments ✨

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-6 text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">

              Handmade brownies dengan rich chocolate premium,
              tekstur moist lumer,
              topping melimpah,
              dan packaging aesthetic untuk hampers,
              hadiah spesial,
              atau teman ngopi favoritmu.

            </p>

            {/* TRUST */}

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">

              <div className="bg-white shadow-lg border border-[#f1e3d7] px-4 py-2 rounded-full text-sm font-semibold text-[#3b2b26]">

                ⭐ 4.9 Rating Customer

              </div>

              <div className="bg-[#3b2b26] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">

                🔥 Fresh From Oven

              </div>

            </div>

            {/* BUTTON */}

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-9">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] hover:bg-black text-white px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1"
              >

                Pesan via WhatsApp

              </a>

              <Link
                to="/menu"
                className="border border-[#ead8c7] hover:bg-white px-8 py-4 rounded-full font-semibold text-[#3b2b26] transition-all duration-300"
              >

                View Menu

              </Link>

            </div>

            {/* BENEFITS */}

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mt-10 text-sm text-[#7a6a62]">

              <div>
                ✔ Premium ingredients
              </div>

              <div>
                ✔ Made by order
              </div>

              <div>
                ✔ Handmade daily
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* SIGNATURE COLLECTION */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-24">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-[#c38358] text-sm font-semibold">

            Signature Collection

          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#2f221d]">

            Crafted For Sweet Moments

          </h2>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

          {products.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-lg border border-[#f1e3d7]"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[200px] object-cover hover:scale-105 transition duration-700"
                />

              </div>

              {/* CONTENT */}

              <div className="p-5 text-center">

                <h3 className="text-lg font-black text-[#3b2b26]">

                  {item.title}

                </h3>

                <p className="mt-2 text-[#c38358] font-semibold">

                  {item.price}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* MADE BY ORDER */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-24 pb-20">

        <div className="bg-[#3b2b26] rounded-[36px] overflow-hidden relative shadow-[0_25px_80px_rgba(0,0,0,0.15)]">

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-black/20"></div>

          {/* CONTENT */}

          <div className="relative z-10 grid lg:grid-cols-2 items-center">

            {/* LEFT CONTENT */}

            <div className="p-8 sm:p-12 lg:p-16 text-white">

              {/* BADGE */}

              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full">

                <span>
                  🍫
                </span>

                <span className="uppercase tracking-[3px] text-[11px] sm:text-sm font-semibold text-[#f3c6a3]">

                  Fresh From Oven

                </span>

              </div>

              {/* TITLE */}

              <h2 className="mt-6 text-4xl sm:text-6xl leading-[1] font-black">

                Made By Order,
                Freshly Baked Everyday ✨

              </h2>

              {/* DESCRIPTION */}

              <p className="mt-6 text-white/80 text-[15px] sm:text-lg leading-relaxed max-w-xl">

                Setiap brownies dibuat khusus setelah pesanan masuk,
                menggunakan premium ingredients pilihan,
                sehingga kualitas rasa,
                tekstur moist,
                dan aroma brownies fresh tetap terjaga saat sampai ke tanganmu.

              </p>

              {/* POINTS */}

              <div className="grid sm:grid-cols-2 gap-4 mt-8 text-sm sm:text-base text-white/85">

                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                  ✔ Fresh baked after order

                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                  ✔ No overnight stock

                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                  ✔ Premium chocolate ingredients

                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">

                  ✔ Handmade with detailed process

                </div>

              </div>

              {/* BUTTON */}

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-10 bg-[#f3c6a3] hover:bg-white text-[#3b2b26] px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-2xl hover:-translate-y-1"
              >

                Order Sekarang

              </a>

            </div>

            {/* RIGHT IMAGE */}

            <div className="relative h-full min-h-[320px] sm:min-h-[520px] overflow-hidden">

              <img
                src={brownie2}
                alt="Fresh Brownies"
                className="w-full h-full object-cover hover:scale-105 transition duration-700"
              />

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}