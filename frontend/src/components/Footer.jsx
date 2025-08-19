import React from "react";

import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F3F3F3] pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        {/* top content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          {/* logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/logoGreen.png" alt="logo" className="w-24" />
            <span className="tracking-[0.3em] text-xl font-semibold">
              MBAH BUYUT HOUSE
            </span>
          </div>

          {/* location + sosmed */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-2">Locations :</h4>
            <p>
              RT.1/RW.4, Kalang, Kalen,
              <br />
              Kec. Dlanggu, Kabupaten Mojokerto
              <br />
              Jawa Timur
            </p>
            <div className="flex justify-center md:justify-end gap-6 mt-4">
              <a
                href="#"
                className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="#"
                className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* open time & book */}
          <div className="text-center md:text-right flex flex-col gap-4">
            <div>
              <h4 className="font-semibold mb-2">We are open :</h4>
              <p>
                Weekdays <br />
                10.00 AM – 11.00 PM <br />
                Weekend <br />
                10.00 AM – 11.00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-evenly gap-4 mt-8">
          <div className="text-center font-semibold">RSVP +62822-5767-8788</div>
          <button className="bg-yellow-400 hover:bg-yellow-500 py-3 px-6 rounded-full font-medium cursor-pointer">
            Make a Reservation
          </button>
        </div>

        <div className="border-t-2 py-4 text-sm text-center">
          2025© Mbah Buyut House. All rights reserved. Dev by Renggars.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
