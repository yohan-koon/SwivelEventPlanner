import React, {FC} from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ms } from '../utils';
import { colors, spacing } from '../theme';

type Presets = keyof typeof $presets;

interface SeperatorProps {
    preset?: Presets,
    /**
     * An optional size of the seperator
     */
    size?: number;
    /**
     * Style override for the container
     */
    style?: ViewStyle;
    /**
     * status of the padding visibility
     */
    isEnablePadding?: boolean;
}

export const Seperator : FC<SeperatorProps> = ({style: $styleOverride, size = 2, preset = 'horizontal', isEnablePadding = true}) => {
    const $styles = [
        $presets[preset],
        $styleOverride,
        {
            [preset === 'horizontal' ? 'height' : 'width']: ms(size), 
            [preset === 'horizontal' ? 'marginVertical' : 'marginHorizontal']: isEnablePadding ? spacing.md : 0,
        }
    ]
    return <View style={$styles}></View>;
};

const $baseStyle: ViewStyle = {
    backgroundColor: colors.palette.neutral200,
    flexDirection: 'row',
    flex: 1,
}

const $presets = {
    horizontal: $baseStyle,
    vertical: [$baseStyle, {flexDirection: 'column'}] as StyleProp<ViewStyle>,
}

