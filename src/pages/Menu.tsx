const products = [

  {
    title: "Brownies Classic",

    description:
      "Brownies coklat premium dengan tekstur lembut, moist, dan rich chocolate.",

    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",

    tag: "Best Seller",
  },

  {
    title: "Brownies Almond",

    description:
      "Dipadukan topping almond crunchy dengan rasa gurih yang elegan.",

    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop",

    tag: "Premium",
  },

  {
    title: "Brownies Cookies",

    description:
      "Kombinasi brownies lembut dengan cookies crunchy favorit.",

    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=1200&auto=format&fit=crop",

    tag: "Favorite",
  },

  {
    title: "Brownies Mix Topping",

    description:
      "Special brownies dengan berbagai topping premium pilihan.",

    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop",

    tag: "Special",
  },

];

export default function Menu() {

  return (

    <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24">

      {/* HEADER */}

      <div className="text-center">

        <p className="uppercase tracking-[5px] text-[#c38358] text-xs sm:text-sm font-medium">

          Our Menu

        </p>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3b2b26] mt-5 leading-tight">

          Signature Brownies ✨

        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">

          Handmade brownies premium dengan berbagai varian
          rasa favorit dan topping pilihan.

        </p>

      </div>

      {/* GRID MENU */}

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-14 sm:mt-16">

        {products.map((item, index) => (

          <div
            key={index}
            className="group bg-white rounded-[26px] sm:rounded-[30px] overflow-hidden border border-[#f1e3d7] hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] transition-all duration-500"
          >

            {/* IMAGE */}

            <div className="relative overflow-hidden">

              {/* TAG */}

              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-[#f1e3d7]">

                <p className="text-xs font-semibold text-[#8b5f47]">

                  {item.tag}

                </p>

              </div>

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[220px] sm:h-[260px] object-cover group-hover:scale-105 transition duration-700"
              />

            </div>

            {/* CONTENT */}

            <div className="p-6 sm:p-7">

              <h3 className="text-2xl sm:text-3xl font-black text-[#3b2b26] leading-tight">

                {item.title}

              </h3>

              <p className="text-sm sm:text-base text-gray-500 leading-relaxed mt-3">

                {item.description}

              </p>

              {/* BUTTON */}

              <button className="mt-6 bg-[#3b2b26] hover:bg-black transition-all duration-300 text-white px-6 py-3 rounded-full text-sm shadow-lg hover:shadow-xl">

                Order Menu

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}