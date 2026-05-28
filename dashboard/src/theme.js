import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c62020ff', // Deep Red
      light: '#A52A2A',
      dark: '#660000',
    },
    secondary: {
      main: '#FF8C00', // Saffron
      light: '#FFA500',
      dark: '#E65100',
    },
    background: {
      default: '#f4f6f9', // Light grey page background
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    success: {
      main: '#3B5323', // Olive Green
    },
    warning: {
      main: '#FF8C00', // Saffron
    },
    error: {
      main: '#c62020ff', // Deep Red
    },
    info: {
      main: '#0b1f3a', // Deep Navy
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Helvetica Neue", "Arial", sans-serif',
    allVariants: {
      color: '#1f2937',
    },
    h1: {
      fontWeight: 700,
      color: '#1f2937',
    },
    h2: {
      fontWeight: 700,
      color: '#1f2937',
    },
    h3: {
      fontWeight: 700,
      color: '#1f2937',
    },
    h4: {
      fontWeight: 700,
      color: '#1f2937',
    },
    h5: {
      fontWeight: 600,
      color: '#1f2937',
    },
    h6: {
      fontWeight: 600,
      color: '#1f2937',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: '0.5px',
        },
        containedPrimary: {
          backgroundColor: '#c62020ff',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#660000',
          },
        },
        containedSecondary: {
          backgroundColor: '#FF8C00',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#E65100',
          },
        },
        outlined: {
          borderColor: '#0b1f3a',
          color: '#0b1f3a',
          '&:hover': {
            borderColor: '#0b1f3a',
            backgroundColor: 'rgba(11, 31, 58, 0.04)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          color: '#1f2937',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#1f2937',
          fontWeight: 700,
          borderBottom: '2px solid #FF8C00',
          paddingBottom: '12px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#1f2937',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#6b7280',
          fontWeight: 500,
          '&.Mui-focused': {
            display: 'none',
          },
          '&.MuiInputLabel-shrink': {
            display: 'none',
          },
        },
        outlined: {
          transform: 'translate(14px, 16px) scale(1)',
          '&.MuiInputLabel-shrink': {
            display: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          '& fieldset': {
            borderColor: '#d1d5db',
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            borderColor: '#9ca3af',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF8C00',
            borderWidth: '2px',
          },
        },
        input: {
          color: '#1f2937',
          padding: '14px 14px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#1f2937',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#1f2937',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1f2937',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px',
          backgroundColor: '#ffffff',
        },
        head: {
          color: '#1f2937',
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          backgroundColor: '#f9fafb',
          borderBottom: '2px solid #FF8C00',
        },
        body: {
          color: '#1f2937',
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9fafb',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          '&:hover': {
            backgroundColor: '#f9fafb',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          height: '8px',
        },
        bar: {
          backgroundColor: '#3B5323', // Olive green for progress
          borderRadius: '4px',
        },
      },
    },
  },
});

export default theme;
