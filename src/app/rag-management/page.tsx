import React from 'react';
import RAGKnowledgeManager from '@/components/rag/RAGKnowledgeManager';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAG Knowledge Management - BioSphere',
  description: 'Manage your RAG knowledge base for enhanced AI bio generation',
};

export default function RAGManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent mb-4">
              RAG Knowledge Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your custom knowledge base for enhanced AI bio generation. 
              Add documents, guidelines, examples, and best practices to improve the quality and 
              accuracy of your generated bios.
            </p>
          </div>
          <RAGKnowledgeManager />
        </div>
      </div>
    </div>
  );
}
