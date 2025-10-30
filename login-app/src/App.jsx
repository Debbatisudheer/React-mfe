import { useState } from "react";

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = () => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Signup successful! Now login.");
    setIsSignup(false);
  };

  const handleLogin = () => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!found) return alert("❌ Invalid credentials");

    localStorage.setItem("user", JSON.stringify(found));
    window.dispatchEvent(new Event("user-logged-in"));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">

      <h2 className="text-2xl font-bold">{isSignup ? "Sign Up" : "Sign In"}</h2>

      {isSignup && (
        <input
          name="name"
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Full Name"
        />
      )}

      <input
        name="email"
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Email"
      />

      <input
        type="password"
        name="password"
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Password"
      />

      <button
        onClick={isSignup ? handleSignup : handleLogin}
        className="bg-blue-600 text-white p-2 w-32 rounded"
      >
        {isSignup ? "Sign Up" : "Sign In"}
      </button>

      <p className="text-sm underline cursor-pointer"
        onClick={() => setIsSignup((prev) => !prev)}
      >
        {isSignup ? "Already have an account? Login" : "Create an account"}
      </p>
    </div>
  );
}

export default App;
