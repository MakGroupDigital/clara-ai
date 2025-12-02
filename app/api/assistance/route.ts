import { NextResponse } from 'next/server';
import { askClara } from '@/ai/flows/assistance-flow';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, conversationHistory } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      );
    }

    // Clé API DeepSeek directement dans le code pour la production
    const apiKey = 'sk-8feff3889a55469b838950a83fdbb1bd';

    const result = await askClara({ 
      question,
      conversationHistory: conversationHistory || []
    });
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de la génération de la réponse:', error);
    
    // Message d'erreur plus spécifique selon le type d'erreur
    let errorMessage = 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.';
    
    if (error.message?.includes('Solde insuffisant') || error.message?.includes('balance')) {
      errorMessage = 'Le compte DeepSeek n\'a pas suffisamment de crédit. Veuillez recharger votre compte sur https://platform.deepseek.com';
    } else if (error.message?.includes('API key') || error.message?.includes('Invalid API key') || error.message?.includes('Unauthorized')) {
      errorMessage = 'Clé API DeepSeek invalide. Veuillez vérifier la configuration.';
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      errorMessage = 'Le service a atteint sa limite d\'utilisation. Veuillez réessayer plus tard.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Erreur lors de la génération de la réponse',
        answer: errorMessage
      },
      { status: 500 }
    );
  }
}

