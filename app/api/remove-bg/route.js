import { NextResponse } from "next/server";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("image");

  const removeBgRes = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.API_REMOVE_BG_KEY,
    },
    body: (() => {
      const formData = new FormData();
      formData.append("image_file", file);
      formData.append("size", "auto");
      return formData;
    })(),
  });

  if (!removeBgRes.ok) {
    const errText = await removeBgRes.text();
    return NextResponse.json({ error: errText }, { status: 500 });
  }

  const blob = await removeBgRes.blob();
  return new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
}
