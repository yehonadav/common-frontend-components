export type Colors = {
  contrastText: string;
  primary: string;
  secondary: string;
  secondaryLight: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  neutral: string;
  default: string;
  background: string;
  blue: string;
  rose: string;
  red: string;
  border: string;
  transparent: string;
  grey1: string;
  scrollbarTrack: string;
  btn: {
    red: string;
    red_focused: string;
    green: string;
    green_focused: string;
    blue_focused: string;
    secondaryDark: string;
    secondary: string;
    secondary_focused: string;
    primary: string;
    primary_focused: string;
    primary_light: string;
    gradient1: string;
    gradient2: string;
  },
  text: {
    primary: string;
    small_text: string;
    header2_text: string;
    post_card: string;
    learn_more: string;
    promote: string;
    disabled: string;
    title: string;
  },
  bg: {
    blue: string;
    light_blue: string;
  }
}

export const primary = '#5e9fff';
export const secondaryLight = '#ff369a';
export const secondary = '#DF197C';

export const colors:Colors = {
  contrastText: '#ffffff',
  primary,
  secondary,
  secondaryLight,
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  success: '#4caf50',
  neutral: '#5c6ac4',
  default: 'rgba(0, 0, 0, 0.54)',
  background: '#f7f8fa',

  blue: '#03a9f4',
  rose: '#e91e63',
  red: '#fb6144',

  border: '#dbdbdb',
  transparent: 'transparent',

  grey1: "#9C99A5",

  scrollbarTrack: "#E1EBFB",

  btn: {
    red: 'rgb(207, 79, 79)',
    red_focused: '#ff5959',
    green: '#66cca0',
    green_focused: '#38a982',
    blue_focused: '#3474a9',
    secondaryDark: secondary,
    secondary,
    secondary_focused: "#e32c87",
    primary,
    primary_focused: "#5c92cb",
    primary_light: "#7fb8ff",
    gradient1: "#fe1c8d",
    gradient2: "#b13473",
  },

  text: {
    primary: '#dbdbdb',
    small_text: '#454545',
    header2_text: '#777777',
    post_card: '#888888',
    learn_more: '#555555',
    promote: "#51ce56",
    disabled: '#b1b1b1',
    title: "#E1EBFB",
  },

  bg: {
    blue: "#46628A",
    light_blue: "#EBF4F6",
  }
};
