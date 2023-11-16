import { TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, useMemo, useRef, useState } from 'react'
import { Button, ButtonAccessoryProps, Icon, LinkButton, LinkButtonAccessoryProps, Screen, Spacer, TextField, TextFieldAccessoryProps, Text } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingNavigatorParamList } from '../navigators';
import { colors, spacing } from '../theme';
import { Formik } from 'formik';
import { ms } from '../utils';
import { getLoginFormValidationSchema } from '../validations';
import { useTranslation } from 'react-i18next';

interface LoginFormValues {
  email: string
  password: string
}

export const LoginScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<OnboardingNavigatorParamList>>();
  const {t} = useTranslation()

  const passwordRef = useRef<TextInput>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const initialFormValues: LoginFormValues = {
    email: "",
    password: "",
  }

  //Email Icon for Email TextField
  const EmailLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () => function EmailLeftAccessory(props: TextFieldAccessoryProps) {
      return <Icon icon="mail" size={ms(18)} {...props} />
    },
    [],
  )
  //Password Icon for Password TextField
  const PasswordLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () => function PasswordRightAccessory(props: TextFieldAccessoryProps) {
      return <Icon icon="lock" size={ms(15)} {...props} />
    },
    [],
  )
  //ClosedEye / Eye Icon for Password TextField
  const PasswordRightAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () => function PasswordRightAccessory(props: TextFieldAccessoryProps) {
      return (<TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Icon icon={isPasswordVisible ? "openEye" : "closedEye"} size={ms(15)} {...props} />
      </TouchableOpacity>)
    },
    [isPasswordVisible],
  )
  //Open Icon for Restore Password LinkButton
  const RestorePasswordRightAccessory: FC<LinkButtonAccessoryProps> = useMemo(
    () => function RestorePasswordRightAccessory(props: LinkButtonAccessoryProps) {
      return <Icon icon="openArrow" size={ms(10)} {...props} color={colors.palette.primary900}/>
    },
    [],
  )
  //Next Icon for Login and SignUp Buttons
  const ButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
    () => function ButtonRightAccessory(props: ButtonAccessoryProps) {
      return <Icon icon="nextArrow" size={ms(13.5)} {...props} color={colors.palette.neutral100} />
    },
    [],
  )

  return (
    <Screen
      style={$root}
      contentContainerStyle={$contentContainer}
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
    >
      <Formik initialValues={initialFormValues} validationSchema={getLoginFormValidationSchema(t)} onSubmit={(values) => {
        console.log({ values })
      }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={$topContainer}>
              <View style={$titleContainer}>
                <Text preset="h1" tx="loginScreen:title" />
                <Spacer mainAxisSize={spacing.sm} />
                <Text tx="loginScreen:subTitle" />
              </View>
              <View style={$formContainer}>
                <TextField
                  labelTx="loginScreen:emailLabel"
                  textContentType="emailAddress"
                  LeftAccessory={EmailLeftAccessory}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => { passwordRef?.current?.focus() }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  helper={touched.email && errors.email ? errors.email : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={passwordRef}
                  labelTx="loginScreen:passwordLabel"
                  secureTextEntry={!isPasswordVisible}
                  textContentType="password"
                  LeftAccessory={PasswordLeftAccessory}
                  RightAccessory={PasswordRightAccessory}
                  returnKeyType="done"
                  onSubmitEditing={() => { handleSubmit() }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  helper={touched.password && errors.password ? errors.password : undefined}
                />
                <Spacer mainAxisSize={spacing.lg} />
                <LinkButton
                  style={$restorePasswordContainer}
                  tx="loginScreen:restorePassword"
                  RightAccessory={RestorePasswordRightAccessory}
                />
              </View>
            </View>
            <View style={$bottomContainer}>
              <Button
                tx="loginScreen:loginBtn"
                RightAccessory={ButtonRightAccessory}
                onPress={() => handleSubmit()}
              />
              <Spacer mainAxisSize={spacing.md} />
              <Button tx="loginScreen:signUpBtn" RightAccessory={ButtonRightAccessory} onPress={() => navigation?.navigate('SignUp')} />
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