import { TextStyle, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Text } from './Text'
import { colors, spacing } from '../theme'

interface PostProps {
    /**
     * The data to display
     */
    data: any
    /**
     * An optional style override useful for padding & margin.
     */
    style?: ViewStyle
}

export const Post : FC<PostProps> = ({data, style: $styleOverride}) => {
  return (
    <View style={[$root, $styleOverride]}>
      <Text text={data.title} size='sm' style={$title}/>
      <Text text={data.subTitle} size='xxs' style={$subTitle}/>
    </View>
  )
}

const $root : ViewStyle = {
    marginHorizontal: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.palette.neutral200,
}

const $title: TextStyle = {
    fontWeight: '600',
}

const $subTitle: TextStyle = {
    marginTop: spacing.xs
}