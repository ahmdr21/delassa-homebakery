import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/delassa.png";

export default function Navbar() {

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const menus = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Testimoni", path: "/testimoni" },
    { name: "Contact", path: "/contact" },
  ];

  return (

    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6">

      <nav className="max-w-6xl mx-auto bg-[#fdf7f2]/95 backdrop-blur-xl border border-[#ead8c7] rounded-full px-5 sm:px-8 py-4 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

        {/* LOGO */}

        <Link to="/" className="flex items-center gap-3">

          <img
            src={logo}
            alt="Delassa Logo"
            className="w-11 h-11 sm:w-14 sm:h-14 object-contain"
          />

          <div>

            <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight text-[#3b2b26]">

              Delassa

            </h1>

            <p className="text-[8px] sm:text-[10px] tracking-[4px] uppercase text-[#a06f52] mt-1">

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
              className={`relative text-[15px] font-medium transition duration-300 hover:text-[#c38358]
              ${
                location.pathname === menu.path
                  ? "text-[#c38358]"
                  : "text-[#3b2b26]"
              }`}
            >

              {menu.name}

              {location.pathname === menu.path && (

                <span className="absolute left-0 -bottom-3 w-full h-[3px] rounded-full bg-[#c38358]"></span>

              )}

            </Link>

          ))}

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-4xl text-[#3b2b26]"
          >

            <HiOutlineMenuAlt3 />

          </button>

          {/* BUTTON */}

          <a
            href="https://wa.me/6287715443313"
            target="_blank"
            rel="noreferrer"
            className="bg-[#3b2b26] hover:bg-black transition-all duration-500 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg text-sm sm:text-base whitespace-nowrap"
          >

            Order Now

          </a>

        </div>

      </nav>

      {/* MOBILE SIDEBAR */}

      <div
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-[340px] bg-[#3b2b26] z-[999] transition-all duration-500
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="p-8 h-full flex flex-col">

          {/* TOP */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="logo"
                className="w-12 h-12 object-contain"
              />

              <div>

                <h1 className="text-3xl font-black italic text-white">

                  Delassa

                </h1>

                <p className="text-[9px] tracking-[4px] uppercase text-[#d9b9a4] mt-1">

                  Homebakery

                </p>

              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-4xl text-white"
            >

              <HiX />

            </button>

          </div>

          {/* MENU */}

          <div className="flex flex-col gap-6 mt-16">

            {menus.map((menu, index) => (

              <Link
                key={index}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={`text-[22px] font-bold transition duration-300
                ${
                  location.pathname === menu.path
                    ? "text-[#d9b9a4]"
                    : "text-white"
                }`}
              >

                {menu.name}

              </Link>

            ))}

          </div>

          {/* BUTTON */}

          <div className="mt-14">

            <p className="text-[#d9b9a4] text-sm leading-relaxed">

              Handmade brownies premium
              dengan packaging aesthetic ✨

            </p>

            <a
              href="https://wa.me/6287715443313"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex bg-white text-[#3b2b26] px-8 py-4 rounded-2xl font-semibold"
            >

              Contact Us

            </a>

          </div>

          {/* SOCIAL */}

          <div className="flex items-center gap-4 mt-auto">

            <a
              href="https://instagram.com/delassa.homebakery"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-xl"
            >

              <FaInstagram />

            </a>

            <a
              href="https://wa.me/6287715443313"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-xl"
            >

              <FaWhatsapp />

            </a>

            <a
              href="/"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-xl"
            >

              <FaTiktok />

            </a>

          </div>

        </div>

      </div>

      {/* OVERLAY */}

      {open && (

        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-[998] lg:hidden"
        ></div>

      )}

    </header>
  );
}