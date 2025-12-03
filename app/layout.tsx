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
      { url: '/icon-clara.png?v=2', sizes: '650x601', type: 'image/png' },
      { url: '/icon-32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png?v=2', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=2', sizes: '512x512', type: 'image/png' },
      { url: '/logo.svg?v=2', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/icon-clara.png?v=2',
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Clara.ai - L\'assistante RH moderne',
    description: 'Entretien Vidéo pré-enregistré analysé par l\'IA et Scoring de Matching Intelligent.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Clara.ai - Le Recrutement, Réinventé par l\'IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clara.ai - L\'assistante RH moderne',
    description: 'Entretien Vidéo pré-enregistré analysé par l\'IA et Scoring de Matching Intelligent.',
    images: ['/og-image.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Clara.ai',
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
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/icon-clara.png?v=3" type="image/png" sizes="650x601" />
        <link rel="shortcut icon" href="/icon-clara.png?v=3" type="image/png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png?v=3" />
        <link rel="apple-touch-icon" href="/icon-192.png?v=3" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png?v=3" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512.png?v=3" />
        
        <link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash-ios-ipad-pro-12.9.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash-ios-ipad-pro-11.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash-ios-ipad.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash-ios-iphone-xs-max.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash-ios-iphone-xr.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash-ios-iphone-x.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash-ios-iphone-8-plus.png" />
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash-ios-iphone-8.png" />
        
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
