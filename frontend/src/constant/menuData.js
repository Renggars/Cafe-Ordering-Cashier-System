const imageUrl =
  "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const menuData = [
  {
    category: "Non Coffee",
    items: [
      {
        id: 1,
        name: "Hot Chocolate",
        price: 25000,
        stock: true,
        image: imageUrl,
      },
      { id: 2, name: "Ice Cream", price: 25000, stock: true, image: imageUrl },
    ],
  },
  {
    category: "Coffee",
    items: [
      { id: 3, name: "Espresso", price: 30000, stock: true, image: imageUrl },
      { id: 4, name: "Cappuccino", price: 35000, stock: true, image: imageUrl },
    ],
  },
  {
    category: "Snacks",
    items: [
      { id: 5, name: "Cookies", price: 20000, stock: true, image: imageUrl },
      { id: 6, name: "Chips", price: 15000, stock: true, image: imageUrl },
    ],
  },
  {
    category: "Rice",
    items: [
      {
        id: 7,
        name: "Nasi Goreng",
        price: 30000,
        stock: true,
        image: imageUrl,
      },
      { id: 8, name: "Nasi Ayam", price: 35000, stock: true, image: imageUrl },
    ],
  },
  {
    category: "Noodles",
    items: [
      { id: 9, name: "Mie Goreng", price: 30000, stock: true, image: imageUrl },
      { id: 10, name: "Mie Ayam", price: 35000, stock: true, image: imageUrl },
    ],
  },
  {
    category: "Food",
    items: [
      { id: 11, name: "Waffle", price: 25000, stock: true, image: imageUrl },
      { id: 12, name: "Donut", price: 20000, stock: true, image: imageUrl },
    ],
  },
];

export default menuData;
