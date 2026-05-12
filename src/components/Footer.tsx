import logo from "../assets/delassa.png";

export default function Footer() {

  return (

    <footer className="bg-[#2b1d18] text-white py-16 mt-24">

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-4 gap-12">

        {/* BRAND */}

        <div>

          <div className="flex items-center gap-4">

            <img
              src={logo}
              alt="Delassa Logo"
              className="w-16 h-16 object-contain"
            />

            <div>

              <h2 className="text-4xl font-black italic">

                Delassa

              </h2>

              <p className="text-white/60 text-sm mt-1">

                Homebakery

              </p>

            </div>

          </div>

          <p className="mt-6 text-white/70 leading-relaxed">

            Crafted with love to make every
            sweet moment feel more special ✨

          </p>

        </div>

        {/* MENU */}

        <div>

          <h3 className="font-bold text-xl">

            Navigation

          </h3>

          <div className="mt-5 flex flex-col gap-3 text-white/70">

            <p>Home</p>
            <p>About</p>
            <p>Menu</p>
            <p>Contact</p>

          </div>

        </div>

        {/* SOCIAL */}

        <div>

          <h3 className="font-bold text-xl">

            Social Media

          </h3>

          <div className="mt-5 flex flex-col gap-3 text-white/70">

            <p>Instagram</p>
            <p>WhatsApp</p>
            <p>TikTok</p>

          </div>

        </div>

        {/* CONTACT */}

        <div>

          <h3 className="font-bold text-xl">

            Contact

          </h3>

          <div className="mt-5 flex flex-col gap-3 text-white/70">

            <p>0877-1544-3313</p>
            <p>@delassa.homebakery</p>
            <p>Bekasi Selatan</p>

          </div>

        </div>

      </div>

    </footer>
  );
}