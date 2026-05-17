import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import brownie1 from "../assets/browniesalmond1.webp";
import brownie2 from "../assets/browniescoockies1.webp";
import brownie3 from "../assets/mixtopping3.webp";

/* BANNER */
import banner1 from "../assets/bannerdesktop1.webp";
import banner2 from "../assets/bannerdesktop6.webp";
import banner3 from "../assets/bannerdesktop3.webp";

export default function Home() {

  const message = encodeURIComponent(`Halo Delassa

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup:
Varian:
Jumlah:
Catatan:

Terima kasih`);

  /* ================================================= */
  /* BANNERS */
  /* ================================================= */

  const banners = [
    banner1,
    banner2,
    banner3,
  ];

  /* ================================================= */
  /* PRODUCTS */
  /* ================================================= */

  const products = [
    {
      title: "Brownies Almond",
      image: brownie1,
      desc: "Brownies fudgy premium dengan topping almond melimpah dan rich chocolate yang lumer di setiap gigitan.",
    },

    {
      title: "Brownies Cookies",
      image: brownie2,
      desc: "Perpaduan brownies cokelat premium dengan cookies lembut dan choco chips melimpah.",
    },

    {
      title: "Mix Topping",
      image: brownie3,
      desc: "Brownies dengan berbagai topping favorit dalam satu box untuk setiap sweet moments.",
    },
  ];

  return (

    <main className="bg-[#faf7f2] overflow-x-hidden">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section
        id="home"
        className="
          px-3
          sm:px-5
          lg:px-8

          pt-3
          sm:pt-5
        "
      >

        <div
          className="
            max-w-[1500px]
            mx-auto

            overflow-hidden

            rounded-[22px]
            sm:rounded-[34px]

            shadow-[0_12px_40px_rgba(0,0,0,0.06)]
          "
        >

          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            speed={900}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="rounded-[22px] sm:rounded-[34px]"
          >

            {banners.map((banner, index) => (

              <SwiperSlide key={index}>

                <div
                  className="
                    relative
                    w-full

                    bg-[#f3ebe3]

                    h-[210px]
                    sm:h-[380px]
                    md:h-[500px]
                    lg:h-[680px]
                  "
                >

                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className="
                      w-full
                      h-full

                      object-cover

                      object-[18%]
                      sm:object-center
                    "
                  />

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>

      </section>

      {/* ================================================= */}
      {/* ABOUT */}
      {/* ================================================= */}

      <section
        id="about"
        className="
          py-14
          sm:py-20
          lg:py-28

          px-5
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            max-w-[1000px]
            mx-auto

            text-center
          "
        >

          {/* SMALL TITLE */}

          <p
            className="
              uppercase

              tracking-[3px]

              text-[#c38358]

              text-[10px]
              sm:text-sm

              font-semibold
            "
          >

            About Delassa

          </p>

          {/* BIG TITLE */}

          <h2
            className="
              mt-4

              text-[30px]
              sm:text-[48px]
              lg:text-[72px]

              leading-[1.05]

              tracking-[-1px]
              sm:tracking-[-2px]

              font-black

              text-[#2f221d]
            "
          >

            Homemade Brownies
            <br />
            With Premium Taste

          </h2>

          {/* DESC */}

          <p
            className="
              mt-5
              sm:mt-8

              text-[#746861]

              text-[14px]
              sm:text-[17px]

              leading-relaxed

              max-w-[820px]
              mx-auto
            "
          >

            Delassa Home Bakery menghadirkan brownies premium
            dengan tekstur fudgy,
            rich chocolate,
            dan topping melimpah yang dibuat fresh setiap hari.

            Setiap produk dibuat menggunakan bahan berkualitas
            dengan tampilan aesthetic yang cocok untuk hampers,
            hadiah spesial,
            maupun teman menikmati sweet moments favoritmu.

          </p>

          {/* FEATURES */}

          <div
            className="
              flex
              flex-wrap

              items-center
              justify-center

              gap-x-6
              gap-y-3

              mt-10
              sm:mt-12
            "
          >

            {[
              "Premium ingredients",
              "Made by order",
              "Fresh from oven",
            ].map((item, index) => (

              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-2

                  text-[#746861]

                  text-[13px]
                  sm:text-[15px]

                  font-medium
                "
              >

                <span className="text-[#8b6b52]">

                  ✓

                </span>

                <span>

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* PRODUCTS */}
      {/* ================================================= */}

      <section
        id="products"
        className="
          pb-16
          sm:pb-24

          px-4
          sm:px-6
          lg:px-8
        "
      >

        <div className="max-w-[1500px] mx-auto">

          {/* TITLE */}

          <div className="text-center">

            <p
              className="
                uppercase

                tracking-[3px]

                text-[#c38358]

                text-[10px]
                sm:text-sm

                font-semibold
              "
            >

              Signature Menu

            </p>

            <h2
              className="
                mt-4

                text-[30px]
                sm:text-[52px]
                lg:text-[72px]

                leading-[1.05]

                tracking-[-1px]
                sm:tracking-[-2px]

                font-black

                text-[#2f221d]
              "
            >

              Crafted For
              <br />
              Sweet Moments

            </h2>

          </div>

          {/* GRID */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-5
              sm:gap-8

              mt-10
              sm:mt-16
            "
          >

            {products.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group"
              >

                <div
                  className="
                    bg-white

                    rounded-[24px]
                    sm:rounded-[30px]

                    overflow-hidden

                    shadow-[0_10px_30px_rgba(0,0,0,0.05)]

                    h-full
                  "
                >

                  {/* IMAGE */}

                  <div className="overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        w-full

                        h-[220px]
                        sm:h-[320px]

                        object-cover
                        object-center

                        transition
                        duration-500

                        group-hover:scale-105
                      "
                    />

                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                      p-5
                      sm:p-7
                    "
                  >

                    <h3
                      className="
                        text-[22px]
                        sm:text-[30px]

                        font-black

                        text-[#2f221d]
                      "
                    >

                      {item.title}

                    </h3>

                    <p
                      className="
                        mt-3
                        sm:mt-4

                        text-[#746861]

                        text-[14px]
                        sm:text-base

                        leading-relaxed
                      "
                    >

                      {item.desc}

                    </p>

                    {/* BUTTON */}

                    <a
                      href={`https://wa.me/6287715443313?text=${message}`}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        mt-5
                        sm:mt-7

                        inline-flex
                        items-center
                        justify-center

                        bg-[#3b2b26]
                        hover:bg-black

                        text-white

                        px-5
                        sm:px-6

                        py-3

                        rounded-full

                        font-semibold

                        text-[14px]
                        sm:text-base

                        transition-all
                        duration-300
                      "
                    >

                      Order Now

                    </a>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* ================================================= */}
{/* MADE BY ORDER */}
{/* ================================================= */}

<section
  className="
    px-4
    sm:px-6
    lg:px-8

    pb-16
    sm:pb-24
  "
>

  <div
    className="
      max-w-[1500px]
      mx-auto

      relative
      overflow-hidden

      rounded-[28px]
      sm:rounded-[40px]
    "
  >

    {/* BACKGROUND IMAGE */}

    <div
      className="
        absolute
        inset-0
      "
    >

      <img
        src="/src/assets/bannerdesktop7.webp"
        alt="Freshly baked brownies"
        className="
          w-full
          h-full
          object-cover
        "
      />

      {/* OVERLAY */}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(to_right,rgba(33,20,15,0.92)_0%,rgba(33,20,15,0.82)_35%,rgba(33,20,15,0.30)_70%,rgba(33,20,15,0.10)_100%)]
        "
      />

    </div>

    {/* CONTENT */}

    <div
      className="
        relative
        z-10

        px-6
        sm:px-10
        lg:px-16

        py-12
        sm:py-16
        lg:py-24

        max-w-[760px]
      "
    >

      {/* SMALL TITLE */}

      <p
        className="
          uppercase

          tracking-[4px]

          text-[#d7a47c]

          text-[11px]
          sm:text-sm

          font-semibold
        "
      >

        Made By Order

      </p>

      {/* BIG TITLE */}

      <h2
        className="
          mt-4

          text-white

          font-black

          leading-[0.95]

          text-[46px]
          sm:text-[72px]
          lg:text-[110px]

          tracking-[-2px]
        "
      >

        Freshly Baked
        <br />
        Everyday

      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mt-6
          sm:mt-8

          text-white/90

          leading-relaxed

          text-[15px]
          sm:text-[18px]
          lg:text-[22px]

          max-w-[700px]
        "
      >

        Setiap brownies dibuat setelah pesanan masuk,
        menggunakan premium ingredients pilihan
        untuk menjaga rasa,
        aroma,
        dan tekstur tetap fresh saat sampai ke tanganmu.

      </p>

    </div>

  </div>

</section>

    </main>

  );
}