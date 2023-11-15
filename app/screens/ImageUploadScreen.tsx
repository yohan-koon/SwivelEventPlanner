import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Screen } from '../components'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingNavigatorParamList } from '../navigators';

export const ImageUploadScreen = () => {
  const navigation = useNavigation<NavigationProp<OnboardingNavigatorParamList>>();
  return (
    <Screen>
      <View>
        <Text>ImageUploadScreen</Text>
        <Button text="User Info" onPress={() => {navigation.navigate('UserInfo')}} />
      </View>
    </Screen>
  )
}
