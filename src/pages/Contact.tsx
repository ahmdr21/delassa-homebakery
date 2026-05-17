import {
  FaWhatsapp,
  FaInstagram,
  FaLocationDot,
} from "react-icons/fa6";

export default function Contact() {

  const message = encodeURIComponent(`Halo Delassa

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih`);

  return (

    <main className="bg-[#faf7f2] overflow-hidden">

      <section
        className="
          px-4
          sm:px-6
          lg:px-8

          pt-10
          sm:pt-14

          pb-20
          sm:pb-24
        "
      >

        <div
          className="
            max-w-[1200px]
            mx-auto
          "
        >

          {/* HEADER */}

          <div className="text-center">

            <p
              className="
                uppercase

                tracking-[4px]

                text-[#c38358]

                text-sm

                font-semibold
              "
            >

              Contact

            </p>

            <h1
              className="
                mt-5

                text-[#2f221d]

                font-black

                leading-[0.95]

                tracking-[-2px]

                text-[40px]
                sm:text-[68px]
              "
            >

              Let’s Order
              <span className="block text-[#c38358]">

                Delassa ✨

              </span>

            </h1>

            <p
              className="
                mt-6

                text-[#6f615a]

                text-[15px]
                sm:text-[18px]

                leading-relaxed

                max-w-[650px]
                mx-auto
              "
            >

              Hubungi Delassa untuk brownies premium,
              hampers aesthetic,
              dan dessert favoritmu.

            </p>

          </div>

          {/* CONTACT LIST */}

<div
  className="
    flex
    flex-col

    gap-4

    mt-10
  "
>

  {/* WHATSAPP */}

  <a
    href={`https://wa.me/6287715443313?text=${message}`}
    target="_blank"
    rel="noreferrer"
    className="
      flex
      items-center

      gap-3

      bg-white

      border
      border-[#ead8c7]

      rounded-[20px]

      px-4
      sm:px-6

      py-4

      hover:shadow-md

      transition-all
      duration-300
    "
  >

    <div
      className="
        w-12
        h-12

        rounded-full

        bg-[#25D366]

        text-white

        flex
        items-center
        justify-center

        text-[20px]

        shrink-0
      "
    >

      <FaWhatsapp />

    </div>

    <div>

      <p
        className="
          text-[#9b8d86]

          text-[12px]
        "
      >

        WhatsApp

      </p>

      <h3
        className="
          mt-[2px]

          text-[#2f221d]

          text-[18px]
          sm:text-[22px]

          font-black

          leading-tight
        "
      >

        0877-1544-3313

      </h3>

    </div>

  </a>

  {/* INSTAGRAM */}

  <a
    href="https://instagram.com/delassa.homebakery"
    target="_blank"
    rel="noreferrer"
    className="
      flex
      items-center

      gap-3

      bg-white

      border
      border-[#ead8c7]

      rounded-[20px]

      px-4
      sm:px-6

      py-4

      hover:shadow-md

      transition-all
      duration-300
    "
  >

    <div
      className="
        w-12
        h-12

        rounded-full

        bg-gradient-to-br
        from-pink-500
        to-orange-400

        text-white

        flex
        items-center
        justify-center

        text-[20px]

        shrink-0
      "
    >

      <FaInstagram />

    </div>

    <div>

      <p
        className="
          text-[#9b8d86]

          text-[12px]
        "
      >

        Instagram

      </p>

      <h3
        className="
          mt-[2px]

          text-[#2f221d]

          text-[18px]
          sm:text-[22px]

          font-black

          leading-tight

          break-words
        "
      >

        @delassa.homebakery

      </h3>

    </div>

  </a>

  {/* LOCATION */}

  <div
    className="
      flex
      items-center

      gap-3

      bg-white

      border
      border-[#ead8c7]

      rounded-[20px]

      px-4
      sm:px-6

      py-4
    "
  >

    <div
      className="
        w-12
        h-12

        rounded-full

        bg-[#c38358]

        text-white

        flex
        items-center
        justify-center

        text-[20px]

        shrink-0
      "
    >

      <FaLocationDot />

    </div>

    <div>

      <p
        className="
          text-[#9b8d86]

          text-[12px]
        "
      >

        Location

      </p>

      <h3
        className="
          mt-[2px]

          text-[#2f221d]

          text-[18px]
          sm:text-[22px]

          font-black

          leading-tight
        "
      >

        Bekasi Selatan, Jawa Barat

      </h3>

    </div>

  </div>

</div>

        </div>

      </section>

    </main>

  );

}