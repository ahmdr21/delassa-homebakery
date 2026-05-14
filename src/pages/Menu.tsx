const products = [

  {
    title: "Brownies Classic",

    description:
      "Rich chocolate brownies dengan tekstur moist dan rasa premium yang lembut di setiap gigitan.",

    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",

    tag: "Classic",
  },

  {
    title: "Brownies Almond",

    description:
      "Perpaduan brownies premium dengan topping almond crunchy yang gurih dan elegan.",

    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop",

    tag: "Premium",
  },

  {
    title: "Brownies Cookies",

    description:
      "Kombinasi brownies moist dengan topping cookies favorit untuk sweet moments spesial.",

    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=1200&auto=format&fit=crop",

    tag: "Favorite",
  },

  {
    title: "Mix Topping",

    description:
      "Special brownies dengan berbagai topping premium pilihan yang melimpah dan aesthetic.",

    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop",

    tag: "Special",
  },

];

export default function Menu() {

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

          <p className="uppercase tracking-[4px] text-[#c38358] text-sm font-semibold">

            Our Menu

          </p>

          <h1 className="mt-5 text-[42px] sm:text-[68px] leading-[0.95] tracking-[-3px] font-black text-[#2f221d]">

            Signature
            <span className="block text-[#c38358]">

              Brownies ✨

            </span>

          </h1>

          <p className="mt-6 text-[#7a6a62] text-[15px] sm:text-lg leading-relaxed max-w-2xl mx-auto">

            Handmade brownies premium dengan rich chocolate,
            topping melimpah,
            dan sentuhan aesthetic untuk sweet moments favoritmu.

          </p>

        </div>

        {/* GRID */}

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-14">

          {products.map((item, index) => (

            <div
              key={index}
              className="group bg-white border border-[#ead8c7] rounded-[28px] overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
            >

              {/* IMAGE */}

              <div className="relative overflow-hidden">

                {/* TAG */}

                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#ead8c7]">

                  <p className="text-[11px] uppercase tracking-[2px] font-semibold text-[#8b5f47]">

                    {item.tag}

                  </p>

                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[240px] sm:h-[280px] object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              {/* CONTENT */}

              <div className="p-6 sm:p-7">

                <h3 className="text-[30px] leading-tight font-black text-[#2f221d]">

                  {item.title}

                </h3>

                <p className="mt-4 text-[#7a6a62] text-[15px] sm:text-base leading-relaxed">

                  {item.description}

                </p>

                {/* BUTTON */}

                <a
                  href={`https://wa.me/6287715443313?text=${message}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-6 bg-[#3b2b26] hover:bg-black text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:-translate-y-[2px]"
                >

                  Order Menu

                </a>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>

  );
}