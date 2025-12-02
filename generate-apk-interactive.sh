#!/bin/bash

# Script interactif pour générer l'APK Android
# Guide étape par étape

set -e

echo "🚀 GUIDE ÉTAPE PAR ÉTAPE - GÉNÉRATION DE L'APK"
echo "================================================"
echo ""

# Étape 1: Vérification des prérequis
echo "📋 ÉTAPE 1: Vérification des prérequis..."
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi
echo "✅ Node.js: $(node --version)"

if ! command -v java &> /dev/null; then
    echo "❌ Java n'est pas installé"
    exit 1
fi
echo "✅ Java: $(java -version 2>&1 | head -1)"

# Configurer Java si nécessaire
if [ -d "/tmp/jdk-17.0.2.jdk" ]; then
    export JAVA_HOME=/tmp/jdk-17.0.2.jdk
    export PATH=$JAVA_HOME/Contents/Home/bin:$PATH
    echo "✅ JAVA_HOME configuré: $JAVA_HOME"
fi

echo "✅ Application déployée: https://rh.claraai.site"
echo ""

# Étape 2: Nettoyage
echo "📦 ÉTAPE 2: Nettoyage de l'ancien projet..."
if [ -d "android-app" ]; then
    read -p "   Supprimer l'ancien répertoire android-app? (o/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        rm -rf android-app
        echo "   ✅ Ancien répertoire supprimé"
    fi
else
    echo "   ✅ Pas d'ancien répertoire"
fi
echo ""

# Étape 3: Initialisation
echo "📱 ÉTAPE 3: Initialisation du projet Android avec Bubblewrap..."
echo ""
echo "⚠️  IMPORTANT: Bubblewrap va vous poser des questions."
echo "   Voici ce que vous devez répondre:"
echo ""
echo "   Question 1: 'Do you want Bubblewrap to install the JDK?'"
echo "   → Répondez: N (Non, car Java est déjà installé)"
echo ""
echo "   Question 2: 'Do you want to install Android SDK?'"
echo "   → Répondez: Y (Oui, pour installer l'Android SDK)"
echo ""
echo "   Question 3: Autres questions"
echo "   → Acceptez les valeurs par défaut (Entrée)"
echo ""
read -p "   Appuyez sur Entrée pour continuer..."
echo ""

npx @bubblewrap/cli init \
    --manifest="https://rh.claraai.site/manifest.webmanifest" \
    --directory="android-app" \
    --package-name="com.ybsinnovate.claraai" \
    --app-version-name="1.0.0" \
    --app-version-code="1"

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Erreur lors de l'initialisation"
    exit 1
fi

echo ""
echo "✅ Projet Android initialisé avec succès !"
echo ""

# Étape 4: Installation des dépendances
echo "📦 ÉTAPE 4: Installation des dépendances..."
cd android-app
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "✅ Dépendances installées"
echo ""

# Étape 5: Construction de l'APK
echo "🔨 ÉTAPE 5: Construction de l'APK..."
echo ""

npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction"
    exit 1
fi

echo ""
echo "📱 ÉTAPE 6: Génération de l'APK..."
npm run build:apk

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la génération de l'APK"
    exit 1
fi

echo ""
echo "✅ APK GÉNÉRÉ AVEC SUCCÈS !"
echo ""
echo "📦 Emplacement de l'APK:"
echo "   $(pwd)/app/build/outputs/apk/release/app-release-unsigned.apk"
echo ""
echo "📝 Note: L'APK est 'unsigned' (non signé)."
echo "   Pour le signer, utilisez:"
echo "   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256"
echo "   -keystore votre-cle.jks app-release-unsigned.apk alias-name"
echo ""

