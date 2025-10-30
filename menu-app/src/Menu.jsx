import { useState } from "react";

export default function Menu() {
  const items = [
    { id: 1, name: "Pizza", price: 250 },
    { id: 2, name: "Burger", price: 150 },
    { id: 3, name: "Fries", price: 120 },
  ];

  const addToCart = async (item) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Login required!");
    return;
  }

  await fetch("http://localhost:5000/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user._id, item }),
  });

  // Notify cart-app
  window.dispatchEvent(new Event("cart-updated"));
};


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🍽 Menu</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">₹{item.price}</p>
            </div>

            <button
              onClick={() => addToCart(item)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
