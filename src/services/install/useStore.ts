import { createStore } from '../../utils/createStore'

const {
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
  useStore as useInstallStore,
  get as getInstallStore,
  set as setInstallStore,
}
