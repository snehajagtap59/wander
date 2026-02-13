"use client";

import { useEffect, useRef, useState } from "react";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "@/lib/favourites";

export default function FavouriteButton({ item }) {
  const [isFav, setIsFav] = useState(false);
  const [toast, setToast] = useState("");
  const timeoutRef = useRef(null);

  const favItem = {
    id: String(item.id),
    name: item.name,
    image: item.cover_image || item.image,
    type: "places",
  };

  const sync = () => {
    const stored = getFavourites();
    setIsFav(stored.some(i => i.id === favItem.id));
  };

  useEffect(() => {
    sync();
  }, []);

  const toggle = () => {
    if (isFav) {
      removeFavourite(favItem);
      setToast("Removed from favourites 💔");
    } else {
      addFavourite(favItem);
      setToast("Added to favourites ❤️");
    }

    sync();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(""), 2000);
  };

  return (
    <>
      <button
        onClick={toggle}
        className="text-xl transition hover:scale-110"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black px-6 py-3 text-white">
          {toast}
        </div>
      )}
    </>
  );
}
