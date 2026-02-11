export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description } = body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Give 3 unique fantasy story or world ideas based on ${name}: ${description}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data.error?.message || "Unknown error" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        recommendations:
          data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response",
      }),
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
