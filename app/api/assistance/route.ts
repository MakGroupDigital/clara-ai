import { NextResponse } from 'next/server';
import { askClara } from '@/ai/flows/assistance-flow';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      );
    }

    // Vérifier si la clé API est configurée
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      console.error('Clé API Google (Gemini) non configurée');
      return NextResponse.json(
        { 
          error: 'Configuration manquante',
          answer: 'Le service d\'assistance nécessite une configuration API. Veuillez contacter l\'administrateur.'
        },
        { status: 503 }
      );
    }

    const result = await askClara({ question });
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de la génération de la réponse:', error);
    
    // Message d'erreur plus spécifique selon le type d'erreur
    let errorMessage = 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.';
    
    if (error.message?.includes('API key') || error.message?.includes('FAILED_PRECONDITION')) {
      errorMessage = 'Le service d\'assistance nécessite une configuration API. Veuillez contacter l\'administrateur.';
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      errorMessage = 'Le service a atteint sa limite d\'utilisation. Veuillez réessayer plus tard.';
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

