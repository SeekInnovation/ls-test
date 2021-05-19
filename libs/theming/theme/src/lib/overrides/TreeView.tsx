import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfo, faMinusSquare, faPlusSquare, faTimesSquare } from '@fortawesome/pro-regular-svg-icons';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const ICON_SIZE = { width: 20, height: 20 };

export default function TreeView({ theme }) {
  return {
    MuiTreeView: {
      defaultProps: {
        defaultCollapseIcon: <FontAwesomeIcon icon={faMinusSquare} {...ICON_SIZE} />,
        defaultExpandIcon: <FontAwesomeIcon icon={faPlusSquare} {...ICON_SIZE} />,
        defaultEndIcon: (
          <Box
            component={FontAwesomeIcon}
            icon={faTimesSquare}
            {...ICON_SIZE}
            sx={{ color: 'text.disabled' }}
          />
        )
      }
    },
    MuiTreeItem: {
      styleOverrides: {
        label: { ...theme.typography.body2 },
        iconContainer: { width: 'auto' }
      }
    }
  };
}
