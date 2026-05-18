import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ====================================================== */
/* ASSETS */
/* ====================================================== */

/* DESKTOP BANNER */
import bannerDesktop1 from "../assets/bannerdesktop13.webp";
import bannerDesktop2 from "../assets/bannerdesktop14.webp";
import bannerDesktop3 from "../assets/bannerdesktop15.webp";

/* MOBILE BANNER */
import bannerMobile1 from "../assets/bannerdesktop13.webp";
import bannerMobile2 from "../assets/bannerdesktop14.webp";
import bannerMobile3 from "../assets/bannerdesktop15.webp";

/* FRESH SECTION */
import freshImage from "../assets/fresh.webp";

/* PRODUCT IMAGE */
import almondImg from "../assets/browniesalmond1.webp";
import cookiesImg from "../assets/browniescoockies1.webp";
import mixImg from "../assets/mixtopping3.webp";

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

const products = [
  {
    image: almondImg,
    title: "Brownies Almond",
  },
  {
    image: cookiesImg,
    title: "Brownies Cookies",
  },
  {
    image: mixImg,
    title: "Brownies Mix Topping",
  },
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

    <main className="bg-[#f7f3ef] overflow-hidden">

      {/* ====================================================== */}
      {/* HERO BANNER */}
      {/* ====================================================== */}

      <section
        className="
          w-full
          px-3
          sm:px-5
          lg:px-8
          pt-3
          sm:pt-5
        "
      >

        <div className="max-w-[1500px] mx-auto">

          <div
            className="
              relative
              overflow-hidden

              rounded-[22px]
              sm:rounded-[34px]

              bg-[#efe7df]
            "
          >

            {/* DESKTOP IMAGE */}

<div
  className="
    hidden
    md:flex

    items-center
    justify-center

    w-full

    bg-[#efe7df]
  "
>

  <img
    src={desktopBanners[currentSlide]}
    alt="Delassa Banner"
    fetchPriority="high"
    decoding="async"
    loading="eager"
    className="
      w-full
      
      object-center

      transition-all
      duration-500
    "
  />

</div>

            {/* MOBILE IMAGE */}

            <div
              className="
                block
                md:hidden

                w-full

                bg-[#efe7df]
              "
            >

              <img
                src={mobileBanners[currentSlide]}
                alt="Delassa Banner Mobile"
                fetchPriority="high"
                decoding="async"
                loading="eager"
                className="
                  w-full

                  h-auto

                  object-contain
                  object-center

                  transition-all
                  duration-500
                "
              />

            </div>

            {/* DOTS */}

            <div
              className="
                absolute

                bottom-3
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
                  aria-label={`Slide ${index + 1}`}
                  className={`
                    transition-all
                    duration-300
                    rounded-full

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
          pt-14
          sm:pt-24

          px-5
          sm:px-8
        "
      >

        <div className="max-w-[1200px] mx-auto">

          {/* TITLE */}

          <div className="text-center">

            <p
              className="
                text-[#c58b67]

                uppercase
                tracking-[4px]

                text-[11px]
                sm:text-[13px]

                font-semibold
              "
            >

              About Delassa

            </p>

            <h2
              className="
                mt-4
                sm:mt-5

                text-[#2f221d]

                font-black
                leading-[1]

                text-[34px]
                sm:text-[60px]
                lg:text-[82px]
              "
            >

              Homemade Brownies
              <br />
              With Premium Taste

            </h2>

            <p
              className="
                mt-6
                sm:mt-8

                max-w-[920px]
                mx-auto

                text-[#5f534d]

                leading-relaxed

                text-[15px]
                sm:text-[20px]
              "
            >

              Delassa Home Bakery menghadirkan brownies premium
              dengan tekstur fudgy, rich chocolate,
              dan topping melimpah yang dibuat fresh setiap hari.

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

              gap-x-5
              gap-y-3

              mt-8
              sm:mt-12
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

                  text-[13px]
                  sm:text-[17px]

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
          pt-14
          sm:pt-24

          px-3
          sm:px-8
        "
      >

        <div className="max-w-[1500px] mx-auto">

          <div
            className="
              relative
              overflow-hidden

              rounded-[24px]
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

                h-[500px]
                sm:h-[560px]
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

                bg-gradient-to-t
                from-[#2f221df4]
                via-[#2f221dc7]
                to-[#2f221d34]

                sm:bg-gradient-to-r
                sm:from-[#2f221de8]
                sm:via-[#2f221d99]
                sm:to-transparent
              "
            />

            {/* CONTENT */}

            <div
              className="
                absolute
                inset-0

                flex
                items-end
                sm:items-center
              "
            >

              <div
                className="
                  px-5
                  sm:px-12
                  lg:px-16

                  pb-8
                  sm:pb-0

                  max-w-[760px]
                "
              >

                <p
                  className="
                    text-[#efbb90]

                    uppercase
                    tracking-[4px]

                    text-[11px]
                    sm:text-[14px]

                    font-semibold
                  "
                >

                  Made By Order

                </p>

                <h2
                  className="
                    mt-4

                    text-white

                    font-black
                    leading-[0.92]

                    text-[46px]
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
                    mt-4
                    sm:mt-6

                    text-white/90

                    leading-relaxed

                    text-[15px]
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
      {/* PRODUCTS */}
      {/* ====================================================== */}

      <section
        className="
          pt-14
          sm:pt-24

          pb-14
          sm:pb-20

          px-5
          sm:px-8
        "
      >

        <div className="max-w-[1300px] mx-auto">

          {/* TITLE */}

          <div className="text-center">

            <p
              className="
                text-[#c58b67]

                uppercase
                tracking-[4px]

                text-[11px]
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

                text-[36px]
                sm:text-[60px]
                lg:text-[72px]
              "
            >

              Best Seller Brownies

            </h2>

          </div>

          {/* GRID */}

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3

              gap-5
              sm:gap-8

              mt-10
              sm:mt-14
            "
          >

            {products.map((item, index) => (

              <div
                key={index}
                className="
                  group

                  bg-white

                  rounded-[24px]
                  sm:rounded-[28px]

                  overflow-hidden

                  shadow-[0_8px_24px_rgba(0,0,0,0.04)]

                  transition-all
                  duration-300

                  hover:-translate-y-1
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

                      h-[220px]
                      sm:h-[240px]

                      object-cover
                      object-center

                      transition-transform
                      duration-500

                      group-hover:scale-105
                    "
                  />

                </div>

                {/* CONTENT */}

                <div className="p-5 sm:p-6">

                  <h3
                    className="
                      text-[#2f221d]

                      font-bold

                      leading-tight

                      text-[24px]
                      sm:text-[28px]
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                      mt-3

                      text-[#6a5c55]

                      leading-relaxed

                      text-[14px]
                      sm:text-[15px]
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

                      text-[14px]

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