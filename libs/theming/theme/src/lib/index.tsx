import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import breakpointsX from './breakpoints';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import componentsOverride from './overrides';
import GlobalStyles from './globalStyles';
import borderRadius from './borderRadius';
import { StyledEngineProvider } from '@material-ui/styled-engine';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, PaletteOptions, ThemeOptions } from '@material-ui/core';
import { Shadows } from '@material-ui/core/styles/shadows';
import { Typography } from '@material-ui/core/styles/createTypography';

// ----------------------------------------------------------------------

export const darkTheme = {
  themeName: 'Main Dark Theme',
  palette: palette.dark as PaletteOptions,
  shadows: shadows.dark as Shadows,
  typography: typography as Typography,
  shape: borderRadius,
  breakpoints: breakpointsX,

  components: componentsOverride({
    theme: {
      palette: palette.dark,
      shadows: shadows.dark,
      typography: typography,
      shape: borderRadius,
    },
  }),
};
darkTheme.palette.mode = 'dark';

export const lightTheme = {
  themeName: 'Main Light Theme',
  palette: palette.light as PaletteOptions,
  shadows: shadows.light as Shadows,
  typography: typography as Typography,
  shape: borderRadius,
  breakpoints: breakpointsX,

  components: componentsOverride({
    theme: {
      palette: palette.light,
      shadows: shadows.light,
      typography: typography,
      shape: borderRadius,
    },
  }),
};

function deepOverrideObject<T extends { [key: string]: any }>(original: T, overrides: T): T {
  const copy = { ...original };
  for (const [key, value] of Object.entries(original)) {
    if (overrides[key] !== undefined) {
      if ((typeof overrides[key] === 'object' || typeof overrides[key] === 'symbol') && !Array.isArray(overrides[key])) {
        //@ts-ignore
        copy[key] = deepOverrideObject(value, overrides[key]);
      } else {
        //@ts-ignore
        copy[key] = overrides[key];
      }
    }
  }
  return copy;
}

export function ThemeConfig({ children, themeOverrides }: { children: any; themeOverrides: ThemeOptions }) {
  const isLight = true; // useSelector(state => !state.theme.darkMode);

  const themeOptions: ThemeOptions = isLight ? lightTheme : darkTheme;

  const theme = useMemo(() => createMuiTheme(themeOptions), []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={(theme) => createMuiTheme(deepOverrideObject(theme, themeOverrides ?? {}))}>
        <StyledEngineProvider injectFirst>
          {/* <CssBaseline /> */}
          {/* <GlobalStyles /> */}
          {children}
        </StyledEngineProvider>
      </ThemeProvider>
    </ThemeProvider>
  );
}
