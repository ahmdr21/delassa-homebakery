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

      </div>

    </BrowserRouter>
  );
}