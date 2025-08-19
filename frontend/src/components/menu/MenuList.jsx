import React from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ menuData, addToCart }) => {
  return (
    <div className="p-4 space-y-6">
      {menuData.map((section) => (
        <div key={section.category}>
          {/* Judul kategori */}
          <h2 className="font-bold text-lg mb-3">{section.category}</h2>
          <div className="space-y-3">
            {section.items.map((item) => (
              <MenuItem key={item.name} item={item} addToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
