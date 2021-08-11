import { IThemeStyle, themeStyle } from './themeStyle'
import { Theme } from '@material-ui/core/styles'
import { createTheme } from './helpers'
import { createStore } from '../../utils/createStore'

type State = {
  themeStyle: IThemeStyle;
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
const getThemeStyle = ():IThemeStyle => get().themeStyle;
const getTheme = ():Theme => get().theme;

// setters
const setTheme = (themeStyle: IThemeStyle):void => {
  // deep copy -> might be an issue with ThemeOptions: typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
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