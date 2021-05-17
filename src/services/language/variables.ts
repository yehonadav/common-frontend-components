import { LanguageType } from './types'

export const languages: LanguageType[] = [
  {
    value: "eng",
    label: "English",
    rtl: false,
  },
  {
    value: "heb",
    label: "עברית",
    rtl: true,
  },
];

export const languageMap = languages.reduce((map:{[x:string]:LanguageType}, language) => {
  map[language.value] = language;
  return map;
}, {});