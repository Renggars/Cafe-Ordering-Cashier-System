import React from "react";

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 shadow-sm">
      {/* Gambar */}
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded object-cover"
      />

      {/* Nama + Harga */}
      <div className="flex-1 ml-3">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">Rp{item.price.toLocaleString()}</p>
      </div>

      {/* Tombol Add */}
      <button
        onClick={() => addToCart(item)}
        className="px-4 py-2 bg-yellow-500 rounded text-white font-medium hover:bg-yellow-600 transition"
      >
        Add +
      </button>
    </div>
  );
};

export default MenuItem;
