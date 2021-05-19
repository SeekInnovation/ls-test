import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import { faSquare ,faCheckSquare,faMinusSquare} from '@fortawesome/pro-regular-svg-icons';

// ----------------------------------------------------------------------

const ICON_MEDIUM = { width: 24, height: 24 };
const ICON_SMALL = { width: 20, height: 20 };

export default function Checkbox({ theme }) {
  return {
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
        icon: <FontAwesomeIcon icon={faSquare} {...ICON_MEDIUM} />,
        checkedIcon: <FontAwesomeIcon icon={faCheckSquare} {...ICON_MEDIUM} />,
        indeterminateIcon: <FontAwesomeIcon icon={faMinusSquare} {...ICON_MEDIUM} />
      },

      styleOverrides: {
        root: {
          padding: 8,
          '& svg[font-size="small"]': { ...ICON_SMALL },
          '&$disabled': {
            color: `${theme.palette.action.disabled} !important`
          }
        }
      }
    }
  };
}
