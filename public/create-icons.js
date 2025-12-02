const sharp = require('sharp');
const fs = require('fs');

// Lire le SVG
const svgBuffer = fs.readFileSync('./logo.svg');

// Créer l'icône 512x512
sharp(svgBuffer)
  .resize(512, 512, {
    background: { r: 0, g: 0, b: 0, alpha: 1 }
  })
  .png()
  .toFile('icon-512.png')
  .then(() => {
    console.log('✅ icon-512.png créé');
    
    // Créer l'icône 192x192
    return sharp(svgBuffer)
      .resize(192, 192, {
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      })
      .png()
      .toFile('icon-192.png');
  })
  .then(() => {
    console.log('✅ icon-192.png créé');
    console.log('✅ Toutes les icônes ont été créées !');
  })
  .catch(err => {
    console.error('❌ Erreur:', err);
    process.exit(1);
  });

