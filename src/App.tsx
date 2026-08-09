import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CartDrawer from "./components/CartDrawer";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./components/Toast";

import { CartProvider, useCart } from "./context/CartContext";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Menu = lazy(() => import("./pages/Menu"));
const Testimoni = lazy(() => import("./pages/Testimoni"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminReviews = lazy(() => import("./pages/AdminReviews"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const DigitalReceipt = lazy(() => import("./pages/DigitalReceipt"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));

import { Analytics } from "@vercel/analytics/react";
import Maintenance from "./components/Maintenance";

function AppContent() {
  const { cartOpen, setCartOpen } = useCart();
  const location = useLocation();

  // Semua halaman admin & struk tidak memakai Navbar & Footer global
  const isNoLayoutPage = location.pathname.startsWith("/admin") || location.pathname.startsWith("/struk");

  return (
    <>
      <div className="bg-[#fdf7f2] text-[#3b2b26] overflow-x-hidden min-h-screen">
        {!isNoLayoutPage && <Navbar />}

        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="min-h-screen bg-[#fdf7f2] flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#c38358] border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              {/* Website */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/testimoni" element={<Testimoni />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/artikel" element={<Articles />} />
              <Route path="/artikel/:slug" element={<ArticleDetail />} />

              {/* Public Digital Receipt */}
              <Route path="/struk/:orderId" element={<DigitalReceipt />} />
              <Route path="/struk/:orderId/" element={<DigitalReceipt />} />

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin */}
              <Route
                path="/admin/reviews"
                element={
                  <ProtectedRoute>
                    <AdminReviews />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>

        {!isNoLayoutPage && <Footer />}

        {!isNoLayoutPage && (
          <a
            href="https://wa.me/6287715443313?text=Halo%20Delassa%20Home%20Bakery,%20saya%20ingin%20melakukan%20pemesanan%20brownies.%0A%0ANama:%20%0ATanggal%20Pickup:%20%0AVarian%20Menu:%20%0AJumlah%20Order:%20%0ARequest%20Tambahan:%20"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[999] group"
          >
            <div className="relative flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 sm:px-5 sm:py-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.35)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 sm:w-6 sm:h-6 fill-white relative z-10 shrink-0"
              >
                <path d="M19.11 17.36c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.33.22-.62.07-.29-.15-1.2-.44-2.28-1.39-.84-.75-1.41-1.67-1.58-1.96-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.49.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.49.07-.74.37-.26.29-.98.96-.98 2.35 0 1.39 1.01 2.73 1.15 2.92.15.19 1.99 3.04 4.82 4.26.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.7-.69 1.94-1.35.24-.66.24-1.22.17-1.35-.07-.13-.26-.21-.55-.36zM16.01 3C8.83 3 3 8.83 3 16c0 2.54.75 5.02 2.16 7.14L3 29l6.06-2.11A12.94 12.94 0 0016.01 29C23.17 29 29 23.17 29 16S23.17 3 16.01 3zm0 23.64c-2.17 0-4.29-.58-6.14-1.69l-.44-.26-3.6 1.26 1.18-3.51-.29-.45a10.63 10.63 0 01-1.64-5.67c0-5.88 4.78-10.66 10.66-10.66 2.85 0 5.53 1.11 7.54 3.12A10.6 10.6 0 0126.67 16c0 5.88-4.78 10.64-10.66 10.64z" />
              </svg>

              <div className="hidden md:block relative z-10">
                <p className="text-xs opacity-80 leading-none mb-1">
                  Butuh bantuan?
                </p>
                <p className="font-semibold leading-none">
                  Chat Delassa
                </p>
              </div>
            </div>
          </a>
        )}

        <Analytics />
      </div>

      {cartOpen && (
        <CartDrawer onClose={() => setCartOpen(false)} />
      )}
    </>
  );
}

export default function App() {
  const maintenance = import.meta.env.VITE_MAINTENANCE === "true";

  if (maintenance) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <AppContent />
        <ToastProvider />
      </CartProvider>
    </BrowserRouter>
  );
}