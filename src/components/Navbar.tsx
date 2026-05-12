import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
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

  /* LOCK SCROLL */

  useEffect(() => {

    if (open) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "auto";

    }

    return () => {

      document.body.style.overflow = "auto";

    };

  }, [open]);

  return (

    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6">

      {/* NAVBAR */}

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

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-4xl text-[#3b2b26]"
          >

            <HiOutlineMenuAlt3 />

          </button>

          {/* ORDER BUTTON */}

          <a
            href="https://wa.me/6287715443313"
            target="_blank"
            rel="noreferrer"
            className="bg-[#3b2b26] hover:bg-black transition-all duration-500 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg text-sm sm:text-base whitespace-nowrap hover:-translate-y-1"
          >

            Order Now

          </a>

        </div>

      </nav>

      {/* OVERLAY */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-all duration-500 lg:hidden
        ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      ></div>

      {/* MOBILE SIDEBAR */}

      <div
        className={`fixed top-0 right-0 h-screen w-[82%] max-w-[320px] bg-[#3b2b26] z-[999] transition-all duration-500
        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="h-full px-7 py-8 flex flex-col">

          {/* TOP */}

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 object-contain"
              />

              <div>

                <h1 className="text-[38px] leading-none font-black italic text-white">

                  Delassa

                </h1>

                <p className="text-[9px] tracking-[5px] uppercase text-[#d9b9a4] mt-2">

                  Homebakery

                </p>

              </div>

            </div>

            {/* CLOSE */}

            <button
              onClick={() => setOpen(false)}
              className="text-4xl text-white mt-1"
            >

              <HiX />

            </button>

          </div>

          {/* MENU */}

          <div className="flex flex-col gap-7 mt-16">

            {menus.map((menu, index) => (

              <Link
                key={index}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={`text-[18px] font-semibold transition duration-300
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

          {/* BOTTOM */}

          <div className="mt-auto">

            {/* CARD */}

            <div className="border border-[#5f4337] bg-[#4a3026] rounded-[24px] p-5">

              <p className="text-[#e7c6b2] text-sm leading-relaxed">

                Handmade brownies premium
                dengan packaging aesthetic ✨

              </p>

              <a
                href="https://wa.me/6287715443313"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex bg-white text-[#3b2b26] px-6 py-3 rounded-xl font-semibold text-sm"
              >

                Contact Us

              </a>

            </div>

            {/* SOCIAL */}

            <div className="flex items-center gap-4 mt-6">

              <a
                href="https://instagram.com/delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-lg"
              >

                <FaInstagram />

              </a>

              <a
                href="https://wa.me/6287715443313"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-lg"
              >

                <FaWhatsapp />

              </a>

              <a
                href="/"
                className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-lg"
              >

                <FaTiktok />

              </a>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}