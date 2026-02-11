"use client";

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";

export default function FavouriteCard({ item }) {
  const supabase = createClient();

  const handleRemove = async () => {
    await supabase.from("favourites").delete().eq("id", item.id);
    location.reload();
  };

  return (
    <div className="rounded-xl overflow-hidden shadow bg-white relative">
      <Link href={`/${item.item_type}/${item.item_id}`}>
        <div className="relative h-48">
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </Link>

      {/* ❌ REMOVE */}
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm"
      >
        ❌
      </button>

      <div className="p-4">
        <h2 className="font-semibold">{item.title}</h2>
        <p className="text-xl text-zinc-500 hover:text-red-500 dark:text-zinc-400 transition">
          {item.item_type}
        </p>
      </div>
    </div>
  );
}
