import { CreateFetcher, getStorageCall } from '../../utils'
import createStore from 'zustand'
import { clearDataService } from '@yehonadav/safestorage'
import { persist } from 'zustand/middleware'
import { LanguageType } from './types'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

type State = {
  language: LanguageType;
}

// persist options
const persistOptions = {
  name: "useLanguageStore", // set a unique name
  whitelist: ["language"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

const createLanguageStore = (supportedLanguages: LanguageType[], defaultLanguageValue:LanguageType) => {
  const languageMap = supportedLanguages.reduce((map:{[x:string]:LanguageType}, language) => {
    map[language.value] = language;
    return map;
  }, {});

  const state:State = {
    language: languageMap[defaultLanguageValue.value],
  };

  const stateCreator = ():State => CreateFetcher(fetchStore, state);

  // create store
  // @ts-ignore
  const useStore = createStore<State>(persist(stateCreator, persistOptions));

  // getters
  const get = useStore.getState;
  const getLanguage = ():LanguageType => get().language;

  // setters
  const set = useStore.setState;
  const setLanguage = (language: LanguageType):void => set({language});

  // hooks
  const useLanguage = ():LanguageType => useStore(fetchStore.language);
  const useRTL = ():boolean => Boolean(useLanguage().rtl);

  return {
    useStore,
    get,
    getLanguage,
    set,
    setLanguage,
    useLanguage,
    useRTL,
    languageMap
  }
}

export {
  fetchStore as fetchLanguageStore,
  State as LanguageStoreStateType,
  persistOptions as languageStorePersistOptions,
  createLanguageStore,
}