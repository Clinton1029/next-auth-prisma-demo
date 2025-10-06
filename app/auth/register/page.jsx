"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ Registration successful! You can now log in.");
        e.target.reset();
      } else {
        setMessage(`❌ ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("⚠️ Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 font-semibold text-gray-900">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full border-2 border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none font-medium text-gray-900 placeholder-gray-700"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border-2 border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none font-medium text-gray-900 placeholder-gray-700"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border-2 border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none font-medium text-gray-900 placeholder-gray-700"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-extrabold hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-gray-900">
            {message}
          </p>
        )}

        <p className="text-center font-semibold text-gray-900 mt-6">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-blue-700 font-bold hover:underline hover:text-blue-800"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
