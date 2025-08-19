import React, { useState } from "react";
import Filters from "../components/menu/Filters";
import MenuList from "../components/menu/MenuList";
import CartMenu from "../components/menu/CartMenu";
import Navbar from "@/components/Navbar";
import menuData from "@/constant/menuData";

const MenuPage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-[88rem] mx-auto">
      {/* Navbar */}
      <Navbar />

      <div className="flex gap-6 w-full h-full mt-20">
        {/* Filter */}
        <aside className="sticky top-[5rem] self-start w-1/5 h-[calc(100vh-8rem)] overflow-y-auto my-4 shadow-md rounded-2xl">
          <Filters />
        </aside>

        {/* Menu List */}
        <main className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar relative">
          <div className="pt-20 -mt-20">
            <MenuList menuData={menuData} addToCart={addToCart} />
          </div>
        </main>

        <aside className="sticky top-[5rem] self-start w-1/5 h-[calc(100vh-8rem)] mt-4">
          <CartMenu
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            subtotal={subtotal}
          />
        </aside>
      </div>
    </div>
  );
};

export default MenuPage;
