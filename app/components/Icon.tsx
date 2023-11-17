import {
    Image,
    ImageStyle,
    StyleProp,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';
import React, { ComponentType, FC } from 'react';
import { colors } from '../theme';
import { ms } from '../utils';

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
    /**
     * The name of the icon to use from the icon registry.
     */
    icon: IconTypes;
    /**
     * An optional tint color of the icon
     */
    color?: string;
    /**
     * An optional size of the icon
     */
    size?: number;
    /**
     * Style override for the icon image
     */
    style?: StyleProp<ImageStyle>;
    /**
     * Style override for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * An optional function to be called when the icon is pressed
     */
    onPress?: TouchableOpacityProps['onPress'];
}

export const Icon: FC<IconProps> = ({
    icon,
    color = colors.palette.neutral700,
    size = ms(24),
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
}) => {

    const isPressable = !!WrapperProps.onPress;
    const Wrapper: ComponentType<ViewProps | TouchableOpacityProps> = isPressable
        ? TouchableOpacity
        : View;
    
    return (
        <Wrapper {...WrapperProps} style={$containerStyleOverride}>
            <Image
                style={[
                    $imageStyle,
                    color ? { tintColor: color } : {},
                    size ? { width: size, height: size } : {},
                    $imageStyleOverride,
                ]}
                source={iconRegistry[icon]}
            />
        </Wrapper>
    );
};

const $imageStyle: ImageStyle = {
    resizeMode: 'contain',
};

export const iconRegistry = {
    camera: require('../../assets/icons/camera.png'),
    closedEye: require('../../assets/icons/closed-eye.png'),
    openEye: require('../../assets/icons/open-eye.png'),
    home: require('../../assets/icons/home.png'),
    lock: require('../../assets/icons/lock.png'),
    logout: require('../../assets/icons/logout.png'),
    mail: require('../../assets/icons/mail.png'),
    more: require('../../assets/icons/more.png'),
    nextArrow: require('../../assets/icons/next-arrow.png'),
    prevArrow: require('../../assets/icons/prev-arrow.png'),
    openArrow: require('../../assets/icons/open-arrow.png'),
    tooltip: require('../../assets/icons/tooltip.png'),
};
