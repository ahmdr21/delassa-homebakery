import { useEffect, useState } from "react";

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

/* POPUP IMAGE */
import almond1 from "../assets/browniesalmond1.png";
import almond2 from "../assets/browniesalmond2.png";

import cookies1 from "../assets/browniescoockies1.png";
import cookies2 from "../assets/browniescoockies1.webp";

import mix1 from "../assets/mixtopping1.png";
import mix2 from "../assets/mixtopping2.png";

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
    title: "Brownies Almond",

    image: almondImg,

    description:
      "Brownies premium dengan topping almond melimpah dan rich chocolate premium.",

    images: [
      almond1,
      almond2,
    ],
  },

  {
    title: "Brownies Cookies",

    image: cookiesImg,

    description:
      "Perpaduan brownies fudgy dengan cookies lembut yang lumer di setiap gigitan.",

    images: [
      cookies1,
      cookies2,
    ],
  },

  {
    title: "Brownies Mix Topping",

    image: mixImg,

    description:
      "Brownies dengan berbagai topping favorit untuk sweet moments terbaik.",

    images: [
      mix1,
      mix2,
    ],
  },
];

export default function Home() {

  /* ====================================================== */
  /* STATE */
  /* ====================================================== */

  const [currentSlide, setCurrentSlide] = useState(0);

  const [open, setOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [activeImage, setActiveImage] = useState(0);

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

      <section className="w-full px-3 sm:px-5 lg:px-8 pt-3 sm:pt-5">

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

            {/* DESKTOP */}

            <div className="hidden md:block">

              <img
                src={desktopBanners[currentSlide]}
                alt="Brownies Premium Delassa Home Bakery Bekasi"

                fetchPriority="high"
                loading="eager"

                className="
                  w-full
                  h-auto

                  object-cover
                  object-center

                  transition-all
                  duration-500
                "
              />

            </div>

            {/* MOBILE */}

            <div className="block md:hidden">

              <img
                src={mobileBanners[currentSlide]}
                alt="Brownies Homemade Delassa Bekasi"

                fetchPriority="high"
                loading="eager"

                className="
                  w-full
                  h-auto

                  object-cover
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

      <section className="pt-14 sm:pt-24 px-5 sm:px-8">

        <div className="max-w-[1200px] mx-auto text-center">

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

            Brownies Premium Bekasi

          </p>

          <h1
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

          </h1>

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

            Delassa Home Bakery menghadirkan brownies premium homemade
            di Bekasi dengan tekstur fudgy, rich chocolate,
            dan topping melimpah yang dibuat fresh setiap hari.

          </p>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FRESH SECTION */}
      {/* ====================================================== */}

      <section className="pt-14 sm:pt-24 px-3 sm:px-8">

        <div className="max-w-[1500px] mx-auto">

          <div
            className="
              relative
              overflow-hidden

              rounded-[24px]
              sm:rounded-[40px]
            "
          >

            <img
              src={freshImage}
              alt="Freshly baked brownies premium"

              loading="lazy"

              className="
                w-full

                h-[500px]
                sm:h-[560px]
                lg:h-[620px]

                object-cover
                object-center
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-[#2f221de8]
                via-[#2f221d88]
                to-transparent
              "
            />

            <div
              className="
                absolute
                inset-0

                flex
                items-center
              "
            >

              <div className="px-5 sm:px-12 lg:px-16 max-w-[760px]">

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

              <article
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

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}

                    loading="lazy"

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

                    {item.description}

                  </p>

                  <button
                    onClick={() => {

                      setSelectedProduct(item);

                      setActiveImage(0);

                      setOpen(true);

                    }}

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

                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* PRODUCT MODAL */}
      {/* ====================================================== */}

      {open && selectedProduct && (

        <div
          className="
            fixed
            inset-0
            z-[999]

            bg-black/60
            backdrop-blur-sm

            flex
            items-center
            justify-center

            p-4
          "
        >

          <div
            className="
              relative

              bg-[#fffaf5]

              w-full
              max-w-[950px]

              rounded-[32px]

              overflow-hidden

              shadow-2xl
            "
          >

            <button
              onClick={() => setOpen(false)}

              className="
                absolute
                top-4
                right-4

                z-20

                w-10
                h-10

                rounded-full

                bg-black/70
                text-white

                text-xl

                flex
                items-center
                justify-center
              "
            >

              ×

            </button>

            <div className="grid lg:grid-cols-2">

              <div className="bg-[#f5ede5]">

                <img
                  src={selectedProduct.images[activeImage]}
                  alt={selectedProduct.title}

                  className="
  w-full

  h-[220px]
  sm:h-[320px]
  lg:h-[620px]

  object-contain
  object-center

  bg-[#f5ede5]

  p-4
  sm:p-6
"
                />

              </div>

              <div
                className="
                  p-6
                  sm:p-10

                  flex
                  flex-col
                  justify-center
                "
              >

                <p
                  className="
                    text-[#b07b5d]

                    uppercase
                    tracking-[4px]

                    text-[11px]

                    font-semibold
                  "
                >

                  Delassa Home Bakery

                </p>

                <h3
                  className="
                    mt-4

                    text-[#2f221d]

                    font-black
                    leading-none

                    text-[38px]
                    sm:text-[52px]
                  "
                >

                  {selectedProduct.title}

                </h3>

                <p
                  className="
                    mt-5

                    text-[#6d5b52]

                    leading-relaxed

                    text-[15px]
                    sm:text-[17px]
                  "
                >

                  {selectedProduct.description}

                </p>

                <div className="flex gap-3 mt-7">

                  {selectedProduct.images.map(
                    (img: string, index: number) => (

                      <button
                        key={index}

                        onClick={() => setActiveImage(index)}

                        className={`
                          overflow-hidden
                          rounded-2xl
                          border-2

                          ${
                            activeImage === index
                              ? "border-[#b07b5d]"
                              : "border-[#ead8c7]"
                          }
                        `}
                      >

                        <img
                          src={img}
                          alt={`Preview ${index}`}

                          className="
                            w-20
                            h-20

                            object-cover
                          "
                        />

                      </button>

                    )
                  )}

                </div>

                {/* BUTTON */}

                <a
                  href={`https://wa.me/6287715443313?text=Halo%20Delassa%20Saya%20ingin%20melakukan%20pemesanan%20brownies.%0A%0ANama:%20%0ATanggal%20Pickup%20Pemesanan:%20%0AVarian%20Menu:%20${selectedProduct.title}%0AJumlah%20Order:%20%0ARequest%20Tambahan:%20%0A%0ATerima%20kasih`}

                  target="_blank"
                  rel="noreferrer"

                  className="
                    mt-8

                    inline-flex
                    items-center
                    justify-center

                    h-[58px]
                    w-full

                    rounded-full

                    bg-[#4a2f25]
                    text-white

                    font-semibold
                    text-[15px]

                    hover:opacity-90
                    hover:scale-[1.01]

                    transition-all
                    duration-300
                  "
                >

                  Order Sekarang

                </a>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}