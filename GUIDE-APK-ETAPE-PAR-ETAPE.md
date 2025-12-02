# Guide Étape par Étape - Génération de l'APK

## 🎯 Objectif
Générer un APK Android pour Clara.ai en utilisant PWABuilder/Bubblewrap.

## ✅ Prérequis Vérifiés
- ✅ Node.js v24.10.0
- ✅ Java JDK 17.0.2
- ✅ Application déployée: https://rh.claraai.site
- ✅ Manifest accessible
- ✅ Icônes PNG créées

## 📋 Étapes Détaillées

### ÉTAPE 1: Ouvrir un Terminal Interactif
Ouvrez votre terminal (Terminal.app sur macOS) et naviguez vers le projet:
```bash
cd /Users/mac/clara-ai/clara-ai
```

### ÉTAPE 2: Exécuter le Script Interactif
```bash
./generate-apk-interactive.sh
```

### ÉTAPE 3: Répondre aux Questions de Bubblewrap

Quand Bubblewrap vous pose des questions, répondez ainsi:

#### Question 1: Installation du JDK
```
? Do you want Bubblewrap to install the JDK (recommended)?
  (Enter "No" to use your own JDK 17 installation) (Y/n)
```
**Réponse: `N`** (Non, car Java est déjà installé)

#### Question 2: Installation de l'Android SDK
```
? Do you want to install Android SDK?
```
**Réponse: `Y`** (Oui, pour installer l'Android SDK)

Cette installation peut prendre plusieurs minutes (première fois).

#### Question 3: Autres Questions
Pour toutes les autres questions, acceptez les valeurs par défaut en appuyant sur **Entrée**.

### ÉTAPE 4: Attendre la Fin de l'Initialisation
Bubblewrap va:
- Télécharger le manifest depuis https://rh.claraai.site/manifest.webmanifest
- Créer la structure du projet Android
- Installer l'Android SDK (si vous avez répondu Y)
- Configurer le projet

**Temps estimé: 5-15 minutes** (selon la vitesse de votre connexion)

### ÉTAPE 5: Installation des Dépendances
Le script va automatiquement:
```bash
cd android-app
npm install
```

### ÉTAPE 6: Construction de l'APK
Le script va automatiquement:
```bash
npm run build
npm run build:apk
```

**Temps estimé: 5-10 minutes**

### ÉTAPE 7: Récupérer l'APK
Une fois terminé, l'APK sera dans:
```
android-app/app/build/outputs/apk/release/app-release-unsigned.apk
```

## 🎉 Résultat Final

Vous aurez un fichier APK non signé que vous pouvez:
- Installer directement sur un appareil Android (après activation du mode développeur)
- Signer pour la distribution (voir ci-dessous)

## 📝 Signer l'APK (Optionnel - Pour la Distribution)

Si vous voulez signer l'APK pour le publier:

1. **Créer une clé de signature:**
```bash
keytool -genkey -v -keystore clara-ai-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias clara-ai
```

2. **Signer l'APK:**
```bash
cd android-app/app/build/outputs/apk/release
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ../../../../../../clara-ai-key.jks app-release-unsigned.apk clara-ai
```

3. **Optimiser l'APK:**
```bash
zipalign -v 4 app-release-unsigned.apk app-release.apk
```

## ⚠️ Problèmes Courants

### Erreur: "Java not found"
- Vérifiez que Java est installé: `java -version`
- Configurez JAVA_HOME si nécessaire

### Erreur: "Android SDK not found"
- Répondez "Y" quand Bubblewrap demande d'installer l'Android SDK
- Ou installez Android Studio manuellement

### Erreur: "Manifest not accessible"
- Vérifiez que l'application est déployée: https://rh.claraai.site
- Vérifiez que le manifest est accessible: https://rh.claraai.site/manifest.webmanifest

## 🆘 Besoin d'Aide?

Si vous rencontrez des problèmes:
1. Vérifiez que tous les prérequis sont installés
2. Vérifiez votre connexion internet (pour télécharger l'Android SDK)
3. Vérifiez les logs d'erreur dans le terminal

## 🎯 Alternative Plus Simple

Si vous préférez éviter l'installation locale:
1. Allez sur: https://www.pwabuilder.com/
2. Entrez: https://rh.claraai.site
3. Cliquez sur "Build My PWA"
4. Téléchargez l'APK généré

**Avantage:** Pas besoin d'installer Java ou Android SDK
**Inconvénient:** Moins de contrôle sur la configuration

