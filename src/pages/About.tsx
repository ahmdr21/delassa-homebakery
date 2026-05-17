import { motion } from "framer-motion";

import brownie2 from "../assets/mixtopping2.webp";

export default function About() {

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
      {/* HERO ABOUT */}
      {/* ====================================================== */}

      <section
        className="
          relative

          px-4
          sm:px-6
          lg:px-8

          pt-6
          sm:pt-10

          pb-20
          sm:pb-28
        "
      >

        <div
          className="
            max-w-[1450px]
            mx-auto
          "
        >

          <div
            className="
              grid
              lg:grid-cols-[0.95fr_1.05fr]

              gap-10
              lg:gap-16

              items-center
            "
          >

            {/* ====================================================== */}
            {/* IMAGE */}
            {/* ====================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >

              {/* GLOW */}

              <div
                className="
                  absolute
                  inset-0

                  bg-[#f3cfb7]

                  opacity-20

                  blur-[120px]

                  rounded-full
                "
              />

              {/* IMAGE */}

              <div
                className="
                  relative

                  overflow-hidden

                  rounded-[28px]
                  sm:rounded-[40px]

                  shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                "
              >

                <img
                  src={brownie2}
                  alt="Delassa Brownies"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="
                    w-full

                    h-[320px]
                    sm:h-[520px]
                    lg:h-[760px]

                    object-cover
                    object-center
                  "
                />

              </div>

            </motion.div>

            {/* ====================================================== */}
            {/* CONTENT */}
            {/* ====================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="
                text-center
                lg:text-left
              "
            >

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

                  About Delassa

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

                  text-[44px]
                  sm:text-[72px]
                  lg:text-[96px]
                "
              >

                More Than
                <br />

                Dessert

                <span
                  className="
                    block

                    text-[#c38358]

                    mt-2
                  "
                >

                  It’s An Experience

                </span>

              </h1>

              {/* DESCRIPTION */}

              <div
                className="
                  mt-8

                  space-y-5

                  max-w-[680px]

                  mx-auto
                  lg:mx-0
                "
              >

                <p
                  className="
                    text-[#6f615a]

                    text-[16px]
                    sm:text-[20px]

                    leading-relaxed
                  "
                >

                  Delassa hadir untuk menghadirkan brownies
                  premium dengan rich chocolate,
                  tekstur moist,
                  dan sentuhan handmade
                  yang dibuat fresh setiap hari.

                </p>

                <p
                  className="
                    text-[#6f615a]

                    text-[16px]
                    sm:text-[20px]

                    leading-relaxed
                  "
                >

                  Bukan hanya dessert,
                  tapi bagian dari hadiah spesial,
                  hampers aesthetic,
                  dan sweet moments favoritmu.

                </p>

              </div>

              {/* FEATURES */}

              <div
                className="
                  flex
                  flex-wrap

                  justify-center
                  lg:justify-start

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

              {/* CTA */}

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center

                  mt-10

                  bg-[#3b2b26]

                  hover:bg-[#241815]

                  text-white

                  px-8
                  sm:px-10

                  py-4

                  rounded-full

                  text-[15px]
                  sm:text-[16px]

                  font-semibold

                  shadow-[0_10px_30px_rgba(0,0,0,0.12)]

                  hover:-translate-y-[2px]

                  transition-all
                  duration-300
                "
              >

                Order Sekarang

              </a>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* EXTRA SECTION */}
      {/* ====================================================== */}

      <section
        className="
          px-4
          sm:px-6
          lg:px-8

          pb-20
          sm:pb-28
        "
      >

        <div
          className="
            max-w-[1450px]
            mx-auto
          "
        >

          <div
            className="
              bg-[#3a241c]

              rounded-[30px]
              sm:rounded-[40px]

              overflow-hidden

              relative
            "
          >

            {/* BG EFFECT */}

            <div
              className="
                absolute
                inset-0

                opacity-10

                bg-[radial-gradient(circle_at_top_right,#ffffff,transparent_40%)]
              "
            />

            <div
              className="
                relative

                grid
                lg:grid-cols-2

                items-center
              "
            >

              {/* LEFT */}

              <div
                className="
                  p-8
                  sm:p-12
                  lg:p-16
                "
              >

                <p
                  className="
                    text-[#efbb90]

                    uppercase

                    tracking-[4px]

                    text-[12px]

                    font-semibold
                  "
                >

                  Freshly Baked Everyday

                </p>

                <h2
                  className="
                    mt-5

                    text-white

                    font-black

                    leading-[0.95]

                    text-[40px]
                    sm:text-[62px]
                    lg:text-[78px]
                  "
                >

                  Brownies
                  Crafted
                  With Love

                </h2>

                <p
                  className="
                    mt-6

                    text-white/80

                    text-[16px]
                    sm:text-[18px]

                    leading-relaxed

                    max-w-[580px]
                  "
                >

                  Setiap brownies dibuat setelah pesanan masuk,
                  menggunakan premium ingredients pilihan
                  untuk menjaga rasa,
                  aroma,
                  dan tekstur tetap fresh
                  sampai ke tanganmu.

                </p>

              </div>

              {/* RIGHT */}

              <div
                className="
                  h-[320px]
                  sm:h-[420px]
                  lg:h-full
                "
              >

                <img
                  src={brownie2}
                  alt="Delassa Premium Brownies"
                  loading="lazy"
                  decoding="async"
                  className="
                    w-full
                    h-full

                    object-cover
                    object-center
                  "
                />

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}