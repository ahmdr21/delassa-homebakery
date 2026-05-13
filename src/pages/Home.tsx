import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import brownie1 from "../assets/brownie1.png";
import brownie2 from "../assets/brownie2.png";
import brownie3 from "../assets/brownie3.png";

const products = [

  {
    title: "Brownies Almond",
    price: "Rp45.000",
    image: brownie1,
  },

  {
    title: "Brownies Premium",
    price: "Rp55.000",
    image: brownie2,
  },

  {
    title: "Mix Topping",
    price: "Rp60.000",
    image: brownie3,
  },

  {
    title: "Chocolate Melt",
    price: "Rp50.000",
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

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-12">

        <div className="grid lg:grid-cols-2 gap-6 items-center">

          {/* LEFT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            <img
              src={brownie1}
              alt="Brownies"
              className="w-full h-[280px] sm:h-[500px] object-cover rounded-[28px]"
            />

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >

            <p className="uppercase tracking-[4px] text-[#c38358] text-sm font-semibold">

              Premium Homebakery

            </p>

            <h1 className="mt-5 text-[42px] sm:text-[70px] leading-[0.9] font-black text-[#2f221d]">

              Brownies

              <span className="block text-[#c38358]">

                With Filling

              </span>

            </h1>

            <p className="mt-6 text-[#6f615a] text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">

              Handmade brownies premium dengan rich chocolate,
              topping melimpah,
              dan rasa moist lumer untuk sweet moments spesialmu ✨

            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#3b2b26] hover:bg-black text-white px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300"
              >

                Order Sekarang

              </a>

              <Link
                to="/menu"
                className="border border-[#ead8c7] hover:bg-white px-8 py-4 rounded-full font-semibold text-[#3b2b26] transition-all duration-300"
              >

                View Menu

              </Link>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURE GRID */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-8">

        <div className="grid md:grid-cols-3 gap-5">

          {/* CARD */}

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#6a3418] text-white rounded-[28px] p-8 flex flex-col justify-center min-h-[280px]"
          >

            <p className="uppercase tracking-[3px] text-sm text-white/70">

              Special Menu

            </p>

            <h3 className="mt-4 text-3xl font-black">

              Cakes For Parties

            </h3>

            <p className="mt-4 text-white/80 leading-relaxed">

              Perfect untuk ulang tahun,
              hampers,
              dan acara spesial ✨

            </p>

            <button className="mt-6 bg-white text-[#3b2b26] px-5 py-3 rounded-full w-fit font-semibold">

              Shop Now

            </button>

          </motion.div>

          {/* IMAGE */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 overflow-hidden rounded-[28px]"
          >

            <img
              src={brownie2}
              alt="Brownies"
              className="w-full h-[280px] object-cover"
            />

          </motion.div>

        </div>

      </section>

      {/* BEST SELLER */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-20">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-[#c38358] text-sm font-semibold">

            Best Seller

          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#2f221d]">

            Product This Week

          </h2>

        </div>

        {/* PRODUCT GRID */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

          {products.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-lg border border-[#f1e3d7]"
            >

              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[180px] object-cover hover:scale-105 transition duration-700"
                />

              </div>

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

      {/* BANNER */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-20">

        <div className="grid md:grid-cols-2 gap-5">

          {/* LEFT */}

          <div className="relative overflow-hidden rounded-[32px]">

            <img
              src={brownie2}
              alt="Banner"
              className="w-full h-[260px] object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-8 left-8 text-white">

              <h3 className="text-3xl font-black">

                Fresh Bread

              </h3>

              <p className="mt-2 text-white/80">

                Handmade every morning

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative overflow-hidden rounded-[32px]">

            <img
              src={brownie3}
              alt="Banner"
              className="w-full h-[260px] object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-8 left-8 text-white">

              <h3 className="text-3xl font-black">

                Fruit Cakes

              </h3>

              <p className="mt-2 text-white/80">

                Sweet & aesthetic dessert

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}