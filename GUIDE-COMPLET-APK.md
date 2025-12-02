# Guide Complet - Génération APK Étape par Étape

## 📋 ÉTAPE 1: Ouvrir le Terminal

1. Ouvrez **Terminal.app** (ou votre terminal préféré)
2. Vous verrez un prompt comme: `mac@MacBook-Pro ~ %`

## 📋 ÉTAPE 2: Naviguer vers le Dossier

**Commande à taper:**
```bash
cd /Users/mac/clara-ai/clara-ai
```

**Appuyez sur Entrée**

**Résultat attendu:** Le prompt devrait maintenant montrer le chemin du projet

## 📋 ÉTAPE 3: Vérifier que vous êtes au bon endroit

**Commande à taper:**
```bash
pwd
```

**Appuyez sur Entrée**

**Résultat attendu:** `/Users/mac/clara-ai/clara-ai`

## 📋 ÉTAPE 4: Nettoyer l'Ancien Projet (si existe)

**Commande à taper:**
```bash
rm -rf android-app
```

**Appuyez sur Entrée**

**Résultat attendu:** Pas d'erreur (même si le dossier n'existe pas, c'est OK)

## 📋 ÉTAPE 5: Configurer Java

**Commande à taper:**
```bash
export JAVA_HOME=/tmp/jdk-17.0.2.jdk
export PATH=$JAVA_HOME/Contents/Home/bin:$PATH
```

**Appuyez sur Entrée**

**Vérification - Commande à taper:**
```bash
java -version
```

**Appuyez sur Entrée**

**Résultat attendu:** `openjdk version "17.0.2"` ou similaire

## 📋 ÉTAPE 6: Lancer Bubblewrap

**Commande à taper:**
```bash
npx @bubblewrap/cli init --manifest="https://rh.claraai.site/manifest.webmanifest" --directory="android-app" --package-name="com.ybsinnovate.claraai" --app-version-name="1.0.0" --app-version-code="1"
```

**Appuyez sur Entrée**

## 📋 ÉTAPE 7: Répondre aux Questions de Bubblewrap

### Question 1: Installation du JDK

**Question affichée:**
```
? Do you want Bubblewrap to install the JDK (recommended)?
  (Enter "No" to use your own JDK 17 installation) (Y/n)
```

**Réponse à taper:** `N`

**Appuyez sur Entrée**

### Question 2: Chemin vers votre JDK

**Question affichée:**
```
? Path to your existing JDK 17:
```

**Réponse à taper:** `/tmp/jdk-17.0.2.jdk`

**Appuyez sur Entrée**

**⚠️ Si cette réponse ne fonctionne pas, essayez:**
`/tmp/jdk-17.0.2.jdk/Contents/Home`

### Question 3: Installation de l'Android SDK

**Question affichée:**
```
? Do you want to install Android SDK?
```

**Réponse à taper:** `Y`

**Appuyez sur Entrée**

**⏱️ Cette étape peut prendre 5-10 minutes** (téléchargement de l'Android SDK)

### Question 4: Autres Questions

Pour toutes les autres questions qui apparaissent:
- **Appuyez simplement sur Entrée** pour accepter les valeurs par défaut

## 📋 ÉTAPE 8: Attendre la Fin de l'Initialisation

Bubblewrap va:
- Télécharger le manifest
- Créer la structure du projet
- Installer l'Android SDK (si vous avez répondu Y)
- Configurer le projet

**⏱️ Temps estimé: 5-15 minutes**

**Résultat attendu:** Message de succès comme "Project initialized successfully"

## 📋 ÉTAPE 9: Aller dans le Dossier Android

**Commande à taper:**
```bash
cd android-app
```

**Appuyez sur Entrée**

## 📋 ÉTAPE 10: Installer les Dépendances

**Commande à taper:**
```bash
npm install
```

**Appuyez sur Entrée**

**⏱️ Temps estimé: 2-5 minutes**

**Résultat attendu:** `added X packages` ou similaire

## 📋 ÉTAPE 11: Construire le Projet

**Commande à taper:**
```bash
npm run build
```

**Appuyez sur Entrée**

**⏱️ Temps estimé: 3-5 minutes**

**Résultat attendu:** Build réussi sans erreurs

## 📋 ÉTAPE 12: Générer l'APK

**Commande à taper:**
```bash
npm run build:apk
```

**Appuyez sur Entrée**

**⏱️ Temps estimé: 2-5 minutes**

**Résultat attendu:** APK généré avec succès

## 📋 ÉTAPE 13: Trouver l'APK

**Commande à taper:**
```bash
ls -lh app/build/outputs/apk/release/
```

**Appuyez sur Entrée**

**Résultat attendu:** Vous verrez `app-release-unsigned.apk`

## 📋 ÉTAPE 14: Ouvrir le Dossier de l'APK

**Commande à taper:**
```bash
open app/build/outputs/apk/release/
```

**Appuyez sur Entrée**

**Résultat attendu:** Le Finder s'ouvre avec le fichier APK

## ✅ RÉSUMÉ DES COMMANDES (Copier-Coller)

```bash
# 1. Aller dans le dossier
cd /Users/mac/clara-ai/clara-ai

# 2. Nettoyer
rm -rf android-app

# 3. Configurer Java
export JAVA_HOME=/tmp/jdk-17.0.2.jdk
export PATH=$JAVA_HOME/Contents/Home/bin:$PATH

# 4. Vérifier Java
java -version

# 5. Lancer Bubblewrap
npx @bubblewrap/cli init --manifest="https://rh.claraai.site/manifest.webmanifest" --directory="android-app" --package-name="com.ybsinnovate.claraai" --app-version-name="1.0.0" --app-version-code="1"

# Réponses aux questions:
# - JDK: N
# - Chemin JDK: /tmp/jdk-17.0.2.jdk
# - Android SDK: Y
# - Autres: Entrée (défaut)

# 6. Aller dans android-app
cd android-app

# 7. Installer dépendances
npm install

# 8. Construire
npm run build

# 9. Générer APK
npm run build:apk

# 10. Ouvrir le dossier
open app/build/outputs/apk/release/
```

## 🆘 En Cas d'Erreur

Si une erreur survient:
1. Notez le message d'erreur exact
2. Vérifiez que Java est bien configuré: `java -version`
3. Vérifiez votre connexion internet (pour télécharger l'Android SDK)
4. Relancez depuis l'étape où l'erreur s'est produite

