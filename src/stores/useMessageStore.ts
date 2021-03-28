import createStore from 'zustand'
import {persist} from 'zustand/middleware'
import {getStorageCall} from '../utils/persist'
import produce from 'immer'
import {CreateFetcher} from '../utils/storeFetchFunctions'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
export const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

// persist options
export const persistOptions = {
  name: "useMessageStore",
  whitelist: ["persistentMsg"],
  getStorage: getStorageCall,
};

export const useMessageStore = createStore(
  persist(
    (set: any, get: any) => CreateFetcher(fetchStore, {
      // persistent
      persistentMsg: '',

      // not persistent
      msg: '',

      // getters
      get,
      getMsg: () => get().msg,

      // setters
      setState: set,
      set: (fn: any) => set(produce(fn)),
      setMsg: (...args: any[]) => set(() => ({msg: args.map(i=>(typeof i !== "string" ? JSON.stringify(i) : i)).join(" ")})),
    }),
    // @ts-ignore
    persistOptions,
  )
);

export const useMsg = ():string => useMessageStore(fetchStore.msg);
export const getMsg = ():string => useMessageStore.getState().msg;
export const setMsg = (...args: any[]) => useMessageStore.getState().setMsg(...args);
