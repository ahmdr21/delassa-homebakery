import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Gift,
  Leaf,
  ChefHat,
  ArrowRight,
} from "lucide-react";

import heroImage from "../assets/mixtopping2.webp";
import gallery1 from "../assets/browniesalmond1.webp";

/* ====================================================== */
/* FEATURES */
/* ====================================================== */

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

          pb-10
          lg:pb-14
        "
      >

        <div className="max-w-[1450px] mx-auto">

          <div
            className="
              grid
              lg:grid-cols-2

              gap-8
              lg:gap-16

              items-center
            "
          >

            {/* ====================================================== */}
            {/* LEFT CONTENT */}
            {/* ====================================================== */}

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

                  About Delassa

                </p>

              </div>

              {/* TITLE */}

              <h1
                className="
                  mt-8

                  text-[#2f221d]

                  font-extrabold

                  leading-[1.1]

                  tracking-tight

                  text-[36px]
                  sm:text-[54px]
                  lg:text-[60px]
                  xl:text-[68px]
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
                    sm:text-[18px]

                    leading-8
                  "
                >

                  Delassa menghadirkan brownies premium
                  dengan rich chocolate,
                  tekstur fudgy yang lembut,
                  dan topping melimpah yang dibuat fresh setiap hari.

                </p>

                <p
                  className="
                    text-[#5e524c]

                    text-[16px]
                    sm:text-[18px]

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
                type="button"
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

                  hover:-translate-y-[2px]
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

            {/* ====================================================== */}
            {/* RIGHT IMAGE */}
            {/* ====================================================== */}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative max-w-[500px] mx-auto lg:ml-auto w-full"
            >

              {/* IMAGE FRAME */}

              <div
                className="
                  relative

                  p-3
                  bg-white

                  border border-[#ead8c7]

                  shadow-[0_16px_40px_rgba(195,131,88,0.1)]

                  rounded-[28px]
                "
              >

                <div className="overflow-hidden rounded-[20px]">
                  <img
                    src={heroImage}
                    alt="Delassa Premium Brownies"
                    fetchPriority="high"
                    decoding="async"
                    className="
                      w-full

                      aspect-[4/5]

                      object-cover
                      object-center
                    "
                  />
                </div>

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

          pb-12
          lg:pb-16
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="
                    group
                    relative
                    text-center
                    bg-white/70
                    backdrop-blur-sm
                    border border-[#e8d5c4]
                    rounded-[28px]
                    px-8
                    py-10
                    shadow-[0_4px_24px_rgba(195,131,88,0.08)]
                    hover:shadow-[0_12px_40px_rgba(195,131,88,0.18)]
                    hover:-translate-y-2
                    transition-all
                    duration-400
                    overflow-hidden
                  "
                >

                  {/* subtle top accent */}
                  <div
                    className="
                      absolute
                      top-0 left-0 right-0
                      h-[3px]
                      bg-gradient-to-r from-[#e8c9af] via-[#c38358] to-[#e8c9af]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-400
                      rounded-t-[28px]
                    "
                  />

                  <div
                    className="
                      w-[100px]
                      h-[100px]

                      mx-auto

                      rounded-[24px]

                      bg-gradient-to-br from-[#fdf5ef] to-[#f4e4d4]

                      border border-[#e8cdb7]

                      flex
                      items-center
                      justify-center

                      shadow-[0_4px_16px_rgba(195,131,88,0.12)]

                      group-hover:scale-105
                      transition-transform duration-400
                    "
                  >

                    <Icon
                      size={40}
                      strokeWidth={1.5}
                      className="text-[#c38358]"
                    />

                  </div>

                  <h3
                    className="
                      mt-7

                      text-[#2f221d]

                      font-bold

                      text-[22px]

                      leading-tight
                    "
                  >

                    {item.title}

                  </h3>

                  <div className="flex justify-center mt-4">
                    <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#c38358] to-transparent rounded-full" />
                  </div>

                  <p
                    className="
                      mt-4

                      text-[#7a6a62]

                      text-[14px]

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

          pb-12
          lg:pb-16
        "
      >

        <div className="max-w-[1450px] mx-auto">

          <div
            className="
              grid
              lg:grid-cols-2

              gap-8
              lg:gap-16

              items-center
            "
          >

            {/* LEFT GALLERY (Option A: Single Elegant Image) */}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-[540px] mx-auto lg:mr-auto w-full"
            >

              <div
                className="
                  p-3
                  bg-white

                  border border-[#ead8c7]

                  shadow-[0_16px_40px_rgba(195,131,88,0.08)]

                  rounded-[32px]
                "
              >

                <div className="overflow-hidden rounded-[22px]">
                  <img
                    src={gallery1}
                    alt="Delassa premium brownies"
                    loading="lazy"
                    decoding="async"
                    className="
                      w-full
                      aspect-[4/3]
                      object-cover
                      hover:scale-105
                      transition-transform
                      duration-700
                      ease-out
                    "
                  />
                </div>

              </div>

            </motion.div>

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

                    text-[38px]
                    sm:text-[56px]
                    lg:text-[74px]
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

                    Kami ingin menghadirkan brownies premium
                    dengan bahan terbaik,
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >

            <h3 className="text-[#3d2215] font-bold text-[20px] sm:text-[26px] leading-snug">
              More than dessert,
            </h3>
            <p className="mt-2 text-[#8b6f5a] text-[14px] sm:text-[16px] leading-relaxed max-w-[500px] mx-auto">
              Delassa hadir untuk menciptakan pengalaman manis yang ingin selalu diingat.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
              {[
                { icon: Heart, title: "Made with Love" },
                { icon: Leaf, title: "Quality You Can Taste" },
                { icon: Gift, title: "Moments Worth Sharing" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#faf5f0] border border-[#ead8c7]/60"
                  >
                    <Icon size={18} strokeWidth={1.8} className="text-[#c38358]" />
                    <span className="text-[#5c4438] text-[13px] sm:text-[14px] font-medium">{item.title}</span>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>

      </section>

    </main>

  );

}