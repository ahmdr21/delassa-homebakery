const products = [

  {
    title: "Brownies Classic",

    description:
      "Brownies coklat premium dengan tekstur lembut dan moist.",

    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Brownies Almond",

    description:
      "Dipadukan topping almond crunchy dengan rasa gurih elegan.",

    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Brownies Cookies",

    description:
      "Kombinasi brownies lembut dan cookies premium yang crunchy.",

    image:
      "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=1200&auto=format&fit=crop",
  },

  {
    title: "Brownies Mix Topping",

    description:
      "Special brownies dengan berbagai topping favorit premium.",

    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop",
  },

];

export default function Menu() {

  return (

    <section className="max-w-6xl mx-auto px-6 py-24">

      {/* HEADER */}

      <div className="text-center">

        <p className="uppercase tracking-[5px] text-[#c38358] text-sm font-medium">

          Our Menu

        </p>

        <h2 className="text-5xl lg:text-6xl font-black text-[#3b2b26] mt-5">

          Signature Brownies ✨

        </h2>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">

          Handmade brownies premium dengan berbagai varian
          rasa favorit dan topping pilihan.

        </p>

      </div>

      {/* GRID MENU */}

      <div className="grid md:grid-cols-2 gap-8 mt-16">

        {products.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-[30px] overflow-hidden border border-[#f1e3d7] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
          >

            {/* IMAGE */}

            <div className="overflow-hidden">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[260px] object-cover hover:scale-105 transition duration-700"
              />

            </div>

            {/* CONTENT */}

            <div className="p-7">

              <h3 className="text-3xl font-black text-[#3b2b26]">

                {item.title}

              </h3>

              <p className="text-gray-500 leading-relaxed mt-3">

                {item.description}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}