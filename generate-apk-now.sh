#!/bin/bash

# Script pour générer l'APK immédiatement
# Utilise Bubblewrap qui peut installer Java automatiquement

echo "🚀 Génération de l'APK Android pour Clara.ai"
echo ""

APP_URL="https://rh.claraai.site"
ANDROID_DIR="android-app"

# Supprimer l'ancien répertoire si existe
if [ -d "$ANDROID_DIR" ]; then
    echo "🗑️  Suppression de l'ancien répertoire..."
    rm -rf "$ANDROID_DIR"
fi

echo "📱 URL de l'application: $APP_URL"
echo "📦 Initialisation du projet Android avec Bubblewrap..."
echo "   (Bubblewrap peut installer Java automatiquement si nécessaire)"
echo ""

# Essayer d'initialiser avec Bubblewrap
# Bubblewrap demandera d'installer Java si nécessaire
npx @bubblewrap/cli init \
    --manifest="$APP_URL/manifest.webmanifest" \
    --directory="$ANDROID_DIR" \
    --package-name="com.ybsinnovate.claraai" \
    --app-version-name="1.0.0" \
    --app-version-code="1" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Projet Android initialisé avec succès !"
    echo ""
    echo "📝 Prochaines étapes pour générer l'APK:"
    echo "   cd $ANDROID_DIR"
    echo "   npm install"
    echo "   npm run build"
    echo "   npm run build:apk"
    echo ""
    echo "📦 L'APK sera dans: $ANDROID_DIR/app/build/outputs/apk/release/"
else
    echo ""
    echo "⚠️  L'initialisation nécessite Java JDK 17+"
    echo ""
    echo "📥 Pour installer Java:"
    echo "   1. Téléchargez depuis: https://adoptium.net/temurin/releases/"
    echo "   2. Installez le package .pkg"
    echo "   3. Relancez ce script"
    echo ""
    echo "⭐ OU utilisez le site web PWABuilder (plus simple):"
    echo "   https://www.pwabuilder.com/"
    echo "   Entrez: $APP_URL"
fi



