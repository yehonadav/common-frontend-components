import { getStorageCall } from '@yehonadav/safestorage'
import { LanguageType } from './types'
import { languageMap, languages } from './variables'
import { createStorePersist } from '../../utils/createStorePersist'
import { PersistOptions } from '../../types'

type State = {
  language: LanguageType;
  selected: boolean;
  supportedLanguages: LanguageType[];
}

// persist options
const persistOptions: PersistOptions<State> = {
  name: "useLanguageStore", // set a unique name
  whitelist: ["language", "selected"],
  getStorage: getStorageCall,
};

const state:State = {
  language: languageMap["eng"],
  selected: false,
  supportedLanguages: languages,
};

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStorePersist<State>({
  persistOptions,
  getDefaultValues: () => state,
  persistAfterClearingStorage: true,
});

// getters
const getLanguage = ():LanguageType => get().language;
const getIsLanguageSelected = ():boolean => get().selected;
const getSupportedLanguages = ():LanguageType[] => get().supportedLanguages;

// setters
const setLanguage = (language: LanguageType):void => set({language});
const setSupportedLanguages = (supportedLanguages:LanguageType[]):void => set({supportedLanguages});

const setDefaultLanguage = (language: LanguageType):void => {
  const isSelected = getIsLanguageSelected();

  if (!isSelected)
    set({
      language,
      selected: true,
    });
};

// hooks
const useLanguage = ():LanguageType => useStore(fetchStore.language);
const useRTL = ():boolean => Boolean(useLanguage().rtl);
const useIsLanguageSelected = ():boolean => useStore(fetchStore.selected);
const useSupportedLanguages = ():LanguageType[] => useStore(fetchStore.supportedLanguages);

export {
  fetchStore as fetchLanguageStore,
  LanguageType,
  State as LanguageStoreState,
  state as languageStoreState,
  persistOptions as LanguageStorePersistOptions,
  useStore as useLanguageStore,
  get as getLanguageStore,
  set as setLanguageStore,

  getLanguage,
  getSupportedLanguages,

  setLanguage,
  setDefaultLanguage,
  setSupportedLanguages,

  useLanguage,
  useRTL,
  useIsLanguageSelected,
  useSupportedLanguages,
}