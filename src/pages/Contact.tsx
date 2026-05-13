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

    <main className="bg-[#faf7f2] overflow-hidden">

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

        {/* CONTACT INFO */}

        <div className="flex flex-wrap items-center justify-center gap-10 mt-16">

          {/* WHATSAPP */}

          <a
            href={`https://wa.me/6287715443313?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 text-[#3b2b26] hover:opacity-70 transition-all duration-300"
          >

            <div className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shrink-0 shadow-lg">

              <FaWhatsapp />

            </div>

            <div className="text-left">

              <p className="text-sm text-[#9b8d86] font-medium font-sans">

                WhatsApp

              </p>

              <h3 className="mt-1 text-[18px] font-bold text-[#2f221d] leading-tight">

                0877-1544-3313

              </h3>

            </div>

          </a>

          {/* INSTAGRAM */}

          <a
            href="https://instagram.com/delassa.homebakery"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 text-[#3b2b26] hover:opacity-70 transition-all duration-300"
          >

            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white flex items-center justify-center text-2xl shrink-0 shadow-lg">

              <FaInstagram />

            </div>

            <div className="text-left">

              <p className="text-sm text-[#9b8d86] font-medium font-sans">

                Instagram

              </p>

              <h3 className="mt-1 text-[18px] font-bold text-[#2f221d] leading-tight font-['Poppins']">

                @delassa.homebakery

              </h3>

            </div>

          </a>

          {/* LOCATION */}

          <div className="flex items-center gap-4 text-[#3b2b26]">

            <div className="w-14 h-14 rounded-full bg-[#c38358] text-white flex items-center justify-center text-2xl shrink-0 shadow-lg">

              <FaLocationDot />

            </div>

            <div className="text-left">

              <p className="text-sm text-[#9b8d86] font-medium font-sans">

                Location

              </p>

              <h3 className="mt-1 text-[18px] font-bold text-[#2f221d] leading-tight font-['Poppins']">

                Bekasi Selatan

              </h3>

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}