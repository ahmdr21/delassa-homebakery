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

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-24 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <p className="uppercase tracking-[5px] text-[#c38358] text-sm font-medium">

            Delassa Homebakery

          </p>

          <h1 className="text-[68px] lg:text-[96px] leading-[0.92] tracking-[-4px] font-black mt-6 text-[#3b2b26]">

            Crafted

            <span className="block text-[#c38358]">
              For Sweet
            </span>

            Moments

          </h1>

          <p className="text-lg text-[#6f615a] leading-relaxed max-w-md mt-8">

            Premium handmade brownies
            with elegant packaging ✨

          </p>

          {/* BUTTON */}

          <div className="flex flex-wrap gap-5 mt-10">

            {/* ORDER BUTTON */}

            <a
              href={`https://wa.me/6287715443313?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#3b2b26] hover:bg-black hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 text-white px-8 py-4 rounded-full"
            >

              Order Sekarang

            </a>

            {/* MENU BUTTON */}

            <Link
              to="/menu"
              className="bg-white border border-[#ead8c7] hover:bg-[#fff8f3] transition-all duration-300 px-8 py-4 rounded-full"
            >

              View Menu

            </Link>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >

          {/* FLOATING LOGO */}

<div className="absolute -bottom-6 -right-6 bg-white border border-[#f1e3d7] rounded-full p-4 shadow-xl z-20">

  <img
    src={logo}
    alt="logo"
    className="w-16 h-16 object-contain"
  />

</div>
          {/* IMAGE */}

          <div className="bg-white border border-[#f1e3d7] rounded-[42px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.06)] overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop"
              alt="Brownies"
              className="w-full h-[620px] object-cover rounded-[32px] hover:scale-105 transition duration-700"
            />

          </div>

        </motion.div>

      </section>

      {/* WHY DELASSA */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-6">

          {/* CARD 1 */}

          <div className="bg-white border border-[#f1e3d7] rounded-[30px] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

            <div className="text-4xl">

              🧁

            </div>

            <h3 className="text-2xl font-black mt-5 text-[#3b2b26]">

              Handmade

            </h3>

            <p className="text-gray-500 leading-relaxed mt-3">

              Dibuat dengan sentuhan handmade
              untuk rasa yang lebih spesial.

            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-white border border-[#f1e3d7] rounded-[30px] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

            <div className="text-4xl">

              🍫

            </div>

            <h3 className="text-2xl font-black mt-5 text-[#3b2b26]">

              Premium Ingredients

            </h3>

            <p className="text-gray-500 leading-relaxed mt-3">

              Menggunakan bahan premium
              dengan kualitas terbaik.

            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-white border border-[#f1e3d7] rounded-[30px] p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">

            <div className="text-4xl">

              🎁

            </div>

            <h3 className="text-2xl font-black mt-5 text-[#3b2b26]">

              Elegant Packaging

            </h3>

            <p className="text-gray-500 leading-relaxed mt-3">

              Packaging aesthetic dan elegan
              siap untuk hadiah spesialmu.

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}