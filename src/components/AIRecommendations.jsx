"use client";

import { useState } from "react";

export default function AIRecommendations({ space }) {
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getAIRecommendations = async () => {
    setLoading(true);

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
    setLoading(false);
  };

  return (
    <div className="mt-8">
      <button
        onClick={getAIRecommendations}
        className="rounded-full bg-purple-600 px-6 py-3 text-white"
      >
        {loading ? "Thinking..." : "✨ Get AI Recommendations"}
      </button>

      {aiResult && (
        <div className="mt-4 rounded-lg bg-white/10 p-4 whitespace-pre-line">
          {aiResult}
        </div>
      )}
    </div>
  );
}
