import React from "react";

const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="container mx-auto px-6 lg:px-20 xl:px-52">
        <div className="text-white max-w-xl">
          <p className="uppercase font-medium mb-2 text-lg md:text-xl">
            MBAH BUYUT HOUSE
          </p>
          <h1 className="font-bold text-3xl md:text-5xl  leading-tight mb-8">
            This is our place, hopefully there will always be comfort in all our
            corners
          </h1>
          <a
            href="#favorit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-3 rounded-full cursor-pointer"
          >
            Our Favourites Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
