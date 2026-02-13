"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "@/components/FavouriteButton";
import { supabase } from "@/lib/supabase/client";

export default function FavouritesPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 🔐 Not logged in → redirect to login
      if (!user) {
        router.push("/login");
        return;
      }

      // ✅ Logged in → load favourites
      const stored =
        JSON.parse(localStorage.getItem("favourites")) || [];
      setItems(stored);
      setLoading(false);
    };

    checkAuthAndLoad();
  }, [router]);

  // Background image (kept exactly as you had)
  const backgroundImage =
    "https://media.macphun.com/img/uploads/macphun/blog/2367/beautiful-plants-landscape-soap-bubbles.jpg?q=75&w=1710&h=906&resize=cover";

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading favourites...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt="Favourites Background"
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <h1 className="text-3xl font-bold text-white">
          No favourites yet 💔
        </h1>
        <p className="mt-3 text-zinc-200">
          Start exploring and tap the heart to save your favourites.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 py-10">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Favourites Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Header */}
      <div className="mx-auto mb-10 max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-white">
          Your Favourites ❤️
        </h1>
        <p className="mt-3 text-zinc-200">
          All the items you loved in one place.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={`${item.type}-${item.id}-${index}`}
            className="relative rounded-2xl overflow-hidden border bg-white/50 backdrop-blur-md shadow-lg dark:border-zinc-800 dark:bg-black/50"
          >
            {/* IMAGE */}
            <div className="relative h-44 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {item.name}
                </h3>

                <FavouriteButton item={item} />
              </div>

              <Link
                href={`/places/${item.id}`}
                className="mt-4 inline-block text-sm font-medium text-black hover:underline dark:text-white"
              >
                Explore →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
