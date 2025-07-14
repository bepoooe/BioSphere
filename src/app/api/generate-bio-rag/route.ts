import { NextRequest, NextResponse } from 'next/server';
import { generateRAGBioWithFallback } from '@/lib/rag/RAGEnhancedAI';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, temperature = 0.7, model = "llama3-70b-8192", platform, enableRAG = true } = body;
    
    if (!input || !platform) {
      return NextResponse.json(
        { error: 'Input and platform are required' },
        { status: 400 }
      );
    }

    // Generate bio with RAG enhancement
    const result = await generateRAGBioWithFallback(
      input,
      temperature,
      model,
      platform,
      enableRAG
    );

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.error || 'Failed to generate bio',
          details: {
            usedRAG: result.usedRAG,
            fallbackUsed: (result as any).fallbackUsed || false,
            fallbackReason: (result as any).fallbackReason || null,
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: result.data,
      success: true,
      metadata: {
        usedRAG: result.usedRAG,
        contextLength: result.contextLength,
        fallbackUsed: (result as any).fallbackUsed || false,
        fallbackReason: (result as any).fallbackReason || null,
        model: model,
        platform: platform,
        timestamp: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Error in RAG bio generation API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
