"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase/client";

export default function HomePage() {
  const [user, setUser] = useState(null);
useEffect(() => {
  let mounted = true;

  supabase.auth.getSession().then(({ data }) => {
    if (mounted) {
      setUser(data.session?.user ?? null);
    }
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (mounted) {
      setUser(session?.user ?? null);
    }
  });

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);



  const categories = [
    {
      title: "Food",
      emoji: "🍔",
      description: "Street food, global cuisines, and local favorites.",
      href: "/food",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    },
    {
      title: "Fantasy",
      emoji: "🧙‍♂️",
      description: "Magical worlds, mythical lands, and hidden realms.",
      href: "/fantasy",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
      title: "Space",
      emoji: "🚀",
      description: "Alien planets, space stations, and cosmic mysteries.",
      href: "/space",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    },
    {
      title: "Places",
      emoji: "🌍",
      description: "Cities, beaches, mountains, and dream destinations.",
      href: "/places",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* ================= HEADER ================= */}
<header className="absolute top-0 left-0 z-20 w-full px-6 py-4 flex justify-between items-center">
  <Link
    href="/"
    className="text-xl font-bold text-white tracking-wide no-underline"
  >
    Wander ✨
  </Link>

  <div className="flex gap-4 items-center">
    {!user ? (
      <>
        <Link
          href="/login"
          className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:scale-105 transition"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:scale-105 transition"
        >
          Sign up
        </Link>
      </>
    ) : (
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          
        }}
        className="rounded-full border border-white/70 px-5 py-2 text-sm text-white hover:bg-white hover:text-black transition"
      >
        Logout
      </button>
    )}
  </div>
</header>

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Explore worlds"
          fill
          priority
          unoptimized
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Explore Worlds <br /> Beyond Imagination
          </h1>

          <p className="mt-5 text-lg md:text-xl text-zinc-300">
            Food, fantasy, space & places — discover, explore, and save your
            favourites ❤️
          </p>

          {/* EXPLORE + FAVOURITES BUTTONS */}
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/explore"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-white hover:text-black transition"
            >
              Explore 🌍
            </Link>

            <Link
              href="/favourites"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-white hover:text-black transition"
            >
              Favourites ❤️
            </Link>
          </div>

          {/* ✅ SIGNUP / LOGIN CTA (ONLY WHEN LOGGED OUT) */}
        
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Choose Your Adventure</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Jump into a category and start exploring instantly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative h-72 overflow-hidden rounded-3xl shadow-lg no-underline text-inherit"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white">
                  {cat.emoji} {cat.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-300">
                  {cat.description}
                </p>

                <span className="mt-4 inline-block text-sm font-medium text-white opacity-90 group-hover:opacity-100 transition">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-500">
        Built with ❤️ by Sneha • Explore without limits
      </footer>
    </div>
  );
}
