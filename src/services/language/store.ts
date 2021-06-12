import { CreateFetcher } from '../../utils'
import createStore from 'zustand'
import { clearDataService, getStorageCall } from '@yehonadav/safestorage'
import { persist } from 'zustand/middleware'
import { LanguageType } from './types'
import { languageMap, languages } from './variables'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

type State = {
  language: LanguageType;
  selected: boolean;
  supportedLanguages: LanguageType[];
}

// persist options
const persistOptions = {
  name: "useLanguageStore", // set a unique name
  whitelist: ["language", "selected"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

const state:State = {
  language: languageMap["eng"],
  selected: false,
  supportedLanguages: languages,
};

const stateCreator = ():State => CreateFetcher(fetchStore, state);

// create store
// @ts-ignore
const useStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
const get = useStore.getState;
const getLanguage = ():LanguageType => get().language;
const getIsLanguageSelected = ():boolean => get().selected;
const getSupportedLanguages = ():LanguageType[] => get().supportedLanguages;

// setters
const set = useStore.setState;
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
  stateCreator as LanguageStoreStateCreator,
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