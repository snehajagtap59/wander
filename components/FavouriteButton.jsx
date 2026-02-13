"use client";

import { useEffect, useState } from "react";

export default function FavouriteButton({ item }) {
  const [isFav, setIsFav] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  // ✅ Normalize item BEFORE saving
  const normalizedItem = {
    id: Number(item.id),
    name: item.name,
    image: item.cover_image || item.image, // handles places
    type: "places", // 👈 VERY IMPORTANT (matches folder name)
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFav(stored.some((i) => i.id === normalizedItem.id));
  }, [item]);

  const toggleFavourite = () => {
    let stored = JSON.parse(localStorage.getItem("favourites")) || [];

    if (isFav) {
      stored = stored.filter((i) => i.id !== normalizedItem.id);
      setToastText("Removed from favourites 💔");
    } else {
      stored.push(normalizedItem);
      setToastText("Added to favourites ❤️");
    }

    localStorage.setItem("favourites", JSON.stringify(stored));
    setIsFav(!isFav);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 2000);
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
