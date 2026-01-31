import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e14eca',
      light: '#f56bb7',
      dark: '#c73aa8',
    },
    secondary: {
      main: '#1f8ef1',
      light: '#52a9f5',
      dark: '#1565c0',
    },
    background: {
      default: '#1e1e2f',
      paper: '#27293d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9a9a9a',
    },
    success: {
      main: '#00d4aa',
    },
    warning: {
      main: '#ff8a00',
    },
    error: {
      main: '#fd5d93',
    },
    info: {
      main: '#1d8cf8',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e2f',
          borderRight: '1px solid #344675',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e2f',
          boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#27293d',
          borderRadius: '12px',
          boxShadow: '0 1px 20px 0px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;