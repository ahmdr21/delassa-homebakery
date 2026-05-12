import { useState } from "react";

export default function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendWhatsApp = () => {

    if (!name || !email || !message) {
      alert("Lengkapi semua form ✨");
      return;
    }

    const text = `
Halo Delassa 🤎

Nama: ${name}
Email: ${email}

Pesan:
${message}
    `;

    window.open(
      `https://wa.me/6287715443313?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (

    <section className="min-h-screen bg-[#fdf7f2] flex items-center">

      <div className="max-w-6xl mx-auto px-6 w-full py-16">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <p className="uppercase tracking-[6px] text-[#c38358] text-xs font-semibold">
              Contact
            </p>

            <h1 className="text-5xl lg:text-6xl font-black leading-[1.05] mt-5 text-[#3b2b26]">

              Let’s Create

              <span className="block text-[#c38358]">
                Sweet Moments
              </span>

            </h1>

            <div className="w-20 h-[3px] bg-[#c38358] rounded-full mt-6"></div>

            <p className="text-gray-500 text-lg leading-relaxed mt-8 max-w-md">

              Hubungi Delassa untuk pemesanan brownies premium,
              hampers aesthetic,
              dan dessert favoritmu ✨

            </p>

            {/* CONTACT LIST */}
            <div className="flex flex-col gap-5 mt-10">

              {/* ITEM */}
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl">

                  ✉️

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Email
                  </p>

                  <h3 className="text-lg font-bold text-[#3b2b26]">
                    delassahomebakery@gmail.com
                  </h3>

                </div>

              </div>

              {/* ITEM */}
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl">

                  📸

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Instagram
                  </p>

                  <h3 className="text-lg font-bold text-[#3b2b26]">
                    @delassa.homebakery
                  </h3>

                </div>

              </div>

              {/* ITEM */}
              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-xl">

                  📍

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Location
                  </p>

                  <h3 className="text-lg font-bold text-[#3b2b26]">
                    Bekasi Selatan
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-[32px] p-7 shadow-xl border border-[#f1e3d7]">

            <div className="flex flex-col gap-5">

              {/* NAME */}
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none border border-transparent focus:border-[#c38358] transition text-base"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none border border-transparent focus:border-[#c38358] transition text-base"
              />

              {/* MESSAGE */}
              <textarea
                rows={5}
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none resize-none border border-transparent focus:border-[#c38358] transition text-base"
              ></textarea>

              {/* BUTTON */}
              <button
                onClick={sendWhatsApp}
                className="bg-[#3b2b26] hover:bg-black transition text-white py-4 rounded-2xl text-base font-semibold shadow-md"
              >

                Send Message 🚀

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}