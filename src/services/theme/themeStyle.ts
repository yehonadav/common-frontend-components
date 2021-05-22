import {baseColors} from './baseColors'
import {fontFamilies} from './fontFamilies'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

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
    width: '14px',
    // backgroundColor: "#7CC7DF",
  },
  '*::-webkit-scrollbar-track': {
    backgroundColor: "#E1EBFB",
    // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: "#7CC7DF",
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
    backgroundColor: baseColors.background,
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

export const themeStyle:ThemeOptions = {
  // https://material-ui.com/customization/palette/
  palette: {
    type: 'light',

    primary: {
      main: baseColors.primary,
      contrastText: baseColors.contrastText,
    },

    secondary: {
      main: baseColors.secondary,
      contrastText: baseColors.contrastText,
    },

    error: {
      main: baseColors.error,
      contrastText: baseColors.contrastText,
    },

    warning: {
      main: baseColors.warning,
      contrastText: baseColors.contrastText,
    },

    info: {
      main: baseColors.info,
      contrastText: baseColors.contrastText,
    },

    success: {
      main: baseColors.success,
      contrastText: baseColors.contrastText,
    },

    neutral: {
      main: baseColors.neutral,
      contrastText: baseColors.contrastText,
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
};