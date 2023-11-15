import { Text, View } from 'react-native'
import React from 'react'
import { Screen } from '../components'

export const HomeScreen = () => {
  return (
    <Screen safeAreaEdges={[]}>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </Screen>
  )
}