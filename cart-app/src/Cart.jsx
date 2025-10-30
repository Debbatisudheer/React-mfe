import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
  const loadCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const res = await fetch(`http://localhost:5000/api/cart/${user._id}`);
    const data = await res.json();
    setCart(data);
  };

  loadCart();
  window.addEventListener("cart-updated", loadCart);
  return () => window.removeEventListener("cart-updated", loadCart);
}, []);


  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);

    // ✅ Toast notification
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: `Item removed from cart ❌`,
      })
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty 😕</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>

            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition w-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
