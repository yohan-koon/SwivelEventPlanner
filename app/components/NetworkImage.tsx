import { View, ImageStyle as RNImageStyle, StyleProp, Image, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import FastImage, { ImageStyle as FIImageStyle, ResizeMode, FastImageProps, Source } from 'react-native-fast-image'
import { colors } from '../theme';

export type PlaceholderTypes = keyof typeof defaultPlaceholderRegistry;
interface NetworkImageProps extends FastImageProps {
  /**
   * The uri of the image to display
   */
  source?: Source,
  /**
   * Style override for the imager
   */
  style?: FIImageStyle,
  /**
   * Resize mode for the image
   */
  resizeMode?: ResizeMode,
  /**
   * Placeholder type
   */
  placeholder?: PlaceholderTypes
}

export const NetworkImage = (props: NetworkImageProps) => {
  const { source, style: $styleOverride, resizeMode = 'cover', placeholder = 'image', ...rest } = props;
  const [isLoading, setIsLoading] = useState(true);
  return (<View>
    <FastImage
      style={$styleOverride}
      source={{
        ...source,
        priority: FastImage.priority.normal,
      }}
      resizeMode={resizeMode}
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
      fallback={true}
      onError={() => {
        setIsLoading(false)
      }}
      {...rest}
    />
    {(isLoading || (!source || !source.uri || source.uri === '')) && <View style={[$placeholderContainerStyle, $styleOverride]}>
      <Image source={defaultPlaceholderRegistry[placeholder]} style={[$placeholderStyle]}/>
    </View>}
  </View>
  )
}

export const defaultPlaceholderRegistry = {
  image: require('../../assets/images/image-placeholder.png'),
  user: require('../../assets/images/user-placeholder.png'),
}

const $placeholderContainerStyle: ViewStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: colors.palette.neutral300,
  alignItems: 'center',
  justifyContent: 'center',
}

const $placeholderStyle: RNImageStyle = {
  width: '50%',
  height: '50%',
  resizeMode: 'contain',
}

