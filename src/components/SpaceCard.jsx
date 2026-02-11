"use client";

import Link from "next/link";
import Image from "next/image";
import FavouriteButton from "./FavouriteButton";

export default function SpaceCard({ space }) {
  if (!space) return null;

  
  const imageSrc =
    space.image?.startsWith("http")
      ? space.image
      : `/space/${space.image || "placeholder.jpg"}`;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-black">
      
      {/* IMAGE */}
      <div className="relative h-44 w-full">
        <Image
          src={imageSrc}
          alt={space.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE + HEART */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {space.name}
          </h3>

          <FavouriteButton
            item={{
              id: space.id,
              name: space.name,
              image: imageSrc,
              type: "space",
            }}
          />
        </div>

        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {space.location}
        </p>

        <Link
          href={`/space/${space.id}`}
          className="mt-4 inline-block text-sm font-medium text-black hover:underline dark:text-white"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}
