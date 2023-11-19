import { Platform, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, useEffect, useMemo } from 'react'
import { Button, ButtonAccessoryProps, Icon, ImageUploaderButton, ImageUploaderButtonAccessoryProps, Screen, Spacer, Text } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingNavigatorParamList } from '../navigators';
import { launchCamera } from 'react-native-image-picker';
import { colors, spacing } from '../theme';
import { displayMessage, ms } from '../utils';
import { uploadUserImageAction, useReduxDispatch, useReduxSelector } from '../redux';
import { IImageUploadRequest } from '../redux/user';
import { useTranslation } from 'react-i18next';

export const ProfileImageUploadScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<OnboardingNavigatorParamList>>();
  const { t } = useTranslation();
  const { user, uploadUserImage: {loading, error}} = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();
  const [imageSource, setImageSource] = React.useState<string>();

  /**
   * useEffect hook to handle loading, error and data for image uploading
   */
  useEffect(() => {
    if (loading === 'loading') return;
    if (error) { return displayMessage(error); }
    if (loading === 'succeeded' && user?.imageUrl) { navigation.navigate('PersonalInfo') }
  }, [loading, error, user]);

  //Camera Icon for ImageUploader Button
  const CameraButtonAccessory: FC<ImageUploaderButtonAccessoryProps> = useMemo(
    () =>
      function CameraButtonAccessory(props: ImageUploaderButtonAccessoryProps) {
        return <Icon icon="camera" size={ms(13.5)} {...props} />
      },
    [],
  )

  //Next Icon for Login and SignUp Buttons
  const ButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonRightAccessory(props: ButtonAccessoryProps) {
        return <Icon icon="nextArrow" size={ms(13.5)} {...props} color={colors.palette.neutral100} />
      },
    [],
  )

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
    } catch (error: any) {
      displayMessage(error)
    }
  }

  /**
   * Upload image to firebase storage
   */
  const uploadImage = () => {
    if(!imageSource) return displayMessage(t('profileImageUploadScreen:takeAPhotoFirst'))
    if(!user) return displayMessage(t('profileImageUploadScreen:invalidUser'))
    const payload: IImageUploadRequest = { uri: imageSource ?? '', user};
    dispatch(uploadUserImageAction(payload))
  }

  return (
    <Screen
      style={$root}
      preset="scroll"
      contentContainerStyle={$contentContainer}>
      <View style={$topContainer}>
        <View style={$titleContainer}>
          <Text preset="h1" tx="profileImageUploadScreen:title" />
          <Spacer mainAxisSize={spacing.sm} />
          <Text tx="profileImageUploadScreen:subTitle" style={$title} />
        </View>
        <ImageUploaderButton
          style={$imageUploaderButton}
          onPress={captureImage}
          src={imageSource}
          disabled={loading === 'loading'}
        />
      </View>
      <Button
        tx="common:next"
        loadingTx='common:uploading'
        RightAccessory={ButtonRightAccessory}
        onPress={uploadImage}
        loading={loading === 'loading'}
      />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.lg,
}

const $topContainer: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
}

const $titleContainer: ViewStyle = {
  alignItems: "center",
}

const $title: TextStyle = {
  textAlign: "center",
  marginHorizontal: spacing.lg,
}

const $imageUploaderButton: ViewStyle = {
  alignSelf: "center",
  marginVertical: spacing.xl,
}
