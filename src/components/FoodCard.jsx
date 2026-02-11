"use client";

import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "@/components/FavouriteButton";

export default function FoodCard({ food }) {
  if (!food) return null;

  const imageSrc =
    food.image?.startsWith("http")
      ? food.image
      : `/foods/${food.image || "placeholder.jpg"}`;

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-black">
      
      {/* IMAGE */}
      <div className="relative h-44 w-full">
        <Image
          src={imageSrc}
          alt={food.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE + FAV */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {food.name}
          </h3>

          <FavouriteButton
            item={{
              id: food.id,
              name: food.name,
              image: imageSrc,
              type: "food",
            }}
          />
        </div>

        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {food.category} • {food.city}
        </p>

        <Link
          href={`/food/${food.id}`}
          className="mt-4 inline-block text-sm font-medium text-black hover:underline dark:text-white"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}
