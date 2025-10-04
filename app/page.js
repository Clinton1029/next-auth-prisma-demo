import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Welcome to <span className="text-blue-600">NextAuth</span> Starter
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-10">
        A modern authentication-ready template built with Next.js 15, Tailwind, and Prisma.  
        Start building secure apps effortlessly.
      </p>
      <div className="space-x-4">
        <Link
          href="/auth/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          href="/auth/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
    </section>
  );
}
