export type FontFamilies = {
  typography: string;
  paragraph: string;
  code: string;
}

export const fontFamilies:FontFamilies = {
  typography: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),

  paragraph: 'arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif',

  code: [
    "source-code-pro",
    "Menlo",
    "Monaco",
    "Consolas",
    "'Courier New'",
    "monospace",
  ].join(','),

};