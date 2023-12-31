import React, { ComponentType, FC } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator
} from "react-native"
import { colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"
import { ms, vs } from "../utils"
import { Spacer } from "./Spacer"

type Presets = keyof typeof $viewPresets

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
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
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * loading state
   */
  loading?: boolean
  /**
   * loading text
   */
  loadingTx?: TextProps["tx"]
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export const Button: FC<ButtonProps> = ({
  tx,
  text,
  txOptions,
  style: $viewStyleOverride,
  pressedStyle: $pressedViewStyleOverride,
  textStyle: $textStyleOverride,
  pressedTextStyle: $pressedTextStyleOverride,
  children,
  RightAccessory,
  LeftAccessory,
  loading,
  loadingTx,
  preset: presetOverride,
  ...rest
}) => {

  const preset: Presets = $viewPresets[presetOverride] ? presetOverride : "filled"
  function $viewStyle({ pressed }) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
    ]
  }
  function $textStyle({ pressed }) {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
    ]
  }

  return (
    <Pressable style={$viewStyle} accessibilityRole="button" disabled={loading} {...rest}>
      {(state) => (
        <>
          {!!LeftAccessory && !loading && <LeftAccessory style={$leftAccessoryStyle} pressableState={state} />}

          {loading ? <Text tx={loadingTx ? loadingTx : 'common:loading'} style={$textStyle(state)}/> :<Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)}>
            {children}
          </Text>}

          {loading && <>
            <Spacer crossAxisSize={spacing.xs} />
            <ActivityIndicator size="small" color={colors.palette.neutral100} style={$loader} />
          </>}

          {!!RightAccessory && !loading && (
            <RightAccessory style={$rightAccessoryStyle} pressableState={state} />
          )}
        </>
      )}
    </Pressable>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: vs(44),
  borderRadius: ms(2),
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: "hidden",
}

const $baseTextStyle: TextStyle = {
  fontSize: ms(14),
  lineHeight: vs(20),
  fontFamily: typography.primary.bold,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  color: colors.palette.neutral900,
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.xs, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.xs, zIndex: 1 }

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      backgroundColor: colors.palette.primary100,
    },
  ] as StyleProp<ViewStyle>,

  filled: [$baseViewStyle, { backgroundColor: colors.palette.primary900 }] as StyleProp<ViewStyle>,

  reversed: [
    $baseViewStyle,
    { backgroundColor: colors.palette.neutral800 },
  ] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: [$baseTextStyle, { color: colors.palette.neutral100 }],
  reversed: [$baseTextStyle, { color: colors.palette.neutral100 }]
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.neutral200 },
  filled: { backgroundColor: colors.palette.primary400 },
  reversed: { backgroundColor: colors.palette.neutral700 }
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  reversed: { opacity: 0.9 }
}

const $loader: ViewStyle = {
  transform: [{ scale: 0.8 }],
}
