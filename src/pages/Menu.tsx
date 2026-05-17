import { motion } from "framer-motion";

import classicImg from "../assets/browniesclassic3.webp";
import almondImg from "../assets/browniesalmond1.webp";
import cookiesImg from "../assets/browniescoockies1.webp";
import mixImg from "../assets/mixtopping3.webp";

/* ====================================================== */
/* PRODUCTS */
/* ====================================================== */

const products = [
  {
    title: "Brownies Classic",

    description:
      "Rich chocolate brownies dengan tekstur moist dan rasa premium yang lembut di setiap gigitan.",

    image: classicImg,
  },

  {
    title: "Brownies Almond",

    description:
      "Perpaduan brownies premium dengan topping almond crunchy yang gurih dan elegan.",

    image: almondImg,
  },

  {
    title: "Brownies Cookies",

    description:
      "Kombinasi brownies moist dengan topping cookies favorit untuk sweet moments spesial.",

    image: cookiesImg,
  },

  {
    title: "Brownies Mix Topping",

    description:
      "Rich chocolate brownies dengan topping caramel biscuit, choco ball, sliced almond, chocolate cream biscuit, dan roasted peanut crumble.",

    image: mixImg,
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

    <main
      className="
        bg-[#faf7f2]
        overflow-hidden
      "
    >

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section
        className="
          relative

          px-4
          sm:px-6
          lg:px-8

          pt-6
          sm:pt-10

          pb-14
          sm:pb-20
        "
      >

        <div
          className="
            max-w-[1450px]
            mx-auto
          "
        >

          {/* ====================================================== */}
          {/* HEADER */}
          {/* ====================================================== */}

          <div className="text-center">

            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-3

                bg-[#f3e5d8]

                px-5
                sm:px-6

                py-3

                rounded-full
              "
            >

              <span
                className="
                  w-2
                  h-2

                  rounded-full

                  bg-[#c38358]
                "
              />

              <p
                className="
                  text-[11px]
                  sm:text-[12px]

                  tracking-[3px]

                  uppercase

                  font-semibold

                  text-[#9b6a50]
                "
              >

                Our Signature Menu

              </p>

            </div>

            {/* TITLE */}

            <h1
              className="
                mt-7

                text-[#2f221d]

                font-black

                leading-[0.92]

                tracking-[-2px]
                sm:tracking-[-4px]

                text-[46px]
                sm:text-[72px]
                lg:text-[96px]
              "
            >

              Signature
              <br />

              <span className="text-[#c38358]">

                Brownies ✨

              </span>

            </h1>

            {/* DESC */}

            <p
              className="
                mt-7

                text-[#6f615a]

                text-[16px]
                sm:text-[20px]

                leading-relaxed

                max-w-[820px]
                mx-auto
              "
            >

              Handmade brownies premium dengan rich chocolate,
              topping melimpah,
              dan sentuhan aesthetic
              untuk sweet moments favoritmu.

            </p>

            {/* FEATURES */}

            <div
              className="
                flex
                flex-wrap

                justify-center

                gap-x-7
                gap-y-3

                mt-10
              "
            >

              {[
                "✓ Premium ingredients",
                "✓ Made by order",
                "✓ Handmade daily",
              ].map((item, index) => (

                <div
                  key={index}
                  className="
                    text-[#7a6a62]

                    text-[15px]
                    sm:text-[16px]

                    font-medium
                  "
                >

                  {item}

                </div>

              ))}

            </div>

          </div>

          {/* ====================================================== */}
          {/* PRODUCT GRID */}
          {/* ====================================================== */}

          <div
            className="
              grid
              md:grid-cols-2

              gap-6
              sm:gap-8

              mt-14
              sm:mt-16
            "
          >

            {products.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="
                  group

                  bg-white

                  border
                  border-[#ead8c7]

                  rounded-[28px]
                  sm:rounded-[34px]

                  overflow-hidden

                  hover:-translate-y-2

                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]

                  transition-all
                  duration-500
                "
              >

                {/* ====================================================== */}
                {/* IMAGE */}
                {/* ====================================================== */}

                <div className="relative overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="
                      w-full

                      h-[260px]
                      sm:h-[340px]

                      object-cover
                      object-center

                      group-hover:scale-105

                      transition-all
                      duration-700
                    "
                  />

                  {/* OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t
                      from-black/25
                      to-transparent
                    "
                  />

                </div>

                {/* ====================================================== */}
                {/* CONTENT */}
                {/* ====================================================== */}

                <div
                  className="
                    p-6
                    sm:p-8
                  "
                >

                  {/* TITLE */}

                  <h3
                    className="
                      text-[30px]
                      sm:text-[36px]

                      leading-[1]

                      tracking-[-1px]

                      font-black

                      text-[#2f221d]
                    "
                  >

                    {item.title}

                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-5

                      text-[#7a6a62]

                      text-[15px]
                      sm:text-[17px]

                      leading-relaxed
                    "
                  >

                    {item.description}

                  </p>

                  {/* BUTTON */}

                  <a
                    href={`https://wa.me/6287715443313?text=${message}`}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      justify-center

                      mt-7

                      bg-[#3b2b26]

                      hover:bg-[#241815]

                      text-white

                      px-7
                      sm:px-8

                      py-3.5

                      rounded-full

                      text-[14px]
                      sm:text-[15px]

                      font-semibold

                      shadow-[0_10px_30px_rgba(0,0,0,0.12)]

                      hover:-translate-y-[2px]

                      transition-all
                      duration-300
                    "
                  >

                    Order Menu

                  </a>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </main>

  );

}