const themePrimary = {
  palette: {
    mode: "light",
    primary: {
      main: "#4682B3",
      // main: "#f00",
    },
    secondary: {
      main: "#385269",
    },
    error: {
      main: "#ef9a9a",
    },
    success: {
      main: "#66bb6a",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    //
  },
};

const themeDark = {
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
      light: "#434343",
    },
    secondary: {
      main: "#385269",
    },
    error: {
      main: "#ef9a9a",
    },
    success: {
      main: "#66bb6a",
    },
    background: {
      default: "#101010",
      paper: "#1a1a1a",
    },
  },
  // typography: {
  //   button: {
  //     color: "#ffffff", 
  //     borderColor: "#ffffff"
  //   }
  // },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ddd",
          borderColor: "#ddd",
          "&:hover": {
            color: "#fff",
            borderColor: "#fff",
          },
        },
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },

      },
    },
  },
};

// https://mui.com/material-ui/customization/theming/#theme-builder
// https://bareynol.github.io/mui-theme-creator/
//
import { useEffect, useState, useMemo, useContext, createContext } from "react";
// https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme
// https://mui.com/material-ui/customization/default-theme/#main-content
//
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  // styled,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { deepmerge } from '@mui/utils';
import { alpha } from "@mui/material/styles";
//
// import themePrimary from "../theme/mui-primary";
// import themeDark from "../theme/mui-dark";
import { useColorModeTW, MODE_DARK as MODE_DARK_TW } from "../store";

//
const getDesignTokens = (mode) => ("dark" === mode ? themeDark : themePrimary);
//
export const ColorModeContext = createContext();
export const useColorMode = () => useContext(ColorModeContext);
//
export default function MuiThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode]
  );
  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);
  //

  const setModeDark_ = () => setMode("dark");
  // colorMode api
  const colorMode = {
    mode,
    theme,
    prefersDarkMode,
    //
    alpha,
    //
    isDark: () => "dark" === mode,
    isLight: () => "light" === mode,
    setColorModeDark: setModeDark_,
    setColorModeLight: () => setMode("light"),
    toggleColorMode: () => setMode((m) => ("dark" === m ? "light" : "dark")),
  };
  //
  // sync tailwind theme @change.mui
  const cm_tw = useColorModeTW();
  useEffect(() => {
    if ("dark" === mode) {
      cm_tw.setColorModeDark();
      return;
    }
    cm_tw.setColorModeLight();
  }, [mode]);
  ///
  // sync mui theme @changes.tw
  const modeTW = cm_tw();
  useEffect(() => {
    if (MODE_DARK_TW === modeTW) setModeDark_();
  }, [modeTW]);
  //
  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorMode}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  );
}
