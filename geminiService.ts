
import { GoogleGenAI } from "@google/genai";

export const getBusinessInsight = async (salesData: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "نظام التحليل الذكي جاهز. (يرجى ربط API Key للتحليلات المتقدمة)";
  
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `أنت خبير مبيعات لمحل مفاتيح. حلل البيانات التالية وقدم نصيحة واحدة مختصرة جداً وباللغة العربية: ${salesData}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "نصيحة: ركز على صيانة ماكينات قص المفاتيح لضمان دقة العمل.";
  }
};
