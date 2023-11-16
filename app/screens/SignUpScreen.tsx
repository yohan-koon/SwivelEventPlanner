import { TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Button, ButtonAccessoryProps, Icon, Screen, Spacer, Text, TextField, TextFieldAccessoryProps } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingNavigatorParamList } from '../navigators';
import { ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';
import { Formik } from 'formik';
import { ms } from '../utils';
import { getSignUpFormValidationSchema } from '../validations/signUpFormValidationSchema';
import { useTranslation } from 'react-i18next';

interface SignUpFormValues {
  email: string
  password: string
  confirmPassword: string
}

export const SignUpScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<OnboardingNavigatorParamList>>()
  const { t } = useTranslation()

  const passwordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const initialFormValues: SignUpFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  }

  //Email Icon for Email TextField
  const EmailLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function EmailLeftAccessory(props: TextFieldAccessoryProps) {
        return <Icon icon="mail" size={ms(18)} {...props} />
      },
    [],
  )
  //Password Icon for Password TextField
  const PasswordLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordLeftAccessory(props: TextFieldAccessoryProps) {
        return <Icon icon="lock" size={ms(15)} {...props} />
      },
    [],
  )
  //ClosedEye / Eye Icon for Password TextField
  const PasswordRightAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordLeftAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon icon={isPasswordVisible ? "openEye" : "closedEye"} size={ms(15)} {...props} />
          </TouchableOpacity>
        )
      },
    [isPasswordVisible],
  )
  //ClosedEye / Eye Icon for Password TextField
  const ConfirmPasswordRightAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function ConfirmPasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Icon icon={isConfirmPasswordVisible ? "openEye" : "closedEye"} size={ms(15)} {...props} />
          </TouchableOpacity>
        )
      },
    [isConfirmPasswordVisible],
  )
  //Next Icon for Login and SignUp Buttons
  const ButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonRightAccessory(props: ButtonAccessoryProps) {
        return <Icon icon="nextArrow" size={ms(13.5)} {...props} color={colors.palette.neutral100} />
      },
    [],
  )

  return (
    <Screen
      style={$root}
      contentContainerStyle={$contentContainer}
      preset="scroll"
    >
      <Formik
        initialValues={initialFormValues}
        validationSchema={getSignUpFormValidationSchema(t)}
        onSubmit={(values) => console.log({ values })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={$topContainer}>
              <View style={$titleContainer}>
                <Text preset="h1" tx="signupScreen:title" />
                <Spacer mainAxisSize={spacing.sm} />
                <Text tx="signupScreen:subTitle" />
              </View>
              <View style={$formContainer}>
                <TextField
                  labelTx="signupScreen:emailLabel"
                  textContentType="emailAddress"
                  LeftAccessory={EmailLeftAccessory}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordRef.current?.focus()
                  }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  helper={touched.email && errors.email ? errors.email : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={passwordRef}
                  labelTx="signupScreen:passwordLabel"
                  secureTextEntry={!isPasswordVisible}
                  textContentType="password"
                  LeftAccessory={PasswordLeftAccessory}
                  RightAccessory={PasswordRightAccessory}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    confirmPasswordRef.current?.focus()
                  }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  helper={touched.password && errors.password ? errors.password : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={confirmPasswordRef}
                  labelTx="signupScreen:confirmPasswordLabel"
                  secureTextEntry={!isConfirmPasswordVisible}
                  textContentType="password"
                  LeftAccessory={PasswordLeftAccessory}
                  RightAccessory={ConfirmPasswordRightAccessory}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    handleSubmit()
                  }}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  helper={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : undefined
                  }
                />
              </View>
            </View>
            <View style={$bottomContainer}>
              <Button
                tx="signupScreen:signUpBtn"
                RightAccessory={ButtonRightAccessory}
                onPress={() => handleSubmit()}
              />
              <Spacer mainAxisSize={spacing.md} />
              <Button
                tx="signupScreen:loginBtn"
                RightAccessory={ButtonRightAccessory}
                onPress={() => navigation.goBack()}
              />
            </View>
          </>
        )}
      </Formik>
    </Screen>
  )
}


const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}

const $topContainer: ViewStyle = {
  flex: 3,
  justifyContent: "center",
}

const $titleContainer: ViewStyle = {
  alignItems: "center",
}

const $formContainer: ViewStyle = {
  marginTop: spacing.xl,
}

const $restorePasswordContainer: ViewStyle = {
  alignSelf: "flex-end",
}

const $bottomContainer: ViewStyle = {
  flex: 1,
}