import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { NetworkImage } from './NetworkImage'
import { Icon } from './Icon'
import { ImageStyle } from 'react-native-fast-image'
import { ms } from '../utils'
import { colors, spacing } from '../theme'
import { Text } from './Text'

interface OrganizerProps {
    /**
     * An optional style override useful for padding & margin.
     */
    style?: ViewStyle
    /**
     * Organizer data
     */
    data: any
}

export const Organizer: FC<OrganizerProps> = ({ style: $styleOverride, data }) => {
    return (
        <View style={[$root, $styleOverride]}>
            <NetworkImage style={$userImage} placeholder='user'/>
            <View style={$detailContainer}>
                <Text text={data.name} preset='h5' size='sm' style={$name}/>
                <Text text={data.email} preset='formLabel' size='xs'/>
            </View>
            <Icon icon='tooltip' size={ms(20)} />
        </View>
    )
}

const $root: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
}

const $userImage: ImageStyle = {
    width: ms(44),
    height: ms(44),
    borderRadius: ms(22),
}

const $detailContainer: ViewStyle = {
    flexGrow: 1,
    marginHorizontal: spacing.md
}

const $name: TextStyle = {
    color: colors.palette.neutral900,
}