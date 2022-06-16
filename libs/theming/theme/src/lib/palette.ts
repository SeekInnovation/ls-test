import { alpha, PaletteColorOptions, PaletteOptions, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// Setup Colors

const GREY = {
  0: '#FFFFFF',
  50: '#fcfcfc',
  100: '#fcfcfc',
  200: '#F2F2F2',
  300: '#E8E8E8',
  400: '#D6D6D6',
  500: '#BEBEBE',
  600: '#A3A3A3',
  700: '#818181',
  800: '#474747',
  900: '#191919',
  500_8: alpha('#BEBEBE', 0.08),
  500_12: alpha('#BEBEBE', 0.12),
  500_16: alpha('#BEBEBE', 0.16),
  500_24: alpha('#BEBEBE', 0.24),
  500_32: alpha('#BEBEBE', 0.32),
  500_48: alpha('#BEBEBE', 0.48),
  500_56: alpha('#BEBEBE', 0.56),
  500_80: alpha('#BEBEBE', 0.8),
};

const PRIMARY = {
  lighter: '#4D8192',
  light: '#1A5E73',
  main: '#004C63',
  dark: '#004459',
  darker: '#003545',
};
const SECONDARY = {
  lighter: GREY[300],
  light: GREY[400],
  main: GREY[600],
  dark: GREY[700],
  darker: GREY[800],
};
const DEFAULT = {
  lighter: GREY[500_8],
  light: GREY[500_16],
  main: GREY[500_32],
  dark: GREY[500_48],
  darker: GREY[500_80],
};
const INFO = {
  lighter: '#E5F5FB',
  light: '#6F80A4',
  main: '#009CD9',
  dark: '#55668A',
  darker: '#424F6C',
};
const SUCCESS = {
  lighter: '#D8F9EA',
  light: '#43B982',
  main: '#2EB174',
  dark: '#299F68',
  darker: '#207C51',
};
const WARNING = {
  lighter: '#FFF4DB',
  light: '#FFB41A',
  main: '#FFAB00',
  dark: '#E59A00',
  darker: '#B27800',
};
const ERROR = {
  lighter: '#FBEDED',
  light: '#D96666',
  main: '#D55555',
  dark: '#BF4C4C',
  darker: '#953B3B',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

export type PaletteType<T extends PaletteOptions> = { light: T; dark: T };

// extend Palette with custom properties
declare module '@material-ui/core/styles' {
  interface Palette {
    kanbanListBackground: string;
    kanbanListBackgroundOnDraggingOver: string;
  }
}

const Palette = {
  // LIGHT
  light: {
    mode: 'light',
    primary: {
      lighter: PRIMARY.lighter,
      light: PRIMARY.light,
      main: PRIMARY.main,
      dark: PRIMARY.dark,
      darker: PRIMARY.darker,
      contrastText: '#fff',
    },
    secondary: {
      lighter: SECONDARY.lighter,
      light: SECONDARY.light,
      main: SECONDARY.main,
      dark: SECONDARY.dark,
      darker: SECONDARY.darker,
      contrastText: GREY[100],
    },
    info: {
      lighter: INFO.lighter,
      light: INFO.light,
      main: INFO.main,
      dark: INFO.dark,
      darker: INFO.darker,
      contrastText: '#fff',
    },
    success: {
      lighter: SUCCESS.lighter,
      light: SUCCESS.light,
      main: SUCCESS.main,
      dark: SUCCESS.dark,
      darker: SUCCESS.darker,
      contrastText: '#fff',
    },
    warning: {
      lighter: WARNING.lighter,
      light: WARNING.light,
      main: WARNING.main,
      dark: WARNING.dark,
      darker: WARNING.darker,
      contrastText: '#fff',
    },
    error: {
      lighter: ERROR.lighter,
      light: ERROR.light,
      main: ERROR.main,
      dark: ERROR.dark,
      darker: ERROR.darker,
      contrastText: '#fff',
    },
    default: {
      lighter: DEFAULT.lighter,
      light: DEFAULT.light,
      main: DEFAULT.main,
      dark: DEFAULT.dark,
      darker: DEFAULT.darker,
    },
    grey: GREY,
    gradients: GRADIENTS,
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    divider: GREY[500_24],
    background: {
      paper: '#fff',
      default: '#fff',
      neutral: GREY[200],
      gray: GREY[200],
      grayLight: GREY[100],
      grayDark: GREY[400],
    },
    action: {
      active: GREY[600],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },

    kanbanListBackground: GREY[200],
    kanbanListBackgroundOnDraggingOver: GREY[300],
  },

  // DARK
  dark: {
    mode: 'dark',
    primary: {
      lighter: PRIMARY.lighter,
      light: PRIMARY.lighter,
      main: PRIMARY.light,
      dark: PRIMARY.main,
      darker: PRIMARY.dark,
      contrastText: '#fff',
    },
    secondary: {
      lighter: GREY[400],
      light: GREY[500],
      main: GREY[700],
      dark: GREY[800],
      darker: GREY[900],
      contrastText: '#fff',
    },
    info: {
      lighter: INFO.lighter,
      light: INFO.light,
      main: INFO.main,
      dark: INFO.dark,
      darker: INFO.darker,
      contrastText: '#fff',
    },
    success: {
      lighter: SUCCESS.lighter,
      light: SUCCESS.light,
      main: SUCCESS.main,
      dark: SUCCESS.dark,
      darker: SUCCESS.darker,
      contrastText: '#fff',
    },
    warning: {
      lighter: WARNING.lighter,
      light: WARNING.light,
      main: WARNING.main,
      dark: WARNING.dark,
      darker: WARNING.darker,
      contrastText: '#fff',
    },
    error: {
      lighter: ERROR.lighter,
      light: ERROR.light,
      main: ERROR.main,
      dark: ERROR.dark,
      darker: ERROR.darker,
      contrastText: '#fff',
    },
    default: {
      lighter: DEFAULT.lighter,
      light: DEFAULT.light,
      main: DEFAULT.main,
      dark: DEFAULT.dark,
      darker: DEFAULT.darker,
    },

    grey: GREY,
    gradients: GRADIENTS,

    text: {
      primary: '#ffffff',
      secondary: GREY[500],
      disabled: GREY[600],
    },

    divider: GREY[500_24],

    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
      gray: GREY[700],
      grayLight: GREY[800],
      grayDark: GREY[600],
    },

    action: {
      active: GREY[500],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },

    kanbanListBackground: GREY[800],
    kanbanListBackgroundOnDraggingOver: GREY[700],
  },
};

function createActionColors(...keys: string[]) {
  for (const key of keys) {
    const colors = Palette.light[key];
    Palette.light[key + 'Action'] = {
      ligher: colors.main,
      light: colors.main,
      main: colors.lighter,
      dark: alpha(colors.main, 0.4),
      darker: alpha(colors.main, 0.6),
      contrastText: colors.main,
    };
    Palette.dark[key + 'Action'] = {
      ligher: colors.main,
      light: colors.main,
      main: colors.lighter,
      dark: alpha(colors.main, 0.4),
      darker: alpha(colors.main, 0.6),
      contrastText: colors.main,
    };
  }
}
export const mainColors: (keyof typeof Palette.light)[] = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'];

mainColors.forEach((c) => mainColors.push((c + 'Action') as any));

createActionColors(...mainColors);

export default Palette;

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    gray: string;
    grayLight: string;
    grayDark: string;
    neutral: string;
  }
}

declare module '@material-ui/core/styles/' {
  // interface Theme {
  //   background: {
  //     neutral: string;
  //     gray: string;
  //     grayLight: string;
  //     grayDark: string;
  //   }
  // }
  // interface ThemeOptions {
  //   background: {
  //     neutral: React.CSSProperties['color'];
  //     gray: React.CSSProperties['color'];
  //     grayLight: React.CSSProperties['color'];
  //     grayDark: React.CSSProperties['color'];
  //   }
  // }

  // interface Palette {
  //   neutral: Palette['primary'];
  // }
  // interface PaletteOptions {
  //   neutral: PaletteOptions['primary'];
  // }

  interface PaletteColor {
    darker: string;
    lighter: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
    lighter?: string;
  }
}
