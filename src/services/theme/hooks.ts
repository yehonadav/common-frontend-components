import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useMobile } from '../../stores'
import { useEffect } from 'react'
import { GlobalStyle, IThemeStyle, ScrollbarStyle } from './themeStyle'
import { fetchThemeStore, getThemeStyle, setTheme, useThemeStore } from './store'
import { Theme } from '@material-ui/core/styles'
import { useRTL } from '../language'

export const useThemeStyle = ():IThemeStyle => useThemeStore(fetchThemeStore.themeStyle);
export const useCustomTheme = ():Theme => useThemeStore(fetchThemeStore.theme);

export const useThemeDarkMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const theme = getThemeStyle();

    if (theme.palette) {
      // handle dark mode
      theme.palette.type = prefersDarkMode ? 'dark' : 'light';

      setTheme(theme);
    }
  }, [prefersDarkMode]);
}

export const useThemeResponsive = () => {
  const isMobile = useMobile();

  useEffect(() => {
    const theme = getThemeStyle();

    if (theme.overrides?.MuiCssBaseline?.['@global']) {
      ScrollbarStyle['*::-webkit-scrollbar-thumb'].backgroundColor = `${theme.colors.primary}aa`;
      // style scrollbar for desktop
      // @ts-ignore
      theme.overrides.MuiCssBaseline['@global'] = [true, null].includes(isMobile) ? GlobalStyle : {...ScrollbarStyle, ...GlobalStyle};

      setTheme(theme);
    }
  }, [isMobile]);
}

export const useThemeRtl = () => {
  const isRtl = useRTL();

  useEffect(() => {
    const theme = getThemeStyle();
    theme.direction = isRtl ? 'rtl' : 'ltr';
    setTheme(theme);
  }, [isRtl])
}