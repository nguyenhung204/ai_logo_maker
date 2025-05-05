import { AIDesignIdea } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // Hàm làm sạch đầu vào để đảm bảo không có ký tự đặc biệt gây lỗi
    const sanitizeInput = (input) => {
      if (!input) return "";
      // Thay thế các ký tự đặc biệt có thể gây vấn đề
      return input.replace(/[\/\\%]/g, "-");
    };
    
    // Áp dụng làm sạch cho dữ liệu đầu vào
    const sanitizedPrompt = sanitizeInput(prompt);

    const result = await AIDesignIdea.sendMessage(sanitizedPrompt);
    return NextResponse.json(JSON.parse(result.response.text()));
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
