import { GoogleGenAI } from "npm:@google/genai@0.7.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are an AI Study Companion — a knowledgeable, patient academic tutor for college students.

Your role:
- Answer questions clearly and concisely using a friendly, encouraging tone.
- Break down complex topics into digestible explanations.
- Use formatting (headings, bullet points, bold text) when it improves clarity.
- If a question is ambiguous, ask for clarification.
- If you don't know the answer, say so honestly rather than guessing.

Important limitations:
- You do NOT have access to any uploaded documents yet. Document-based answers and source citations are not implemented.
- Never fabricate citations, page numbers, or references to specific documents.
- If the user asks about a specific document or requests citations, explain that document integration is coming soon.

Keep responses focused and educational. Aim for clarity over brevity when explaining concepts.`;

interface Message {
  role: "user" | "tutor";
  content: string;
}

interface TutorRequest {
  question: string;
  history?: Message[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const url = new URL(req.url);

  // Health check endpoint
  if (req.method === "GET" && url.pathname.endsWith("/health")) {
    const hasKey = !!Deno.env.get("GEMINI_API_KEY");
    return new Response(
      JSON.stringify({
        status: "ok",
        service: "ai-tutor",
        gemini_configured: hasKey,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Gemini API key is not configured on the server." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: TutorRequest = await req.json();

    // Input validation
    if (!body.question || typeof body.question !== "string" || body.question.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "A non-empty 'question' field is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.question.length > 4000) {
      return new Response(
        JSON.stringify({ error: "Question is too long. Please limit to 4000 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build conversation contents from history
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

    for (const msg of history) {
      if (msg.role === "user") {
        contents.push({ role: "user", parts: [{ text: msg.content }] });
      } else if (msg.role === "tutor") {
        contents.push({ role: "model", parts: [{ text: msg.content }] });
      }
    }

    // Add the current question
    contents.push({ role: "user", parts: [{ text: body.question }] });

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const answer = response.text;

    if (!answer) {
      return new Response(
        JSON.stringify({ error: "The AI model returned an empty response. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        answer,
        citations: [],
        note: "Document-based answers and source citations are not yet implemented.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
