import { SafeAreaView, ScrollView, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { NetworkImage } from './NetworkImage'
import { ms } from '../utils'
import { ImageStyle } from 'react-native-fast-image'
import { Text } from './Text'
import { colors, spacing } from '../theme'
import { Spacer } from './Spacer'
import { Seperator } from './Seperator'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { Icon } from './Icon'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ProfileNavigatorParamList } from '../navigators/ProfileNavigator'
import { APP_VERSION } from '../constants'
import { useTranslation } from 'react-i18next'

interface DrawerLayoutProps {
  /**
   * Navigation prop
   */
  navigation: any
}

export const DrawerLayout: FC<DrawerLayoutProps> = ({navigation}) => {
  const { t } = useTranslation();

  return (
    <View style={$root}>
      <ScrollView style={$contentContainer}>
        <SafeAreaView>
          <View style={$body}>
            <View style={$topContainer}>
              <View style={$header}>
                <NetworkImage style={$image} source={{ uri: 'https://picsum.photos/200/300' }} />
                <Spacer crossAxisSize={spacing.sm} />
                <View>
                  <Text preset='h5' text='Jane cooper' />
                  <Text preset='formLabel' text='jane@gmail.com' />
                </View>
              </View>
              <DrawerItem
                icon={() => <Icon icon='logout' color={colors.palette.error500} size={ms(16)} />}
                label={t('profileNavigator:logout')}
                onPress={() => { navigation?.closeDrawer() }}
                style={$drawerItem}
                labelStyle={$drawerItemLabel}
              />
            </View>
            <View style={$footer}>
              <Text tx="profileNavigator:version" txOptions={{ version: APP_VERSION }} />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flexGrow: 1,
}

const $topContainer: ViewStyle = {
  height: ms(550),
}

const $body: ViewStyle = {
  height: '100%',
}

const $header: ViewStyle = {
  flexDirection: 'row',
  padding: spacing.sm,
  borderBottomWidth: ms(1),
  borderBottomColor: 'rgba(0,0,0,0.1)',
}

const $image: ImageStyle = {
  width: ms(36),
  height: ms(36),
  borderRadius: ms(18),
}

const $footer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
}

const $drawerItem: ViewStyle = {

}

const $drawerItemLabel: TextStyle = {
  color: colors.palette.error500,
  marginLeft: -spacing.md,
}