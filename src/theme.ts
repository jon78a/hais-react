import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material/styles';

export let theme = createTheme({
  palette: {
    primary: {
      main: "#4E9E65",
      light: "rgba( 78, 158, 101, 0.05 )"
    },
    secondary: {
      main: grey[400],
      contrastText: "#fff"
    }
  },
  typography: {
    caption: {
      color: grey[600]
    },
    button: {
      fontWeight: "bold"
    }
  }
});

theme = responsiveFontSizes(theme);
