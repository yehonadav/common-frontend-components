import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useCustomTheme } from './hooks'

export const AppTheme = ({children}:{children: JSX.Element}): JSX.Element => {
  return (
    <ThemeProvider theme={useCustomTheme()}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  );
};
