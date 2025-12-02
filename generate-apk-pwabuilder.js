#!/usr/bin/env node

/**
 * Script pour générer l'APK Android via PWABuilder
 * Ce script utilise l'API PWABuilder pour générer l'APK
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const APP_URL = 'https://clara.ai';
const OUTPUT_DIR = path.join(__dirname, 'platforms', 'android');

console.log('🚀 Génération de l\'APK Android via PWABuilder');
console.log(`📱 URL de l'application: ${APP_URL}`);
console.log('');

// Créer le répertoire de sortie
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('📝 Instructions pour générer l\'APK:');
console.log('');
console.log('1. Allez sur https://www.pwabuilder.com/');
console.log(`2. Entrez l'URL: ${APP_URL}`);
console.log('3. Cliquez sur "Start"');
console.log('4. Sélectionnez "Android"');
console.log('5. Cliquez sur "Build My PWA"');
console.log('6. Téléchargez l\'APK généré');
console.log('');
console.log('💡 Alternative: Utilisez le script generate-apk.sh avec Java JDK installé');
console.log('');

// Vérifier si l'app est accessible
const manifestUrl = `${APP_URL}/manifest.json`;
console.log(`🔍 Vérification de l'accessibilité du manifest: ${manifestUrl}`);

https.get(manifestUrl, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Manifest accessible !');
    console.log('');
    console.log('📦 Pour générer l\'APK localement avec Bubblewrap:');
    console.log('   1. Installez Java JDK 17+');
    console.log('   2. Exécutez: ./generate-apk.sh');
    console.log('   3. Ou utilisez le site web PWABuilder (plus simple)');
  } else {
    console.log(`⚠️  Manifest non accessible (code: ${res.statusCode})`);
    console.log('   Assurez-vous que l\'application est déployée sur HTTPS');
  }
}).on('error', (err) => {
  console.log(`❌ Erreur: ${err.message}`);
  console.log('   Assurez-vous que l\'application est déployée et accessible');
});

