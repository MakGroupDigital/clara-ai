# Génération de l'APK Android pour Clara.ai

## Méthode 1 : Utiliser PWABuilder.com (Recommandé - Plus Simple)

1. **Déployer l'application** sur Firebase (ou votre hébergement HTTPS)
2. **Aller sur** https://www.pwabuilder.com/
3. **Entrer l'URL** : `https://clara.ai`
4. **Cliquer sur "Start"**
5. **Sélectionner "Android"**
6. **Télécharger l'APK** généré

## Méthode 2 : Utiliser Bubblewrap (CLI)

### Prérequis
- Node.js installé
- Java JDK 17+ installé
- Android SDK installé (optionnel, Bubblewrap peut l'installer)

### Étapes

1. **Initialiser le projet Android** :
```bash
npx @bubblewrap/cli init \
    --manifest=https://clara.ai/manifest.json \
    --directory=android-app \
    --package-name=com.ybsinnovate.claraai \
    --app-version-name=1.0.0 \
    --app-version-code=1
```

2. **Construire l'APK** :
```bash
cd android-app
npm install
npm run build
npm run build:apk
```

3. **L'APK sera dans** : `android-app/app/build/outputs/apk/release/`

### Script automatisé

Vous pouvez utiliser le script fourni :
```bash
./generate-apk.sh
```

## Configuration

Le fichier `pwabuilder.config.json` contient la configuration pour PWABuilder.

Le fichier `public/manifest.json` contient le manifest PWA.

## Notes importantes

- ⚠️ L'application doit être accessible via HTTPS pour que PWABuilder fonctionne
- ⚠️ Le manifest.json doit être accessible à l'URL `/manifest.json`
- ⚠️ Le service worker doit être accessible à l'URL `/sw.js`
- ⚠️ Pour signer l'APK pour la production, vous devrez créer une clé de signature

## Signer l'APK pour la production

1. **Générer une clé** :
```bash
keytool -genkey -v -keystore clara-ai-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias clara-ai
```

2. **Signer l'APK** :
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore clara-ai-key.jks app-release-unsigned.apk clara-ai
```

3. **Optimiser l'APK** (optionnel) :
```bash
zipalign -v 4 app-release-unsigned.apk app-release.apk
```

