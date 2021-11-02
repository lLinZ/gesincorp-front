import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#689f38',
    },
    secondary: {
      main: '#2196f3',
    },
  },
  error: {
    main: red.A400,
  },
});

export default theme;
