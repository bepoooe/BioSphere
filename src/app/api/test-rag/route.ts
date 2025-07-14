import { NextRequest, NextResponse } from 'next/server';
import { getRagStore } from '@/lib/rag/SimpleRAGStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'twitter bio best practices';
    
    // Test RAG retrieval
    const ragStore = await getRagStore();
    const context = await ragStore.getKnowledgeContext(query);
    const stats = ragStore.getStats();
    
    return NextResponse.json({
      success: true,
      query,
      stats,
      contextLength: context.length,
      contextPreview: context.substring(0, 500) + (context.length > 500 ? '...' : ''),
      hasContext: context.length > 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('RAG test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
