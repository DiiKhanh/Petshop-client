import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light"
};

const theme = extendTheme({
  colorSchemes: {
    // dark: {
    //   palette: {
    //     primary: {
    //       main: "#AFE0FA",
    //       contrastText: "#fff",
    //       price:" #FF642F"
    //     },
    //     secondary: {
    //       main: "#FDFD96"
    //     },
    //     background: {
    //       default: "#000000",
    //       paper: "#131313"
    //     }
    //   }
    // },
    dark: {
      palette: {
        primary: {
          main: "#afe0fa",
          contrastText: "#ffff",
          price:" #faf8af"
        },
        secondary: {
          main: "#faf8af"
        },
        background: {
          default: "black",
          paper: "black"
        }
      }
    },
    light: {
      palette: {
        primary: {
          main: "#AFE0FA",
          price:" #FF642F"
        },
        secondary: {
          main: "#FDFD96"
        },
        background: {
          default: colors.grey["100"]
        }
      }
    }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true }
    }
  }
});

export default theme;