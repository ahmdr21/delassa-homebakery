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

    <footer className="bg-[#faf7f2] border-t border-[#ead8c7] mt-20">

      {/* TOP */}

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

          {/* LEFT */}

          <div>

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="Delassa Logo"
                className="w-12 h-12 object-contain"
              />

              <div>

                <h2 className="text-[32px] leading-none font-black italic tracking-tight text-[#2f221d]">

                  Delassa

                </h2>

                <p className="text-[8px] tracking-[4px] uppercase text-[#b07b5d] mt-1">

                  Homebakery

                </p>

              </div>

            </div>

            {/* TAGLINE */}

            <p className="mt-4 text-[#7a6a62] text-[14px] leading-relaxed max-w-sm">

              Crafted with love to make every sweet moment
              feel more special ✨

            </p>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">

            {/* SOCIAL */}

            <div className="space-y-4">

              <a
                href="https://instagram.com/delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <FaInstagram className="text-lg shrink-0" />

                <span className="text-[15px] font-medium">

                  Instagram

                </span>

              </a>

              <a
                href="https://threads.net/@delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <SiThreads className="text-lg shrink-0" />

                <span className="text-[15px] font-medium">

                  Threads

                </span>

              </a>

            </div>

            {/* CONTACT */}

            <div className="space-y-4">

              <a
                href="https://wa.me/6287715443313"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <FaWhatsapp className="text-lg shrink-0" />

                <span className="text-[15px] font-medium">

                  0877-1544-3313

                </span>

              </a>

              <a
                href="mailto:delassa.homebakery@gmail.com"
                className="flex items-center gap-3 text-[#3b2b26] hover:text-[#c38358] transition-all duration-300"
              >

                <FaEnvelope className="text-lg shrink-0" />

                <span className="text-[15px] font-medium break-all">

                  delassahomebakery@gmail.com

                </span>

              </a>

              <div className="flex items-start gap-3 text-[#3b2b26]">

                <FaLocationDot className="text-lg mt-[2px] shrink-0" />

                <span className="text-[15px] font-medium leading-relaxed">

                  Bekasi Selatan, Jawa Barat

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="bg-[#4a2f25] py-6 text-center px-5">

        <p className="text-white/80 text-[14px]">

          Copyright © 2026 | Delassa Homebakery

        </p>

      </div>

    </footer>

  );
}