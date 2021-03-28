import {CreateFetcher} from '../utils';
import createStore from "zustand";
import {getStorageCall} from '../utils';
import {clearDataService} from "../services/ClearData";
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
]

const languageMap = languages.reduce((map:{[x:string]:LanguageType}, language) => {
  map[language.value] = language;
  return map;
}, {});

const state:State = {
  language: languageMap["eng"],
};

const stateCreator = ():State => CreateFetcher(fetchStore, state);

// persist options
export const persistOptions = {
  name: "useLanguageStore", // set a unique name
  whitelist: ["language"],
  getStorage: getStorageCall,
};

// data will persist even after logout
clearDataService.excludeLocalStorageItem(persistOptions.name);

// create store
// @ts-ignore
export const useLanguageStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
export const get = useLanguageStore.getState;
export const getLanguage = ():LanguageType => get().language;

// setters
export const set = useLanguageStore.setState;
export const setLanguage = (language: LanguageType):void => set({language});

// hooks
export const useLanguage = ():LanguageType => useLanguageStore(fetchStore.language);
export const useRTL = ():boolean => Boolean(useLanguage().rtl);
