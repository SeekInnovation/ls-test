import { addDecorator } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { darkTheme, lightTheme } from '@theming/theme';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StyledEngineProvider } from '@material-ui/styled-engine';
import { useMemo, useEffect } from 'react';
// import { withThemes } from '@react-theming/storybook-addon';
// import { ThemeConfig } from '@base/web/theme';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import { de, en } from '@base/translations';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

const resources = { en: { common: en }, de: { common: de } };
// const resources = { en: {translation: en}, de: {translation: de} };

const localeMap = {
  en: enLocale,
  de: deLocale,
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    ns: ['core', 'common'],
    defaultNS: 'common',
    // lng: 'de',
    // nsSeparator: '.',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

addDecorator(withKnobs);
// addDecorator(withThemes(ThemeProvider, [createMuiTheme(lightTheme), createMuiTheme(darkTheme)]));
addDecorator((Story) => {
  const isLight = !boolean('DarkTheme', false);
  const language = select(
    'Language',
    {
      Deutsch: 'de',
      English: 'en',
    },
    'en'
  );

  const themeOptions = isLight ? lightTheme : darkTheme;

  const theme = useMemo(() => createMuiTheme(themeOptions, localeMap[language]), [isLight, language]);
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[language]}>
        <StyledEngineProvider injectFirst>
          <Story />
        </StyledEngineProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
});
