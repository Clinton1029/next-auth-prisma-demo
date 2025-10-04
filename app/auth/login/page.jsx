"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // later: call signIn() from NextAuth
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Welcome Back
        </h2>
        <p className="text-center text-gray-800 font-semibold mb-6">
          Login to continue to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 font-semibold text-gray-900">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none font-medium text-gray-900 placeholder-gray-700"
            required
          />
          <input
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center font-semibold text-gray-900 mt-6">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="text-blue-700 font-bold hover:underline hover:text-blue-800"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
