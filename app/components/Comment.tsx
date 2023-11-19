import { TextStyle, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Text } from './Text'
import { colors, spacing } from '../theme'
import { ms } from '../utils'
import { ImageStyle } from 'react-native-fast-image'
import { NetworkImage } from './NetworkImage'
import { Spacer } from './Spacer'
import { Comment as CommentType } from '../redux/posts'

interface CommentProps {
    /**
     * The data to display
     */
    data: CommentType
}

export const Comment: FC<CommentProps> = ({ data }) => {
    return (
        <View style={$root}>
            <View style={$headerContainer}>
                <NetworkImage style={$userImage} placeholder='user' />
                <View style={$nameContainer}>
                    <Text text={data.name} style={$name} numberOfLines={1} />
                    <Text text={data.email} size='xxxs' />
                </View>

            </View>
            <Spacer mainAxisSize={spacing.sm} />
            <Text text={data.body} size='xxs' />
        </View>
    )
}

const $root: ViewStyle = {
    marginHorizontal: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderColor: colors.palette.neutral300,
    borderBottomWidth: ms(1),
    borderLeftWidth: ms(1),
    borderRightWidth: ms(1),
    paddingVertical: spacing.sm,
}

const $headerContainer: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
}

const $userImage: ImageStyle = {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
}

const $nameContainer: ViewStyle = {
    marginLeft: spacing.sm,
    flex: 1,
}

const $name: TextStyle = {
    fontWeight: '600',
    fontSize: ms(14),
    color: colors.palette.neutral800,
}

