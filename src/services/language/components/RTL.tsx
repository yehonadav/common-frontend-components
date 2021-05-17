import React, { ReactNode, useEffect } from 'react'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { useRTL } from '../store'

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const RTL = ({ children }:{children:ReactNode}) => {
  const isRtl = useRTL();

  useEffect(() => {
    document.body.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [isRtl]);

  if (!isRtl)
    return children;

  return (
    <StylesProvider jss={jss}>
      {children}
    </StylesProvider>
  );
}