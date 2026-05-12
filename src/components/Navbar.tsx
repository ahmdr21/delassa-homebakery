import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import logo from "../assets/delassa.png";

export default function Navbar() {

  const location = useLocation();

  const menus = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Testimoni", path: "/testimoni" },
    { name: "Contact", path: "/contact" },
  ];

  return (

    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6">

      <nav className="max-w-6xl mx-auto bg-[#fdf7f2]/95 backdrop-blur-xl border border-[#ead8c7] rounded-full px-5 sm:px-8 lg:px-10 py-4 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

        {/* LOGO */}

        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">

          <img
            src={logo}
            alt="Delassa Logo"
            className="w-11 h-11 sm:w-14 sm:h-14 object-contain"
          />

          <div>

            <h1 className="text-2xl sm:text-3xl font-black italic tracking-tight text-[#3b2b26] leading-none">

              Delassa

            </h1>

            <p className="text-[8px] sm:text-[10px] tracking-[3px] sm:tracking-[5px] uppercase text-[#a06f52] mt-1">

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

          {/* MOBILE ICON */}

          <button className="lg:hidden text-3xl text-[#3b2b26]">

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

    </header>
  );
}