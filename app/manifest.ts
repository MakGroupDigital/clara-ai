import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Clara.ai - L\'assistante RH moderne',
    short_name: 'Clara.ai',
    description: 'Entretien Vidéo pré-enregistré analysé par l\'IA et Scoring de Matching Intelligent.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}

