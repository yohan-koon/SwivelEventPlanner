import { View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { ms } from '../utils';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { spacing } from '../theme';

export const OrganizersSkeleton: FC = () => {

    const renderItem = (index: number) => {
        return (
            <SkeletonPlaceholder.Item marginLeft={spacing.md} marginTop={spacing.lg} key={index}>
                <SkeletonPlaceholder.Item width={ms(200)} height={ms(20)} />
                <SkeletonPlaceholder.Item marginTop={ms(6)} width={ms(250)} height={ms(20)} />
                <SkeletonPlaceholder.Item marginTop={ms(12)} width={ms(350)} height={ms(150)} />
            </SkeletonPlaceholder.Item>
        )
    }

    return (
        <View style={$root}>
            <SkeletonPlaceholder borderRadius={ms(4)}>
                <SkeletonPlaceholder.Item>
                    {[...Array(10)].map((_, index) => renderItem(index))}
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    )
}

const $root: ViewStyle = {

}
