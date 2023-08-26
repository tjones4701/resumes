import { BrandVariants, Theme, createDarkTheme, createLightTheme } from "@fluentui/react-components";

const brownTheme: BrandVariants = {
    10: "#030302",
    20: "#191812",
    30: "#29261D",
    40: "#363225",
    50: "#443E2D",
    60: "#524A35",
    70: "#61573D",
    80: "#716346",
    90: "#81704F",
    100: "#927D58",
    110: "#A38B62",
    120: "#B5986B",
    130: "#C8A676",
    140: "#DBB380",
    150: "#EEC18A",
    160: "#FFD09A",
};

export const lightTheme: Theme = {
    ...createLightTheme(brownTheme),
};

export const darkTheme: Theme = {
    ...createDarkTheme(brownTheme),
    colorBrandForeground1: brownTheme[110],
    colorBrandForeground2: brownTheme[120],
};
