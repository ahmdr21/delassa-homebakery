import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {

  const [name, setName] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [menu, setMenu] = useState("");
  const [message, setMessage] = useState("");

  const sendWhatsApp = () => {

    if (!name || !pickupDate || !menu || !message) {

      alert("Lengkapi semua form ✨");

      return;
    }

    const text = `
Halo Delassa 🤎

Saya ingin melakukan pemesanan brownies.

Nama: ${name}
Tanggal Pickup: ${pickupDate}
Varian Menu: ${menu}

Request Tambahan:
${message}

Terima kasih ✨
    `;

    window.open(
      `https://wa.me/6287715443313?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (

    <section className="min-h-screen bg-[#fdf7f2] flex items-center overflow-hidden">

      <div className="max-w-6xl mx-auto px-5 sm:px-6 w-full py-16 sm:py-20">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <p className="uppercase tracking-[6px] text-[#c38358] text-xs font-semibold">

              Contact

            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mt-5 text-[#3b2b26]">

              Let’s Create

              <span className="block text-[#c38358]">
                Sweet Moments
              </span>

            </h1>

            <div className="w-20 h-[3px] bg-[#c38358] rounded-full mt-6"></div>

            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mt-8 max-w-md">

              Hubungi Delassa untuk pemesanan brownies premium,
              hampers aesthetic,
              dan dessert favoritmu ✨

            </p>

            {/* CONTACT CARD */}

            <div className="flex flex-col gap-5 mt-10">

              {/* EMAIL */}

              <div className="bg-white border border-[#f1e3d7] rounded-[24px] px-5 py-4 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">

                <div className="w-12 h-12 rounded-2xl bg-[#fdf7f2] flex items-center justify-center text-xl">

                  ✉️

                </div>

                <div>

                  <p className="text-gray-400 text-sm">

                    Email

                  </p>

                  <h3 className="text-sm sm:text-base font-bold text-[#3b2b26] break-all">

                    delassahomebakery@gmail.com

                  </h3>

                </div>

              </div>

              {/* INSTAGRAM */}

              <div className="bg-white border border-[#f1e3d7] rounded-[24px] px-5 py-4 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">

                <div className="w-12 h-12 rounded-2xl bg-[#fdf7f2] flex items-center justify-center text-xl">

                  📸

                </div>

                <div>

                  <p className="text-gray-400 text-sm">

                    Instagram

                  </p>

                  <h3 className="text-sm sm:text-base font-bold text-[#3b2b26]">

                    @delassa.homebakery

                  </h3>

                </div>

              </div>

              {/* LOCATION */}

              <div className="bg-white border border-[#f1e3d7] rounded-[24px] px-5 py-4 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">

                <div className="w-12 h-12 rounded-2xl bg-[#fdf7f2] flex items-center justify-center text-xl">

                  📍

                </div>

                <div>

                  <p className="text-gray-400 text-sm">

                    Location

                  </p>

                  <h3 className="text-sm sm:text-base font-bold text-[#3b2b26]">

                    Bekasi Selatan

                  </h3>

                </div>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[30px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#f1e3d7]"
          >

            <div className="flex flex-col gap-5">

              {/* NAME */}

              <input
                type="text"
                placeholder="Nama Pemesan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none border border-transparent focus:border-[#c38358] transition text-sm sm:text-base"
              />

              {/* PICKUP */}

              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none border border-transparent focus:border-[#c38358] transition text-sm sm:text-base"
              />

              {/* MENU */}

              <select
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
                className="w-full bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none border border-transparent focus:border-[#c38358] transition text-sm sm:text-base"
              >

                <option value="">
                  Pilih Varian Menu
                </option>

                <option>
                  Brownies Classic
                </option>

                <option>
                  Brownies Almond
                </option>

                <option>
                  Brownies Cookies
                </option>

                <option>
                  Brownies Mix Topping
                </option>

              </select>

              {/* MESSAGE */}

              <textarea
                rows={5}
                placeholder="Request tambahan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none resize-none border border-transparent focus:border-[#c38358] transition text-sm sm:text-base"
              ></textarea>

              {/* BUTTON */}

              <button
                onClick={sendWhatsApp}
                className="bg-[#3b2b26] hover:bg-black hover:-translate-y-1 transition-all duration-500 text-white py-4 rounded-2xl text-sm sm:text-base font-semibold shadow-lg"
              >

                Send Message 🚀

              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}