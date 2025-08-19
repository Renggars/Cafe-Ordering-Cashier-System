import React from "react";
import { X } from "lucide-react"; // icon close

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex items-center space-x-6 bg-white rounded-xl shadow p-3 relative">
      {/* Gambar produk */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
        {/* Tombol hapus */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow"
        >
          <X size={14} />
        </button>
      </div>

      {/* Info produk */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">
          Rp{(item.price * item.quantity).toLocaleString()}
        </p>

        {/* Kontrol jumlah */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold"
          >
            −
          </button>
          <span className="min-w-[24px] text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center text-lg font-bold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
