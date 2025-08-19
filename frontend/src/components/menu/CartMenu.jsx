import React from "react";
import CartItem from "../ui/cartItem";
import { ShoppingCart } from "lucide-react";

const CartMenu = ({ cart, updateQuantity, removeFromCart, subtotal }) => {
  return (
    <div className="w-full h-full rounded-2xl bg-white p-4 shadow-md flex flex-col">
      <h2 className="font-bold mb-2">Your Order List</h2>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 justify-center items-center">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <ShoppingCart className="w-10 h-10 text-gray-900" />
            <p className="text-gray-500 text-lg">Order is Empty</p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))
        )}
      </div>

      {/* Fixed Checkout button */}
      <div className="pt-4 border-t">
        <p className="font-bold">Subtotal: Rp{subtotal.toLocaleString()}</p>
        <button
          onClick={() => {
            window.location.href = "/menu/checkout";
          }}
          className={`w-full mt-2 py-2 rounded-md text-white transition bg-yellow-400 
      ${
        cart.length === 0
          ? "cursor-not-allowed"
          : "hover:bg-yellow-500 cursor-pointer"
      }
    `}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartMenu;
