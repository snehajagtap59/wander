"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/app/lib/supabase/client";

export default function SpaceDetailPage() {
  const { id } = useParams();

  const [space, setSpace] = useState(null);
  const [loadingSpace, setLoadingSpace] = useState(true);

  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // 🔹 Fetch space data (CLIENT SAFE)
  useEffect(() => {
    if (!id) return;

    const fetchSpace = async () => {
      const { data } = await supabase
        .from("space")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (data) {
        setSpace(data);
        setLoadingSpace(false);
        return;
      }

      // 🔹 Fallback data (ALL IDs INCLUDED)
      const mockSpaces = [
        {
          id: 1,
          name: "Mars Colony",
          location: "Mars",
          description:
            "The first human settlement on the red planet. Advanced habitats, research labs, and greenhouses allow humans to survive and thrive on Mars.",
          cover_image: "https://wallpaperaccess.com/full/4031989.jpg",
        },
        {
          id: 2,
          name: "Saturn Rings Station",
          location: "Saturn Orbit",
          description:
            "A massive station floating within Saturn’s rings. Engineers and scientists study the planet’s rings and develop orbital technologies.",
          cover_image:
            "https://img.freepik.com/premium-photo/space-station-overlooking-breathtaking-rings-saturn-realistic-photo_1021165-5064.jpg",
        },
        {
          id: 3,
          name: "Moon Research Base",
          location: "Moon",
          description:
            "Advanced lunar research facility for deep-space travel. Includes labs for geology, astronomy, and life-support experiments.",
          cover_image:
            "https://images.pexels.com/photos/10044730/pexels-photo-10044730.jpeg",
        },
        {
          id: 4,
          name: "Black Hole Observatory",
          location: "Unknown Galaxy",
          description:
            "A remote observatory studying the mysteries of black holes, dark matter, and gravitational waves.",
          cover_image:
            "https://thumbs.dreamstime.com/b/unknown-galaxy-space-nebula-cosmic-cluster-stars-outer-background-d-illustration-241264683.jpg",
        },
        {
          id: 5,
          name: "Interstellar Travel Hub",
          location: "Milky Way Gateway",
          description:
            "Central hub enabling travel between distant star systems. Ships, cargo, and passengers are coordinated here.",
          cover_image:
            "https://img.freepik.com/premium-photo/celestial-gateway-milky-way-arch-man-mountain_1135748-12831.jpg",
        },
        {
          id: 6,
          name: "Alien Civilization Planet",
          location: "Andromeda Galaxy",
          description:
            "A planet inhabited by an advanced alien civilization. Its culture, technology, and environment are vastly different from Earth's.",
          cover_image:
            "https://tse4.mm.bing.net/th/id/OIP.PmR9OaFmkpqpGQyIZl0ljwHaEK",
        },
      ];

      const fallback = mockSpaces.find((item) => item.id === Number(id));
      setSpace(fallback || null);
      setLoadingSpace(false);
    };

    fetchSpace();
  }, [id]);

  // 🔹 AI Button Logic
  const getAIRecommendations = async () => {
    if (!space) return;

    setLoadingAI(true);

    const res = await fetch("/api/ai/space", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: space.name,
        description: space.description,
      }),
    });

    const data = await res.json();
    setAiResult(data.recommendations);
    setLoadingAI(false);
  };

  if (loadingSpace) {
    return <p className="p-10">Loading space data 🚀</p>;
  }

  if (!space) {
    return <p className="p-10 text-red-500">Space not found 🚀</p>;
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero */}
      <div className="relative h-[80vh] w-full">
        <img
          src={space.cover_image}
          alt={space.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <h1 className="text-5xl font-bold">{space.name}</h1>
          <p className="mt-2 text-xl">{space.location}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          {space.description}
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
