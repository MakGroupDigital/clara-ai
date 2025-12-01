import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/contexts/language-context';
import { AssistanceChat } from '@/components/assistance-chat';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PWAInstall } from './pwa-install';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Clara.ai - L\'assistante RH moderne',
  description: 'Entretien Vidéo pré-enregistré analysé par l\'IA et Scoring de Matching Intelligent.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
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
