"use client";

import { useEffect, useRef, useState } from "react";

export default function FavouriteButton({ item }) {
  const [isFav, setIsFav] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const timeoutRef = useRef(null);

  const favItem = {
    id: Number(item.id),
    name: item.name,
    image: item.cover_image || item.image,
    type: "places",
  };

  const syncFavState = () => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFav(stored.some((i) => i.id === favItem.id));
  };

  useEffect(() => {
    syncFavState();
    window.addEventListener("storage", syncFavState);

    return () => {
      window.removeEventListener("storage", syncFavState);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleFavourite = () => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = stored.some((i) => i.id === favItem.id);

    const updated = exists
      ? stored.filter((i) => i.id !== favItem.id)
      : [...stored, favItem];

    localStorage.setItem("favourites", JSON.stringify(updated));

    setIsFav(!exists);
    setToastText(exists ? "Removed from favourites 💔" : "Added to favourites ❤️");
    setShowToast(true);

    // ✅ SAFE timeout handling
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={toggleFavourite}
        className="text-xl transition hover:scale-110"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/90 px-6 py-3 text-sm text-white">
          {toastText}
        </div>
      )}
    </>
  );
}
