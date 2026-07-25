import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { login } from "../utils/auth";

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
      setError(err.message ?? "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4EF] flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-[#6B3E26]">
            DELASSA
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Dashboard
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="text-sm font-medium">
              Email
            </label>

            <div className="mt-2 relative">

              <Mail
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full rounded-xl border pl-10 pr-4 py-3 outline-none focus:border-[#8B5E3C]"
                placeholder="admin@email.com"
              />

            </div>

          </div>

          <div>

            <label className="text-sm font-medium">
              Password
            </label>

            <div className="mt-2 relative">

              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full rounded-xl border pl-10 pr-12 py-3 outline-none focus:border-[#8B5E3C]"
                placeholder="********"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >

                {showPassword ? (
                  <EyeOff size={20}/>
                ) : (
                  <Eye size={20}/>
                )}

              </button>

            </div>

          </div>

          {error && (

            <div className="rounded-xl bg-red-100 text-red-600 p-3 text-sm">
              {error}
            </div>

          )}

          <button
            disabled={loading}
            className="w-full bg-[#8B5E3C] hover:bg-[#70492E] text-white rounded-xl py-3 transition disabled:opacity-50"
          >

            {loading ? "Loading..." : "Login"}

          </button>

        </form>

      </div>
    </div>
  );
}