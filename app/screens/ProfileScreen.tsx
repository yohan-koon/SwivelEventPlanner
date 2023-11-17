import { ScrollView, Text, TextInput, View, ViewStyle } from 'react-native';
import React, { useRef, useState } from 'react';
import { Button, ImageUploaderButton, Screen, Spacer, TextField } from '../components';
import { spacing } from '../theme';
import { Formik } from 'formik';
import { ms } from '../utils';
import { getPersonalInfoFormValidationSchema } from '../validations/personalInfoFormValidationSchema';
import { useTranslation } from 'react-i18next';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export const ProfileScreen = () => {
  const { t } = useTranslation();

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialFormValues: ProfileFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  };

  return (
    <Screen safeAreaEdges={[]} contentContainerStyle={$root} preset="fixed">
      <Formik
        initialValues={initialFormValues}
        validationSchema={getPersonalInfoFormValidationSchema(t)}
        onSubmit={values => {
          console.log({ values });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView style={$topContainer}>
              <ImageUploaderButton style={$imageUploader}/>
              <Spacer mainAxisSize={spacing.md} />
              <View style={$formContainer}>
                <TextField
                  labelTx="profileScreen:firstNameLabel"
                  textContentType="name"
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    lastNameRef.current?.focus();
                  }}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  helper={
                    touched.firstName && errors.firstName
                      ? errors.firstName
                      : undefined
                  }
                  editable={isFormEditable}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={lastNameRef}
                  labelTx="profileScreen:lastNameLabel"
                  textContentType="name"
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    emailRef.current?.focus();
                  }}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  helper={
                    touched.lastName && errors.lastName
                      ? errors.lastName
                      : undefined
                  }
                  editable={isFormEditable}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={emailRef}
                  labelTx="profileScreen:emailLabel"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    phoneNumberRef.current?.focus();
                  }}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  helper={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  editable={isFormEditable}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={phoneNumberRef}
                  labelTx="profileScreen:phoneLabel"
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    addressRef.current?.focus();
                  }}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  helper={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : undefined
                  }
                  editable={isFormEditable}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={addressRef}
                  labelTx="profileScreen:addressLabel"
                  textContentType="fullStreetAddress"
                  keyboardType="default"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    handleSubmit();
                  }}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  helper={
                    touched.address && errors.address
                      ? errors.address
                      : undefined
                  }
                  editable={isFormEditable}
                />
              </View>
            </ScrollView>
            <Button tx={isFormEditable ? "common:save" : "common:edit"} onPress={() => setIsFormEditable(!isFormEditable)} style={$button} />
          </>
        )}
      </Formik>
    </Screen>
  );
};

const $root: ViewStyle = {
  flex: 1,
};

const $formContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
  flex: 1,
  flexGrow: 1

};

const $topContainer: ViewStyle = {
  flexGrow: 1,
  marginTop: ms(20),
  marginBottom: ms(20),
};

const $imageUploader: ViewStyle = {
  alignSelf: 'center',
}

const $button: ViewStyle = {
  marginHorizontal: spacing.md,
  marginBottom: spacing.md,
}
