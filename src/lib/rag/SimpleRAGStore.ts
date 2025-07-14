import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

// Types for our RAG system
export interface KnowledgeChunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    type: 'document' | 'faq' | 'guideline' | 'example' | 'reference';
    title?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  embedding?: number[];
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

export interface RAGConfig {
  maxChunks: number;
  similarityThreshold: number;
  chunkSize: number;
  chunkOverlap: number;
  embeddingModel: string;
}

const DEFAULT_RAG_CONFIG: RAGConfig = {
  maxChunks: 5,
  similarityThreshold: 0.05, // Very low threshold for text matching
  chunkSize: 500,
  chunkOverlap: 50,
  embeddingModel: 'text-embedding-3-small',
};

class RAGVectorStore {
  private chunks: KnowledgeChunk[] = [];
  private openai: OpenAI;
  private config: RAGConfig;
  private chunksPath: string;

  constructor(config: Partial<RAGConfig> = {}) {
    this.config = { ...DEFAULT_RAG_CONFIG, ...config };
    this.chunksPath = path.join(process.cwd(), 'data', 'chunks.json');
    
    // Initialize OpenAI for embeddings
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY,
      baseURL: process.env.OPENAI_API_KEY ? undefined : 'https://api.groq.com/openai/v1',
    });
  }

  async initialize() {
    try {
      // Try to load existing chunks
      await this.loadChunks();
      console.log('RAG Vector Store initialized successfully');
    } catch (error) {
      console.error('Error initializing RAG Vector Store:', error);
      throw error;
    }
  }

  async addDocuments(documents: Array<{
    content: string;
    metadata: Omit<KnowledgeChunk['metadata'], 'createdAt' | 'updatedAt'>;
  }>) {
    try {
      const newChunks: KnowledgeChunk[] = [];
      
      for (const doc of documents) {
        // Split document into chunks
        const chunks = await this.splitIntoChunks(doc.content);
        
        for (let i = 0; i < chunks.length; i++) {
          const chunk: KnowledgeChunk = {
            id: `${doc.metadata.source}_${Date.now()}_${i}`,
            content: chunks[i],
            metadata: {
              ...doc.metadata,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          };
          
          // Generate embedding for the chunk
          try {
            const embedding = await this.generateEmbedding(chunk.content);
            chunk.embedding = embedding;
          } catch (error) {
            console.warn('Failed to generate embedding for chunk:', chunk.id, error);
            // Continue without embedding - we'll use text matching as fallback
          }
          
          newChunks.push(chunk);
        }
      }
      
      // Add chunks to our collection
      this.chunks.push(...newChunks);
      
      // Save to disk
      await this.saveChunks();
      
      return { success: true, addedChunks: newChunks.length };
    } catch (error) {
      console.error('Error adding documents to RAG store:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async searchSimilar(query: string, maxResults: number = this.config.maxChunks): Promise<RetrievalResult[]> {
    try {
      if (this.chunks.length === 0) {
        return [];
      }

      // Try to generate embedding for the query
      let queryEmbedding: number[] | null = null;
      try {
        queryEmbedding = await this.generateEmbedding(query);
      } catch (error) {
        console.warn('Failed to generate embedding for query, using text matching:', error);
      }
      
      // Calculate similarity with all chunks
      const similarities: Array<{ chunk: KnowledgeChunk; score: number }> = [];
      
      for (const chunk of this.chunks) {
        let score = 0;
        
        if (queryEmbedding && chunk.embedding) {
          // Use semantic similarity if embeddings are available
          score = this.calculateCosineSimilarity(queryEmbedding, chunk.embedding);
        } else {
          // Fallback to text matching
          score = this.calculateTextSimilarity(query, chunk.content);
        }
        
        if (score >= this.config.similarityThreshold) {
          similarities.push({ chunk, score });
        }
      }
      
      // Sort by similarity and return top results
      similarities.sort((a, b) => b.score - a.score);
      
      return similarities.slice(0, maxResults).map(({ chunk, score }) => ({
        chunk,
        score,
      }));
    } catch (error) {
      console.error('Error searching RAG store:', error);
      return [];
    }
  }

  async getKnowledgeContext(query: string, maxChunks: number = this.config.maxChunks): Promise<string> {
    try {
      const retrievalResults = await this.searchSimilar(query, maxChunks);
      
      if (retrievalResults.length === 0) {
        return '';
      }
      
      // Format the retrieved chunks into a context string
      const contextSections = retrievalResults.map((result, index) => {
        const { chunk, score } = result;
        return `[Context ${index + 1}] (Relevance: ${(score * 100).toFixed(1)}%)
Source: ${chunk.metadata.source}
Type: ${chunk.metadata.type}
${chunk.metadata.title ? `Title: ${chunk.metadata.title}` : ''}
Content: ${chunk.content}
---`;
      });
      
      return `Retrieved Knowledge Context:
${contextSections.join('\n')}

Use this context to enhance your response when relevant. If the context doesn't match the user's query, focus on generating original content.`;
    } catch (error) {
      console.error('Error getting knowledge context:', error);
      return '';
    }
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    // Check if we have OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, skipping embedding generation');
      throw new Error('OpenAI API key not available');
    }
    
    try {
      const response = await this.openai.embeddings.create({
        model: this.config.embeddingModel,
        input: text,
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  private calculateCosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Vectors must have the same length');
    }
    
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }
    
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    
    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }
    
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private calculateTextSimilarity(query: string, content: string): number {
    // Simple text similarity using common words
    const queryWords = query.toLowerCase().split(/\s+/);
    const contentWords = content.toLowerCase().split(/\s+/);
    
    const querySet = new Set(queryWords);
    const contentSet = new Set(contentWords);
    
    // Calculate Jaccard similarity
    let intersectionCount = 0;
    const unionSet = new Set<string>();
    
    // Add all query words to union and count intersections
    queryWords.forEach(word => {
      unionSet.add(word);
      if (contentSet.has(word)) {
        intersectionCount++;
      }
    });
    
    // Add all content words to union
    contentWords.forEach(word => {
      unionSet.add(word);
    });
    
    return intersectionCount / unionSet.size;
  }

  private async splitIntoChunks(text: string): Promise<string[]> {
    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let currentChunk = '';
    
    for (const sentence of sentences) {
      const potentialChunk = currentChunk + sentence + '.';
      
      if (potentialChunk.length > this.config.chunkSize) {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = sentence + '.';
      } else {
        currentChunk = potentialChunk;
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }

  private async saveChunks() {
    try {
      // Ensure data directory exists
      await fs.mkdir(path.dirname(this.chunksPath), { recursive: true });
      
      // Save chunks metadata
      await fs.writeFile(this.chunksPath, JSON.stringify(this.chunks, null, 2));
      
      console.log('RAG chunks saved successfully');
    } catch (error) {
      console.error('Error saving RAG chunks:', error);
      throw error;
    }
  }

  private async loadChunks() {
    try {
      // Try to load existing chunks
      const chunksData = await fs.readFile(this.chunksPath, 'utf-8');
      this.chunks = JSON.parse(chunksData);
      console.log(`Loaded ${this.chunks.length} chunks from disk`);
    } catch (error) {
      console.log('No existing chunks found, starting with empty store');
      this.chunks = [];
    }
  }

  async deleteChunk(chunkId: string) {
    try {
      const initialLength = this.chunks.length;
      this.chunks = this.chunks.filter(chunk => chunk.id !== chunkId);
      
      if (this.chunks.length !== initialLength) {
        await this.saveChunks();
        return { success: true, deleted: true };
      }
      
      return { success: true, deleted: false };
    } catch (error) {
      console.error('Error deleting chunk:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async clearAll() {
    try {
      this.chunks = [];
      
      // Remove file
      try {
        await fs.unlink(this.chunksPath);
      } catch (error) {
        // File might not exist, that's okay
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error clearing RAG store:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  getStats() {
    return {
      totalChunks: this.chunks.length,
      indexInitialized: true,
      config: this.config,
    };
  }
}

// Singleton instance
let ragStore: RAGVectorStore | null = null;

export async function getRagStore(): Promise<RAGVectorStore> {
  if (!ragStore) {
    ragStore = new RAGVectorStore();
    await ragStore.initialize();
  }
  return ragStore;
}

export default RAGVectorStore;
