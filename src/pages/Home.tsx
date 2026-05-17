import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ====================================================== */
/* ASSETS */
/* ====================================================== */

import logo from "../assets/delassa.webp";

/* DESKTOP BANNER */
import bannerDesktop1 from "../assets/bannerdesktop1.webp";
import bannerDesktop2 from "../assets/bannerdesktop2.webp";
import bannerDesktop3 from "../assets/bannerdesktop3.webp";

/* MOBILE BANNER */
import bannerMobile1 from "../assets/bannerdesktop1.webp";
import bannerMobile2 from "../assets/bannerdesktop2.webp";
import bannerMobile3 from "../assets/bannerdesktop3.webp";

/* CONTENT IMAGE */
import freshImage from "../assets/freshly-baked.webp";

/* ====================================================== */
/* DATA */
/* ====================================================== */

const desktopBanners = [
  bannerDesktop1,
  bannerDesktop2,
  bannerDesktop3,
];

const mobileBanners = [
  bannerMobile1,
  bannerMobile2,
  bannerMobile3,
];

export default function Home() {

  const [currentSlide, setCurrentSlide] = useState(0);

  /* ====================================================== */
  /* AUTO SLIDE */
  /* ====================================================== */

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === desktopBanners.length - 1 ? 0 : prev + 1
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <main
      className="
        bg-[#f7f3ef]
        overflow-hidden
      "
    >

      {/* ====================================================== */}
      {/* HERO BANNER */}
      {/* ====================================================== */}

      <section
        className="
          w-full

          px-4
          sm:px-6
          lg:px-8

          pt-5
          sm:pt-6
        "
      >

        <div
          className="
            max-w-[1500px]
            mx-auto
          "
        >

          {/* ====================================================== */}
          {/* SLIDER */}
          {/* ====================================================== */}

          <div
            className="
              relative

              overflow-hidden

              rounded-[28px]
              sm:rounded-[36px]

              shadow-[0_15px_40px_rgba(0,0,0,0.06)]

              bg-[#efe7df]
            "
          >

            {/* ====================================================== */}
            {/* DESKTOP IMAGE */}
            {/* ====================================================== */}

            <img
              src={desktopBanners[currentSlide]}
              alt="Delassa Banner"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="
                hidden
                md:block

                w-full

                aspect-[16/7]

                object-cover
                object-center

                select-none
              "
            />

            {/* ====================================================== */}
            {/* MOBILE IMAGE */}
            {/* ====================================================== */}

            <img
              src={mobileBanners[currentSlide]}
              alt="Delassa Banner Mobile"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="
                block
                md:hidden

                w-full

                aspect-[4/5]

                object-cover
                object-center

                select-none
              "
            />

            {/* ====================================================== */}
            {/* DOTS */}
            {/* ====================================================== */}

            <div
              className="
                absolute

                bottom-4
                sm:bottom-6

                left-1/2
                -translate-x-1/2

                flex
                items-center
                gap-2
              "
            >

              {desktopBanners.map((_, index) => (

                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      currentSlide === index
                        ? "w-5 h-2 bg-[#b07b5d]"
                        : "w-2 h-2 bg-white/80"
                    }
                  `}
                />

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* ABOUT */}
      {/* ====================================================== */}

      <section
        className="
          pt-20
          sm:pt-24

          px-5
          sm:px-8
        "
      >

        <div
          className="
            max-w-[1300px]
            mx-auto
          "
        >

          {/* TITLE */}

          <div className="text-center">

            <p
              className="
                text-[#c58b67]

                uppercase

                tracking-[5px]

                text-[12px]
                sm:text-[13px]

                font-semibold
              "
            >

              About Delassa

            </p>

            <h2
              className="
                mt-5

                text-[#2f221d]

                font-black

                leading-[0.95]

                text-[42px]
                sm:text-[60px]
                lg:text-[82px]
              "
            >

              Homemade Brownies
              <br />
              With Premium Taste

            </h2>

          </div>

          {/* DESCRIPTION */}

          <div
            className="
              mt-10
              sm:mt-12

              max-w-[920px]
              mx-auto
            "
          >

            <p
              className="
                text-center

                text-[#5f534d]

                leading-relaxed

                text-[18px]
                sm:text-[22px]
              "
            >

              Delassa Home Bakery menghadirkan brownies premium
              dengan tekstur fudgy, rich chocolate, dan topping
              melimpah yang dibuat fresh setiap hari.
              Setiap produk dibuat menggunakan bahan berkualitas
              untuk menciptakan rasa manis yang hangat,
              aesthetic, dan memorable di setiap gigitan.

            </p>

          </div>

          {/* FEATURES */}

          <div
            className="
              flex
              flex-wrap

              justify-center

              gap-x-8
              gap-y-4

              mt-12
              sm:mt-14
            "
          >

            {[
              "✓ Premium Ingredients",
              "✓ Made by order",
              "✓ Fresh from oven",
            ].map((item, index) => (

              <div
                key={index}
                className="
                  text-[#6c5a51]

                  text-[15px]
                  sm:text-[18px]

                  font-medium
                "
              >

                {item}

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FRESHLY BAKED */}
      {/* ====================================================== */}

      <section
        className="
          pt-20
          sm:pt-24

          px-4
          sm:px-8
        "
      >

        <div
          className="
            max-w-[1500px]
            mx-auto
          "
        >

          <div
            className="
              relative

              overflow-hidden

              rounded-[30px]
              sm:rounded-[40px]
            "
          >

            {/* IMAGE */}

            <img
              src={freshImage}
              alt="Freshly Baked Brownies"
              loading="lazy"
              decoding="async"
              className="
                w-full

                h-[420px]
                sm:h-[520px]
                lg:h-[620px]

                object-cover
                object-center
              "
            />

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-[#2f221de8]
                via-[#2f221d99]
                to-transparent
              "
            />

            {/* CONTENT */}

            <div
              className="
                absolute
                inset-0

                flex
                items-center
              "
            >

              <div
                className="
                  px-6
                  sm:px-12
                  lg:px-16

                  max-w-[720px]
                "
              >

                <p
                  className="
                    text-[#efbb90]

                    uppercase

                    tracking-[5px]

                    text-[12px]
                    sm:text-[14px]

                    font-semibold
                  "
                >

                  Made By Order

                </p>

                <h2
                  className="
                    mt-5

                    text-white

                    font-black

                    leading-[0.9]

                    text-[50px]
                    sm:text-[78px]
                    lg:text-[110px]
                  "
                >

                  Freshly Baked
                  <br />
                  Everyday

                </h2>

                <p
                  className="
                    mt-6

                    text-white/90

                    leading-relaxed

                    text-[16px]
                    sm:text-[21px]

                    max-w-[620px]
                  "
                >

                  Setiap brownies dibuat setelah pesanan masuk,
                  menggunakan premium ingredients pilihan
                  untuk menjaga rasa, aroma, dan tekstur
                  tetap fresh saat sampai ke tanganmu.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* MENU */}
      {/* ====================================================== */}

      <section
        className="
          pt-20
          sm:pt-24

          pb-10

          px-5
          sm:px-8
        "
      >

        <div
          className="
            max-w-[1300px]
            mx-auto
          "
        >

          {/* TITLE */}

          <div className="text-center">

            <p
              className="
                text-[#c58b67]

                uppercase

                tracking-[5px]

                text-[12px]
                sm:text-[13px]

                font-semibold
              "
            >

              Our Products

            </p>

            <h2
              className="
                mt-4

                text-[#2f221d]

                font-black

                leading-none

                text-[42px]
                sm:text-[60px]
                lg:text-[72px]
              "
            >

              Best Seller Brownies

            </h2>

          </div>

          {/* PRODUCT GRID */}

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3

              gap-6
              sm:gap-8

              mt-14
            "
          >

            {[
              {
                image: bannerDesktop1,
                title: "Brownies Almond",
              },
              {
                image: bannerDesktop2,
                title: "Brownies Cookies",
              },
              {
                image: bannerDesktop3,
                title: "Brownies Mix Topping",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="
                  group

                  bg-white

                  rounded-[28px]

                  overflow-hidden

                  shadow-[0_12px_35px_rgba(0,0,0,0.05)]

                  hover:-translate-y-2

                  transition-all
                  duration-500
                "
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="
                      w-full

                      h-[240px]

                      object-cover
                      object-center

                      group-hover:scale-105

                      transition-all
                      duration-700
                    "
                  />

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <h3
                    className="
                      text-[#2f221d]

                      font-bold

                      text-[28px]
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                      mt-3

                      text-[#6a5c55]

                      leading-relaxed

                      text-[15px]
                    "
                  >

                    Brownies premium dengan tekstur fudgy,
                    rich chocolate, dan topping melimpah
                    yang dibuat fresh setiap hari.

                  </p>

                  <Link
                    to="/menu"
                    className="
                      inline-flex
                      items-center

                      mt-5

                      text-[#b07b5d]

                      font-semibold

                      hover:opacity-70

                      transition-all
                    "
                  >

                    View Product →

                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>

  );

}