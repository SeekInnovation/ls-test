// ----------------------------------------------------------------------

export default function ToggleButton({ theme }) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500_80],
          border: `solid 1px ${theme.palette.grey[500_32]}`,
          '&$selected': {
            color: theme.palette.grey[isLight ? 600 : 0],
            backgroundColor: theme.palette.action.selected
          },
          '&$disabled': {
            color: theme.palette.action.disabledBackground
          }
        }
      }
    }
  };
}

declare module '@material-ui/core/ToggleButton' {
  interface ToggleButtonPropsColorOverrides {
    error: true;
    success: true;
    warning: true;
    info: true;
    primaryAction: true
    secondaryAction: true
    default: true
    defaultAction: true
    errorAction: true;
    successAction: true;
    warningAction: true;
    infoAction: true;
  }
}