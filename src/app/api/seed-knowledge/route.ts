import { NextRequest, NextResponse } from 'next/server';
import { seedKnowledgeBase } from '@/lib/rag/seedKnowledgeBase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'seed') {
      const result = await seedKnowledgeBase();
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Failed to seed knowledge base' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Successfully seeded knowledge base with ${result.addedChunks} chunks`,
        addedChunks: result.addedChunks
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "seed"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error seeding knowledge base:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
