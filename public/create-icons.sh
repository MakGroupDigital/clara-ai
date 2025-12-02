#!/bin/bash

# Script pour créer les icônes PNG à partir du SVG
# Utilise sips (macOS) pour convertir SVG en PNG

cd "$(dirname "$0")"

echo "🎨 Création des icônes PNG pour PWA..."

# Créer un fichier SVG temporaire avec fond carré pour conversion
cat > /tmp/logo-square.svg << 'SVGEOF'
<svg width="512" height="512" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#000000"/>
  <g transform="translate(230, 230) scale(1)">
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: #8b5cf6; stop-opacity: 1" />
        <stop offset="100%" style="stop-color: #6366f1; stop-opacity: 1" />
      </linearGradient>
    </defs>
    <path d="M26 4C14.9543 4 6 12.9543 6 24C6 35.0457 14.9543 44 26 44C37.0457 44 46 35.0457 46 24C46 12.9543 37.0457 4 26 4Z" stroke="url(#logo-gradient)" stroke-width="1.5"/>
    <path d="M26 12V18" stroke="#6366f1" stroke-width="1.5"/>
    <path d="M26 30V36" stroke="#6366f1" stroke-width="1.5"/>
    <path d="M36 24H30" stroke="#6366f1" stroke-width="1.5"/>
    <path d="M22 24H16" stroke="#6366f1" stroke-width="1.5"/>
    <path d="M21 21L17 17" stroke="#8b5cf6" stroke-width="1.5"/>
    <path d="M31 21L35 17" stroke="#8b5cf6" stroke-width="1.5"/>
    <path d="M21 27L17 31" stroke="#8b5cf6" stroke-width="1.5"/>
    <path d="M31 27L35 31" stroke="#8b5cf6" stroke-width="1.5"/>
    <rect x="22" y="20" width="8" height="8" rx="1.5" fill="#000000" stroke="#6366f1" stroke-width="1.5"/>
  </g>
</svg>
SVGEOF

# Utiliser qlmanage ou créer directement avec Python/Node
if command -v qlmanage &> /dev/null; then
    echo "✅ Utilisation de qlmanage pour convertir..."
    qlmanage -t -s 512 -o . /tmp/logo-square.svg 2>/dev/null
    mv /tmp/logo-square.svg.png icon-512.png 2>/dev/null || true
fi

# Méthode alternative: utiliser Python si disponible
if command -v python3 &> /dev/null; then
    python3 << 'PYEOF'
from PIL import Image, ImageDraw
import os

# Créer une image 512x512 avec fond noir
img = Image.new('RGB', (512, 512), color='#000000')
draw = ImageDraw.Draw(img)

# Dessiner le logo (simplifié - cercle avec croix)
center = (256, 256)
radius = 200

# Cercle extérieur
draw.ellipse([center[0]-radius, center[1]-radius, center[0]+radius, center[1]+radius], 
             outline='#6366f1', width=8)

# Croix verticale
draw.line([center[0], center[1]-150, center[0], center[1]+150], fill='#6366f1', width=8)
# Croix horizontale
draw.line([center[0]-150, center[1], center[0]+150, center[1]], fill='#6366f1', width=8)

# Carré central
square_size = 80
draw.rectangle([center[0]-square_size//2, center[1]-square_size//2, 
                center[0]+square_size//2, center[1]+square_size//2], 
               outline='#6366f1', width=8)

img.save('icon-512.png')
print("✅ icon-512.png créé")

# Créer la version 192x192
img192 = img.resize((192, 192), Image.Resampling.LANCZOS)
img192.save('icon-192.png')
print("✅ icon-192.png créé")
PYEOF
fi

echo "✅ Icônes créées !"

