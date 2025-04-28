// app/api/gen-prompt/route.js

import { AILogoPrompt } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const result = await AILogoPrompt.sendMessage(prompt);
    const data = JSON.parse(result.response.text());

    return NextResponse.json({ prompt: data.prompt });
  } catch (e) {
    console.error("Error generating prompt:", e);
    return NextResponse.json(
      { error: e.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
