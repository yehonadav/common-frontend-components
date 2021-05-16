import {CreateFetcher} from '../utils';
import createStore from "zustand";
import {getStorageCall} from '../utils';
import {clearDataService} from "@yehonadav/safestorage";
import {persist} from "zustand/middleware";

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

type LanguageType = {
  value: string;
  label: string;
  rtl?: boolean;
}

type State = {
  language: LanguageType;
}

const languages: LanguageType[] = [
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
]

// persist options
const persistOptions = {
  name: "useLanguageStore", // set a unique name
  whitelist: ["language"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

const createLanguageStore = (supportedLanguages: LanguageType[]=languages, defaultLanguageValue:string="eng") => {
  const languageMap = supportedLanguages.reduce((map:{[x:string]:LanguageType}, language) => {
    map[language.value] = language;
    return map;
  }, {});

  const state:State = {
    language: languageMap[defaultLanguageValue],
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
  languages,
  fetchStore as fetchLanguageStore,
  LanguageType,
  State as TlanguageStoreState,
  persistOptions as LanguageStorePersistOptions,
  createLanguageStore,
}