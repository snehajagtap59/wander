"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase/client";

export default function PlaceDetailPage() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [loadingPlace, setLoadingPlace] = useState(true);

  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // 🔹 Fetch place data from Supabase
  useEffect(() => {
    if (!id) return;

    const fetchPlace = async () => {
      const { data: supabasePlace, error } = await supabase
        .from("places")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error("Supabase error:", error);
      }

      setPlace(supabasePlace || null);
      setLoadingPlace(false);
    };

    fetchPlace();
  }, [id]);

  // 🔹 AI button logic
  const getAIRecommendations = async () => {
    if (!place) return;

    setLoadingAI(true);

    const res = await fetch("/api/ai/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: place.name,
        description: place.description,
      }),
    });

    const data = await res.json();
    setAiResult(data.recommendations);
    setLoadingAI(false);
  };

  if (loadingPlace) return <p className="p-10">Loading place data 🌍</p>;
  if (!place) return <p className="p-10 text-red-500">Place not found 🌍</p>;

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-[80vh] w-full">
        <img
          src={place.cover_image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <h1 className="text-5xl font-bold">{place.name}</h1>
          <p className="mt-2 text-xl">{place.country}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          {place.description}
        </p>

        <div className="mt-8">
          <button
            onClick={getAIRecommendations}
            className="rounded-full bg-purple-600 px-6 py-3 text-white text-sm font-semibold hover:scale-105 transition"
          >
            {loadingAI ? "Thinking..." : "✨ Get AI Recommendations"}
          </button>

          {aiResult && (
            <div className="mt-6 rounded-xl border p-4 bg-black/30 text-sm whitespace-pre-line text-white">
              {aiResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
