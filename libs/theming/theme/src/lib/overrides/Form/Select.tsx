import React from 'react';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// ----------------------------------------------------------------------

export default function Select({ theme }) {
  return {
    MuiSelect: {
      defaultProps: {
        // IconComponent: () => <FontAwesomeIcon icon={faChevronDown} style={{ marginRight: 10 }}/>,
        variant: "standard"
      },

      styleOverrides: {
        filled: {
          paddingRight: 10,
          '&:hover, &:focus': {
            backgroundColor: 'transparent !important',
          },
        },
      },
    },
  };
}
