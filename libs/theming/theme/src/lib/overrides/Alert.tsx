import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfo } from '@fortawesome/pro-regular-svg-icons';

// ----------------------------------------------------------------------

export default function Alert({ theme }) {
  const isLight = theme.palette.mode === 'light';

  const standardStyle = color => {
    return {
      color: theme.palette[color][isLight ? 'darker' : 'lighter'],
      backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker']
    };
  };

  const filledStyle = color => {
    return {
      color: theme.palette[color].contrastText
    };
  };

  const outlinedStyle = color => {
    return {
      color: theme.palette[color][isLight ? 'darker' : 'lighter'],
      border: `solid 1px ${theme.palette[color][isLight ? 'light' : 'dark']}`,
      backgroundColor: theme.palette[color][isLight ? 'lighter' : 'darker']
    };
  };

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          error: <FontAwesomeIcon icon={faInfo} />,
          info: <FontAwesomeIcon icon={faExclamationCircle} />,
          success: <FontAwesomeIcon icon={faCheckCircle} />,
          warning: <FontAwesomeIcon icon={faExclamationTriangle} />
        }
      },

      styleOverrides: {
        message: {
          '& .MuiAlertTitle-root': { marginBottom: 4 }
        },
        action: {
          '& button:not(:first-child)': { marginLeft: 8 }
        },
        // Standard
        standardInfo: standardStyle('info'),
        standardSuccess: standardStyle('success'),
        standardWarning: standardStyle('warning'),
        standardError: standardStyle('error'),

        // filled
        filledInfo: filledStyle('info'),
        filledSuccess: filledStyle('success'),
        filledWarning: filledStyle('warning'),
        filledError: filledStyle('error'),

        // Outlined
        outlinedInfo: outlinedStyle('info'),
        outlinedSuccess: outlinedStyle('success'),
        outlinedWarning: outlinedStyle('warning'),
        outlinedError: outlinedStyle('error')
      }
    }
  };
}
