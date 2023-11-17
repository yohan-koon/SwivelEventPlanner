import { FlatList, View, ViewStyle } from 'react-native'
import React, { FC, useMemo } from 'react'
import { LinkButton, LinkButtonAccessoryProps } from './LinkButton'
import { Text } from './Text'
import { Icon } from './Icon'
import { ms } from '../utils'
import { colors, spacing } from '../theme'
import { Photo } from './Photo'
import { photos } from '../seeds/photos'
import { Seperator } from './Seperator'
import { Spacer } from './Spacer'

interface PhotosProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

export const Photos: FC<PhotosProps> = ({ style: $styleOverride }) => {

  //Next Icon for All Photos Button
  const AllPhotosRightAccessory: FC<LinkButtonAccessoryProps> = useMemo(
    () =>
      function AllPhotosRightAccessory(props: LinkButtonAccessoryProps) {
        return (
          <Icon
            icon="nextArrow"
            size={ms(10)}
            {...props}
            color={colors.palette.primary900}
          />
        );
      },
    [],
  );

  return (
    <View style={[$root, $styleOverride]}>
      <View style={$titleContainer}>
        <Text tx='photos:title' preset='h3' />
        <LinkButton tx='photos:allPhotos' RightAccessory={AllPhotosRightAccessory} />
      </View>
      <Spacer mainAxisSize={spacing.xs} />
      <FlatList
        data={photos}
        renderItem={({ item }) => <Photo data={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Seperator size={1.5} preset='vertical' isEnablePadding={false}/>}
        style={$photosContainer}
      />
    </View>
  )
}

const $root: ViewStyle = {

}

const $photosContainer: ViewStyle = {
  borderColor: colors.palette.neutral200,
  borderWidth: ms(1),
  borderBottomWidth: 0
}

const $titleContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}