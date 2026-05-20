import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Testimoni from "./pages/Testimoni";
import Contact from "./pages/Contact";

import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="bg-[#fdf7f2] text-[#3b2b26] overflow-x-hidden min-h-screen">
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/testimoni" element={<Testimoni />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>

        <Footer />

<a
  href="https://wa.me/6287715443313?text=Halo%20Delassa%20Saya%20ingin%20melakukan%20pemesanan%20brownies.%0A%0ANama:%20%0ATanggal%20Pickup%20Pemesanan:%20%0AVarian%20Menu:%20%0AJumlah%20Order:%20%0ARequest%20Tambahan:%20%0A%0ATerima%20kasih"

  target="_blank"
  rel="noreferrer"

  className="
    fixed

    bottom-5
    right-5

    z-[999]

    w-14
    h-14

    rounded-full

    bg-[#25D366]

    flex
    items-center
    justify-center

    shadow-xl

    hover:scale-110

    transition-all
    duration-300
  "
>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-7 h-7 fill-white"
  >

    <path d="M19.11 17.36c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.33.22-.62.07-.29-.15-1.2-.44-2.28-1.39-.84-.75-1.41-1.67-1.58-1.96-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.49.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.49.07-.74.37-.26.29-.98.96-.98 2.35 0 1.39 1.01 2.73 1.15 2.92.15.19 1.99 3.04 4.82 4.26.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.7-.69 1.94-1.35.24-.66.24-1.22.17-1.35-.07-.13-.26-.21-.55-.36zM16.01 3C8.83 3 3 8.83 3 16c0 2.54.75 5.02 2.16 7.14L3 29l6.06-2.11A12.94 12.94 0 0016.01 29C23.17 29 29 23.17 29 16S23.17 3 16.01 3zm0 23.64c-2.17 0-4.29-.58-6.14-1.69l-.44-.26-3.6 1.26 1.18-3.51-.29-.45a10.63 10.63 0 01-1.64-5.67c0-5.88 4.78-10.66 10.66-10.66 2.85 0 5.53 1.11 7.54 3.12A10.6 10.6 0 0126.67 16c0 5.88-4.78 10.64-10.66 10.64z" />

  </svg>

</a>

        <Analytics />
      </div>
    </BrowserRouter>
  );
}