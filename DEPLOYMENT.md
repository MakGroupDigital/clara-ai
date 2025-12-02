# Guide de Déploiement - Configuration des Secrets

## Configuration de la Clé API Gemini pour la Production

Pour que le chatbot fonctionne en production, vous devez configurer le secret `GEMINI_API_KEY` dans Google Cloud Secret Manager.

### ⚠️ IMPORTANT : Le chatbot ne fonctionnera PAS en production tant que cette étape n'est pas complétée

### Étapes à suivre :

1. **Accéder à Google Cloud Console**
   - Allez sur : https://console.cloud.google.com/security/secret-manager
   - Sélectionnez le projet Firebase : `studio-6437691961-3752d`

2. **Créer le secret GEMINI_API_KEY**
   - Cliquez sur "Créer un secret" (ou "Create Secret")
   - **Nom du secret** : `GEMINI_API_KEY` (exactement ce nom, en majuscules, sans espaces)
   - **Valeur du secret** : `AIzaSyDBKZTQwYwESmmaPQaufAQbfpAowjPAKFU`
   - Cliquez sur "Créer le secret" (ou "Create Secret")

3. **Vérifier les autres secrets**
   Assurez-vous que ces secrets existent également :
   - `RESEND_API_KEY` (pour l'envoi d'emails)
   - `GITHUB_TOKEN` (pour le déploiement)
   - `GEMINI_API_KEY` (pour le chatbot) ⚠️ **À CRÉER**

4. **Vérifier la configuration**
   Le fichier `apphosting.yaml` doit contenir :
   ```yaml
   secrets:
     - secret: RESEND_API_KEY
     - secret: GITHUB_TOKEN
     - secret: GEMINI_API_KEY
   ```
   ✅ Cette configuration est déjà en place dans le code

5. **Redéployer l'application**
   - Firebase App Hosting détectera automatiquement le nouveau secret
   - Ou déclenchez un nouveau déploiement depuis GitHub
   - Le secret sera automatiquement injecté comme variable d'environnement `GEMINI_API_KEY`

### Vérification

Une fois le secret créé, le chatbot devrait fonctionner en production. Si ce n'est pas le cas :
- Vérifiez les logs de déploiement dans Firebase Console
- Vérifiez que le nom du secret est exactement `GEMINI_API_KEY` (sensible à la casse)
- Vérifiez que la valeur du secret est correcte
- Vérifiez que le secret est bien dans le projet `studio-6437691961-3752d`
- Attendez quelques minutes après la création du secret pour qu'il soit disponible

### Note importante

- En **local** : La clé API est dans `.env.local` (fonctionne ✅)
- En **production** : La clé API doit être dans Google Cloud Secret Manager (à créer ⚠️)

