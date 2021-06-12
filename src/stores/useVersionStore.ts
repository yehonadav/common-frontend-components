import { links } from '../utils'
import { useOnLoad } from '../hooks';
import { request } from '../api';
import { appConfig } from '../variables';
import { clearCachedData, getStorageCall } from '@yehonadav/safestorage'
import { alertService, setBackdrop } from '../services'
import { NullableString, PersistOptions } from '../types'
import { createStorePersist } from '../utils/createStorePersist'

type State = {
  version: NullableString,
};

const persistOptions: PersistOptions<State> = {
  name: "useVersionStore",
  whitelist: ["version"],
  getStorage: getStorageCall,
};

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStorePersist<State>({
  persistOptions,
  getDefaultValues: () => ({version: null}),
  persistAfterClearingStorage: true
})

// actions
const getVersion = () => get().version;

const setVersion = (version:NullableString) => set({version});

const getVersionDate = (version:NullableString):Date|void => {
  if (version) {
    const versionParsed = version.split(".").map(i => parseInt(i));
    // @ts-ignore
    return new Date(...versionParsed);
  }
};

// hooks
const useVersion = ():NullableString => useStore(fetchStore.version);

// global hook
const useUpdateVersion = () => {
  useOnLoad(()=>{
    const currentVersion = getVersionDate(get().version);
    console.log("currentVersion", currentVersion);

    request.get(appConfig.versionUrl||"")
      .then((responseDate: { version: NullableString; }) => {
        const latestVersion = getVersionDate(responseDate.version);

        console.log("latestVersion", latestVersion);

        if (!latestVersion)
          throw "failed to parse latest version";

        else if (!currentVersion)
          setVersion(responseDate.version);

        else if (currentVersion < latestVersion) {
          alertService.info("loading a new version", {timeout: 6000})
          setBackdrop(true);
          clearCachedData()
            .then(() => {
              setVersion(responseDate.version);
              links.refresh();
            })
            .catch((e) => alertService.error({'failed to load new version': e}))
            .finally(() => {setBackdrop(false)});
        }
      })
  });
};

export {
  fetchStore as fetchVersionStore,
  State as StateVersionStore,
  persistOptions as persistOptionsVersionStore,
  useStore as useVersionStore,
  get as getVersionStore,
  set as setVersionStore,

  getVersion,
  setVersion,

  getVersionDate,

  useVersion,
  useUpdateVersion,
}