// app/api/gen-image/route.js

import axios from "axios";
import { db } from "@/config/FirebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, email, title, desc, userCredits } = await req.json();

    if (!userCredits || userCredits <= 0) {
      return NextResponse.json(
        { error: "Bạn không có đủ credits để tạo logo" },
        { status: 400 }
      );
    }

    const encodedParams = new URLSearchParams();
    encodedParams.set("prompt", prompt);
    encodedParams.set("width", "1024");
    encodedParams.set("height", "1024");
    encodedParams.set("seed", "918440");
    encodedParams.set("model", "flux");

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
      timeout: 8000, // ép timeout nếu RapidAPI lâu
    });

    const buffer = Buffer.from(response.data, "binary");
    const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;

    // Lưu vào Firestore
    await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
      image: base64Image,
      title,
      desc,
    });

    // Update credits
    const docRef = doc(db, "users", email);
    const newCredits = Number(userCredits) - 1;
    await updateDoc(docRef, { credits: newCredits });

    return NextResponse.json({ image: base64Image });
  } catch (e) {
    console.error("Error generating image:", e);
    return NextResponse.json(
      { error: e.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
