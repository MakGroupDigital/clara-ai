#!/bin/bash

# Script pour installer Java JDK 17+ sur macOS
# Nécessaire pour générer l'APK Android avec Bubblewrap

echo "☕ Installation de Java JDK pour générer l'APK Android"
echo ""

# Vérifier si Java est déjà installé
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo "✅ Java est déjà installé: $JAVA_VERSION"
    java -version
    exit 0
fi

echo "📦 Installation de Java JDK via Homebrew..."
echo ""

# Vérifier si Homebrew est installé
if ! command -v brew &> /dev/null; then
    echo "⚠️  Homebrew n'est pas installé."
    echo ""
    echo "🔧 Installation de Homebrew..."
    echo "   Exécutez cette commande dans votre terminal:"
    echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo ""
    echo "   Après l'installation, relancez ce script."
    exit 1
fi

echo "✅ Homebrew est installé"
echo ""

# Installer Java JDK 17 (OpenJDK)
echo "📥 Installation de OpenJDK 17..."
brew install openjdk@17

# Configurer JAVA_HOME
echo ""
echo "🔧 Configuration de JAVA_HOME..."
JAVA_HOME_PATH=$(brew --prefix openjdk@17)
echo "export JAVA_HOME=$JAVA_HOME_PATH" >> ~/.zshrc
echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.zshrc

# Créer un lien symbolique pour java
sudo ln -sfn $JAVA_HOME_PATH/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

echo ""
echo "✅ Java JDK 17 installé avec succès !"
echo ""
echo "🔄 Rechargez votre terminal ou exécutez:"
echo "   source ~/.zshrc"
echo ""
echo "🧪 Vérifiez l'installation:"
echo "   java -version"
echo ""

