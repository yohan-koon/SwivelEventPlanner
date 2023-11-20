import { ScrollView, Text, TextInput, View, ViewStyle } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ImageUploaderButton, Screen, Spacer, TextField } from '../components';
import { spacing } from '../theme';
import { Formik } from 'formik';
import { displayMessage, ms } from '../utils';
import { getPersonalInfoFormValidationSchema } from '../validations/personalInfoFormValidationSchema';
import { useTranslation } from 'react-i18next';
import { useReduxDispatch, useReduxSelector } from '../redux';
import { launchCamera } from 'react-native-image-picker';
import { IImageUploadRequest, User, updateUserInfoAction, uploadUserImageAction } from '../redux/user';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export const ProfileScreen = () => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch(); 
  const { user, uploadUserImage: {loading: uploadUserImageLoading, error: uploadUserImageError}, updateUserInfo: {loading: updateUserInfoLoading, error: updateUserInfoError} } = useReduxSelector(state => state.user);

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [imageSource, setImageSource] = useState<string>();

  const initialFormValues: ProfileFormValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  };

  /**
   * useEffect hook to handle loading, error and data for image uploading
   */
  useEffect(() => {
    if (uploadUserImageLoading === 'loading') return;
    if (uploadUserImageError) { return displayMessage(uploadUserImageError); }
  }, [uploadUserImageLoading, uploadUserImageError, user]);

  /**
   * useEffect hook to handle loading, error and data for updating user info
   */
  useEffect(() => {
    if (updateUserInfoLoading === 'loading') return;
    if (updateUserInfoError) { return displayMessage(updateUserInfoError); }
    if (updateUserInfoLoading === 'succeeded') {
      setIsFormEditable(false);
    }
  },[updateUserInfoLoading, updateUserInfoError, user])

  /**
   * Capture image from camera
   */
  const captureImage = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });
      const src = result?.assets?.[0]?.uri;
      setImageSource(src)
      uploadImage(src)
    } catch (error: any) {
      displayMessage(error)
    }
  }

  /**
   * Upload image to firebase storage
   */
  const uploadImage = (src?: string) => {
    if(!src) return displayMessage(t('profileImageUploadScreen:takeAPhotoFirst'))
    if(!user) return displayMessage(t('profileImageUploadScreen:invalidUser'))
    const payload: IImageUploadRequest = { uri: src ?? '', user};
    dispatch(uploadUserImageAction(payload))
  }


  return (
    <Screen safeAreaEdges={[]} contentContainerStyle={$root} preset="fixed">
      <Formik
        initialValues={initialFormValues}
        validationSchema={getPersonalInfoFormValidationSchema(t)}
        onSubmit={values => {
          const updatedUser = {...user, ...values} as User
          dispatch(updateUserInfoAction(updatedUser));
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
              <ImageUploaderButton style={$imageUploader} isEditable={isFormEditable} src={user?.imageUrl} onPress={captureImage}/>
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
                  editable={isFormEditable && uploadUserImageLoading !== 'loading' && updateUserInfoLoading !== 'loading'}
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
                  editable={isFormEditable && uploadUserImageLoading !== 'loading' && updateUserInfoLoading !== 'loading'}
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
                  editable={false}
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
                  editable={isFormEditable && uploadUserImageLoading !== 'loading' && updateUserInfoLoading !== 'loading'}
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
                  editable={isFormEditable && uploadUserImageLoading !== 'loading' && updateUserInfoLoading !== 'loading'}
                />
              </View>
            </ScrollView>
            <Button tx={isFormEditable ? "common:save" : "common:edit"} onPress={() => !isFormEditable ? setIsFormEditable(!isFormEditable) : handleSubmit()} style={$button} loading={uploadUserImageLoading === 'loading' || updateUserInfoLoading === 'loading'} />
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
