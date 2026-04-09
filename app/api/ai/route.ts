import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userPrompt } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 150,
      temperature: 0.8,
    }); 

    const text =
      completion.choices[0]?.message?.content || "Something glitched.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { text: "Something glitched. Try again." },
      { status: 500 }
    );
  }
}