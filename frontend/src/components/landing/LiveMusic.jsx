import React from "react";

const LiveMusic = () => {
  return (
    <section className="pb-8 lg:py-16 bg-[#EFEFEF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[40px] p-5 md:p-8 flex flex-col md:flex-row gap-10 items-center shadow-sm">
          {/* Text content */}
          <div className="flex-1 max-w-md">
            <p className="text-sm mb-2 font-medium">at 17.00 pm</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Live Music Set
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Nikmati malam yang menyenangkan bersama teman-teman dan keluarga
              dengan suasana kafe yang cozy sambil menikmati musik yang indah.
              Jangan lewatkan kesempatan untuk menikmati malam yang tak
              terlupakan bersama kami di Mbah Buyut House.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 max-h-[250px] lg:h-[300px] rounded-[30px] overflow-hidden">
            <img
              src="/images/liveMusic.jpg"
              alt="live music"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMusic;
