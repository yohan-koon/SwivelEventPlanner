import { ViewStyle, View, FlatList, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { EventInfo, ImageSlider, Photos, Screen, Seperator, Spacer, Text } from '../components'
import { photos } from '../seeds/photos'
import { colors, spacing } from '../theme'
import { organizers } from '../seeds/organizers'
import { Organizer } from '../components/Organizer'
import { ms } from '../utils'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { HomeNavigatorParamList } from '../navigators/HomeNavigator'


export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<HomeNavigatorParamList>>();

  const renderPostInfoContainer = () => {
    return (<TouchableOpacity style={$postInfoContainer} onPress={() => navigation.navigate('Posts')}>
      <Text text='16' preset='h3' style={$postCount} />
      <Text tx='homeScreen:posts' />
    </TouchableOpacity>)
  }

  const renderHeaderContainer = () => {
    return <>
      <ImageSlider images={photos?.map(photo => photo.url)} />
      <EventInfo style={$eventInfoContainer} />
      <Text tx='organizers:title' preset='h4' style={$organizersTitle} />
      <Spacer mainAxisSize={spacing.md} />
    </>
  }

  const renderFooterContainer = () => {
    return <View style={$footerContainer}>
      <Seperator size={1.5} />
      <Photos style={$photosContainer} />
      <Seperator size={1.5} isEnablePadding={false} />
      {renderPostInfoContainer()}
    </View>
  }

  const renderPhotosContainer = () => {
    return <Photos style={$photosContainer} />
  }

  return (
    <Screen safeAreaEdges={[]} contentContainerStyle={$root} preset='fixed'>
      <FlatList
        data={organizers}
        renderItem={(item) => <Organizer data={item.item} />}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <Seperator size={1.5} style={$organizationSeperatorContainer} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeaderContainer}
        ListFooterComponent={renderFooterContainer}
      />
    </Screen>
  )
}

const $root: ViewStyle = {

}

const $eventInfoContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
  marginTop: spacing.lg
}

const $organizersTitle: TextStyle = {
  marginHorizontal: spacing.sm,
  marginTop: spacing.xl,
  fontWeight: '500'
}

const $organizationSeperatorContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
}

const $photosContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
  marginTop: spacing.xl
}

const $footerContainer: ViewStyle = {
  marginBottom: spacing.xl
}

const $postInfoContainer: ViewStyle = {
  alignItems: 'center',
  borderBottomWidth: ms(1),
  borderBottomColor: colors.palette.neutral300,
  paddingVertical: spacing.xs
}

const $postCount: TextStyle = {
  color: colors.palette.primary900,
  fontWeight: '600'
}