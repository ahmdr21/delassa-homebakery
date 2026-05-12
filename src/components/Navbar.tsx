import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
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

      <nav className="max-w-6xl mx-auto bg-[#fdf7f2]/95 backdrop-blur-xl border border-[#ead8c7] rounded-[35px] sm:rounded-full px-5 sm:px-8 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative">

        <div className="flex items-center justify-between">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3">

            <img
              src={logo}
              alt="Delassa Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
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
              onClick={() => setOpen(!open)}
              className="lg:hidden text-4xl text-[#3b2b26]"
            >

              {open ? <HiX /> : <HiOutlineMenuAlt3 />}

            </button>

            {/* ORDER BUTTON */}

            <a
              href="https://wa.me/6287715443313"
              target="_blank"
              rel="noreferrer"
              className="bg-[#3b2b26] hover:bg-black transition-all duration-500 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg text-sm sm:text-base whitespace-nowrap"
            >

              Order Now

            </a>

          </div>

        </div>

        {/* MOBILE MENU */}

        {open && (

          <div className="lg:hidden mt-6 pt-6 border-t border-[#ead8c7] flex flex-col gap-5">

            {menus.map((menu, index) => (

              <Link
                key={index}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={`text-base font-medium transition
                ${
                  location.pathname === menu.path
                    ? "text-[#c38358]"
                    : "text-[#3b2b26]"
                }`}
              >

                {menu.name}

              </Link>

            ))}

          </div>

        )}

      </nav>

    </header>
  );
}