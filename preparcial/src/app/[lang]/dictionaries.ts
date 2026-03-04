// src/app/[lang]/dictionaries.ts
import 'server-only';

const dictionaries = {
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export async function getDictionary(lang: 'es' | 'en') {
  return dictionaries[lang]();
}