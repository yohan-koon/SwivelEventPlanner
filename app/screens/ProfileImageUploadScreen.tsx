import { TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, useMemo, useState } from 'react'
import { Button, ButtonAccessoryProps, Icon, RoundedButton, RoundedButtonAccessoryProps, Screen, Spacer, Text } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingNavigatorParamList } from '../navigators';
import { colors, spacing } from '../theme';
import { ms } from '../utils';

export const ProfileImageUploadScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<OnboardingNavigatorParamList>>();

    const [profileImage, setProfileImage] = useState(null)

    //Camera Icon for ImageUploader Button
    const CameraButtonAccessory: FC<RoundedButtonAccessoryProps> = useMemo(
      () =>
        function CameraButtonAccessory(props: RoundedButtonAccessoryProps) {
          return <Icon icon="camera" size={ms(13.5)} {...props} />
        },
      [],
    )

    //Next Icon for Login and SignUp Buttons
    const ButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
      () =>
        function ButtonRightAccessory(props: ButtonAccessoryProps) {
          return <Icon icon="nextArrow" size={ms(13.5)} {...props} color={colors.palette.neutral100}/>
        },
      [],
    )

    const captureImage = async () => {
      
    }

    const navigateToPersonalInfoScreen = () => {
      navigation.navigate("UserInfo")
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
          <RoundedButton
            style={$imageUploaderButton}
            Accessory={CameraButtonAccessory}
            onPress={captureImage}
          />
        </View>
        <Button
          tx="common:next"
          RightAccessory={ButtonRightAccessory}
          onPress={navigateToPersonalInfoScreen}
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
