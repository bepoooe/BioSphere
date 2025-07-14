"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import endent from "endent";
import { getRagStore } from "./SimpleRAGStore";
import { z } from "zod";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

const ragSystemPrompt = endent`
You are an expert social media bio generator with access to a comprehensive knowledge base about effective bio writing, social media best practices, and platform-specific requirements.

Core Instructions:
1. First, analyze any provided knowledge context for relevance to the user's bio generation request
2. Use the knowledge context to enhance and inform your response when relevant
3. Generate bios that are comprehensive, well-structured, and engaging
4. Follow the exact format requested (JSON with bio array)
5. Ensure content is platform-appropriate and optimized for the intended use
6. Make content actionable, valuable, and informative
7. Use proper formatting and structure as requested
8. Include relevant keywords and platform-specific elements when appropriate

Knowledge Integration Guidelines:
- When relevant knowledge context is provided, incorporate it naturally into your bio generation
- Reference specific information from the knowledge base when appropriate for bio best practices
- If the knowledge context doesn't match the user's request, focus on generating original content
- Combine your general knowledge with the specific context provided
- Ensure the final bios flow naturally and don't feel disconnected

Bio Generation Guidelines:

Platform-Specific Requirements:

Twitter/X:
- Keep bio length between 120-160 characters
- Use concise, punchy language
- Can include relevant emojis if requested
- No hashtags
- Focus on who you are, what you do, and what followers can expect

Instagram:
- Keep bio length between 100-150 characters
- More visual and lifestyle-focused
- Can be more casual and creative
- Include line breaks for readability if needed
- Can include relevant emojis if requested
- Focus on personality and visual appeal

LinkedIn:
- Keep bio length between 160-220 characters
- Professional tone regardless of selected tone
- Focus on expertise, achievements, and value proposition
- Industry-relevant keywords
- More formal language structure
- Highlight professional accomplishments

General Requirements:
- Do not include hashtags or any words starting with #
- Highlight the most important information about the user
- Avoid using too many buzzwords or overdoing humor
- Provide at least four different bio options
- If 'Add Emojis' is true, include relevant emojis; if false, do not include any emojis
- Maintain clarity and coherence in each bio
- Adapt writing style to the selected platform

Content Enhancement from Knowledge Base:
- Use insights from the knowledge base to create more effective bios
- Apply best practices mentioned in the context
- Incorporate proven strategies for the specific platform
- Reference successful bio patterns when relevant
- Enhance credibility with knowledge-backed approaches

Quality Standards:
- Generate content that is original, creative, and valuable
- Ensure accuracy and platform compliance
- Maintain consistency in tone and style throughout
- Create bios that require minimal editing
- Focus on providing practical value to the user
- Use knowledge base information to enhance effectiveness

Response Format:
- Provide direct, ready-to-use bios in JSON format
- No meta-commentary or explanations unless specifically requested
- Follow the exact structure requested
- Ensure content flows naturally and is engaging
- When using knowledge base information, integrate it seamlessly

Remember: Your goal is to create bios that users can immediately use with confidence, enhanced by the specific knowledge and insights from the provided context.
`;

export async function generateRAGBio(
  input: string,
  temperature: number = 0.7,
  model: string = "llama3-70b-8192",
  platform: string,
  enableRAG: boolean = true
) {
  "use server";

  try {
    let knowledgeContext = "";
    
    if (enableRAG) {
      try {
        const ragStore = await getRagStore();
        // Enhanced query for bio generation
        const ragQuery = `${platform} bio writing best practices social media profile ${input}`;
        knowledgeContext = await ragStore.getKnowledgeContext(ragQuery);
      } catch (error) {
        console.warn("RAG context retrieval failed, proceeding without context:", error);
      }
    }
    
    // Construct the enhanced prompt with knowledge context
    const enhancedPrompt = knowledgeContext 
      ? `${knowledgeContext}\n\nUser Request: ${input}`
      : input;

    const {
      object: data,
      warnings,
      finishReason,
    } = await generateObject({
      model: groq(model),
      system: ragSystemPrompt,
      prompt: enhancedPrompt,
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
      success: true,
      usedRAG: enableRAG && knowledgeContext.length > 0,
      contextLength: knowledgeContext.length,
    };
  } catch (error) {
    console.error("Error generating RAG bio:", error);
    return {
      data: { data: [] },
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      usedRAG: false,
      contextLength: 0,
    };
  }
}

export async function generateRAGBioWithFallback(
  input: string,
  temperature: number = 0.7,
  model: string = "llama3-70b-8192",
  platform: string,
  enableRAG: boolean = true
) {
  "use server";

  try {
    // First try with RAG-enhanced generation
    const result = await generateRAGBio(input, temperature, model, platform, enableRAG);
    
    if (result.success) {
      return result;
    }
    
    // Fallback to regular generation without RAG
    console.log("RAG generation failed, falling back to regular generation");
    const fallbackResult = await generateRAGBio(input, temperature, model, platform, false);
    
    if (fallbackResult.success) {
      return {
        ...fallbackResult,
        fallbackUsed: true,
        fallbackReason: "RAG generation failed",
      };
    }
    
    // If both fail, return error
    return {
      data: { data: [] },
      success: false,
      error: "Both RAG and fallback generation failed",
      usedRAG: false,
      contextLength: 0,
      fallbackUsed: false,
    };
    
  } catch (error) {
    console.error("Error in RAG bio generation with fallback:", error);
    return {
      data: { data: [] },
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      usedRAG: false,
      contextLength: 0,
      fallbackUsed: false,
    };
  }
}

// Function to get RAG store statistics
export async function getRAGStats() {
  "use server";
  
  try {
    const ragStore = await getRagStore();
    return ragStore.getStats();
  } catch (error) {
    console.error("Error getting RAG stats:", error);
    return {
      totalChunks: 0,
      indexInitialized: false,
      config: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Function to add knowledge to RAG store
export async function addKnowledgeToRAG(documents: Array<{
  content: string;
  metadata: {
    source: string;
    type: 'document' | 'faq' | 'guideline' | 'example' | 'reference';
    title?: string;
    tags?: string[];
  };
}>) {
  "use server";
  
  try {
    const ragStore = await getRagStore();
    return await ragStore.addDocuments(documents);
  } catch (error) {
    console.error("Error adding knowledge to RAG:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      addedChunks: 0,
    };
  }
}
