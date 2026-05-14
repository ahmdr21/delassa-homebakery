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

      <section className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

        {/* HEADER */}

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-[#c38358] text-sm font-semibold">

            Contact

          </p>

          <h1 className="mt-5 text-[40px] sm:text-[64px] leading-[0.95] tracking-[-2px] font-black text-[#2f221d]">

            Let’s Create
            <span className="block text-[#c38358]">

              Sweet Moments

            </span>

          </h1>

          <p className="mt-6 text-[#7a6a62] text-[15px] sm:text-lg leading-relaxed max-w-xl mx-auto">

            Hubungi Delassa untuk pemesanan brownies premium,
            hampers aesthetic,
            dan dessert favoritmu ✨

          </p>

        </div>

        {/* CONTACT LIST */}

        <div className="mt-14 flex flex-col gap-5">

          {/* WHATSAPP */}

          <a
            href={`https://wa.me/6287715443313?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 bg-white border border-[#ead8c7] rounded-2xl px-5 py-5 hover:shadow-lg transition-all duration-300"
          >

            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center text-xl shrink-0">

              <FaWhatsapp />

            </div>

            <div>

              <p className="text-sm text-[#9b8d86] font-medium">

                WhatsApp

              </p>

              <h3 className="text-[18px] font-semibold text-[#2f221d] mt-[2px]">

                0877-1544-3313

              </h3>

            </div>

          </a>

          {/* INSTAGRAM */}

          <a
            href="https://instagram.com/delassa.homebakery"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 bg-white border border-[#ead8c7] rounded-2xl px-5 py-5 hover:shadow-lg transition-all duration-300"
          >

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white flex items-center justify-center text-xl shrink-0">

              <FaInstagram />

            </div>

            <div>

              <p className="text-sm text-[#9b8d86] font-medium">

                Instagram

              </p>

              <h3 className="text-[18px] font-semibold text-[#2f221d] mt-[2px]">

                @delassa.homebakery

              </h3>

            </div>

          </a>

          {/* LOCATION */}

          <div className="flex items-center gap-4 bg-white border border-[#ead8c7] rounded-2xl px-5 py-5">

            <div className="w-12 h-12 rounded-full bg-[#c38358] text-white flex items-center justify-center text-xl shrink-0">

              <FaLocationDot />

            </div>

            <div>

              <p className="text-sm text-[#9b8d86] font-medium">

                Location

              </p>

              <h3 className="text-[18px] font-semibold text-[#2f221d] mt-[2px]">

                Bekasi Selatan, Jawa Barat

              </h3>

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}