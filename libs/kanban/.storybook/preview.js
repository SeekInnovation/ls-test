/* eslint-disable react/react-in-jsx-scope */
import { addDecorator } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { darkTheme, lightTheme } from '@theming/theme';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { StyledEngineProvider } from '@material-ui/styled-engine';
import { useMemo, useEffect } from 'react';
// import { withThemes } from '@react-theming/storybook-addon';
// import { ThemeConfig } from '@base/web/theme';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

// const resources = { en: {translation: en}, de: {translation: de} };

const localeMap = {
  en: enLocale,
  de: deLocale,
};

addDecorator(withKnobs);
// addDecorator(withThemes(ThemeProvider, [createMuiTheme(lightTheme), createMuiTheme(darkTheme)]));
addDecorator((Story) => {
  const isLight = !boolean('DarkTheme', false);

  const themeOptions = isLight ? lightTheme : darkTheme;

  const theme = useMemo(() => createTheme(themeOptions, localeMap.en), [themeOptions]);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap.en}>
        <StyledEngineProvider injectFirst>
          <Story />
        </StyledEngineProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
});
