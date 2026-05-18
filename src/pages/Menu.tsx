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

    price: "Rp55.000",

    description:
      "Rich chocolate brownies dengan tekstur moist dan rasa premium yang lembut di setiap gigitan.",

    image: classicImg,
  },

  {
    title: "Brownies Almond",

    price: "Rp65.000",

    description:
      "Perpaduan brownies premium dengan topping almond crunchy yang gurih dan elegan.",

    image: almondImg,
  },

  {
    title: "Brownies Cookies",

    price: "Rp68.000",

    description:
      "Kombinasi brownies moist dengan topping cookies favorit untuk sweet moments spesial.",

    image: cookiesImg,
  },

  {
    title: "Brownies Mix Topping",

    price: "Rp70.000",

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

          <header className="text-center">

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

                text-[40px]
                sm:text-[58px]
                lg:text-[78px]
                xl:text-[92px]
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

                text-[15px]
                sm:text-[19px]

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

                    text-[14px]
                    sm:text-[16px]

                    font-medium
                  "
                >

                  {item}

                </div>

              ))}

            </div>

          </header>

          {/* ====================================================== */}
          {/* PRODUCT GRID */}
          {/* ====================================================== */}

          <section
            aria-label="Product Menu"
            className="
              grid
              grid-cols-1
              sm:grid-cols-2

              gap-6
              sm:gap-8

              mt-14
              sm:mt-16
            "
          >

            {products.map((item, index) => (

              <motion.article
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
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

                  motion-reduce:transform-none
                  motion-reduce:transition-none
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
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="
                      w-full

                      aspect-[4/3]
                      sm:aspect-[16/10]
                      lg:aspect-[16/9]

                      object-cover
                      object-center

                      group-hover:scale-105

                      transition-transform
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

                  <div className="mt-2">

                    <h2
                      className="
                        text-[28px]
                        sm:text-[34px]

                        leading-[1]

                        tracking-[-1px]

                        font-black

                        text-[#2f221d]
                      "
                    >

                      {item.title}

                    </h2>

                    {/* PRICE */}

                    <p
                      className="
                        mt-3

                        text-[#c38358]

                        text-[21px]
                        sm:text-[25px]

                        font-bold
                      "
                    >

                      {item.price}

                    </p>

                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-5

                      text-[#7a6a62]

                      text-[15px]
                      sm:text-[16px]

                      leading-7
                    "
                  >

                    {item.description}

                  </p>

                  {/* BUTTON */}

                  <a
                    href={`https://wa.me/6287715443313?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Order ${item.title} via WhatsApp`}
                    className="
                      inline-flex
                      items-center
                      justify-center

                      w-full
                      sm:w-auto

                      mt-7

                      bg-[#3b2b26]

                      hover:bg-[#241815]

                      text-white

                      px-6
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

              </motion.article>

            ))}

          </section>

        </div>

      </section>

    </main>

  );

}