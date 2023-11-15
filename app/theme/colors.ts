const palette = {
    neutral100: "#FFFFFF",
    neutral200: "#e8e8e9",
    neutral300: "#d1d2d2",
    neutral400: "#8c8e8f",
    neutral500: "#757778",
    neutral600: "#5e6062",
    neutral700: "#444749",
    neutral800: "#303335",
    neutral900: "#191c1e",

    primary100: "#fae8e5",
    primary200: "#f4cfc6",
    primary300: "#f0bfb3",
    primary400: "#edafa1",
    primary500: "#e99e8e",
    primary600: "#e58e7b",
    primary700: "#e17e68",
    primary800: "#de6e55",
    primary900: "#da5e42",

    secondary100: "#DCDDE9",
    secondary200: "#BCC0D6",
    secondary300: "#9196B9",
    secondary400: "#626894",
    secondary500: "#41476E",

    accent500: "#FFEED4",
    accent600: "#FFE1B2",
    accent700: "#FDD495",
    accent800: "#FBC878",
    accent900: "#FFBB50",

    error100: "#F2D6CD",
    error500: "#D2042D",
}

export const colors = {
    /**
     * The palette is used by components that need to reflect the brand identity.
     */
    palette,
    /**
     * transparent color
     */
    transparent: "rgba(0,0,0,0)",
    /**
     * The default color of text in many components.
     */
    text: palette.neutral800,
    /**
     * Secodary text color
     */
    textDim: palette.neutral600,
    /**
     * The default color of the background of many components.
     */
    background: palette.neutral100,
    /**
     * The default color of the border of many components.
     */
    border: palette.neutral300,
    /**
     * The main tinting color.
     */
    primary: palette.primary500,
    /**
     * A subtle color used for borders and lines.
     */
    seperators: palette.neutral300,
    /**
     * The default color of error text, icons and indicators.
     */
    error: palette.error500,
    /**
     * The default color of success text, icons and indicators.
     */
    success: palette.secondary500,
    /**
     * The default tint color of icons.
     */
    icon: palette.neutral600,
}