import PlaceCard from "@/components/PlaceCard";
import { createClient } from "@/lib/supabase/server";

export default async function ExplorePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("places")
    .select("*")
    .order("name");

  const fallbackPlaces = [
    {
      id: "1",
      name: "Mumbai",
      country: "India",
      card_image: "https://wallpaperaccess.com/full/1616141.jpg",
      cover_image:
        "https://lp-cms-production.imgix.net/2019-06/ab5c55eb6f981026230a95dfb052a51d-taj-mahal-palace-mumbai.jpg?auto=format&q=40&ar=16:9&fit=crop&crop=center&fm=auto&w=5500",
    },
    {
      id: "2",
      name: "Goa",
      country: "India",
      card_image:
        "https://media.istockphoto.com/id/1368909948/photo/canacona-goa-india-canoe-kayak-for-rent-parked-on-famous-palolem-beach-on-background-tall.jpg?b=1&s=170667a&w=0&k=20&c=GOsdloJnf-fcrr-A_Ajsj5KCa2bsnIGOkhDN_nucQsI=",
      cover_image: "https://wallpaperaccess.com/full/3068233.jpg",
    },
    {
      id: "3",
      name: "Paris",
      country: "France",
      card_image: "https://wallpaperaccess.com/full/296480.jpg",
      cover_image: "https://tse4.mm.bing.net/th/id/OIP.JIM-FgEHOnaiuBZ29MYs-AHaF9?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: "4",
      name: "Tokyo",
      country: "Japan",
      card_image: "https://images3.alphacoders.com/831/thumb-1920-831673.jpg",
      cover_image: "https://wallpapercave.com/wp/wp8438159.jpg",
    },
    {
      id: "5",
      name: "New York",
      country: "USA",
      card_image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee",
      cover_image:
        "https://lp-cms-production.imgix.net/2020-11/shutterstockRF_259501811.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=35&dpr=3",
    },
    {
      id: "6",
      name: "Switzerland",
      country: "Europe",
      card_image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      cover_image: "https://wallpaperaccess.com/full/1094103.jpg",
    },
  ];

  const places =
    Array.isArray(data) && data.length > 0 ? data : fallbackPlaces;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      <div className="min-h-screen bg-black/60 px-6 py-10">
        <div className="mx-auto mb-10 max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-white">Explore Places 🌍</h1>
          <p className="mt-3 text-zinc-300">
            Discover beautiful destinations around the world.
          </p>
        </div>

        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={{...place, image: place.card_image}} />
          ))}
        </div>
      </div>
    </div>
  );
}
