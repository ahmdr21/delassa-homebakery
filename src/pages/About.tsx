export default function About() {

  return (

    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* IMAGE */}
        <div>

          <img
            src="https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop"
            alt="About Delassa"
            className="rounded-[50px] h-[700px] object-cover w-full shadow-xl"
          />

        </div>

        {/* CONTENT */}
        <div>

          <p className="uppercase tracking-[5px] text-[#c38358] text-sm font-semibold">
            About Us
          </p>

          <h2 className="text-6xl font-black mt-5 leading-tight text-[#3b2b26]">

            More Than Dessert,

            <span className="block text-[#c38358]">
              It’s An Experience
            </span>

          </h2>

          <div className="text-gray-500 text-lg leading-relaxed mt-8 max-w-2xl space-y-6">

            <p>
              Delassa hadir untuk menghadirkan pengalaman dessert premium
              yang tidak hanya memanjakan rasa,
              tetapi juga memberikan kesan elegan dalam setiap detailnya.
            </p>

            <p>
              Dengan perpaduan brownies premium,
              packaging aesthetic,
              dan sentuhan handmade yang hangat,
              kami ingin setiap produk menjadi bagian dari momen spesialmu.
            </p>

            <p>
              Karena bagi kami,
              setiap hadiah,
              setiap perayaan,
              dan setiap gigitan,
              layak dibuat terasa lebih istimewa 🤎
            </p>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-6 mt-12">

            <div className="bg-white rounded-[30px] p-8 shadow-sm">

              <h3 className="text-5xl font-black text-[#c38358]">
                290+
              </h3>

              <p className="mt-3 text-gray-500">
                Happy Customers
              </p>

            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-sm">

              <h3 className="text-5xl font-black text-[#c38358]">
                100%
              </h3>

              <p className="mt-3 text-gray-500">
                Handmade Product
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}