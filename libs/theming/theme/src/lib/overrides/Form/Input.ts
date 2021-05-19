// ----------------------------------------------------------------------

export default function Input({ theme }) {
  return {
    // MuiInput
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },

    // Filled Input
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          borderBottom: "none",
          borderRadius: 10,
          
          '&:hover, &$focused': {
            backgroundColor: theme.palette.grey[500_16],
            borderBottom: "none",
            '&::before': {
              borderBottom: "none !important"
            }
          },
          '&$disabled': {
            backgroundColor: theme.palette.divider
          },
          '&::after': {
            borderBottom: "none !important"
          }
        },
        underline: {
          '&:before': {
            borderBottom: "none"
            // borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },

    // Outlined Input
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&$disabled': {
            '& $notchedOutline': {
              borderColor: theme.palette.divider
            }
          }
        },
        notchedOutline: {
          borderColor: theme.palette.grey[500_32]
        }
      }
    }
  };
}
