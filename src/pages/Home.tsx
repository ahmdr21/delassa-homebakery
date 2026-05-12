import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/delassa.png";

export default function Home() {

  const whatsappMessage = `Halo Delassa 👋

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih ✨`;

  return (

    <main className="relative overflow-hidden bg-[#fdf7f2] min-h-screen">

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >

          <div className="inline-flex items-center gap-3 bg-[#f5e7da] border border-[#edd9ca] px-5 py-3 rounded-full shadow-sm">

            <span className="text-lg">
              🍫
            </span>

            <p className="text-sm text-[#8b5f47] font-medium">

              Premium Brownies & Hampers

            </p>

          </div>

          <h1 className="text-[48px] sm:text-[64px] lg:text-[96px] leading-[0.92] tracking-[-2px] sm:tracking-[-3px] lg:tracking-[-4px] font-black mt-7 text-[#3b2b26]">

            Crafted

            <span className="block text-[#c38358]">
              For Sweet
            </span>

            Moments

          </h1>

          <p className="text-base sm:text-lg text-[#6f615a] leading-relaxed max-w-md mt-7">

            Premium handmade brownies
            dengan rasa rich chocolate
            dan packaging aesthetic
            untuk hadiah spesial ✨

          </p>

          {/* BUTTON */}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            {/* ORDER BUTTON */}

            <a
              href={`https://wa.me/6287715443313?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#3b2b26] hover:bg-black hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 text-white px-8 py-4 rounded-full text-center"
            >

              Order Sekarang

            </a>

            {/* MENU BUTTON */}

            <Link
              to="/menu"
              className="bg-white border border-[#ead8c7] hover:bg-[#fff8f3] transition-all duration-300 px-8 py-4 rounded-full text-center"
            >

              View Menu

            </Link>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-14">

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

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative order-1 lg:order-2"
        >

          {/* FLOATING BADGE */}

          <div className="absolute top-5 left-5 sm:top-8 sm:left-8 bg-white border border-[#f1e3d7] rounded-full px-4 py-2 shadow-lg z-20">

            <p className="text-xs sm:text-sm font-medium text-[#8b5f47]">

              ✨ fresh baked everyday

            </p>

          </div>

          {/* FLOATING LOGO */}

          <div className="absolute -bottom-5 -right-2 sm:-right-5 bg-white border border-[#f1e3d7] rounded-full p-3 sm:p-4 shadow-xl z-20">

            <img
              src={logo}
              alt="logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />

          </div>

          {/* IMAGE */}

          <div className="bg-white border border-[#f1e3d7] rounded-[32px] sm:rounded-[42px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.06)] overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop"
              alt="Brownies"
              className="w-full h-[420px] sm:h-[520px] lg:h-[620px] object-cover rounded-[24px] sm:rounded-[32px] hover:scale-105 transition duration-700"
            />

          </div>

        </motion.div>

      </section>

      {/* WHY DELASSA */}

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-24">

        <div className="grid md:grid-cols-3 gap-6">

          {/* CARD 1 */}

          <div className="bg-white border border-[#f1e3d7] rounded-[28px] p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

            <div className="text-4xl">

              🧁

            </div>

            <h3 className="text-2xl font-black mt-5 text-[#3b2b26]">

              Handmade

            </h3>

            <p className="text-gray-500 leading-relaxed mt-3 text-[15px]">

              Dibuat dengan sentuhan handmade
              untuk rasa yang lebih spesial.

            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-white border border-[#f1e3d7] rounded-[28px] p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

            <div className="text-4xl">

              🍫

            </div>

            <h3 className="text-2xl font-black mt-5 text-[#3b2b26]">

              Premium Ingredients

            </h3>

            <p className="text-gray-500 leading-relaxed mt-3 text-[15px]">

              Menggunakan bahan premium
              dengan kualitas terbaik.

            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-white border border-[#f1e3d7] rounded-[28px] p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

            <div className="text-4xl">

              🎁

            </div>

            <h3 className="text-2xl font-black mt-5 text-[#3b2b26]">

              Elegant Packaging

            </h3>

            <p className="text-gray-500 leading-relaxed mt-3 text-[15px]">

              Packaging aesthetic dan elegan
              siap untuk hadiah spesialmu.

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}