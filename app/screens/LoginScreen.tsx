import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Screen } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingNavigatorParamList, RootNavigatorParamList } from '../navigators';

export const LoginScreen = () => {
  const onboardingNavigator = useNavigation<NavigationProp<OnboardingNavigatorParamList>>();
  const rootNavigator = useNavigation<NavigationProp<RootNavigatorParamList>>();
  return (
    <Screen>
      <View>
        <Text>Login Screen</Text>
        <Button text="Sign Up" onPress={() => {onboardingNavigator.navigate('SignUp')}} />
        <Button text="Image Upload" onPress={() => {onboardingNavigator.navigate('ImageUpload')}} />
      </View>
    </Screen>
  )
}