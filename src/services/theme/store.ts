import createStore from 'zustand'
import { CreateFetcher } from '../../utils'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { themeStyle } from './themeStyle'
import { Theme } from '@material-ui/core/styles'
import { createTheme } from './helpers'

// improve performance by fetching state
// from dynamically created functions
// functions are created on store creation time
const fetchStore: any = {
  // [state[key]]: state => state[state[key]],
};

type State = {
  themeStyle: ThemeOptions;
  theme: Theme;
}

const state:State = {
  themeStyle,
  theme: createTheme(themeStyle),
};

const stateCreator = ():State => CreateFetcher(fetchStore, state);

// create store
const useStore = createStore<State>(stateCreator);

// getters
const get = useStore.getState;
const getThemeStyle = ():ThemeOptions => get().themeStyle;
const getTheme = ():Theme => get().theme;

// setters
const set = useStore.setState;

const setTheme = (themeStyle: ThemeOptions):void => {
  // deep copy
  const theme = JSON.parse(JSON.stringify(themeStyle));

  set({
    themeStyle: theme,
    theme: createTheme(theme),
  })
};

export {
  fetchStore as fetchThemeStore,
  State as ThemeStoreState,
  state as themeStoreState,
  stateCreator as ThemeStoreStateCreator,
  useStore as useThemeStore,
  get as getThemeStore,
  set as setThemeStore,

  getTheme,
  getThemeStyle,
  setTheme,
}