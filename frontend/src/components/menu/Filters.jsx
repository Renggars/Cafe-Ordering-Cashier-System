// Filters.tsx
import React from "react";

const categories = [
  "Non Coffee",
  "Coffee",
  "Snacks",
  "Rice",
  "Noodles",
  "Food",
];

const Filters = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full h-full p-4 rounded-2xl ">
      <h2 className="font-bold mb-4">Categories</h2>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => scrollToSection(cat.toLowerCase().replace(" ", "-"))}
            className="px-3 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
