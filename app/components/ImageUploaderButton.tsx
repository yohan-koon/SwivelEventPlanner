import React, { ComponentType } from "react"
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity, TouchableOpacityProps, ImageStyle, ImageBackground } from "react-native"
import { colors, typography } from "../theme"
import { ms } from "../utils/ui"
import { Icon } from "./Icon"

export interface ImageUploaderButtonAccessoryProps {
  style?: StyleProp<any>
}

export interface ImageUploaderButtonProps extends TouchableOpacityProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Size of the container
   */
  size?: number
  /**
   * Image source
   */
  src?: string
  /**
   * The editable status of the input
   */
  isEditable?: boolean
}

/**
 * Describe your component here
 */
export const ImageUploaderButton = (props: ImageUploaderButtonProps) => {
  const { style, size = 116, src, isEditable = true, ...rest } = props
  const $styles = [$container, style]

  const $containerStyle = () => {
    return [$container, {
      width: ms(size),
      height: ms(size),
      borderRadius: ms(size / 2),
    }, style];
  }

  return (
    <TouchableOpacity style={$containerStyle()} disabled={!isEditable} {...rest}>
      <ImageBackground source={{uri: src}} style={$containerStyle()} imageStyle={{borderRadius: ms(size)}} resizeMode='cover'>
      {isEditable && <Icon icon='camera' size={ms(24)} color={colors.palette.primary500} style={$rightAccessoryStyle} />}
      </ImageBackground>
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.primary100,
}

const $text: TextStyle = {
  fontFamily: typography.primary.regular,
  fontSize: 14,
  color: colors.palette.primary500,
}

const $rightAccessoryStyle: ImageStyle = { width: ms(24), height: ms(24), }