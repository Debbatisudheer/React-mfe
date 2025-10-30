import { useState } from "react";

export default function Login() {
  const [mode, setMode] = useState("login"); // login / register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const URL = "http://localhost:5000/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = mode === "login" ? "/login" : "/register";

    const body = mode === "login"
      ? { email, password }
      : { name, email, password };

    const res = await fetch(URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (mode === "login") {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("user-logged-in"));
    } else {
      alert("✅ User Registered, Now Login");
      setMode("login");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">{mode === "login" ? "Login" : "Register"}</h2>

      {mode === "register" && (
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      )}

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <input
        className="border p-2 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>

      <p
        className="text-center text-blue-600 cursor-pointer"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login" ? "Create account" : "Already have an account?"}
      </p>
    </div>
  );
}
