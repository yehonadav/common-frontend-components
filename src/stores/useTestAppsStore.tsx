import React, {FC} from "react";
import { getStorageCall } from '@yehonadav/safestorage'
import { createStorePersist } from '../utils/createStorePersist'
import { PersistOptions } from '../types'

type TtestAppsStoreOption = {
  label: string;
  Component: FC
}

type TtestAppsStoreOptions = Record<string, TtestAppsStoreOption>;

const NoAppTestAppsStoreOption:TtestAppsStoreOption = {label: "NoApp", Component: ():null => null};

// state type
type State = {
  selectedApp: string,
};

const createTestAppsStore = (name:string, apps:TtestAppsStoreOptions, initialState:State) => {
  const appsOptions = Object.values(apps)

  // persist options
  const persistOptions:PersistOptions<State> = {
    name,
    whitelist: ["selectedApp"],
    getStorage: getStorageCall,
  };

  const {
    fetchStore,
    useStore,
    get,
    set,
  } = createStorePersist<State>({
    persistOptions,
    getDefaultValues: () => initialState,
    persistAfterClearingStorage: true,
  });

  const setSelectedApp = (selectedApp:string):void => set({selectedApp});

  // actions
  const onSelectApp = (event: React.ChangeEvent<{ value: unknown }>):void => {
    setSelectedApp(event.target.value as string);
  };

  // hooks
  const useCurrentlyTestedApp = ():TtestAppsStoreOption => {
    const selectedApp: string = useStore(fetchStore.selectedApp);

    if (!apps[selectedApp])
      return NoAppTestAppsStoreOption;

    return apps[selectedApp];
  };

  return {
    appsOptions,
    fetchApp: fetchStore,
    persistOptions,
    useTestAppsStore: useStore,
    get,
    set,
    onSelectApp,
    useCurrentlyTestedApp,
  }
}

export {
  TtestAppsStoreOption,
  TtestAppsStoreOptions,
  NoAppTestAppsStoreOption,
  State as StateTestAppsStore,
  createTestAppsStore,
}