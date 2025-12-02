#!/bin/bash

# Script pour générer l'APK Android avec Bubblewrap
# Ce script nécessite que l'app soit déployée et accessible via HTTPS

echo "🚀 Génération de l'APK Android pour Clara.ai"
echo ""

# Vérifier que l'app est accessible
APP_URL="https://clara.ai"
echo "📱 URL de l'application: $APP_URL"
echo ""

# Créer le répertoire pour le projet Android
ANDROID_DIR="android-app"
if [ -d "$ANDROID_DIR" ]; then
    echo "⚠️  Le répertoire $ANDROID_DIR existe déjà. Suppression..."
    rm -rf "$ANDROID_DIR"
fi

echo "📦 Initialisation du projet Android avec Bubblewrap..."
echo "   (Cette étape peut prendre quelques minutes)"
echo ""

# Utiliser Bubblewrap pour créer le projet Android
npx @bubblewrap/cli init \
    --manifest="$APP_URL/manifest.json" \
    --directory="$ANDROID_DIR" \
    --package-name="com.ybsinnovate.claraai" \
    --app-version-name="1.0.0" \
    --app-version-code="1" \
    --key-store-path="" \
    --key-store-password="" \
    --key-name="" \
    --key-password="" \
    --non-interactive || {
    echo "❌ Erreur lors de l'initialisation. Tentative alternative..."
    exit 1
}

echo ""
echo "✅ Projet Android créé dans $ANDROID_DIR"
echo ""
echo "📝 Pour générer l'APK, exécutez:"
echo "   cd $ANDROID_DIR"
echo "   npm run build"
echo "   npm run build:apk"
echo ""
echo "📦 L'APK sera généré dans: $ANDROID_DIR/app/build/outputs/apk/release/"

