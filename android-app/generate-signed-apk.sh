#!/bin/bash

# Script pour générer un APK signé pour la production

set -e

echo "🔐 Génération d'un APK Signé pour la Production"
echo "================================================"
echo ""

# Demander les mots de passe
echo "📝 Entrez les mots de passe de la clé de signature:"
echo "   (Les mêmes que lors de la création de la clé)"
echo ""

read -sp "Mot de passe du Keystore: " KEYSTORE_PASSWORD
echo ""
read -sp "Mot de passe de la Clé: " KEY_PASSWORD
echo ""
echo ""

# Exporter les variables d'environnement
export KEYSTORE_PASSWORD
export KEY_PASSWORD

# Configurer Java
export JAVA_HOME=/tmp/jdk-17.0.2.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

# Mettre à jour build.gradle temporairement
echo "🔧 Configuration de la signature..."
# Configuration déjà correcte dans build.gradle

# Nettoyer et construire
echo "🔨 Construction de l'APK signé..."
./gradlew clean assembleRelease

# Restaurer build.gradle
mv app/build.gradle.bak app/build.gradle 2>/dev/null || true

# Vérifier le résultat
if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
    echo ""
    echo "✅ APK SIGNÉ GÉNÉRÉ AVEC SUCCÈS !"
    echo ""
    echo "📦 Fichier: app/build/outputs/apk/release/app-release.apk"
    echo "📂 Ouverture du dossier..."
    open app/build/outputs/apk/release/
    echo ""
    echo "🎉 Cet APK peut être installé sur n'importe quel appareil Android"
    echo "   (sans mode développeur) !"
else
    echo ""
    echo "❌ Erreur lors de la génération de l'APK signé"
    exit 1
fi

