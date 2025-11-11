
# Etape 1: Installation des dépendances
# Utilise une image Node.js officielle comme base.
FROM node:20-slim AS deps

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de dépendances
COPY package.json ./

# Installe les dépendances du projet
RUN npm install --omit=dev

# Etape 2: Construction de l'application
# Utilise la même image Node.js pour la cohérence
FROM node:20-slim AS builder

WORKDIR /app

# Copie les dépendances depuis l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
# Copie le reste du code source de l'application
COPY . .

# Construit l'application Next.js pour la production
RUN npm run build

# Etape 3: Production
# Utilise une image Node.js légère pour l'exécution
FROM node:20-slim AS runner

WORKDIR /app

# Définit l'environnement sur "production"
ENV NODE_ENV=production

# Copie les fichiers de build depuis l'étape "builder"
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose le port sur lequel l'application s'exécutera
EXPOSE 3000

# La commande pour démarrer le serveur Next.js en mode production
CMD ["node", "server.js"]

    