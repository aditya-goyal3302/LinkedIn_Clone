import { responsiveFontSizes, createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Fira Sans',Ubuntu,Oxygen,'Oxygen Sans',Cantarell,'Droid Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Emoji','Segoe UI Symbol','Lucida Grande',Helvetica,Arial,sans-serif",
        letterSpacing: "0.25px",
        textOverflow: "ellipsis",
        fontSize: 16,
        // fontStretch: "200%"
    },
});
export default responsiveFontSizes(theme)