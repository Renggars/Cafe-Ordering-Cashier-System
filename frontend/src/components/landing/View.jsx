import React from "react";

const HangoutView = () => {
  const images = [
    "/views/1.jpg",
    "/views/2.jpg",
    "/views/3.jpg",
    "/views/4.jpg",
  ];

  return (
    <section
      className="py-20 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/views/cafe.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Tempat nongkrong asik <br /> bersama teman dan keluarga <br /> dengan
          view yang menarik.
        </h2>
        <p className="max-w-3xl mx-auto mb-12">
          Nikmati hidangan spesial Kami bersama keluarga dan teman-teman Anda.
          Hidangan Kami dapat menjadi pilihan yang sempurna untuk acara-acara
          spesial seperti pesta ulang tahun, pernikahan, atau pertemuan bisnis.
          Jangan ragu untuk mencoba dan rasakan setiap hidangan ditemani view
          yang menakjubkan.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img}
              className="relative overflow-hidden rounded-2xl h-[220px] group"
            >
              <img
                src={img}
                alt="hangout"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HangoutView;
