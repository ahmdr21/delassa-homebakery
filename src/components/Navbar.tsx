import { Link, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

import {
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import { SiThreads } from "react-icons/si";

import logo from "../assets/delassa.png";

export default function Navbar() {

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const message = encodeURIComponent(`Halo Delassa

Saya ingin melakukan pemesanan brownies.

Nama:
Tanggal Pickup Pemesanan:
Varian Menu:
Jumlah Order:
Request Tambahan:

Terima kasih`);

  const menus = [

    { name: "Home", path: "/" },

    { name: "About", path: "/about" },

    { name: "Menu", path: "/menu" },

    { name: "Contact", path: "/contact" },

  ];

  /* LOCK BODY */

  useEffect(() => {

    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {

      document.body.style.overflow = "auto";

    };

  }, [open]);

  return (

    <>

      {/* HEADER */}

      <header className="fixed top-0 left-0 w-full z-[9999] px-4 sm:px-6 py-4 bg-[#faf7f2]">

        {/* NAVBAR */}

        <nav className="max-w-6xl mx-auto bg-[#fffaf5] border border-[#ead8c7] rounded-full px-5 sm:px-8 py-3 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

          {/* LEFT */}

          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
          >

            <img
              src={logo}
              alt="Delassa"
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
            />

            <div>

              <h1 className="text-[26px] sm:text-[34px] leading-none italic font-black tracking-tight text-[#2f221d]">

                Delassa

              </h1>

              <p className="text-[7px] sm:text-[10px] uppercase tracking-[4px] text-[#b07b5d] mt-[2px]">

                Homebakery

              </p>

            </div>

          </Link>

          {/* DESKTOP MENU */}

          <div className="hidden lg:flex items-center gap-10">

            {menus.map((menu, index) => (

              <Link
                key={index}
                to={menu.path}
                className={`relative text-[15px] font-medium transition-all duration-300
                ${
                  location.pathname === menu.path
                    ? "text-[#c38358]"
                    : "text-[#3b2b26] hover:text-[#c38358]"
                }`}
              >

                {menu.name}

                {location.pathname === menu.path && (

                  <span className="absolute left-0 -bottom-2 w-full h-[2px] rounded-full bg-[#c38358]"></span>

                )}

              </Link>

            ))}

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            {/* MOBILE BUTTON */}

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-[30px] text-[#3b2b26]"
            >

              <HiOutlineMenuAlt3 />

            </button>

            {/* ORDER BUTTON */}

            <a
              href={`https://wa.me/6287715443313?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#3b2b26] hover:bg-black text-white px-5 sm:px-8 py-3 rounded-full text-[14px] sm:text-[15px] font-semibold transition-all duration-300 shadow-lg hover:-translate-y-[2px]"
            >

              Order

            </a>

          </div>

        </nav>

      </header>

      {/* SPACER */}

      <div className="h-[120px]"></div>

      {/* OVERLAY */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-all duration-300 lg:hidden
        ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></div>

      {/* MOBILE MENU */}

      <div
        className={`fixed top-0 right-0 h-screen w-[78%] max-w-[280px] bg-[#3b2b26] z-[9999] transition-all duration-300
        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="h-full flex flex-col px-6 py-6">

          {/* TOP */}

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-2">

              <img
                src={logo}
                alt="logo"
                className="w-9 h-9 object-contain"
              />

              <div>

                <h1 className="text-[24px] italic font-black text-white leading-none">

                  Delassa

                </h1>

                <p className="text-[7px] uppercase tracking-[4px] text-[#d7b8a5] mt-[2px]">

                  Homebakery

                </p>

              </div>

            </div>

            {/* CLOSE */}

            <button
              onClick={() => setOpen(false)}
              className="text-[32px] text-white"
            >

              <HiX />

            </button>

          </div>

          {/* MENU */}

          <div className="flex flex-col mt-10">

            {menus.map((menu, index) => (

              <Link
                key={index}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={`py-4 border-b border-[#5a3d31] text-[15px] font-medium transition-all duration-300
                ${
                  location.pathname === menu.path
                    ? "text-[#d7b8a5]"
                    : "text-white"
                }`}
              >

                {menu.name}

              </Link>

            ))}

          </div>

          {/* SOCIAL */}

          <div className="mt-auto">

            <div className="flex items-center gap-3 pt-8">

              {/* IG */}

              <a
                href="https://instagram.com/delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#3b2b26] flex items-center justify-center text-sm"
              >

                <FaInstagram />

              </a>

              {/* WA */}

              <a
                href={`https://wa.me/6287715443313?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#3b2b26] flex items-center justify-center text-sm"
              >

                <FaWhatsapp />

              </a>

              {/* THREADS */}

              <a
                href="https://threads.net/@delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#3b2b26] flex items-center justify-center text-sm"
              >

                <SiThreads />

              </a>

            </div>

          </div>

        </div>

      </div>

    </>

  );
}