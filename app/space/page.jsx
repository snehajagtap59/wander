import SpaceCard from "@/components/SpaceCard";
import { createClient } from "@/lib/supabase/server";

export default async function SpacePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("space")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return (
      <p className="p-10 text-red-500">
        Failed to load space worlds ❌
      </p>
    );
  }

  // ✅ FALLBACK DATA (used ONLY if DB is empty)
  const fallbackSpace = [
    {
      id: 1,
      name: "Mars Colony",
      location: "Mars",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.3eaIQI92vy-4EyJpXUEsLAHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      name: "Saturn Rings Station",
      location: "Saturn Orbit",
      image:
        "https://static.vecteezy.com/system/resources/previews/053/400/983/large_2x/a-breathtaking-close-up-reveals-the-intricate-structure-of-saturn-s-rings-showcasing-their-shimmering-particles-and-stunning-colors-against-a-starry-backdrop-photo.jpg",
    },
    {
      id: 3,
      name: "Moon Research Base",
      location: "Moon",
      image:
        "https://img.freepik.com/premium-photo/breathtaking-image-lunar-base-with-futuristic-architecturehighly-detailedsituated-ruggedotherworldly-surface-moon-domed-habitatsresearch-facilities_924727-36930.jpg",
    },
    {
      id: 4,
      name: "Black Hole Observatory",
      location: "Unknown Galaxy",
      image:
        "https://i.pinimg.com/originals/9a/96/5f/9a965fda08a6bdd7b520816e05ca2ceb.jpg",
    },
    {
      id: 5,
      name: "Interstellar Travel Hub",
      location: "Milky Way Gateway",
      image:
        "https://img.freepik.com/premium-photo/interstellar-travel-hub-with-portals-distant-ga_1022456-36326.jpg",
    },
    {
      id: 6,
      name: "Alien Civilization Planet",
      location: "Andromeda Galaxy",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.Ng-Brma8tynqjKcfoUrJMgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  const space =
    Array.isArray(data) && data.length > 0 ? data : fallbackSpace;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa')",
      }}
    >
      <div className="min-h-screen bg-black/70 px-6 py-10">
        <div className="mx-auto mb-10 max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-white">
            Explore Space Worlds 🚀
          </h1>
          <p className="mt-3 text-zinc-300">
            Discover alien planets and cosmic mysteries.
          </p>
        </div>

        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {space.map((s) => (
            <SpaceCard key={s.id} space={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
