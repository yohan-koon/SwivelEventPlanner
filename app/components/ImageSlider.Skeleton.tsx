import { View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { ms } from '../utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const ImageSliderSkeleton: FC = () => {
    
    return (
        <View style={$root}>
            <SkeletonPlaceholder borderRadius={ms(4)}>
                <SkeletonPlaceholder.Item width={ms(375)} height={ms(200)}/>
            </SkeletonPlaceholder>
        </View>
    )
}

const $root: ViewStyle = {

}
