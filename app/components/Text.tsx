import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { colors, typography } from '../theme';
import { ms } from '../utils';
import { useTranslation } from 'react-i18next';

export type Sizes = keyof typeof $sizeStyles;
export type Weights = keyof typeof typography.primary;
export type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
    /**
     * Preset name, can be `default`, `bold`, `label`, `title`, `subTitle`, `error`, `placeholder`
     */
    preset?: Presets;
    /**
     * tx key path for translation
     */
    tx?: string;
    /**
     * Options for the tx
     */
    txOptions?: any;
    /**
     * Text to display
     */
    text?: string;

    /**
     * An optional style override useful for padding & margin
     */
    style?: StyleProp<TextStyle>;
    /**
     * Text weight modifier
     */
    weight?: Weights;
    /**
     * Text size modifier
     */
    size?: Sizes;
    /**
     * Children components
     */
    children?: React.ReactNode;
}

export const Text = (props: TextProps) => {
    const { weight, size, tx, txOptions, text, children, style: $styleOverride, preset = 'default', ...rest } = props

    const {t} = useTranslation();

    const i18nText = tx ? t(tx, txOptions) : undefined
    const content = i18nText || text || children

    const $styles = [
        $presets[preset],
        $fontWeightStyles[weight],
        $sizeStyles[size],
        $styleOverride,
    ]

    return (
        <RNText {...rest} style={$styles}>
            {content}
        </RNText>
    )
}

const $sizeStyles = {
    xxl: { fontSize: ms(32), lineHeight: ms(40) } satisfies TextStyle,
    xl: { fontSize: ms(26), lineHeight: ms(36) } satisfies TextStyle,
    lg: { fontSize: ms(22), lineHeight: ms(32) } satisfies TextStyle,
    md: { fontSize: ms(19), lineHeight: ms(24) } satisfies TextStyle,
    sm: { fontSize: ms(16), lineHeight: ms(20) } satisfies TextStyle,
    xs: { fontSize: ms(14), lineHeight: ms(20) } satisfies TextStyle,
    xxs: { fontSize: ms(13), lineHeight: ms(16) } satisfies TextStyle,
    xxxs: { fontSize: ms(11), lineHeight: ms(14) } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
    $sizeStyles.xs,
    $fontWeightStyles.regular,
    { color: colors.textDim },
]

const $presets = {
    default: $baseStyle,

    bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

    h1: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold, { color: colors.text }] as StyleProp<TextStyle>,

    h2: [$baseStyle, $sizeStyles.xl, $fontWeightStyles.bold, { color: colors.text }] as StyleProp<TextStyle>,

    h3: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.bold, { color: colors.text }] as StyleProp<TextStyle>,

    h4: [$baseStyle, $sizeStyles.md, $fontWeightStyles.bold, { color: colors.text }] as StyleProp<TextStyle>,

    h5: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.bold, { color: colors.text }] as StyleProp<TextStyle>,

    formLabel: [$baseStyle, $sizeStyles.xxs, $fontWeightStyles.medium, { color: colors.palette.neutral700 }] as StyleProp<TextStyle>,

    formHelper: [$baseStyle, $sizeStyles.xxxs, $fontWeightStyles.regular] as StyleProp<TextStyle>,
}
