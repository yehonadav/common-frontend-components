import { createStore } from '../../utils/createStore'

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStore<{ open: boolean; clicked: boolean }>({
  getDefaultValues: () => ({
    open: false,
    clicked: false,
  })
});

export {
  fetchStore as fetchInstallStore,
  useStore as useInstallStore,
  get as getInstallStore,
  set as setInstallStore,
}
