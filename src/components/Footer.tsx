import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

import { SiThreads } from "react-icons/si";

import { Link } from "react-router-dom";

import logo from "../assets/delassa.webp";

export default function Footer() {

  const message = encodeURIComponent(`Halo Delassa

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih`);

  return (

    <footer
      className="
        bg-[#f7f3ef]
        border-t
        border-[#e8d7c8]

        mt-20
        overflow-hidden
      "
    >

      {/* ================================================= */}
      {/* TOP */}
      {/* ================================================= */}

      <div
        className="
          max-w-[1500px]
          mx-auto

          px-6
          sm:px-8
          lg:px-12

          py-12
          sm:py-14
        "
      >

        <div
          className="
            grid
            lg:grid-cols-[1.1fr_0.9fr]

            gap-12
            lg:gap-20

            items-start
          "
        >

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div>

            {/* LOGO */}

            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-4
              "
            >

              <img
                src={logo}
                alt="Delassa Logo"
                loading="lazy"
                decoding="async"
                className="
                  w-14
                  h-14

                  object-contain
                "
              />

              <div>

                <h2
                  className="
                    text-[34px]
                    sm:text-[42px]

                    leading-none

                    font-black
                    italic

                    tracking-tight

                    text-[#2f221d]
                  "
                >

                  Delassa

                </h2>

                <p
                  className="
                    text-[8px]
                    sm:text-[9px]

                    uppercase
                    tracking-[5px]

                    text-[#b07b5d]

                    mt-1
                  "
                >

                  Homebakery

                </p>

              </div>

            </Link>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6

                text-[#6f615a]

                text-[17px]
                sm:text-[18px]

                leading-relaxed

                max-w-[520px]
              "
            >

              Crafted with love to make every sweet
              moment feel more special

            </p>

          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div
            className="
              grid
              md:grid-cols-2

              gap-10
              lg:gap-16

              lg:justify-self-end
            "
          >

            {/* ================================================= */}
            {/* SOCIAL */}
            {/* ================================================= */}

            <div className="space-y-6">

              {/* INSTAGRAM */}

              <a
                href="https://instagram.com/delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-4

                  text-[#2f221d]

                  hover:text-[#b07b5d]

                  transition-all
                  duration-300
                "
              >

                <FaInstagram className="text-[20px]" />

                <span
                  className="
                    text-[17px]
                    font-medium
                  "
                >

                  Instagram

                </span>

              </a>

              {/* THREADS */}

              <a
                href="https://threads.net/@delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-4

                  text-[#2f221d]

                  hover:text-[#b07b5d]

                  transition-all
                  duration-300
                "
              >

                <SiThreads className="text-[18px]" />

                <span
                  className="
                    text-[17px]
                    font-medium
                  "
                >

                  Threads

                </span>

              </a>

            </div>

            {/* ================================================= */}
            {/* CONTACT */}
            {/* ================================================= */}

            <div
              className="
                space-y-6

                min-w-[320px]
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
                  gap-4

                  text-[#2f221d]

                  hover:text-[#b07b5d]

                  transition-all
                  duration-300
                "
              >

                <FaWhatsapp className="text-[19px]" />

                <span
                  className="
                    text-[17px]
                    font-medium
                  "
                >

                  0877-1544-3313

                </span>

              </a>

              {/* EMAIL */}

              <a
                href="mailto:info@delassahomebakery.id"
                className="
                  flex
                  items-center
                  gap-4

                  text-[#2f221d]

                  hover:text-[#b07b5d]

                  transition-all
                  duration-300
                "
              >

                <FaEnvelope className="text-[18px]" />

                <span
                  className="
                    text-[17px]
                    font-medium

                    break-normal
                  "
                >

                  info@delassahomebakery.id

                </span>

              </a>

              {/* LOCATION */}

              <div
                className="
                  flex
                  items-center
                  gap-4

                  text-[#2f221d]
                "
              >

                <FaLocationDot className="text-[18px]" />

                <span
                  className="
                    text-[17px]
                    font-medium

                    whitespace-nowrap
                  "
                >

                  Bekasi Selatan, Jawa Barat

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* BOTTOM */}
      {/* ================================================= */}

      <div
        className="
          bg-[#5a3426]

          py-6

          px-5
          sm:px-8
        "
      >

        <div
          className="
            max-w-[1500px]
            mx-auto

            flex
            items-center
            justify-center
          "
        >

          <p
            className="
              text-white

              text-[14px]
              sm:text-[15px]

              text-center

              font-medium
            "
          >

            Copyright © 2025 - 2026 |
            Delassa Homebakery

          </p>

        </div>

      </div>

    </footer>

  );

}