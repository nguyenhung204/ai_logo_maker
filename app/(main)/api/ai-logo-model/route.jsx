import { AILogoPrompt } from "@/config/AiModel";
import { db } from "@/config/FirebaseConfig";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt,email, title, desc, userCredits } = await req.json();

  try {
    // 🧠 Gọi Gemini tạo prompt
    const result = await AILogoPrompt.sendMessage(prompt);
    const data = JSON.parse(result.response.text());

    // 👇 Encode form params
    const encodedParams = new URLSearchParams();
    encodedParams.set("prompt", data.prompt);
    encodedParams.set("width", "1024");
    encodedParams.set("height", "1024");
    encodedParams.set("seed", "918440");
    encodedParams.set("model", "flux");

    // 👇 Gọi API và nhận về ảnh dạng binary
    const response = await axios.request({
      method: "POST",
      url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host":
          "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: encodedParams,
      responseType: "arraybuffer",
    });


    const buffer = Buffer.from(response.data, "binary");
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
    try{
        await setDoc(doc(db, "users", email, "logos", Date.now().toString()),{
          image:base64Image,
          title:title,
          desc:desc
        })
    }catch(e){
        console.log(e)
    }

    const docRef = doc(db, "users", email)
    await updateDoc(docRef, {
      credits : Number(userCredits) - 1
    })
    return NextResponse.json({ image: base64Image });
  } catch (e) {
    console.error("Error generating image:", e);
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

//     console.log(data.prompt);

//     const options = {
//       method: "POST",
//       url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php",
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//         "x-rapidapi-host":
//           "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
//         "Content-Type": "application/json",
//       },
//       data: {
//         prompt: data.prompt,
//         style_id: 2,
//         size: "1-1",
//       },
//     };

//     const response = await axios.request(options);

//     console.log(response);

//     const imageList =
//       response.data?.final_result?.map((item) => item.origin) || [];

//     return NextResponse.json({ images: imageList });
//   } catch (e) {
//     console.error("Error:", e);
//     return NextResponse.json(
//       { error: e.message ?? "Unexpected error" },
//       { status: 500 }
//     );
//   }
// }

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
