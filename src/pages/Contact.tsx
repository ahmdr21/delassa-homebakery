import {
  FaWhatsapp,
  FaInstagram,
  FaLocationDot,
} from "react-icons/fa6";

export default function Contact() {

  const message = encodeURIComponent(`Halo Delassa

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih`);

  return (

    <main className="bg-[#faf7f2]">

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

        {/* HEADER */}

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-[#c38358] text-sm font-semibold">

            Contact

          </p>

          <h1 className="mt-5 text-[42px] sm:text-[64px] leading-[0.95] font-black text-[#2f221d]">

            Order Your
            <span className="block text-[#c38358]">

              Favorite Brownies

            </span>

          </h1>

          <p className="mt-6 text-[#7a6a62] text-[15px] sm:text-lg leading-relaxed max-w-2xl mx-auto">

            Hubungi Delassa melalui WhatsApp atau Instagram
            untuk pemesanan brownies premium dan hampers aesthetic ✨

          </p>

        </div>

        {/* CONTACT CARD */}

        <div className="mt-14 bg-white border border-[#f1e3d7] rounded-[32px] p-6 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.06)]">

          <div className="grid md:grid-cols-3 gap-5">

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 border border-[#f1e3d7] hover:border-[#25D366] rounded-[24px] p-5 transition-all duration-300 hover:-translate-y-1"
            >

              <div className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shrink-0">

                <FaWhatsapp />

              </div>

              <div>

                <p className="text-sm text-[#9b8d86]">

                  WhatsApp

                </p>

                <h3 className="text-lg font-black text-[#3b2b26]">

                  0877-1544-3313

                </h3>

              </div>

            </a>

            {/* INSTAGRAM */}

            <a
              href="https://instagram.com/delassahomebakery"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 border border-[#f1e3d7] hover:border-pink-400 rounded-[24px] p-5 transition-all duration-300 hover:-translate-y-1"
            >

              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white flex items-center justify-center text-2xl shrink-0">

                <FaInstagram />

              </div>

              <div>

                <p className="text-sm text-[#9b8d86]">

                  Instagram

                </p>

                <h3 className="text-lg font-black text-[#3b2b26]">

                  @delassahomebakery

                </h3>

              </div>

            </a>

            {/* LOCATION */}

            <div className="flex items-center gap-4 border border-[#f1e3d7] rounded-[24px] p-5">

              <div className="w-14 h-14 rounded-full bg-[#c38358] text-white flex items-center justify-center text-2xl shrink-0">

                <FaLocationDot />

              </div>

              <div>

                <p className="text-sm text-[#9b8d86]">

                  Location

                </p>

                <h3 className="text-lg font-black text-[#3b2b26]">

                  Bekasi Selatan

                </h3>

              </div>

            </div>

          </div>

          {/* CTA */}

          <div className="mt-10 text-center">

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#3b2b26] hover:bg-black text-white px-10 py-5 rounded-full font-semibold text-lg inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >

              Chat WhatsApp Sekarang

            </a>

          </div>

        </div>

      </section>

    </main>

  );
}