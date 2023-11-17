import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { ms } from '../utils';
import { colors, spacing } from '../theme';

interface SeperatorProps {
    /**
     * An optional size of the seperator
     */
    size?: number;
    /**
     * Style override for the container
     */
    style?: ViewStyle;
}

export const Seperator = (props: SeperatorProps) => {
    const { style: $style, size = ms(2) } = props;
    return <View style={[$root, $style, {height: size}]}></View>;
};

const $root: ViewStyle = {
    backgroundColor: colors.palette.neutral400,
    flexDirection: 'row',
    flex: 1,
    marginVertical: spacing.md,
}