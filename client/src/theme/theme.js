import { responsiveFontSizes,createTheme } from "@mui/material";

const theme = createTheme({
    typography:{
        fontFamily:  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        letterSpacing: "0.25px",
        textOverflow: "ellipsis",
        fontSize: 16,
        // fontStretch: "200%"

    }
});
export default responsiveFontSizes(theme)