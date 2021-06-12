import { safeStringify } from '@yehonadav/safestringify'
import { getStorageCall } from '@yehonadav/safestorage'
import { createStorePersist } from '../utils/createStorePersist'
import { PersistOptions } from '../types'

type State = {
  // persistent
  persistentMsg: string,

  // not persistent
  msg: string,
}

const state: State = {
  // persistent
  persistentMsg: '',

  // not persistent
  msg: '',
};

const persistOptions: PersistOptions<State> = {
  name: "useMessageStore",
  whitelist: ["persistentMsg"],
  getStorage: getStorageCall,
};

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStorePersist<State>({
  persistOptions,
  getDefaultValues: () => state,
});

// getters
const getMsg = ():string => get().msg;

// setters
const setMsg = (...args: any[]):void => set(() => ({msg: args.map(i=>(typeof i !== "string" ? safeStringify(i) : i)).join(" ")}));

// hooks
const useMsg = ():string => useStore(fetchStore.msg);

export {
  fetchStore as fetchMessageStore,
  State as MessageStoreState,
  state as messageStoreState,
  persistOptions as messageStorePersistOptions,
  useStore as useMessageStore,
  get as getMessageStore,
  set as setMessageStore,

  getMsg,
  setMsg,
  useMsg,
}