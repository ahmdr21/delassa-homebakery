import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { login } from "../utils/auth";
import logo from "../assets/delassa.webp";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/admin/reviews");
    } catch (err: any) {
      setError(err.message ?? "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF9F6] bg-radial-gradient flex items-center justify-center p-5 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#c38358]/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#3b2b26]/10 rounded-full blur-[80px]" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-[32px] border border-[#ead8c7]/50 shadow-2xl p-8 sm:p-10 relative z-10">
        
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-tr from-[#ead8c7]/40 to-white rounded-full shadow-md mb-4 border border-[#ead8c7]/30">
            <img 
              src={logo} 
              alt="Delassa Logo" 
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>
          <h1 className="text-2xl font-black text-[#2f221d] tracking-wide">
            DELASSA HOME BAKERY
          </h1>
          <p className="text-xs font-bold text-[#b07b5d] uppercase tracking-[3px] mt-1.5">
            Admin Dashboard Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={16} className="text-[#c38358]" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#ead8c7] bg-white/70 pl-11 pr-4 py-3.5 text-sm font-semibold text-[#2f221d] outline-none transition-all focus:border-[#c38358] focus:bg-white focus:ring-4 focus:ring-[#c38358]/5"
                placeholder="admin@delassahomebakery.com"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-[#7a6a62] uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={16} className="text-[#c38358]" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-[#ead8c7] bg-white/70 pl-11 pr-12 py-3.5 text-sm font-semibold text-[#2f221d] outline-none transition-all focus:border-[#c38358] focus:bg-white focus:ring-4 focus:ring-[#c38358]/5"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a6a62] hover:text-[#2f221d] cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR DISPLAY */}
          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-100 text-red-600 p-4 text-xs font-bold leading-relaxed flex items-center gap-2 animate-shake">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-[#c38358] hover:bg-[#a96d45] disabled:opacity-50 text-white rounded-2xl py-3.5 font-bold text-sm shadow-[0_8px_20px_rgba(195,131,88,0.2)] hover:shadow-lg transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
          >
            {loading ? "Menghubungkan..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] text-[#7a6a62]">
          © {new Date().getFullYear()} Delassa Home Bakery · Dilindungi Hak Cipta.
        </p>

      </div>
    </div>
  );
}