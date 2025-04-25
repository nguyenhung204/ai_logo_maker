import { AILogoPrompt } from "@/config/AiModel";
import { db } from "@/config/FirebaseConfig";
import axios from "axios";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, email, title, desc, userCredits } = await req.json();

  try {
    // Kiểm tra credits trước khi tạo logo
    if (!userCredits || userCredits <= 0) {
      return NextResponse.json(
        { error: "Bạn không có đủ credits để tạo logo" },
        { status: 400 }
      );
    }

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
    try {
      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: base64Image,
        title: title,
        desc: desc,
      });
    } catch (e) {
      console.log(e);
    }

    const newCredits = Number(userCredits) - 1;
    const docRef = doc(db, "users", email);
    await updateDoc(docRef, {
      credits: newCredits,
    });

    const userDoc = await getDoc(docRef);
    const updatedUserDetails = userDoc.data();

    return NextResponse.json({
      image: base64Image,
      updatedUserDetails: updatedUserDetails
    });
  } catch (e) {
    console.error("Error generating image:", e);
    return NextResponse.json(
      { error: e.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
