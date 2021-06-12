import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { themeStyle } from './themeStyle'
import { Theme } from '@material-ui/core/styles'
import { createTheme } from './helpers'
import { createStore } from '../../utils/createStore'

type State = {
  themeStyle: ThemeOptions;
  theme: Theme;
}

const state:State = {
  themeStyle,
  theme: createTheme(themeStyle),
};

const {
  fetchStore,
  useStore,
  get,
  set,
} = createStore<State>({ getDefaultValues: () => state });

// getters
const getThemeStyle = ():ThemeOptions => get().themeStyle;
const getTheme = ():Theme => get().theme;

// setters
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
  useStore as useThemeStore,
  get as getThemeStore,
  set as setThemeStore,

  getTheme,
  getThemeStyle,
  setTheme,
}