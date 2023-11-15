import React, { ComponentType } from "react"
import { StyleProp, TextStyle, TouchableOpacityProps, TouchableOpacity, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import { TextProps, Text } from "../components"
import { ms, vs } from "../utils"

type Presets = keyof typeof $viewPresets

export interface LinkButtonAccessoryProps {
  style: StyleProp<any>
}

export interface LinkButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   */
  RightAccessory?: ComponentType<LinkButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   */
  LeftAccessory?: ComponentType<LinkButtonAccessoryProps>
}

/**
 * Describe your component here
 */
export const LinkButton = (props: LinkButtonProps) => {
  const { style: $viewStyleOverride, tx, text, txOptions, textStyle: $textStyleOverride, RightAccessory, LeftAccessory, ...rest } = props

  const preset: Presets = $viewPresets[props.preset] ? props.preset : "default";

  function $viewStyle() {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
    ]
  }

  function $textStyle() {
    return [
      $textPresets[preset],
      $textStyleOverride,
    ]
  }

  return (
    <TouchableOpacity style={$viewStyle()} {...rest}>
      {!!LeftAccessory && <LeftAccessory style={$leftAccessoryStyle} />}
      <Text style={$textStyle()} tx={tx} text={text} txOptions={txOptions} />
      {!!RightAccessory && <RightAccessory style={$rightAccessoryStyle} />}
    </TouchableOpacity>
  )
}

const $baseView: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}

const $baseText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: ms(14),
  lineHeight: vs(20),
  color: colors.palette.primary900,
}

const $rightAccessoryStyle: ViewStyle = { paddingLeft: spacing.lg }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.sm }

const $viewPresets = {
  default: [$baseView] as StyleProp<ViewStyle>,
  disabled: [$baseView] as StyleProp<ViewStyle>,
  danger: [$baseView] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: [$baseText] as TextStyle,
  disabled: [$baseText, { color: colors.palette.primary700 }] as TextStyle,
  danger: [$baseText, { color: colors.palette.error500 }] as TextStyle,
}
