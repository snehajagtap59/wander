"use client";

import { useEffect, useRef, useState } from "react";

export default function FavouriteButton({ item }) {
  const [isFav, setIsFav] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const timeoutRef = useRef(null);

  // ✅ SAFE normalization (STRING id)
  const favItem = {
    id: String(item.id), // 🔥 THIS IS THE FIX
    name: item.name,
    image: item.cover_image || item.image,
    type: "places",
  };

  const getStored = () =>
    JSON.parse(localStorage.getItem("favourites")) || [];

  const syncState = () => {
    const stored = getStored();
    setIsFav(stored.some(i => i.id === favItem.id && i.type === favItem.type));
  };

  useEffect(() => {
    syncState();
  }, []);

  const toggleFavourite = () => {
    const stored = getStored();

    const exists = stored.some(
      i => i.id === favItem.id && i.type === favItem.type
    );

    let updated;

    if (exists) {
      updated = stored.filter(
        i => !(i.id === favItem.id && i.type === favItem.type)
      );
      setToastText("Removed from favourites 💔");
    } else {
      updated = [...stored, favItem];
      setToastText("Added to favourites ❤️");
    }

    localStorage.setItem("favourites", JSON.stringify(updated));

    setIsFav(!exists);
    setShowToast(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowToast(false), 2000);
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
