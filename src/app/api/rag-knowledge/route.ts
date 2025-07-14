import { NextRequest, NextResponse } from 'next/server';
import { getRagStore } from '@/lib/rag/SimpleRAGStore';
import { addKnowledgeToRAG, getRAGStats } from '@/lib/rag/RAGEnhancedAI';

// GET: Get RAG statistics
export async function GET(request: NextRequest) {
  try {
    const stats = await getRAGStats();
    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error getting RAG stats:', error);
    return NextResponse.json(
      { error: 'Failed to get RAG statistics' },
      { status: 500 }
    );
  }
}

// POST: Add knowledge to RAG store
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documents, action } = body;

    if (action === 'add') {
      if (!documents || !Array.isArray(documents)) {
        return NextResponse.json(
          { error: 'Documents array is required' },
          { status: 400 }
        );
      }

      // Validate document structure
      for (const doc of documents) {
        if (!doc.content || !doc.metadata || !doc.metadata.source || !doc.metadata.type) {
          return NextResponse.json(
            { error: 'Each document must have content and metadata with source and type' },
            { status: 400 }
          );
        }
      }

      const result = await addKnowledgeToRAG(documents);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Failed to add knowledge' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Successfully added ${result.addedChunks} chunks to the knowledge base`,
        addedChunks: result.addedChunks
      });
    }

    if (action === 'clear') {
      const ragStore = await getRagStore();
      const result = await ragStore.clearAll();
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Failed to clear knowledge base' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Knowledge base cleared successfully'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "add" or "clear"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error managing RAG knowledge:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE: Remove specific chunks
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chunkId = searchParams.get('chunkId');

    if (!chunkId) {
      return NextResponse.json(
        { error: 'Chunk ID is required' },
        { status: 400 }
      );
    }

    const ragStore = await getRagStore();
    const result = await ragStore.deleteChunk(chunkId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to delete chunk' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.deleted ? 'Chunk deleted successfully' : 'Chunk not found',
      deleted: result.deleted
    });

  } catch (error) {
    console.error('Error deleting RAG chunk:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
