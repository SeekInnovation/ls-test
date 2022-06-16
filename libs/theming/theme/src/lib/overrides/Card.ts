// ----------------------------------------------------------------------

export default function Card({ theme }) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[25].z16,
          borderRadius: theme.shape.borderRadiusMd,
          // position: 'relative', // TODO 'relative' instead of 'block' breaks the drag'n'drop.
          zIndex: 0 // Fix Safari overflow: hidden with border radius
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' }
      },
      styleOverrides: {
        root: {
          padding: 24,
          paddingBottom: 0
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24
        }
      }
    }
  };
}
