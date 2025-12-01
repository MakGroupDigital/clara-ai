# Guide de Déploiement - Configuration des Secrets

## Configuration de la Clé API Gemini pour la Production

Pour que le chatbot fonctionne en production, vous devez configurer le secret `GEMINI_API_KEY` dans Google Cloud Secret Manager.

### Étapes à suivre :

1. **Accéder à Google Cloud Console**
   - Allez sur : https://console.cloud.google.com/security/secret-manager
   - Sélectionnez le projet Firebase : `studio-6437691961-3752d`

2. **Créer le secret GEMINI_API_KEY**
   - Cliquez sur "Créer un secret"
   - **Nom du secret** : `GEMINI_API_KEY` (exactement ce nom, en majuscules)
   - **Valeur du secret** : `AIzaSyDBKZTQwYwESmmaPQaufAQbfpAowjPAKFU`
   - Cliquez sur "Créer le secret"

3. **Vérifier les autres secrets**
   Assurez-vous que ces secrets existent également :
   - `RESEND_API_KEY` (pour l'envoi d'emails)
   - `GITHUB_TOKEN` (pour le déploiement)

4. **Vérifier la configuration**
   Le fichier `apphosting.yaml` doit contenir :
   ```yaml
   secrets:
     - secret: RESEND_API_KEY
     - secret: GITHUB_TOKEN
     - secret: GEMINI_API_KEY
   ```

5. **Redéployer l'application**
   - Firebase App Hosting détectera automatiquement le nouveau secret
   - Ou déclenchez un nouveau déploiement depuis GitHub

### Vérification

Une fois le secret créé, le chatbot devrait fonctionner en production. Si ce n'est pas le cas :
- Vérifiez les logs de déploiement dans Firebase Console
- Vérifiez que le nom du secret est exactement `GEMINI_API_KEY`
- Vérifiez que la valeur du secret est correcte

