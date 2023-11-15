const fonts = {
    notoSans: {
        thin: 'NotoSans-Thin',
        light: 'NotoSans-Light',
        regular: 'NotoSans-Regular',
        medium: 'NotoSans-Medium',
        semiBold: 'NotoSans-SemiBold',
        bold: 'NotoSans-Bold',
    },
    inter: {
        thin: 'Inter-Thin',
        light: 'Inter-Light',
        regular: 'Inter-Regular',
        medium: 'Inter-Medium',
        semiBold: 'Inter-SemiBold',
        bold: 'Inter-Bold',
    }, 
}

export const typography = {
    /**
     * The fonts that are used throughout the application.
     */
    fonts,
    /**
     * The primary font family.
     */
    primary: fonts.notoSans,
    /**
     * The secondary font family.
     */
    secondary: fonts.inter,
}