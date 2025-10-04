"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setMessage(`❌ ${res.error}`);
    } else {
      setMessage("✅ Login successful!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 font-semibold text-gray-900">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-gray-900">{message}</p>
        )}
      </div>
    </div>
  );
}
