"use client";

import { useRouter } from "next/navigation";

export default function StartExploringButton() {
  const router = useRouter();

  const handleClick = () => {
    const routes = ["/food", "/places", "/fantasy", "/space"];
    const randomRoute =
      routes[Math.floor(Math.random() * routes.length)];

    router.push(randomRoute);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-black px-6 py-3 text-white"
    >
      Start Exploring
    </button>
  );
}
