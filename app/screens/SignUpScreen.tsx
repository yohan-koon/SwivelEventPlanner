import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Screen } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingNavigatorParamList } from '../navigators';

export const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<OnboardingNavigatorParamList>>();
  return (
    <Screen>
      <View>
        <Text>SignUpScreen</Text>
        <Button text="Image Upload" onPress={() => {navigation.navigate('ImageUpload')}} />
        <Button text="Login" onPress={() => {navigation.goBack()}} />
      </View>
    </Screen>
  )
}
