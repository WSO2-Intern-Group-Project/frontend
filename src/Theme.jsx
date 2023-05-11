import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d1821",
      light: "#4f5b62",
      dark: "#000a12",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900",
    },
    background: {
      default: "#0d0f12",
      paper: "#1b1e24",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
      disabled: "#757575",
      hint: "#9e9e9e",
    },
    divider: "#424242",
    success: {
      main: "#00c853",
      light: "#69f0ae",
      dark: "#00b248",
    },
    warning: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900",
    },
    error: {
      main: "#ff3d00",
      light: "#ff7539",
      dark: "#c30000",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
  },
});

export default theme;
