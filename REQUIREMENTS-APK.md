# Prérequis pour générer un APK localement avec PWABuilder

## ✅ Déjà en place

1. **Node.js** - Installé et fonctionnel
2. **Application déployée** - https://rh.claraai.site
3. **Manifest accessible** - https://rh.claraai.site/manifest.webmanifest
4. **Icônes PNG** - icon-192.png et icon-512.png créées
5. **Bubblewrap CLI** - Installé dans le projet (@bubblewrap/cli)

## ❌ Ce qui manque

### 1. Java JDK 17+ (OBLIGATOIRE)

**Pourquoi ?**
- Nécessaire pour compiler l'APK Android
- Bubblewrap utilise Java pour créer le projet Android et compiler

**Comment l'installer ?**

#### Option A: Via Homebrew (Recommandé sur macOS)
```bash
# 1. Installer Homebrew (si pas déjà installé)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Installer Java JDK 17
brew install openjdk@17

# 3. Configurer JAVA_HOME
echo 'export JAVA_HOME=$(brew --prefix openjdk@17)' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# 4. Vérifier
java -version
```

#### Option B: Téléchargement direct
1. Allez sur: https://adoptium.net/temurin/releases/
2. Sélectionnez:
   - Version: 17 (LTS)
   - OS: macOS
   - Architecture: x64
   - Package Type: JDK
3. Téléchargez le fichier .pkg
4. Installez-le
5. Vérifiez: `java -version`

### 2. Android SDK (Optionnel - Bubblewrap peut l'installer automatiquement)

Bubblewrap peut installer l'Android SDK automatiquement si vous répondez "Y" à la question lors de l'initialisation.

## 📝 Processus de génération

Une fois Java installé:

```bash
# 1. Initialiser le projet Android
npx @bubblewrap/cli init \
    --manifest=https://rh.claraai.site/manifest.webmanifest \
    --directory=android-app \
    --package-name=com.ybsinnovate.claraai \
    --app-version-name=1.0.0 \
    --app-version-code=1

# Répondez "Y" quand demandé d'installer le JDK (si Java n'est pas configuré)
# Répondez "Y" quand demandé d'installer Android SDK

# 2. Aller dans le répertoire
cd android-app

# 3. Installer les dépendances
npm install

# 4. Construire l'APK
npm run build
npm run build:apk

# 5. L'APK sera dans:
# android-app/app/build/outputs/apk/release/app-release-unsigned.apk
```

## ⚠️ Problèmes connus

1. **Bubblewrap nécessite une interaction interactive**
   - Il demande confirmation pour installer JDK/SDK
   - Solution: Répondre "Y" aux prompts

2. **Java non trouvé**
   - Vérifiez que JAVA_HOME est configuré
   - Vérifiez que `java -version` fonctionne

3. **Permissions**
   - Certaines opérations peuvent nécessiter sudo
   - L'installation de l'Android SDK peut demander des permissions

## 🎯 Alternative plus simple

**Utiliser le site web PWABuilder** (pas besoin de Java):
1. Allez sur: https://www.pwabuilder.com/
2. Entrez: https://rh.claraai.site
3. Cliquez sur "Build My PWA"
4. Téléchargez l'APK généré

## 📦 Résumé

**Minimum requis:**
- ✅ Node.js (déjà installé)
- ❌ Java JDK 17+ (à installer)
- ✅ Application déployée (déjà fait)
- ✅ Manifest et icônes (déjà fait)

**Temps estimé:**
- Installation Java: 5-10 minutes
- Génération APK: 5-15 minutes (première fois, plus rapide ensuite)



