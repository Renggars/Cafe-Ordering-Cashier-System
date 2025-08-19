import React from "react";

const favorites = [
  { image: "/images/coffee.jpg", title: "Coffe Latte" },
  { image: "/images/iceCokelat.jpg", title: "Ice Cokelat" },
  { image: "/images/geprek.jpg", title: "Nasi Geprek" },
  { image: "/images/mieGoreng.jpg", title: "Mie Goreng" },
];

const FavoriteCard = ({ image, title }) => {
  return (
    <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
  );
};

const Favorit = () => {
  return (
    <section className="bg-[#EFEFEF] py-16 scroll-mt-16" id="favorit">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm font-medium">Today’s Pick</p>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl md:text-3xl font-bold mb-8 space-y-2">
            Yang Paling Favorit di <br /> Mbah Buyut House
          </h1>
          {/* badge best seller */}
          <div className="flex justify-center items-center w-[90px] h-[90px] rounded-full bg-yellow-400 font-semibold text-sm">
            Best Seller
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((fav) => (
            <div className="flex flex-col items-center" key={fav.title}>
              <FavoriteCard {...fav} />
              <span className="text-lg font-semibold text-center mt-3">
                {fav.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorit;
