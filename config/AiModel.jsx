import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian Spice with decription: Indian Restaurant and refering to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "logo_prompts": [\n    {\n      "id": 1,\n      "prompt": "Spiced Elephant Chef Mascot Logo"\n    },\n    {\n      "id": 2,\n      "prompt": "Friendly Curry Tiger Restaurant Logo"\n    },\n    {\n      "id": 3,\n      "prompt": "Smiling Naan Bread Character Logo"\n    },\n    {\n      "id": 4,\n      "prompt": "Happy Samosa Mascot Indian Logo"\n    },\n    {\n      "id": 5,\n      "prompt": "Waving Turban Man Spice Logo"\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a text prompt to create Logo for Logo Title/Brand name : University of Industrial  HCM city with description: logo for university, have a machine, with Color combination of Sunset Warmth, also include the Bold Industrial Cog Icon and include Modern Sharp Lined Logos design idea and Referring to this Logo Prompt: Design a creative and artistic logo with a retro-modern vibe that showcases the brand's identity. Use bold outlines, intricate patterns, and vibrant, contrasting colors to make the design pop. Incorporate thematic elements like food, nature, technology, or lifestyle symbols depending on the brand's niche. The typography should be playful yet clear, complementing the overall composition with a dynamic and balanced layout. Ensure the logo feels unique, versatile, and eye-catching Give me result in JSON portal with prompt field only\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "prompt": "Design a logo for \'University of Industrial HCM city\'. The logo should represent a university specializing in industrial fields.  Include a machine element (e.g., gears, pistons, robotic arm stylized).  Use a color palette of Sunset Warmth (shades of orange, red, and yellow). Incorporate a Bold Industrial Cog Icon. The overall design should lean towards a Modern Sharp Lined Logo style with a retro-modern vibe. The typography should be clear and modern, complementing the industrial theme. The logo should feel unique, versatile, and eye-catching, suitable for various applications (website, merchandise, etc.). Consider a layout that balances the machine element, cog, text, and the overall color scheme for a dynamic and balanced composition. Think about incorporating intricate patterns or stylized lines to enhance the visual appeal and create a memorable brand identity."\n}\n```\n',
        },
      ],
    },
  ],
});
