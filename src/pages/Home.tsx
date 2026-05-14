import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import brownie1 from "../assets/browniesalmond1.png";
import brownie2 from "../assets/browniescoockies1.png";
import brownie3 from "../assets/mixtopping3.png";

const products = [
  {
    title: "Brownies Almond",
    price: "Start From RpxxK",
    image: brownie1,
  },

  {
    title: "Brownies Coockies",
    price: "Start From RpxxK",
    image: brownie2,
  },

  {
    title: "Mix Topping",
    price: "Start From RpxxK",
    image: brownie3,
  },
];

export default function Home() {

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

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 sm:pt-16">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* IMAGE */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative order-1 lg:order-2"
          >

            <div className="absolute inset-0 bg-[#f0cdb3] opacity-30 blur-[90px] rounded-full"></div>

            <div className="relative overflow-hidden rounded-[32px]">

              <img
                src={brownie1}
                alt="Brownies"
                className="w-full h-[320px] sm:h-[520px] object-cover"
              />

            </div>

          </motion.div>

          {/* CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 bg-[#f3e3d6] px-5 py-3 rounded-full">

              <span className="w-2 h-2 rounded-full bg-[#c38358]"></span>

              <p className="text-[12px] tracking-[2px] uppercase font-semibold text-[#9b6a50]">

                Fresh Baked Everyday

              </p>

            </div>

            {/* TITLE */}

            <h1 className="mt-7 text-[44px] sm:text-[76px] leading-[0.9] tracking-[-3px] font-black text-[#2f221d]">

              Rich Chocolate

              <span className="block text-[#c38358]">

                Brownies

              </span>

            </h1>

            {/* DESC */}

            <p className="mt-6 text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">

              Handmade brownies premium dengan rich chocolate,
              topping melimpah,
              dan packaging aesthetic untuk hampers,
              hadiah spesial,
              atau sweet moments favoritmu

            </p>

            {/* BUTTON */}

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] hover:bg-black text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl inline-flex items-center justify-center"
              >

                Order Sekarang

              </a>

              <Link
                to="/menu"
                className="border border-[#ead8c7] hover:bg-white text-[#3b2b26] px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >

                View Menu

              </Link>

            </div>

            {/* BENEFITS */}

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-8 text-sm text-[#7a6a62]">

              <div>✔ Premium ingredients</div>

              <div>✔ Made by order</div>

              <div>✔ Fresh from oven</div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

        {/* TITLE */}

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-[#c38358] text-sm font-semibold">

            Signature Menu

          </p>

          <h2 className="mt-4 text-[36px] sm:text-[52px] leading-[1] font-black text-[#2f221d]">

            Crafted For
            Sweet Moments

          </h2>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

          {products.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="group"
            >

              <div className="overflow-hidden rounded-[28px]">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div className="mt-5 text-center">

                <h3 className="text-[24px] font-black text-[#2f221d]">

                  {item.title}

                </h3>

                <p className="mt-2 text-[#c38358] font-semibold">

                  {item.price}

                </p>

                <a
                  href={`https://wa.me/6287715443313?text=${message}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-[#3b2b26] font-semibold hover:text-[#c38358] transition-all duration-300"
                >

                  Order Now →

                </a>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* MADE BY ORDER */}

      <section className="bg-[#3b2b26] py-16 sm:py-24">

        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}

          <div className="overflow-hidden rounded-[32px] order-1">

            <img
              src={brownie2}
              alt="Fresh Brownies"
              className="w-full h-[320px] sm:h-[520px] object-cover"
            />

          </div>

          {/* CONTENT */}

          <div className="text-white order-2">

            <p className="uppercase tracking-[4px] text-[#f3c6a3] text-sm font-semibold">

              Made By Order

            </p>

            <h2 className="mt-5 text-[40px] sm:text-[62px] leading-[0.95] font-black">

              Freshly Baked
              Everyday

            </h2>

            <p className="mt-6 text-white/75 text-[15px] sm:text-lg leading-relaxed max-w-xl">

              Setiap brownies dibuat setelah pesanan masuk,
              menggunakan premium ingredients pilihan
              untuk menjaga rasa,
              aroma,
              dan tekstur tetap fresh saat sampai ke tanganmu.

            </p>

            {/* POINTS */}

            <div className="flex flex-wrap gap-4 mt-8 text-sm text-white/80">

              <div>✔ Handmade daily</div>

              <div>✔ Premium chocolate</div>

              <div>✔ Fresh from oven</div>

            </div>

            {/* BUTTON */}

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-10 bg-[#f3c6a3] hover:bg-white text-[#3b2b26] px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >

              Order Sekarang

            </a>

          </div>

        </div>

      </section>

    </main>

  );
}