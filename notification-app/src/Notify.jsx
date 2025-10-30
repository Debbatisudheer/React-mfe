import { useEffect, useState } from "react";

export default function Notify() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (event) => {
      setMessage(event.detail);

      setTimeout(() => {
        setMessage("");
      }, 2500);
    };

    window.addEventListener("show-toast", handler);
    return () => window.removeEventListener("show-toast", handler);
  }, []);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-600 px-4 py-3 text-white rounded-lg shadow-lg animate-bounce">
      ✅ {message}
    </div>
  );
}
