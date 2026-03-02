import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { emailContent } = req.body;

  const prompt = `
  Analyze this email and respond in JSON:

  {
    "category": "",
    "summary": "",
    "actionRequired": "",
    "deadline": "",
    "suggestedReply": ""
  }

  Email:
  ${emailContent}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  res.status(200).json({
    analysis: response.text(),
  });
}