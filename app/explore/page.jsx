import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ExplorePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
      }}
    >
      {/* Dark overlay */}
      <div className="min-h-screen bg-black/70 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">
            What do you want to explore?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExploreCard
              href="/food"z
              title="Food"
              emoji="🍜"
              description="Street food & flavours"
            />
            <ExploreCard
              href="/places"
              title="Places"
              emoji="🌍"
              description="Cities & landscapes"
            />
            <ExploreCard
              href="/fantasy"
              title="Fantasy"
              emoji="🧙‍♂️"
              description="Dream worlds"
            />
            <ExploreCard
              href="/space"
              title="Space"
              emoji="🪐"
              description="Cosmic exploration"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function ExploreCard({ href, title, emoji, description }) {
  return (
    <Link href={href}>
      <Card className="cursor-pointer transition hover:scale-105 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <CardHeader className="text-center gap-3">
          <div className="text-4xl">{emoji}</div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
