import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Gift, Leaf, ChefHat, ArrowRight } from "lucide-react";

import heroImage from "../assets/mixtopping2.webp";
import gallery1 from "../assets/browniesalmond1.webp";
import gallery2 from "../assets/browniescoockies1.webp";
import gallery3 from "../assets/mixtopping3.webp";
import logoDelassa from "../assets/delassa.png";

const features = [
  {
    icon: Leaf,
    title: "Premium Ingredients",
    description:
      "Kami hanya menggunakan bahan pilihan berkualitas untuk menghasilkan rasa brownies yang rich dan autentik.",
  },
  {
    icon: ChefHat,
    title: "Freshly Baked",
    description:
      "Dibuat fresh setiap hari dengan proses yang menjaga tekstur dan rasa tetap sempurna.",
  },
  {
    icon: Heart,
    title: "Handmade With Love",
    description:
      "Setiap brownies dibuat dengan sentuhan handmade dan perhatian di setiap detailnya.",
  },
  {
    icon: Gift,
    title: "Perfect For Every Moment",
    description:
      "Cocok untuk coffee time, hadiah spesial, hampers, maupun self reward setelah hari yang panjang.",
  },
];

export default function About() {

  const navigate = useNavigate();

  const message = encodeURIComponent(`Halo Delassa

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih`);

  return (

    <main className="bg-[#faf7f2] overflow-x-hidden">

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

          pb-16
          lg:pb-24
        "
      >

        <div className="max-w-[1450px] mx-auto">

          <div
            className="
              grid
              lg:grid-cols-[0.9fr_1.1fr]

              gap-12
              lg:gap-20

              items-center
            "
          >

            {/* LEFT CONTENT */}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >

              {/* BADGE */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  bg-[#f4e8dd]

                  px-5
                  py-3

                  rounded-full
                "
              >

                <div className="w-2 h-2 rounded-full bg-[#c38358]" />

                <p
                  className="
                    text-[11px]
                    sm:text-[12px]

                    uppercase
                    tracking-[3px]

                    font-semibold

                    text-[#9d6d52]
                  "
                >

                  About Us

                </p>

              </div>

              {/* TITLE */}

              <h1
                className="
                  mt-8

                  text-[#2f221d]

                  font-black

                  leading-[0.9]

                  tracking-[-2px]
                  sm:tracking-[-4px]

                  text-[52px]
                  sm:text-[72px]
                  lg:text-[96px]
                  xl:text-[110px]
                "
              >

                More Than
                <br />
                Dessert

                <span
                  className="
                    block

                    mt-2

                    text-[#c38358]
                  "
                >

                  It’s An Experience

                </span>

              </h1>

              {/* DIVIDER */}

              <div
                className="
                  flex
                  items-center
                  gap-4

                  mt-8
                "
              >

                <div className="w-20 h-[1px] bg-[#d9b299]" />

                <Heart
                  size={16}
                  className="text-[#c38358] fill-[#c38358]"
                />

                <div className="w-20 h-[1px] bg-[#d9b299]" />

              </div>

              {/* DESCRIPTION */}

              <div className="mt-8 space-y-6 max-w-[620px]">

                <p
                  className="
                    text-[#5e524c]

                    text-[16px]
                    sm:text-[19px]

                    leading-8
                  "
                >

                  Delassa menghadirkan brownies premium dengan rich chocolate,
                  tekstur fudgy yang lembut,
                  dan topping melimpah yang dibuat fresh setiap hari.

                </p>

                <p
                  className="
                    text-[#5e524c]

                    text-[16px]
                    sm:text-[19px]

                    leading-8
                  "
                >

                  Kami percaya bahwa dessert bukan hanya tentang rasa,
                  tetapi tentang menciptakan sweet moments yang hangat,
                  spesial,
                  dan memorable di setiap gigitan.

                </p>

              </div>

              {/* CTA */}

              <button
                onClick={() => navigate("/menu")}
                
                aria-label="Lihat halaman menu brownies Delassa"
                className="
                  inline-flex
                  items-center
                  gap-4

                  mt-10

                  bg-[#c57a3f]

                  hover:bg-[#af6934]

                  text-white

                  px-7
                  sm:px-8

                  py-4

                  rounded-full

                  text-[14px]
                  sm:text-[15px]

                  font-semibold

                  shadow-[0_12px_30px_rgba(0,0,0,0.12)]

                  transition-all
                  duration-300
                "
              >

                LIHAT MENU

                <div
                  className="
                    w-9
                    h-9

                    rounded-full

                    bg-white

                    flex
                    items-center
                    justify-center
                  "
                >

                  <ArrowRight
                    size={18}
                    className="text-[#3b2b26]"
                  />

                </div>

              </button>

            </motion.div>

            {/* RIGHT IMAGE */}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >

              <div
                className="
                  absolute
                  inset-0

                  bg-[#f1cfb6]

                  opacity-20

                  blur-[120px]
                "
              />

              <div
                className="
                  relative

                  overflow-hidden

                  rounded-[36px]
                  lg:rounded-[46px]
                "
              >

                <img
                  src={heroImage}
                  alt="Delassa Premium Brownies"
                  fetchPriority="high"
                  decoding="async"
                  className="
                    w-full

                    aspect-[4/4.8]
                    lg:aspect-[4/4.5]

                    object-cover
                    object-center
                  "
                />

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FEATURES */}
      {/* ====================================================== */}

      <section
        className="
          px-4
          sm:px-6
          lg:px-8

          pb-16
          lg:pb-24
        "
      >

        <div className="max-w-[1450px] mx-auto">

          {/* TITLE */}

          <div className="text-center">

            <div className="flex items-center justify-center gap-4">

              <div className="w-20 h-[1px] bg-[#d9b299]" />

              <p
                className="
                  uppercase

                  tracking-[4px]

                  text-[11px]
                  sm:text-[12px]

                  font-semibold

                  text-[#7b5d4a]
                "
              >

                What Makes Delassa Special

              </p>

              <div className="w-20 h-[1px] bg-[#d9b299]" />

            </div>

          </div>

          {/* GRID */}

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-4

              gap-8

              mt-16
            "
          >

            {features.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="text-center"
                >

                  <div
                    className="
                      w-[120px]
                      h-[120px]

                      mx-auto

                      rounded-full

                      bg-[#f7ede5]

                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Icon
                      size={42}
                      strokeWidth={1.5}
                      className="text-[#c38358]"
                    />

                  </div>

                  <h3
                    className="
                      mt-8

                      text-[#2f221d]

                      font-bold

                      text-[28px]

                      leading-tight
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                      mt-4

                      text-[#675b55]

                      text-[15px]

                      leading-7
                    "
                  >

                    {item.description}

                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* STORY SECTION */}
      {/* ====================================================== */}

      <section
        className="
          px-4
          sm:px-6
          lg:px-8

          pb-16
          lg:pb-24
        "
      >

        <div className="max-w-[1450px] mx-auto">

          <div
            className="
              grid
              lg:grid-cols-[0.95fr_1.05fr]

              gap-10
              lg:gap-16

              items-center
            "
          >

            {/* LEFT GALLERY */}

            <div className="grid grid-cols-2 gap-4">

              <div
                className="
                  overflow-hidden

                  rounded-[28px]
                "
              >

                <img
                  src={gallery1}
                  alt="Delassa brownies gallery"
                  loading="lazy"
                  decoding="async"
                  className="
                    w-full
                    h-full

                    object-cover
                  "
                />

              </div>

              <div className="grid gap-4">

                <div
                  className="
                    overflow-hidden

                    rounded-[28px]
                  "
                >

                  <img
                    src={gallery2}
                    alt="Chocolate brownies Delassa"
                    loading="lazy"
                    decoding="async"
                    className="
                      w-full

                      aspect-[4/3]

                      object-cover
                    "
                  />

                </div>

                <div
                  className="
                    overflow-hidden

                    rounded-[28px]
                  "
                >

                  <img
                    src={gallery3}
                    alt="Premium brownies packaging"
                    loading="lazy"
                    decoding="async"
                    className="
                      w-full

                      aspect-[4/3]

                      object-cover
                    "
                  />

                </div>

              </div>

            </div>

            {/* RIGHT CONTENT */}

            <div className="relative">

              <div
                className="
                  absolute
                  right-0
                  top-0

                  opacity-10

                  hidden
                  lg:block
                "
              >

                <Leaf
                  size={180}
                  strokeWidth={1}
                  className="text-[#d8b39a]"
                />

              </div>

              <div className="relative z-10">

                <p
                  className="
                    uppercase

                    tracking-[4px]

                    text-[11px]
                    sm:text-[12px]

                    font-semibold

                    text-[#9d6d52]
                  "
                >

                  Our Story

                </p>

                <h2
                  className="
                    mt-6

                    text-[#2f221d]

                    font-black

                    leading-[1]

                    text-[40px]
                    sm:text-[58px]
                    lg:text-[76px]
                  "
                >

                  Berawal dari cinta
                  terhadap hal-hal kecil
                  yang membuat
                  hari terasa

                  <span className="text-[#c38358]">

                    lebih manis.

                  </span>

                </h2>

                <div className="mt-8 space-y-6 max-w-[620px]">

                  <p
                    className="
                      text-[#5f534d]

                      text-[16px]
                      sm:text-[18px]

                      leading-8
                    "
                  >

                    Delassa lahir dari kecintaan pada brownies,
                    dessert sederhana yang selalu berhasil menghadirkan rasa hangat dan kebahagiaan.

                  </p>

                  <p
                    className="
                      text-[#5f534d]

                      text-[16px]
                      sm:text-[18px]

                      leading-8
                    "
                  >

                    Kami ingin menghadirkan brownies premium dengan bahan terbaik,
                    proses yang terjaga,
                    dan sentuhan handmade di setiap detailnya.

                  </p>

                  <p
                    className="
                      text-[#c38358]

                      text-[17px]
                      sm:text-[20px]

                      leading-8

                      font-semibold
                    "
                  >

                    Delassa bukan hanya brownies,
                    tapi bagian dari momen-momen berharga dalam hidupmu.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* CLOSING */}
      {/* ====================================================== */}

      <section
        className="
          px-4
          sm:px-6
          lg:px-8

          pb-20
        "
      >

        <div className="max-w-[1450px] mx-auto">

          <div
            className="
              bg-[#f6eee7]

              rounded-[34px]

              px-8
              sm:px-12
              lg:px-16

              py-10
              sm:py-12

              flex
              flex-col
              lg:flex-row

              gap-10

              items-center
              justify-between
            "
          >

            {/* LEFT */}

            <div
              className="
                flex
                flex-col
                sm:flex-row

                items-center
                gap-6
              "
            >

              <img
                src={logoDelassa}
                alt="Delassa Home Bakery"
                loading="lazy"
                className="
                  w-[90px]
                  sm:w-[110px]

                  h-auto

                  object-contain
                "
              />

              <div className="text-center sm:text-left">

                <h3
                  className="
                    text-[#2f221d]

                    font-bold

                    leading-snug

                    text-[22px]
                    sm:text-[28px]
                  "
                >

                  More than dessert,
                  <br />
                  Delassa hadir untuk menciptakan
                  pengalaman manis yang ingin selalu diingat.

                </h3>

              </div>

            </div>

            {/* RIGHT */}

            <div
              className="
                flex
                flex-wrap

                justify-center

                gap-10
              "
            >

              {[
                {
                  icon: Heart,
                  title: "Made with Love",
                },
                {
                  icon: Leaf,
                  title: "Quality You Can Taste",
                },
                {
                  icon: Gift,
                  title: "Moments Worth Sharing",
                },
              ].map((item, index) => {

                const Icon = item.icon;

                return (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-[#c38358]"
                    />

                    <p
                      className="
                        text-[#5e524c]

                        text-[14px]
                        sm:text-[15px]

                        font-medium

                        leading-6
                      "
                    >

                      {item.title}

                    </p>

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}