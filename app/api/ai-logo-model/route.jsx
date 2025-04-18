import { AILogoPrompt } from "@/config/AiModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await AILogoPrompt.sendMessage(prompt);
    const data = JSON.parse(result.response.text());

    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host":
          "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        prompt: data.prompt,
        style_id: 2,
        size: "1-1",
      },
    };

    const response = await axios.request(options);

    const imageList =
      response.data?.final_result?.map((item) => item.origin) || [];

    return NextResponse.json({ images: imageList });
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json(
      { error: e.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}

// export async function POST(req) {
//   const { prompt } = await req.json();

//   try {
//     const result = await AILogoPrompt.sendMessage(prompt);
//     const data = JSON.parse(result.response.text());

//     const response = await axios.post(
//       "https://router.huggingface.co/fal-ai/fal-ai/hidream-i1-full",
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     if (response.status !== 200) {
//       console.log("Test");
//     }

//     const buffer = Buffer.from(response.data, "binary");
//     const base64Image = `data:image/png:base64,${buffer.toString("base64")}`;
//     console.log(base64Image);

//     return NextResponse.json({ image: base64Image });
//   } catch (e) {
//     return NextResponse.json({ error: e });
//   }
// }
