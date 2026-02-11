import FoodCard from "@/components/FoodCard";
import { createClient } from "@/app/lib/supabase/server";

export default async function FoodPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .order("created_at", { ascending: false });

  const fallbackFoods = [
    {
      id: 1,
      name: "Street Vada Pav",
      category: "Street Food",
      city: "Mumbai",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.7kjs1isZXZ2qF6E-3SGMcQHaD4?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      category: "Pizza",
      city: "Italy",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
    },
    {
      id: 3,
      name: "Spicy Ramen Bowl",
      category: "Noodles",
      city: "Japan",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    },
    {
      id: 4,
      name: "Butter Chicken",
      category: "Indian",
      city: "Delhi",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    },
    {
      id: 5,
      name: "Paneer Tikka",
      category: "Indian",
      city: "Punjab",
      image: "https://images.unsplash.com/photo-1628294896516-344152572ee8",
    },
    {
      id: 6,
      name: "Sushi Platter",
      category: "Seafood",
      city: "Tokyo",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    },
  ];

  const foods =
    Array.isArray(data) && data.length > 0 ? data : fallbackFoods;

  if (error) {
    return (
      <p className="p-10 text-red-500">
        Failed to load foods ❌
      </p>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-10 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1499028344343-cd173ffc68a9')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      {/* Header */}
      <div className="mx-auto mb-10 max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-white">
          Explore Foods 🍽️
        </h1>
        <p className="mt-3 text-zinc-300">
          Taste iconic dishes from around the world.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}
