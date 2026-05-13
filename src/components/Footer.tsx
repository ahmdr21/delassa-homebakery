import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

import { SiThreads } from "react-icons/si";

import logo from "../assets/delassa.png";

export default function Footer() {

  return (

    <footer className="bg-[#faf7f2] border-t border-[#ead8c7]">

      {/* TOP */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <div>

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="Delassa Logo"
                className="w-14 h-14 object-contain"
              />

              <div>

                <h2 className="text-4xl leading-none font-black italic text-[#3b2b26]">

                  Delassa

                </h2>

                <p className="text-[10px] tracking-[4px] uppercase text-[#c38358] mt-2">

                  Homebakery

                </p>

              </div>

            </div>

            {/* TAGLINE */}

            <p className="mt-5 text-[#7a6a62] text-[15px] leading-relaxed max-w-sm">

              Crafted with love to make every
              sweet moment feel more special ✨

            </p>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="text-2xl font-black text-[#3b2b26]">

              Follow Us

            </h3>

            <div className="mt-6 flex flex-col gap-4">

              {/* INSTAGRAM */}

              <a
                href="https://instagram.com/delassahomebakery"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <FaInstagram className="text-xl" />

                <span className="text-[16px]">

                  Instagram

                </span>

              </a>

              {/* THREADS */}

              <a
                href="https://threads.net/@delassahomebakery"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <SiThreads className="text-xl" />

                <span className="text-[16px]">

                  Threads

                </span>

              </a>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="text-2xl font-black text-[#3b2b26]">

              Contact Us

            </h3>

            <div className="mt-6 flex flex-col gap-4">

              {/* PHONE */}

              <a
                href="https://wa.me/6287715443313"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <FaWhatsapp className="text-xl mt-1 shrink-0" />

                <span className="text-[16px]">

                  0877-1544-3313

                </span>

              </a>

              {/* EMAIL */}

              <a
                href="mailto:delassahomebakery@gmail.com"
                className="flex items-start gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <FaEnvelope className="text-xl mt-1 shrink-0" />

                <span className="text-[16px] break-all">

                  delassahomebakery@gmail.com

                </span>

              </a>

              {/* ADDRESS */}

              <div className="flex items-start gap-3 text-[#3b2b26]">

                <FaLocationDot className="text-xl mt-1 shrink-0" />

                <span className="text-[16px] leading-relaxed">

                  Bekasi Selatan,
                  Jawa Barat,
                  Indonesia

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="bg-[#3b2b26] py-5 px-5 text-center">

        <p className="text-white/70 text-sm">

          Copyright © 2026 | Delassa Homebakery

        </p>

      </div>

    </footer>

  );
}