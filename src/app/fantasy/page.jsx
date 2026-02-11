import FantasyCard from "@/components/FantasyCard";
import { createClient } from "@/app/lib/supabase/server";

export default async function FantasyPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("fantasy")
    .select("*")
    .order("created_at", { ascending: false });

  const fallbackFantasy = [
    {
      id: 1,
      name: "Enchanted Forest",
      category: "Magical World",
      location: "Unknown Realm",
      description:
        "A mystical forest filled with glowing trees and magical creatures.",
      image:
        "https://static.vecteezy.com/system/resources/previews/022/896/126/large_2x/a-fantasy-world-in-alien-landscape-surreal-ultra-detailed-stunning-colorful-digital-art-creative-generative-ai-photo.jpeg",
    },
    {
      id: 2,
      name: "Dragon Mountain",
      category: "Mythical Land",
      location: "Volcanic Kingdom",
      description: "A giant mountain ruled by ancient fire dragons.",
      image:
        "https://img.freepik.com/premium-photo/lost-kingdom-volcanic-wasteland-protected-by-lava-flows_1308549-65678.jpg",
    },
    {
      id: 3,
      name: "Crystal Kingdom",
      category: "Royal Fantasy",
      location: "Northern Realms",
      description:
        "A shining crystal kingdom powered by magical energy.",
      image:
        "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/08670143-4596-4002-bb5f-2a485774a570/e9107de2-b104-4e83-88d1-133dd27cab6a.png",
    },
    {
      id: 4,
      name: "Sky Floating Islands",
      category: "Adventure Fantasy",
      location: "Celestial Sky",
      description: "Floating islands connected by magical bridges.",
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20240513/pngtree-a-stunning-photograph-of-the-celestial-sky-image_15734556.jpg",
    },
    {
      id: 5,
      name: "Underwater Atlantis",
      category: "Ocean Fantasy",
      location: "Deep Ocean",
      description:
        "A lost underwater civilization filled with ancient secrets.",
      image: "https://wallpaperaccess.com/full/1124175.jpg",
    },
    {
      id: 6,
      name: "Shadow Realm",
      category: "Dark Fantasy",
      location: "Forbidden Dimension",
      description: "A mysterious realm ruled by shadow magic.",
      image:
        "https://th.bing.com/th/id/R.ee8efd1675b5a9515c85b7c5bd01df97",
    },
  ];

  const fantasy =
    Array.isArray(data) && data.length > 0 ? data : fallbackFantasy;

  if (error) {
    return (
      <p className="p-10 text-red-500">
        Failed to load fantasy worlds ❌
      </p>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-10 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      {/* Header */}
      <div className="mx-auto mb-10 max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-white">
          Explore Fantasy Worlds 🧙‍♂️
        </h1>
        <p className="mt-3 text-zinc-300">
          Travel through magical lands, mythical kingdoms, and hidden realms.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {fantasy.map((f) => (
          <FantasyCard key={f.id} fantasy={f} />
        ))}
      </div>
    </div>
  );
}
