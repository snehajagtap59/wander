"use client";

import { useEffect, useState } from "react";

export default function FavouriteButton({ item }) {
  const [isFav, setIsFav] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFav(stored.some((i) => i.id === item.id && i.type === item.type));
  }, [item]);

  const toggleFavourite = () => {
    let stored = JSON.parse(localStorage.getItem("favourites")) || [];

    if (isFav) {
      stored = stored.filter(
        (i) => !(i.id === item.id && i.type === item.type)
      );
      setToastText("Removed from favourites 💔");
    } else {
      stored.push(item);
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
        aria-label="Toggle favourite"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-black/90 px-6 py-3 text-sm text-white shadow-lg backdrop-blur-md animate-fade-in">
          {toastText}
        </div>
      )}
    </>
  );
}
