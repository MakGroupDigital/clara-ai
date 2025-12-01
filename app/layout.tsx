import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/contexts/language-context';
import { AssistanceChat } from '@/components/assistance-chat';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PWAInstall } from './pwa-install';
import { LoadingScreen } from '@/components/loading-screen';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Clara.ai - L\'assistante RH moderne',
  description: 'Entretien Vidéo pré-enregistré analysé par l\'IA et Scoring de Matching Intelligent.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '256x256', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '57x57', type: 'image/png' },
      { url: '/icon.png', sizes: '60x60', type: 'image/png' },
      { url: '/icon.png', sizes: '72x72', type: 'image/png' },
      { url: '/icon.png', sizes: '76x76', type: 'image/png' },
      { url: '/icon.png', sizes: '114x114', type: 'image/png' },
      { url: '/icon.png', sizes: '120x120', type: 'image/png' },
      { url: '/icon.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon.png', sizes: '152x152', type: 'image/png' },
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon.png', sizes: '256x256', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="96x96" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="256x256" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="57x57" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="60x60" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="76x76" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="114x114" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="144x144" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="256x256" />
        <link rel="apple-touch-icon" href="/icon.png" sizes="512x512" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Clara.ai" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('ServiceWorker registration successful');
                    })
                    .catch(function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                });
              }
            `,
          }}
        />
        <title>Clara.ai - L'assistante RH moderne</title>
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background text-foreground')}>
        <LoadingScreen />
        <Suspense fallback={<div>Chargement de l'application...</div>}>
          <FirebaseClientProvider>
            <LanguageProvider>
              {children}
              <AssistanceChat />
              <PWAInstall />
              <Toaster />
            </LanguageProvider>
          </FirebaseClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
