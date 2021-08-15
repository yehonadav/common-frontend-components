import { createStorePersist } from '../../../utils'
import { PersistOptions } from '../../../types'
import { getStorageCall } from '@yehonadav/safestorage'

type State = {
  registeredOnce: boolean;
}

const persistOptions: PersistOptions<State> = {
  name: "common-frontend-components/services/account/stores/registerStore", // set a unique name
  whitelist: ["registeredOnce"],
  getStorage: getStorageCall,
};

const state:State = {
  registeredOnce: false,
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

export const getRegisteredOnce = () => get().registeredOnce;
export const setRegisteredOnce = (registeredOnce:boolean) => set({registeredOnce});
export const useRegisteredOnce = () => useStore(fetchStore.registeredOnce);
