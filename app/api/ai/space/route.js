export async function POST() {
  try {
    console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: "Give 3 futuristic space travel ideas" }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API failed:", data);
      return new Response(JSON.stringify(data), { status: 500 });
    }

    return new Response(
      JSON.stringify({
        recommendations:
          data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("CRASH:", err);
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
