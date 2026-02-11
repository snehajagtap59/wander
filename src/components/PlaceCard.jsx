"use client";

import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "@/components/FavouriteButton";

export default function PlaceCard({ place }) {
  if (!place) return null;

  const imageSrc =
    place.image?.startsWith("http")
      ? place.image
      : `/places/${place.image || "placeholder.jpg"}`;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-black">
      
      {/* IMAGE */}
      <div className="relative h-44 w-full">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        
        {/* TITLE + HEART (same as SpaceCard) */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {place.name}
            </h3>

            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {place.country}
            </p>
          </div>

          <FavouriteButton
            item={{
              id: place.id,
              name: place.name,
              image: imageSrc,
              type: "place",
            }}
          />
        </div>

        {/* EXPLORE */}
        <Link
          href={`/places/${place.id}`}
          className="mt-4 inline-block text-sm font-medium text-black hover:underline dark:text-white"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}
