import { 
  RotateCw, 
  Clock, 
  MapPin, 
  ChevronRight,
  Heart
} from "lucide-react";
import logoDelassa from "../assets/delassa.webp";

export default function Maintenance() {
  const whatsappUrl =
    "https://wa.me/6287715443313?text=Halo%20Delassa%20Home%20Bakery,%20saya%20ingin%20melakukan%20pemesanan%20selama%20maintenance.";

  return (
    <div className="h-screen w-screen bg-[#FAF6F2] text-[#3D2419] flex flex-col justify-between p-6 sm:p-8 md:p-12 relative overflow-hidden font-sans select-none">
      {/* Decorative subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#c38358] opacity-[0.06] blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-[#e8a96b] opacity-[0.05] blur-[100px]" />
      </div>

      {/* Top Section - Simple Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <img
          src={logoDelassa}
          alt="Delassa Home Bakery"
          className="w-20 sm:w-24 h-auto object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Middle Section - Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto my-auto py-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e8dd]/60 border border-[#e5d7c9]/80 text-[#8C6B58] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-5">
          <span>🍪 Kami Sedang Memanggang</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3D2419] leading-tight mb-4">
          Sesuatu yang <br />
          <span className="text-[#c38358]">Lebih Baik</span> Sedang Disiapkan
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-[#6E5041] leading-relaxed mb-8 max-w-md">
          Website kami sedang diperbarui agar pengalaman berbelanja Anda menjadi lebih manis. Kami akan segera kembali!
        </p>

        {/* Action Button - WA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-[#3D2419] hover:bg-[#523223] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white shrink-0">
              <path d="M19.11 17.36c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.33.22-.62.07-.29-.15-1.2-.44-2.28-1.39-.84-.75-1.41-1.67-1.58-1.96-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.49.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.49.07-.74.37-.26.29-.98.96-.98 2.35 0 1.39 1.01 2.73 1.15 2.92.15.19 1.99 3.04 4.82 4.26.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.7-.69 1.94-1.35.24-.66.24-1.22.17-1.35-.07-.13-.26-.21-.55-.36zM16.01 3C8.83 3 3 8.83 3 16c0 2.54.75 5.02 2.16 7.14L3 29l6.06-2.11A12.94 12.94 0 0016.01 29C23.17 29 29 23.17 29 16S23.17 3 16.01 3zm0 23.64c-2.17 0-4.29-.58-6.14-1.69l-.44-.26-3.6 1.26 1.18-3.51-.29-.45a10.63 10.63 0 01-1.64-5.67c0-5.88 4.78-10.66 10.66-10.66 2.85 0 5.53 1.11 7.54 3.12A10.6 10.6 0 0126.67 16c0 5.88-4.78 10.64-10.66 10.64z" />
            </svg>
            <span>Pesan via WhatsApp</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Refresh Link */}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 flex items-center gap-1.5 text-xs text-[#8C6B58] hover:text-[#3D2419] font-semibold transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Muat Ulang Website</span>
        </button>
      </div>

      {/* Bottom Section - Minimal info & Footer */}
      <div className="relative z-10 w-full flex flex-col items-center gap-5 mt-auto">
        <div className="w-full max-w-xl h-[1px] bg-[#ead8c7]/50" />
        
        {/* Info row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-[#8C6B58] font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c38358]" />
            <span>09.00 - 17.00 WIB</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#ead8c7]" />
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c38358]" />
            <span>Bekasi Selatan, Jawa Barat</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#ead8c7]" />
          <div className="flex items-center gap-3">
            <span className="text-[#8C6B58]">Ikuti kami di:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/delassahomebakery"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#3D2419] flex items-center gap-1 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Instagram</span>
              </a>
              <span>•</span>
              <a
                href="https://www.threads.net/@delassahomebakery"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#3D2419] flex items-center gap-1 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.5 12c0-5.799-4.701-10.5-10.5-10.5S1.5 6.201 1.5 12 6.201 22.5 12 22.5c2.614 0 4.99-.957 6.811-2.535l-1.424-1.424C15.93 19.824 14.07 20.5 12 20.5c-4.694 0-8.5-3.806-8.5-8.5S7.306 3.5 12 3.5s8.5 3.806 8.5 8.5c0 2.274-1.014 3.738-2.614 3.738-1.026 0-1.886-.676-1.886-2.186V8.5h-2V10c-.8-.8-2-1.5-3.5-1.5-2.761 0-5 2.239-5 5s2.239 5 5 5c1.5 0 2.7-.7 3.5-1.5v.5c0 2.5 1.5 4.186 3.886 4.186 2.72 0 4.728-2.514 4.728-6.186zm-10.5 4c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
                <span>Threads</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-[#A88C7D] flex items-center gap-1">
          <span>© 2025 Delassa Home Bakery. Dibuat dengan</span>
          <Heart className="w-3 h-3 text-[#c38358] fill-current" />
        </div>
      </div>
    </div>
  );
}
