"use client";

import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "@/components/FavouriteButton";

export default function FantasyCard({ fantasy }) {
  if (!fantasy) return null;

  const imageSrc =
    fantasy.image?.startsWith("http")
      ? fantasy.image
      : `/fantasy/${fantasy.image || "placeholder.jpg"}`;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-black">
      
      {/* IMAGE */}
      <div className="relative h-44 w-full">
        <Image
          src={imageSrc}
          alt={fantasy.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE + FAVOURITE */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {fantasy.name}
          </h3>

          <FavouriteButton
            item={{
              id: fantasy.id,
              name: fantasy.name,
              image: imageSrc,
              type: "fantasy",
            }}
          />
        </div>

        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {fantasy.category} • {fantasy.location}
        </p>

        <Link
          href={`/fantasy/${fantasy.id}`}
          className="mt-4 inline-block text-sm font-medium text-black hover:underline dark:text-white"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}
