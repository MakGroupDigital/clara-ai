# Comment Signer l'APK pour la Production

## 🔐 Problème

L'APK non signé (`app-release-unsigned.apk`) ne peut pas être installé sur Android sans activer le mode développeur.

## ✅ Solution: APK Signé

Pour installer l'APK sur n'importe quel appareil Android (sans mode développeur), il faut le signer.

## 📝 Étapes pour Générer un APK Signé

### Option 1: Utiliser les Mots de Passe par Défaut (Recommandé)

Le fichier `build.gradle` a été configuré avec des mots de passe par défaut. Exécutez simplement:

```bash
cd android-app
./gradlew clean assembleRelease
```

L'APK signé sera généré dans:
```
app/build/outputs/apk/release/app-release.apk
```

### Option 2: Utiliser des Variables d'Environnement

Si vous voulez utiliser des mots de passe différents:

```bash
export KEYSTORE_PASSWORD="votre_mot_de_passe_keystore"
export KEY_PASSWORD="votre_mot_de_passe_key"
cd android-app
./gradlew clean assembleRelease
```

### Option 3: Signer Manuellement l'APK Existant

Si vous avez déjà l'APK non signé:

```bash
cd android-app
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore android.keystore \
  app/build/outputs/apk/release/app-release-unsigned.apk \
  clara-ai
```

Vous devrez entrer:
1. Le mot de passe du keystore
2. Le mot de passe de la clé

Ensuite, optimisez l'APK:

```bash
zipalign -v 4 \
  app/build/outputs/apk/release/app-release-unsigned.apk \
  app/build/outputs/apk/release/app-release-signed.apk
```

## 🔑 Informations de la Clé

- **Keystore:** `android-app/android.keystore`
- **Alias:** `clara-ai`
- **Mots de passe:** Ceux que vous avez entrés lors de la création de la clé

## ⚠️ Important

- **Gardez la clé en sécurité!** Vous en aurez besoin pour toutes les mises à jour futures de l'application.
- Si vous perdez la clé, vous ne pourrez plus mettre à jour l'application sur le Play Store.
- Faites une sauvegarde de `android.keystore` dans un endroit sûr.

## 📦 Résultat

Une fois signé, l'APK peut être:
- ✅ Installé sur n'importe quel appareil Android (sans mode développeur)
- ✅ Distribué via le Play Store
- ✅ Partagé avec d'autres utilisateurs

