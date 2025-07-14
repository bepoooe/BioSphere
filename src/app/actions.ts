"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import endent from "endent";
import { generateRAGBioWithFallback } from "@/lib/rag/RAGEnhancedAI";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

const systemPrompt = endent`
You are an AI assistant tasked with generating social media bios based on user input for different platforms.

Instructions:

Analyze the User's Inputs:
  - Carefully review the provided platform, tone, and bio type.
  - Understand the user's core focus and primary activities.
  - Consider platform-specific requirements and best practices.

Generate the Bio:

  - Create a bio that succinctly answers:
    - Who is the user?
    - What does the user do?
    - What can others expect from the user?
  - Reflect the given 'Bio Tone' and 'Bio Type' in the style and language of the bio. Do not explicitly mention the tone or type.

Platform-Specific Requirements:

Twitter/X:
  - Keep bio length between 120-160 characters
  - Use concise, punchy language
  - Can include relevant emojis if requested
  - No hashtags

Instagram:
  - Keep bio length between 100-150 characters
  - More visual and lifestyle-focused
  - Can be more casual and creative
  - Include line breaks for readability if needed
  - Can include relevant emojis if requested

LinkedIn:
  - Keep bio length between 160-220 characters
  - Professional tone regardless of selected tone
  - Focus on expertise, achievements, and value proposition
  - Industry-relevant keywords
  - More formal language structure

General Requirements:
  - Do not include hashtags or any words starting with #
  - Highlight the most important information about the user
  - Avoid using too many buzzwords or overdoing humor
  - Provide at least four different bio options
  - If 'Add Emojis' is true, include relevant emojis; if false, do not include any emojis
  - The response must be in JSON format

Additional Guidelines:
  - Maintain clarity and coherence in each bio
  - Adapt writing style to the selected platform
  - Provide response in JSON format only

Do not include any description, do not include the \`\`\`.
  Code (no \`\`\`):
  `;

export async function generateBio(
  input: string,
  temperature: number,
  model: string,
  platform: string,
  useRAG: boolean = true
) {
  "use server";

  try {
    // Try RAG-enhanced generation first
    if (useRAG) {
      const ragResult = await generateRAGBioWithFallback(
        input,
        temperature,
        model,
        platform,
        true
      );
      
      if (ragResult.success) {
        return { 
          data: ragResult.data, 
          metadata: {
            usedRAG: ragResult.usedRAG,
            contextLength: ragResult.contextLength,
            fallbackUsed: (ragResult as any).fallbackUsed || false,
          }
        };
      }
    }

    // Fallback to original generation method
    const {
      object: data,
      warnings,
      finishReason,
      rawResponse,
    } = await generateObject({
      model: groq(model),
      system: systemPrompt,
      prompt: input,
      temperature: temperature,
      maxTokens: 1024,
      schema: z.object({
        data: z.array(
          z.object({
            bio: z.string().describe("Add generated bio here!"),
          })
        ),
      }),
    });

    return { 
      data, 
      metadata: {
        usedRAG: false,
        contextLength: 0,
        fallbackUsed: true,
      }
    };
  } catch (error) {
    console.error("Error in bio generation:", error);
    
    // Final fallback to original method
    const {
      object: data,
    } = await generateObject({
      model: groq(model),
      system: systemPrompt,
      prompt: input,
      temperature: temperature,
      maxTokens: 1024,
      schema: z.object({
        data: z.array(
          z.object({
            bio: z.string().describe("Add generated bio here!"),
          })
        ),
      }),
    });

    return { 
      data, 
      metadata: {
        usedRAG: false,
        contextLength: 0,
        fallbackUsed: true,
      }
    };
  }
}
