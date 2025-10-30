import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

const MenuApp = lazy(() => import("menu_app/Menu"));
const CartApp = lazy(() => import("cart_app/Cart"));
const LoginApp = lazy(() => import("login_app/Login"));
const Notify = lazy(() => import("notification_app/Notify"));   // ✅ Notification MF

export default function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => {
    const onLogin = () => {
      const u = localStorage.getItem("user");
      setUser(u ? JSON.parse(u) : null);
    };

    window.addEventListener("user-logged-in", onLogin);
    return () => window.removeEventListener("user-logged-in", onLogin);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    // ✅ fire notification
    window.dispatchEvent(
      new CustomEvent("show-toast", { detail: "Logged out successfully 🚪" })
    );
  };

  return (
    <BrowserRouter>
      {/* ✅ Toast Notification always active */}
      <Suspense fallback={null}>
        <Notify />
      </Suspense>

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Navbar */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 mb-6">
            <h1 className="text-xl font-bold">🍽 Food App (Micro-Frontends)</h1>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">Hi, {user.name}</span>
                  <Link className="px-3 py-2 rounded bg-blue-600 text-white" to="/">Menu</Link>
                  <Link className="px-3 py-2 rounded bg-green-600 text-white" to="/cart">Cart</Link>
                  <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link className="px-3 py-2 rounded bg-blue-600 text-white" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Protected Routes */}
          <div className="bg-white rounded-xl shadow p-6">
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                {!user && (
                  <>
                    <Route path="/login" element={<LoginApp />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </>
                )}

                {user && (
                  <>
                    <Route path="/" element={<MenuApp />} />
                    <Route path="/cart" element={<CartApp />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                )}
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
