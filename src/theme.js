import { extendTheme } from "@chakra-ui/react";

const customColors = {
  swell: {
    300: "rgb(48, 103, 238)",
    500: "#2f43ec",
    900: "rgb(5, 26, 43)",
  },
};

const theme = extendTheme({
  styles: {
    global: {
      td: {
        fontSize: "20px !important",
      },
      th: {
        fontSize: "20px !important",
        fontWeight: "normal !important",
        paddingBottom: "10px !important",
      },
    },
  },
  colors: customColors,
  fonts: {
    body: "didact gothic",
    heading: "Cubano",
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "normal",
      },
      variants: {
        xl: {
          fontFamily: "Cherry Bomb One",
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: "18px",
      },
    },
  },
});

export default theme;
