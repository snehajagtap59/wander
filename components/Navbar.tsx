"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Flavora
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
          <Link href="/explore" className="hover:text-neutral-900 transition">
            Explore
          </Link>
          <Link href="/favorites" className="hover:text-neutral-900 transition">
            Favorites
          </Link>
        </div>

        {/* Auth Button (placeholder) */}
        <button className="rounded-full border border-black px-4 py-2 hover:bg-black/5 transition">
          Sign in
        </button>
      </nav>
    </header>
  );
}
