# Instructions pour générer l'APK localement

## Problème
Bubblewrap nécessite une interaction interactive (prompt) qui ne peut pas être automatisée.

## Solutions

### Option 1: Site Web PWABuilder (⭐ RECOMMANDÉ - 2 minutes)
1. Allez sur: https://www.pwabuilder.com/
2. Entrez: https://rh.claraai.site
3. Cliquez sur "Start"
4. Sélectionnez "Android"
5. Cliquez sur "Build My PWA"
6. Téléchargez l'APK

### Option 2: Installation Java puis Bubblewrap (10-15 minutes)
1. Téléchargez Java JDK 17 depuis: https://adoptium.net/temurin/releases/
   - Sélectionnez: macOS, x64, JDK 17, .pkg
2. Installez le package .pkg
3. Ouvrez un nouveau terminal
4. Exécutez:
   ```bash
   ./generate-apk.sh
   ```
5. Répondez "Y" quand Bubblewrap demande d'installer le JDK
6. Suivez les instructions

### Option 3: Utiliser Android Studio
1. Installez Android Studio
2. Créez un nouveau projet "Trusted Web Activity"
3. Configurez avec votre manifest: https://rh.claraai.site/manifest.webmanifest
4. Compilez l'APK

## Note
Java JDK 17 a été téléchargé dans /tmp/jdk-17.0.2.jdk mais Bubblewrap nécessite toujours une interaction.
