import React from "react";

const OurValues = () => {
  return (
    <section className="py-8 lg:py-16 bg-[#EFEFEF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#F4C461] rounded-[40px] p-5 md:p-6 flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          <div className="flex-1 max-h-[250px] lg:h-[300px] rounded-[30px] overflow-hidden">
            <img
              src="/images/view.jpg"
              alt="view"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-sm mb-2 font-medium">Our Values</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Beauty Place <br /> Good Food
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-md">
              Pemandangan sunset dapat menjadi sangat indah dan memberikan
              pengalaman yang luar biasa, terutama jika Anda berada di tempat
              yang tepat dan makanan yang tepat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
