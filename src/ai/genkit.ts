import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Le plugin googleAI() lit automatiquement GEMINI_API_KEY ou GOOGLE_API_KEY
// depuis les variables d'environnement
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
