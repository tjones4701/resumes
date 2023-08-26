import { color, contrast, scale } from "chroma.ts";

export const MEDIA_SIZES = {
    MOBILE: 576,
    TABLET: 992,
    DESKTOP: 993,
};

export const MEDIA = {
    MOBILE: "@media screen and (max-width: 576px)",
    TABLET: "@media screen and (max-width: 992px)",
    DESKTOP: "@media screen and (min-width: 993px)",
    ONLY_MOBILE: "@media screen and (max-width: 576px)",
    ONLY_TABLET: "@media screen and (min-width: 577px)  and (max-width: 992px)",
    ONLY_DESKTOP: "@media screen and (min-width: 993px)",
};

const colorShades: Record<string, string[]> = {
    primary: ["#EEF8FC", "#124559", "#061B23"],
    secondary: ["#F7F0FA", "#C187D4", "#31143D"],
    success: ["#CEF3D4", "#FCEFEE", "#08210E"],
    danger: ["#FCEFEE", "#E3655B", "#E3655B"],
    warning: ["#FFEFD7", "#FCA311", "#663D00"],
};

type ColorScales = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700;

const parts = [50, 100, 200, 300, 400, 500, 600, 700];

const colors: any = {};
for (const i in colorShades) {
    const scales = colorShades[i];
    const colorScale = scale(...scales).colors(8);
    for (const partIndex in parts) {
        if (colors[i] == null) {
            colors[i] = {};
        }
        colors[i][parts[partIndex]] = colorScale[partIndex];
    }
}

const primary = {
    ...colors.primary,
};
const fontColors: Record<string, any> = {};

primary[`primary`] = colors.primary[6];

const primitives: any = {
    ...primary,
};

const TEXT_WHITE = color(255, 255, 255, 0.85).hex("rgba");
const TEXT_BLACK = color(0, 0, 0, 0.85).hex("rgba");

export type ColorTypes = "primary" | "secondary" | "warning" | "danger";

export function getFontColor(color: ColorTypes, scale?: ColorScales): string {
    const key = `${color}${scale ?? ""}`;

    if (fontColors[key] == null) {
        try {
            const mainColor = getColor(color, scale);
            const whiteContrast = contrast(TEXT_WHITE, mainColor);
            const blackContrast = contrast(TEXT_BLACK, mainColor);
            if (blackContrast > whiteContrast) {
                fontColors[key] = TEXT_BLACK;
            } else {
                fontColors[key] = TEXT_WHITE;
            }
        } catch (e) {
            console.error(`Can't process color: ${color} - ${scale}`);
        }
    }

    return fontColors[key];
}

export function getColor(color: ColorTypes, scale?: ColorScales): string {
    const type = colors[color];
    const returnColor = type[scale as any] ?? type[400];
    return returnColor;
}
const spacer = 8;
export const Theme = {
    sizing: {
        xxSmall: `${spacer / 2}px`,
        xSmall: `${spacer * 1}px`,
        small: `${spacer * 2}px`,
        medium: `${spacer * 3}px`,
        large: `${spacer * 4}px`,
        xLarge: `48px`,
        xxLarge: `64px`,
        spacer: spacer,
    },

    baseAppFontSize: "12px",
    fontSizes: {
        default: "medium",
        fontSizeXXSmall: "xx-small",
        fontSizeXSmall: "x-small",
        fontSizeSmall: "small",
        fontSizeMedium: "medium",
        fontSizeLarge: "large",
        fontSizeXLarge: "x-large",
        fontSizeXXLarge: "xx-large",
    },
    sizingRaw: {
        xSmall: spacer * 1,
        small: spacer * 2,
        medium: spacer * 3,
        large: spacer * 4,
        xLarge: 48,
        xxLarge: 64,
        spacer: spacer,
        pageSidePadding: "4vw",
        pageTopPadding: "clamp(20px,5vh, 40px)",
    },
    zIndex: {
        NAVIGATION: 999,
        MODAL: 9999,
    },
    editor: {
        colors: {
            grey: "#F6F8FA",
        },
    },
    colors: {
        whiteish: "rgba(255,255,255,0.8)",
        blackish: "rgba(0,0,0,0.9)",
    },
    border: {
        side: (side: "Top" | "Bottom" | "Left" | "Right", type: any) => {
            const prefix = `border${side}`;
            return {
                [`${prefix}Color`]: type.borderColor,
                [`${prefix}Style`]: type.borderStyle,
                [`${prefix}Width`]: type.borderWidth,
            };
        },
        all: (type: any) => {
            return {
                ...Theme.border.side("Top", type),
                ...Theme.border.side("Bottom", type),
                ...Theme.border.side("Left", type),
                ...Theme.border.side("Right", type),
            };
        },
        bottom: (type: any) => {
            return Theme.border.side("Bottom", type);
        },
        left: (type: any) => {
            return Theme.border.side("Left", type);
        },
        right: (type: any) => {
            return Theme.border.side("Right", type);
        },
        top: (type: any) => {
            return Theme.border.side("Top", type);
        },
        x: (type: any) => {
            return {
                ...Theme.border.side("Left", type),
                ...Theme.border.side("Right", type),
            };
        },
        y: (type: any) => {
            return {
                ...Theme.border.side("Top", type),
                ...Theme.border.side("Bottom", type),
            };
        },
    },
};
