"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function FavouritesCount() {
  const supabase = createClient();
  const [count, setCount] = useState(0);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;

      const { count } = await supabase
        .from("favourites")
        .select("*", { count: "exact", head: true })
        .eq("user_id", data.user.id);

      setCount(count || 0);
    });
  }, []);

  return (
    <Link href="/favourites" className="relative">
      ❤️
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
