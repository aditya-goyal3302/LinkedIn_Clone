import { responsiveFontSizes, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000e6",
        },
        secondary: {
            main: "#01754f",
        },
    },
    typography: {
        fontFamily: "-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Fira Sans',Ubuntu,Oxygen,'Oxygen Sans',Cantarell,'Droid Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Emoji','Segoe UI Symbol','Lucida Grande',Helvetica,Arial,sans-serif",
        letterSpacing: "0.25px",
        textOverflow: "ellipsis",
        fontSize: 16,
    },
    components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: "true !important",
          },
        }, 
        MuiButtonGroup: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiTabs:{
            styleOverrides: {
                indicator: {
                    // backgroundColor: "#01754f",
                },
            },
        },
        MuiCardHeader:{
            styleOverrides:{
                content:{
                    flex:"unset !important",
                    width:"unset !important",
                }
            }
        }
    },
});


export default responsiveFontSizes(theme)