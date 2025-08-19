import React from "react";

export default function OrderReceived() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white pt-28 pb-20">
      {/* Icon / Logo */}

      <img src="/logoGreen.png" alt="logo" className="w-64 h-40 mb-8" />

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Thank You !</h1>
      <p className="text-gray-500">Your Order has been received.</p>

      {/* Order Number */}
      <p className="text-2xl font-bold text-gray-900 mt-4">#88423</p>
      <p className="text-gray-500 mt-1">
        Silahkan menuju kasir untuk melakukan pembayaran.
      </p>

      {/* Order Summary */}
      <div className="w-full max-w-md mt-8 border-t border-dashed border-gray-300 pt-4">
        <h2 className="font-semibold text-gray-700 mb-2">Order Summary</h2>
        <div className="flex justify-between text-gray-700">
          <span>Lemon Tea Ice</span>
          <span>x 1</span>
        </div>
      </div>

      {/* Button */}
      <button className="mt-8 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-full text-white font-medium transition cursor-pointer">
        Return to Menu
      </button>
    </div>
  );
}
