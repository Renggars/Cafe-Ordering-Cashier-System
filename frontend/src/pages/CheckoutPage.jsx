"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
  // contoh data cart (ganti dengan cart asli kamu)
  const [cart] = useState([
    { id: 1, name: "Nasi Putih", qty: 1, price: 6000 },
    { id: 2, name: "Tumis Taoge (untuk 2-3 orang)", qty: 1, price: 24000 },
  ]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Navbar />

      <div className="w-full max-w-2xl space-y-5 mt-20">
        <h1 className="text-2xl font-bold text-center">Checkout</h1>

        {cart.length === 0 ? (
          // ====> UI kalau cart kosong
          <div className="bg-white p-10 rounded-2xl shadow flex flex-col items-center justify-center text-gray-500">
            <ShoppingCart className="w-16 h-16 mb-4 text-gray-400" />
            <p className="text-lg font-medium">Order is Empty</p>
            <p className="text-sm text-gray-400 mt-1">
              Tambahkan produk ke keranjang untuk melanjutkan checkout
            </p>
            <button
              onClick={() => (window.location.href = "/menu")}
              className="mt-6 px-5 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold transition"
            >
              Lihat Menu
            </button>
          </div>
        ) : (
          // ====> UI kalau ada item di cart
          <>
            {/* Order Information */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="font-semibold mb-3">Order Information</h2>
              <label className="block mb-1 font-medium">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            {/* Order Notes */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="font-semibold mb-3">Order Notes (optional)</h2>
              <textarea
                placeholder="Write your order notes here.."
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="font-semibold mb-3">Order Summary</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-right py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b last:border-none">
                      <td className="py-2">
                        {item.name} × {item.qty}
                      </td>
                      <td className="py-2 text-right">
                        Rp{(item.price * item.qty).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between font-medium mt-4">
                <span>Subtotal</span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-1">
                <span>Total</span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-5 rounded-2xl shadow">
              <h2 className="font-semibold mb-3">Pembayaran di Kasir</h2>
              <p className="bg-gray-100 p-3 rounded-md text-sm text-gray-600 mb-4">
                Silahkan klik <b>"Order"</b> dan lakukan pembayaran di kasir.
              </p>
              <button
                className="w-full bg-yellow-400 hover:bg-yellow-500 transition rounded-md py-3 font-semibold cursor-pointer"
                onClick={() => {
                  window.location.href = "/menu/order-received";
                }}
              >
                Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
