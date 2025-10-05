"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${window.location.origin}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || "Login failed"}`);
        return;
      }

      // ✅ Save JWT token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setMessage(`✅ ${data.message} — Welcome ${data.user.name}!`);

      // ⏳ Redirect to dashboard after 1 second
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("⚠️ Login error:", error);
      setMessage("⚠️ Network error: Unable to reach server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 tracking-wide">
          LOGIN TO YOUR ACCOUNT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-bold text-gray-900 text-lg">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded-lg p-3 font-bold text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-900 text-lg">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 rounded-lg p-3 font-bold text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-extrabold text-lg hover:bg-blue-800 transition-all duration-300 disabled:opacity-60 shadow-md"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-5 font-extrabold text-lg ${
              message.startsWith("✅")
                ? "text-green-700"
                : message.startsWith("❌")
                ? "text-red-700"
                : "text-yellow-700"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-gray-800 mt-6 font-bold text-md">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="text-blue-700 font-extrabold hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
