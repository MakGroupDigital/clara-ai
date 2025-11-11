
'use client';

import { useLanguage } from '@/contexts/language-context';
import { get } from 'lodash';

export const useTranslation = () => {
  const { translations } = useLanguage();

  const t = (key: string, options?: { [key: string]: string | number }) => {
    let translation = get(translations, key, key);

    if (options) {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(`{${optionKey}}`, options[optionKey]);
      });
    }

    return translation;
  };

  return { t };
};
