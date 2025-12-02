import React from 'react';

/**
 * Nettoie le texte des réponses de l'IA en supprimant le markdown
 * et en formatant le texte de manière lisible
 */
export function formatMessage(text: string): string {
  if (!text) return '';
  
  let cleaned = text;
  
  // Supprimer les caractères markdown
  cleaned = cleaned
    // Supprimer les astérisques pour le gras (**texte** -> texte)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Supprimer les underscores pour l'italique (__texte__ -> texte, _texte_ -> texte)
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Supprimer les backticks pour le code (`code` -> code)
    .replace(/`([^`]+)`/g, '$1')
    // Supprimer les hashtags pour les titres (# Titre -> Titre)
    .replace(/^#{1,6}\s+/gm, '')
    // Supprimer les listes markdown (* item -> - item, mais garder le tiret)
    .replace(/^\*\s+/gm, '- ')
    // Nettoyer les espaces multiples
    .replace(/\s{3,}/g, ' ')
    // Nettoyer les sauts de ligne multiples (garder max 2)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  return cleaned;
}

/**
 * Formate le texte pour l'affichage avec préservation des sauts de ligne et formatage visuel
 */
export function formatMessageForDisplay(text: string): React.ReactNode {
  const cleaned = formatMessage(text);
  
  // Diviser par les sauts de ligne
  const lines = cleaned.split('\n');
  const elements: React.ReactNode[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Ligne vide = saut de ligne
    if (!trimmedLine) {
      if (index > 0 && index < lines.length - 1) {
        elements.push(<br key={`br-${index}`} />);
      }
      return;
    }
    
    // Ligne commençant par "- " = élément de liste avec puce visuelle
    if (trimmedLine.startsWith('- ')) {
      elements.push(
        <div key={`list-${index}`} className="flex items-start gap-2 my-1">
          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
          <span className="flex-1">{trimmedLine.substring(2)}</span>
        </div>
      );
      return;
    }
    
    // Ligne normale = paragraphe
    elements.push(
      <p key={`p-${index}`} className={elements.length > 0 ? 'mt-2 first:mt-0' : ''}>
        {trimmedLine}
      </p>
    );
  });
  
  return <>{elements}</>;
}

