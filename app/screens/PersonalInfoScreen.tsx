import { TextInput, View, ViewStyle } from 'react-native'
import React, { FC, useMemo, useRef, useState } from 'react'
import { Screen, Spacer, TextField, Text, ButtonAccessoryProps, Icon, Button } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { OnboardingNavigatorParamList } from '../navigators'
import { ms } from '../utils'
import { colors, spacing } from '../theme'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { getPersonalInfoFormValidationSchema } from '../validations'

interface LoginFormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

export const PersonalInfoScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<OnboardingNavigatorParamList>>()
  const {t} = useTranslation()

  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const phoneNumberRef = useRef<TextInput>(null)
  const addressRef = useRef<TextInput>(null)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const initialFormValues: LoginFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  }

  //Previous Icon for Back Buttons
  const BackButtonLeftAccessory: FC<ButtonAccessoryProps> = useMemo(
    () => function BackButtonLeftAccessory(props: ButtonAccessoryProps) {
      return <Icon icon="prevArrow" size={ms(13.5)} {...props} />
    },
    [],
  )

  //Next Icon for Next Buttons
  const NextButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
    () => function NextButtonRightAccessory(props: ButtonAccessoryProps) {
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
      <Formik initialValues={initialFormValues} validationSchema={getPersonalInfoFormValidationSchema(t)} onSubmit={(values) => {
        console.log({ values })
        
      }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={$topContainer}>
              <View style={$titleContainer}>
                <Text preset="h4" tx="personalInfoScreen:title" />
                <Spacer mainAxisSize={spacing.xs} />
                <Text tx="personalInfoScreen:subTitle" />
              </View>
              <View style={$formContainer}>
              <TextField
                  labelTx="personalInfoScreen:firstNameLabel"
                  textContentType="name"
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => { lastNameRef.current?.focus() }}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  helper={touched.firstName && errors.firstName ? errors.firstName : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={lastNameRef}
                  labelTx="personalInfoScreen:lastNameLabel"
                  textContentType="name"
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => { emailRef.current?.focus() }}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  helper={touched.lastName && errors.lastName ? errors.lastName : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={emailRef}
                  labelTx="personalInfoScreen:emailLabel"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => { phoneNumberRef.current?.focus() }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  helper={touched.email && errors.email ? errors.email : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={phoneNumberRef}
                  labelTx="personalInfoScreen:phoneLabel"
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => { addressRef.current?.focus() }}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  helper={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined} />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={addressRef}
                  labelTx="personalInfoScreen:addressLabel"
                  textContentType="fullStreetAddress"
                  keyboardType="default"
                  returnKeyType="done"
                  onSubmitEditing={() => { handleSubmit() }}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  helper={touched.address && errors.address ? errors.address : undefined} />
              </View>
            </View>
            <View style={$bottomContainer}>
              <Button
                preset="default"
                style={$submitBtnContainer}
                tx="common:back"
                LeftAccessory={BackButtonLeftAccessory}
                onPress={() => navigation.goBack()}
              />
              <Spacer crossAxisSize={spacing.sm} />
              <Button style={$submitBtnContainer} tx="common:next" RightAccessory={NextButtonRightAccessory} onPress={() => handleSubmit()} />
            </View>
          </>
        )}
      </Formik>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $topContainer: ViewStyle = {
  flexGrow: 1,
  marginTop: ms(20),
}

const $titleContainer: ViewStyle = {
}

const $formContainer: ViewStyle = {
  marginTop: ms(20),
}

const $bottomContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing.sm,
}

const $submitBtnContainer: ViewStyle = {
  flex: 1,
}