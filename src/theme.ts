import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4E9E65"
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
