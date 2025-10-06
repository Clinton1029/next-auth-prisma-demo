"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession(); // 👈 Get current user session

  // ✅ Navigation Links
  const navLinks = session
    ? [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Login", href: "/auth/login" },
        { name: "Register", href: "/auth/register" },
      ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          NextAuthApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {link.name}
            </Link>
          ))}

          {/* ✅ Logout Button (Only if logged in) */}
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col space-y-2 py-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {session && (
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
