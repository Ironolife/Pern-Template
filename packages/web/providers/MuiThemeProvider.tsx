import type {} from '@mui/lab/themeAugmentation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useMemo, FC } from 'react';

const MuiThemeProvider: FC = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: '#8b5cf6' },
          secondary: { main: '#16a34a' },
        },
        spacing: 4,
        typography: {
          button: {
            textTransform: 'none',
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
