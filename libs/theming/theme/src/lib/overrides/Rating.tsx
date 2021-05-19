import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// ----------------------------------------------------------------------

const ICON_SMALL = { width: 20, height: 20 };
const ICON_LARGE = { width: 28, height: 28 };

const ICON = (
  <SvgIcon>
    <FontAwesomeIcon icon={faStar} />
  </SvgIcon>
);

export default function Rating({ theme }) {
  return {
    MuiRating: {
      defaultProps: {
        emptyIcon: ICON,
        icon: ICON
      },

      styleOverrides: {
        root: {
          '&$disabled': { opacity: 0.48 }
        },
        iconEmpty: {
          color: theme.palette.grey[500_48]
        },
        sizeSmall: {
          '& svg': { ...ICON_SMALL }
        },
        sizeLarge: {
          '& svg': { ...ICON_LARGE }
        }
      }
    }
  };
}
