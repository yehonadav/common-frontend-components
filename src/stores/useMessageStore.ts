import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {getStorageCall} from '../utils'
import {CreateFetcher} from '../utils'
import { safeStringify } from '@yehonadav/safestringify'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

type State = {
  // persistent
  persistentMsg: string,

  // not persistent
  msg: string,
}

// state initial values
const state: State = {
  // persistent
  persistentMsg: '',

  // not persistent
  msg: '',
};

// create state and update fetch function
const stateCreator = ():State => CreateFetcher(fetchStore, state);

// persist options
const persistOptions = {
  name: "useMessageStore",
  whitelist: ["persistentMsg"],
  getStorage: getStorageCall,
};

// create store
// @ts-ignore
const useStore = createStore<State>(persist(stateCreator, persistOptions));

// getters
const get = useStore.getState;
const getMsg = ():string => get().msg;

// setters
const set = useStore.setState;
const setMsg = (...args: any[]):void => set(() => ({msg: args.map(i=>(typeof i !== "string" ? safeStringify(i) : i)).join(" ")}));

// hooks
const useMsg = ():string => useStore(fetchStore.msg);

export {
  fetchStore as fetchMessageStore,
  State as TmessageStoreState,
  state as messageStoreState,
  stateCreator as messageStoreStateCreator,
  persistOptions as messageStorePersistOptions,
  useStore as useMessageStore,
  get as getMessageStore,
  set as setMessageStore,

  getMsg,
  setMsg,
  useMsg,
}