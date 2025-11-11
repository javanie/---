
import { GoogleGenAI } from "@google/genai";
import type { ProductDetails } from '../types';

const buildPrompt = (details: ProductDetails): string => {
  return `
    你是一位顶级的短视频营销专家和爆款文案写手，尤其擅长为产品创作具有病毒式传播潜力的口播稿。

    请根据以下产品信息，设计一个15-30秒的短视频爆款口播文案。

    产品信息:
    - 产品名称: ${details.productName}
    - 目标用户: ${details.targetAudience}
    - 核心卖点 (每点请用一句话概括): ${details.keyFeatures}
    - 独特优势: ${details.uniqueSellingProposition}

    文案要求:
    1.  **黄金3秒**: 开头必须极具吸引力，用一个痛点问题或颠覆性的观点瞬间抓住用户注意力。
    2.  **节奏紧凑**: 整体节奏要快，语言要口语化、有冲击力和感染力。
    3.  **价值清晰**: 快速展示产品的核心价值，清晰地告诉用户它能解决什么具体问题或带来什么好处。
    4.  **引导互动**: 最重要的目标是引导用户在评论区留言以获取报价。
    5.  **强力CTA**: 结尾必须包含一个明确、不容置疑的行动号召 (Call to Action)，例如：“想知道怎么把它带回家？评论区打个‘报价’，我一个一个告诉你！” 或 “想要同款的，评论区扣‘666’，我把价格私信你！”
    
    请直接输出最终的口播文案，不需要任何标题、解释或前言。
  `;
};

export const generateViralScript = async (details: ProductDetails): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  if (!details.productName || !details.targetAudience || !details.keyFeatures) {
    throw new Error("产品名称、目标用户和核心卖点是必填项。");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = buildPrompt(details);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("AI 生成失败，请检查您的网络连接或 API 密钥。");
  }
};
