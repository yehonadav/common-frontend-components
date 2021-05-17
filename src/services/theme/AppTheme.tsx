import React, { FC, ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useCustomTheme } from './hooks'

export const AppTheme:FC<{children: ReactNode}> = ({children}) => {
  return (
    <ThemeProvider theme={useCustomTheme()}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  );
};
