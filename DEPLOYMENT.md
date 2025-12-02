# Guide de Déploiement - Clara.ai

## Configuration des Secrets pour la Production

### 1. DeepSeek API Key

Pour que l'assistant IA fonctionne en production, vous devez configurer la clé API DeepSeek dans Google Cloud Secret Manager.

#### Étapes :

1. **Obtenir une clé API DeepSeek** :
   - Visitez : https://platform.deepseek.com/api_keys
   - Créez une nouvelle clé API

2. **Créer le secret dans Google Cloud Secret Manager** :
   ```bash
   gcloud secrets create DEEPSEEK_API_KEY \
     --data-file=- \
     --project=studio-6437691961-3752d \
     --replication-policy="automatic"
   ```
   (Collez votre clé API quand demandé, puis appuyez sur Ctrl+D)

   Ou via la console web :
   - Allez sur : https://console.cloud.google.com/security/secret-manager
   - Cliquez sur "CRÉER UN SECRET"
   - Nom : `DEEPSEEK_API_KEY`
   - Valeur : Votre clé API DeepSeek
   - Projet : `studio-6437691961-3752d`

3. **Vérifier que le secret est référencé dans `apphosting.yaml`** :
   ```yaml
   secrets:
     - secret: RESEND_API_KEY
     - secret: GITHUB_TOKEN
     - secret: DEEPSEEK_API_KEY
   ```

### 2. Configuration Locale

Pour le développement local, créez un fichier `.env.local` :

```env
DEEPSEEK_API_KEY=votre_clé_api_ici
RESEND_API_KEY=re_QyQ7cScZ_L7xePczkYQ6GGe3s6Pjzq2SN
```

⚠️ **Important** : Ne commitez jamais `.env.local` dans Git (il est déjà dans `.gitignore`).

### 3. Vérification

Après le déploiement, testez l'assistant IA via le bouton flottant sur le site. Si vous voyez une erreur de configuration, vérifiez que :
- Le secret `DEEPSEEK_API_KEY` existe dans Google Cloud Secret Manager
- Le secret est bien référencé dans `apphosting.yaml`
- Le projet Firebase est correctement configuré
