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

    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 sm:pt-6">

      {/* NAVBAR */}

      <nav className="max-w-6xl mx-auto bg-[#fdf7f2]/95 backdrop-blur-xl border border-[#ead8c7] rounded-[24px] sm:rounded-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

        {/* LEFT */}

        <Link to="/" className="flex items-center gap-2 min-w-0">

          <img
            src={logo}
            alt="Delassa Logo"
            className="w-9 h-9 sm:w-14 sm:h-14 object-contain shrink-0"
          />

          <div className="min-w-0">

            <h1 className="text-[24px] sm:text-3xl leading-none font-black italic tracking-tight text-[#3b2b26] truncate">

              Delassa

            </h1>

            <p className="text-[7px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] uppercase text-[#a06f52] mt-[2px]">

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

        <div className="flex items-center gap-2">

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-[30px] text-[#3b2b26] shrink-0"
          >

            <HiOutlineMenuAlt3 />

          </button>

          {/* ORDER BUTTON */}

          <a
            href="https://wa.me/6287715443313"
            target="_blank"
            rel="noreferrer"
            className="bg-[#3b2b26] hover:bg-black transition-all duration-500 text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-full shadow-lg text-[13px] sm:text-base whitespace-nowrap"
          >

            Order

          </a>

        </div>

      </nav>

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

      {/* MOBILE SIDEBAR */}

      <div
        className={`fixed top-0 right-0 h-screen w-[76%] max-w-[270px] bg-[#3b2b26] z-[999] transition-all duration-300
        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="h-full px-5 py-5 flex flex-col">

          {/* TOP */}

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-2">

              <img
                src={logo}
                alt="logo"
                className="w-8 h-8 object-contain"
              />

              <div>

                <h1 className="text-[22px] leading-none font-black italic text-white">

                  Delassa

                </h1>

                <p className="text-[7px] tracking-[3px] uppercase text-[#d9b9a4] mt-1">

                  Homebakery

                </p>

              </div>

            </div>

            {/* CLOSE */}

            <button
              onClick={() => setOpen(false)}
              className="text-[30px] text-white"
            >

              <HiX />

            </button>

          </div>

          {/* MENU */}

          <div className="flex flex-col gap-1 mt-8">

            {menus.map((menu, index) => (

              <Link
                key={index}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={`text-[15px] font-semibold py-3 border-b border-[#5a3d31] transition duration-300
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

            <div className="border border-[#5f4337] bg-[#4a3026] rounded-[16px] p-3.5">

              <p className="text-[#e7c6b2] text-[12px] leading-relaxed">

                Handmade brownies premium
                dengan packaging aesthetic ✨

              </p>

              <a
                href="https://wa.me/6287715443313"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex bg-white text-[#3b2b26] px-4 py-2 rounded-lg font-semibold text-[13px]"
              >

                Contact Us

              </a>

            </div>

            {/* SOCIAL */}

            <div className="flex items-center gap-3 mt-4">

              <a
                href="https://instagram.com/delassa.homebakery"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-sm"
              >

                <FaInstagram />

              </a>

              <a
                href="https://wa.me/6287715443313"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-sm"
              >

                <FaWhatsapp />

              </a>

              <a
                href="/"
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#3b2b26] text-sm"
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