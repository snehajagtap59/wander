"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function FoodDetailPage() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loadingFood, setLoadingFood] = useState(true);

  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // 🔹 Fetch food data
  useEffect(() => {
    if (!id) return;

    const fetchFood = async () => {
      const { data: supabaseFood } = await supabase
        .from("foods")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (supabaseFood) {
        setFood(supabaseFood);
        setLoadingFood(false);
        return;
      }

      // 🔹 Fallback data
      const mockFoods = [
        {
          id: "1",
          name: "Mumbai Street Vada Pav",
          category: "Street Food",
          description:
            "A spicy potato fritter served inside a bun, loved across Mumbai. This iconic street food is perfect for a quick snack on the go, with its crispy exterior, soft potato filling, and a hint of tangy chutney. Often enjoyed with fried green chili, it's a staple for locals and tourists alike.",
          location: "India",
          image:
            "https://tse2.mm.bing.net/th/id/OIP.r1gNrlWqaOKgE3sKjV-yYgHaGC?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
          id: "2",
          name: "Italian Margherita Pizza",
          category: "Pizza",
          description:
            "Classic pizza with tomatoes, mozzarella, and fresh basil. Originating from Naples, the Margherita Pizza is simple yet flavorful, celebrated for its balance of tangy tomato sauce, creamy mozzarella, and fragrant fresh basil. Perfectly baked in a wood-fired oven, its thin crust is both crispy and chewy.",
          location: "Italy",
          image:
            "https://tse1.mm.bing.net/th/id/OIP.r6QNsFDrNL6nrOMhstm88gHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
          id: "3",
          name: "Japanese Ramen Bowl",
          category: "Noodles",
          description:
            "Rich broth with noodles, meat, and vegetables. Comfort food of Japan. This hearty ramen features a savory broth simmered for hours, tender noodles, slices of meat, and fresh vegetables. Garnished with nori and soft-boiled egg, it's the ultimate warming dish for any season.",
          location: "Japan",
          image:
            "https://img.freepik.com/premium-photo/delicious-japanese-ramen-bowl_1288175-1420.jpg",
        },
        {
          id: "4",
          name: "Butter Chicken",
          category: "Indian",
          description:
            "Tender chicken cooked in a creamy tomato-based gravy with aromatic spices. One of India’s most loved dishes, best enjoyed with naan or rice.",
          location: "Delhi, India",
          image:
            "https://tse3.mm.bing.net/th/id/OIP.oI_xfArqjxbr9sJXU3q73QHaJl?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
          id: "5",
          name: "Paneer Tikka",
          category: "Indian",
          description:
            "Chunks of paneer marinated in spices and grilled to perfection. Smoky, spicy, and incredibly satisfying as a starter or main.",
          location: "Punjab, India",
          image:
            "https://sharethespice.com/wp-content/uploads/2024/02/Paneer-Tikka-Featured-720x720.jpg",
        },
        {
          id: "6",
          name: "Sushi Platter",
          category: "Seafood",
          description:
            "A beautiful assortment of fresh sushi rolls and nigiri. Delicate flavors, fresh seafood, and precise craftsmanship from Japan.",
          location: "Tokyo, Japan",
          image:
            "https://img.freepik.com/premium-photo/sushi-platter-hd-8k-wallpaper-stock-photographic-image_915071-32470.jpg?w=2000",
        },
      ];

      const fallback = mockFoods.find((f) => f.id === String(id));
      setFood(fallback || null);
      setLoadingFood(false);
    };

    fetchFood();
  }, [id]);

  // 🔹 AI Button Logic
  const getAIRecommendations = async () => {
    if (!food) return;

    setLoadingAI(true);

    const res = await fetch("/api/ai/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: food.name,
        description: food.description,
      }),
    });

    const data = await res.json();
    setAiResult(data.recommendations);
    setLoadingAI(false);
  };

  if (loadingFood) return <p className="p-10">Loading food data 🍽️</p>;
  if (!food) return <p className="p-10 text-red-500">Food not found 🍽️</p>;

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero image */}
      <div className="relative h-[80vh] w-full">
        <img
          src={food.image}
          alt={food.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <h1 className="text-5xl font-bold">{food.name}</h1>
          <p className="mt-2 text-xl">
            {food.category} • {food.location}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          {food.description}
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
