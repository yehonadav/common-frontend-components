import { Colors, colors } from './colors'
import { FontFamilies, fontFamilies } from './fontFamilies'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { borders, Borders } from './borders'
import { boxShadows, BoxShadows } from './boxShadows'
import { fonts, Fonts } from './fonts'
import { PaletteOptions } from '@material-ui/core/styles/createPalette'

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

export const ScrollbarStyle = {
  // https://css-tricks.com/the-current-state-of-styling-scrollbars/
  // https://stackoverflow.com/questions/53772429/material-ui-how-can-i-style-the-scrollbar-with-css-in-js
  '*::-webkit-scrollbar': {
    width: '12px',
    // backgroundColor: "#7CC7DF",
  },
  '*::-webkit-scrollbar-track': {
    backgroundColor: "#E1EBFB",
    // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: `${colors.primary}aa`,
    // outline: '1px solid slategrey'
  },
};

export const GlobalStyle = {
  html: {
    maxWidth: '100%',
    height: '100%', // fix react perfect scrollbar scrolling parent
    WebkitFontSmoothing: 'auto',
    overflowX: 'hidden',
    overflowY: 'hidden', // try to fix popover
    scrollBehavior: 'smooth',
  },

  body: {
    maxWidth: '100%',
    height: '100%', // fix react perfect scrollbar scrolling parent
    padding: 0,
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    // overflowY: 'scroll',
    overflowX: 'hidden',
    //WebkitOverflowScrolling: 'touch',
  },

  '#root': {
    height: "100%", // so that pages layout can take all the page
    width: "100%", // so that pages layout can take all the page
    // minWidth: '100vw', // don't do this
    minHeight: '100vh',
    backgroundColor: colors.background,
    // display: 'flex', // calc footer height, flex puts a small gap at the bottom
    // flexDirection: 'column',
  },

  // p: {
  //   fontSize: 16,
  // },

  a: {
    cursor: 'pointer',
  },

  code: {
    fontFamily: fontFamilies.code,
  },

  '.iti': {
    // width: '100%', // comment this so iti plays well with material ui text field
  },

  '.iti__arrow': {
    marginInlineStart: 6,
    marginLeft: '0!important',
  },

  '.my-swal': {
    zIndex: 9000,
  },

  '.swal2-container': {
    zIndex: '9000!important',
  },

  '.g-recaptcha': {
    transform: 'scale(0.2)',
    transformOrigin: '0 0',
  },

  /*fix table in mobile*/
  '.table': {
    overflowX: 'auto',
    display: 'block',
  },

  object: {
    pointerEvents: 'none', // try and fix mobile scrolling over svg issue (needs more work!)
  },
};

export interface IThemeStyle extends ThemeOptions {
  borders: Borders;
  boxShadows: BoxShadows;
  colors: Colors;
  fontFamilies: FontFamilies;
  fonts: Fonts;
  palette: PaletteOptions;
}

export const themeStyle:IThemeStyle = {
  // https://material-ui.com/customization/palette/
  palette: {
    type: 'light',

    primary: {
      main: colors.primary,
      contrastText: colors.contrastText,
    },

    secondary: {
      main: colors.secondary,
      contrastText: colors.contrastText,
    },

    error: {
      main: colors.error,
      contrastText: colors.contrastText,
    },

    warning: {
      main: colors.warning,
      contrastText: colors.contrastText,
    },

    info: {
      main: colors.info,
      contrastText: colors.contrastText,
    },

    success: {
      main: colors.success,
      contrastText: colors.contrastText,
    },

    neutral: {
      main: colors.neutral,
      contrastText: colors.contrastText,
    },
  },

  // https://material-ui.com/customization/typography/
  typography: {
    fontFamily: fontFamilies.typography,
  },

  // https://material-ui.com/customization/globals/
  overrides: {
    MuiCssBaseline: {
      // @ts-ignore
      '@global': GlobalStyle,
    },
  },

  borders,
  boxShadows,
  colors,
  fontFamilies,
  fonts,
};