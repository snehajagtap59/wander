"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function FantasyDetailPage() {
  const { id } = useParams();

  const [fantasy, setFantasy] = useState(null);
  const [loadingFantasy, setLoadingFantasy] = useState(true);

  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // 🔹 Fetch fantasy data
  useEffect(() => {
    if (!id) return;

    const fetchFantasy = async () => {
      const { data: supabaseFantasy } = await supabase
        .from("fantasy")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (supabaseFantasy) {
        setFantasy(supabaseFantasy);
        setLoadingFantasy(false);
        return;
      }

      // 🔹 Fallback data
      const mockFantasy = [
        {
          id: "1",
          name: "Enchanted Forest",
          category: "Magical World",
          description:
            "A mystical forest filled with glowing trees, magical creatures, and hidden secrets. Legends say fairies, ancient spirits, and talking animals protect this land. Crystal-clear streams wind through mossy glades, while the air is alive with soft sparkling lights. Explorers often find enchanted herbs and mysterious runes carved into the trees, each whispering a fragment of the forest's ageless magic.",
          location: "Unknown Realm",
          image:
            "https://i.etsystatic.com/19164144/r/il/ad9256/4765481564/il_fullxfull.4765481564_kakf.jpg",
        },
        {
          id: "2",
          name: "Dragon Mountain",
          category: "Mythical Land",
          description:
            "A towering mountain where dragons soar above jagged cliffs and nest in fiery caves. The peaks blaze with molten lava, and the skies shimmer with the dragons' scales reflecting sunlight. Only the bravest adventurers dare to climb its treacherous slopes, encountering ancient dragon runes, hidden treasures, and the echoes of dragon songs carried on the wind.",
          location: "Volcanic Kingdom",
          image: "https://wallpaperaccess.com/full/3660350.jpg",
        },
        {
          id: "3",
          name: "Crystal Kingdom",
          category: "Royal Fantasy",
          description:
            "A kingdom made entirely of shimmering crystals, where sunlight refracts into dazzling rainbows across the castle spires. The streets are lined with translucent crystal towers, and magical scholars harness the crystals’ energy to cast brilliant spells. Courtiers wear gowns of sparkling gemstones, and the grand ballroom glows with an ethereal light that enchants all visitors.",
          location: "Northern Realms",
          image:
            "https://thumbs.dreamstime.com/b/enchanted-crystal-castle-fantasy-kingdom-pastel-colors-stunning-gorgeous-glowing-crystalline-palace-made-iridescent-328536524.jpg",
        },
        {
          id: "4",
          name: "Sky Floating Islands",
          category: "Adventure Fantasy",
          description:
            "Massive floating islands drift serenely across endless skies, connected by ancient rope bridges and waterfalls that spill into the clouds. Exotic creatures soar between the islands, and rare plants bloom in impossible colors. Travelers can discover hidden temples and wind-swept villages perched atop the islands, where the air is filled with the scent of clouds and adventure awaits around every corner.",
          location: "Celestial Sky",
          image: "https://images4.alphacoders.com/102/1024688.jpg",
        },
        {
          id: "5",
          name: "Underwater Atlantis",
          category: "Ocean Fantasy",
          description:
            "A lost underwater city teeming with glowing coral, luminescent flora, and civilizations of merfolk. Crystal towers rise from the ocean floor, and schools of shimmering fish form intricate patterns through the city streets. Ancient statues and treasures glint in the filtered sunlight, while mysterious sea creatures guard the secrets of this magnificent sunken realm.",
          location: "Deep Ocean",
          image:
            "https://as1.ftcdn.net/v2/jpg/05/68/71/72/1000_F_568717228_DjaSZoJicw5QJ9Ij1sEAgrtK3CcChNXE.jpg",
        },
        {
          id: "6",
          name: "Shadow Realm",
          category: "Dark Fantasy",
          description:
            "A mysterious realm enveloped in eternal twilight, where shadowy creatures roam and ancient secrets linger. The landscape shifts unpredictably, with forests of blackened trees, glowing fungi, and ominous cliffs. Only those with courage and cunning can navigate its treacherous paths, where illusions and whispers test the mind, and forgotten magic waits to be uncovered by intrepid adventurers.",
          location: "Forbidden Dimension",
          image: "https://images6.alphacoders.com/532/thumb-1920-532520.jpg",
        },
      ];

      const fallback = mockFantasy.find((f) => f.id === String(id));
      setFantasy(fallback || null);
      setLoadingFantasy(false);
    };

    fetchFantasy();
  }, [id]);

  // 🔹 AI Button Logic
  const getAIRecommendations = async () => {
    if (!fantasy) return;

    setLoadingAI(true);

    const res = await fetch("/api/ai/fantasy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fantasy.name,
        description: fantasy.description,
      }),
    });

    const data = await res.json();
    setAiResult(data.recommendations);
    setLoadingAI(false);
  };

  if (loadingFantasy) return <p className="p-10">Loading fantasy data 🧙</p>;
  if (!fantasy) return <p className="p-10 text-red-500">Fantasy not found 🧙</p>;

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative h-[80vh] w-full">
        <img
          src={fantasy.images?.length > 0 ? fantasy.images[0] : fantasy.image}
          alt={fantasy.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <h1 className="text-5xl font-bold">{fantasy.name}</h1>
          <p className="mt-2 text-xl">
            {fantasy.category} • {fantasy.location}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          {fantasy.description}
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
