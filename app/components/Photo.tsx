import { View, ViewStyle } from 'react-native'
import React, { FC, useMemo } from 'react'
import { NetworkImage } from './NetworkImage'
import { ImageStyle } from 'react-native-fast-image'
import { ms } from '../utils'
import { Text } from './Text'
import { colors, spacing } from '../theme'
import { Spacer } from './Spacer'

interface PhotoProps {
    /**
     * Photo data
     */
    data: any
}

export const Photo: FC<PhotoProps> = ({ data }) => {

    /**
     * Since there is no value in the picture object for title, Random title is generated
     */
    const getTitle = useMemo(() => {
        //random number between 10 and 15
        const random = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
        return data.title.slice(0, data.title?.length > random ? random : data.title?.length - 1);
    }, [data.title])

    return (
        <View style={$root}>
            <NetworkImage source={{ uri: data.url }} style={$image} />
            <View style={$textContainer}>
            <Text text={getTitle} preset='h4'/>
            <Spacer mainAxisSize={spacing.md}/>
            <Text text={data.title} preset='formLabel'/>
            </View>
        </View>
    )
}

const $root: ViewStyle = {
    width: ms(244),
}

const $image: ImageStyle = {
    width: ms(244),
    height: ms(130)
}

const $textContainer: ViewStyle = {
    padding: spacing.md,
}