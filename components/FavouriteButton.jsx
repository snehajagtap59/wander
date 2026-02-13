"use client";

import { useEffect, useRef, useState } from "react";

export default function FavouriteButton({ item }) {
  const [isFav, setIsFav] = useState(false);
  const [toast, setToast] = useState("");
  const timeoutRef = useRef(null);

  // 🔥 UNIQUE identity = type + id
  const favItem = {
    id: String(item.id),
    type: item.type, // MUST exist (foods / places / etc.)
    name: item.name,
    image: item.image || item.cover_image,
  };

  const getStored = () =>
    JSON.parse(localStorage.getItem("favourites")) || [];

  const existsInStorage = () => {
    const stored = getStored();
    return stored.some(
      (i) => i.id === favItem.id && i.type === favItem.type
    );
  };

  useEffect(() => {
    setIsFav(existsInStorage());
  }, []);

  const toggleFavourite = () => {
    const stored = getStored();
    const exists = existsInStorage();

    let updated;

    if (exists) {
      updated = stored.filter(
        (i) => !(i.id === favItem.id && i.type === favItem.type)
      );
      setToast("Removed from favourites 💔");
    } else {
      updated = [...stored, favItem];
      setToast("Added to favourites ❤️");
    }

    localStorage.setItem("favourites", JSON.stringify(updated));
    setIsFav(!exists);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(""), 2000);
  };

  return (
    <>
      <button
        onClick={toggleFavourite}
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
