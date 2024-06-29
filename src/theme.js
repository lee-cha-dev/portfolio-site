import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto"; // Import the Roboto font

const theme = extendTheme({
    fonts: {
        heading: "Roboto, sans-serif",
        body: "Roboto, sans-serif",
    },
});

export default theme;