import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const initialTestimonials = [

  {
    name: "Marsela",
    username: "@marselaa",
    review: "Rasanya mau beli terus sumpah 😭🤎",
    rating: 5,
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },

  {
    name: "Ahmad Ramadhan",
    username: "@ahmadrmdhn",
    review: "Sukaaaa banget browniesnya ✨",
    rating: 5,
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },

  {
    name: "Sarah",
    username: "@sarahsweet",
    review: "Browniesnya moist banget 😭",
    rating: 5,
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },

];

export default function Testimoni() {

  const [testimonials, setTestimonials] =
    useState(initialTestimonials);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const addTestimonial = () => {

    if (!name || !username || !review) {
      alert("Lengkapi semua form ✨");
      return;
    }

    const newTestimonial = {

      name,
      username,
      review,
      rating,

      image:
        "https://randomuser.me/api/portraits/lego/1.jpg",

    };

    setTestimonials([newTestimonial, ...testimonials]);

    setName("");
    setUsername("");
    setReview("");
    setRating(5);
  };

  return (

    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* HEADER */}
      <div className="text-center">

        <p className="uppercase tracking-[5px] text-[#c38358] text-sm font-semibold">
          Testimonials
        </p>

        <h2 className="text-6xl font-black mt-5 text-[#3b2b26]">
          What They Say ✨
        </h2>

        <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">

          Review manis dari customer Delassa
          yang sudah menikmati brownies premium kami 🤎

        </p>

      </div>

      {/* FORM */}
      <div className="bg-white rounded-[35px] p-8 shadow-lg mt-16 max-w-3xl mx-auto">

        <h3 className="text-3xl font-black text-[#3b2b26]">
          Beri Review 🤎
        </h3>

        <div className="flex flex-col gap-5 mt-8">

          {/* NAME */}
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none"
          />

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Instagram Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none"
          />

          {/* REVIEW */}
          <textarea
            placeholder="Tulis review kamu..."
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="bg-[#fdf7f2] px-5 py-4 rounded-2xl outline-none resize-none"
          ></textarea>

          {/* STAR */}
          <div className="flex gap-3 text-3xl">

            {[1,2,3,4,5].map((star) => (

              <button
                key={star}
                onClick={() => setRating(star)}
                className={
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                ★
              </button>

            ))}

          </div>

          {/* BUTTON */}
          <button
            onClick={addTestimonial}
            className="bg-[#3b2b26] hover:bg-black text-white py-4 rounded-2xl font-semibold transition"
          >
            Kirim Review 🚀
          </button>

        </div>

      </div>

      {/* SLIDER */}
      <div className="mt-20">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >

          {testimonials.map((item, index) => (

            <SwiperSlide key={index}>

              <div className="bg-white rounded-[35px] p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 h-full">

                {/* STAR */}
                <div className="text-yellow-400 text-2xl">
                  {"★".repeat(item.rating)}
                </div>

                {/* REVIEW */}
                <p className="text-gray-600 mt-6 leading-relaxed text-lg min-h-[120px]">

                  “{item.review}”

                </p>

                {/* USER */}
                <div className="flex items-center gap-4 mt-10">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>

                    <h4 className="font-black text-[#3b2b26] text-xl">
                      {item.name}
                    </h4>

                    <p className="text-gray-400 text-sm">
                      {item.username}
                    </p>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}