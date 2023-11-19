import { TextStyle, View, ViewStyle } from 'react-native'
import React, { FC, memo } from 'react'
import Carousel from 'react-native-snap-carousel';
import { NetworkImage } from './NetworkImage';
import { ms } from '../utils';
import { ImageStyle } from 'react-native-fast-image';
import { Text } from './Text';
import { colors, spacing } from '../theme';

interface ImageSliderProps {
    /**
     * list of images to display
     */
    images: string[]
}

export const ImageSlider : FC<ImageSliderProps> = ({ images }) => {
    console.log({images})
    const carouselRef = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <View style={$root}>
            <Carousel
                ref={carouselRef}
                data={images}
                renderItem={({ item }) => (
                    <NetworkImage source={{ uri: item }} style={$sliderItem} />
                )}
                sliderWidth={ms(390)}
                itemWidth={ms(390)}
                layout={'default'}
                loop={false}
                onSnapToItem={(index) => { setActiveIndex(index)}}
            />
            <View style={$pageDetails}>
                <Text text={`${activeIndex + 1} / ${images.length}`} style={$pageNumber}/>
            </View>
        </View>
    )
}

const $root: ViewStyle = {

}

const $sliderItem: ImageStyle = {
    width: '100%',
    height: ms(220),
};

const $pageDetails: ViewStyle = {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: spacing.xxs,
    borderRadius: ms(2)
}

const $pageNumber: TextStyle = {
    fontSize: ms(12),
    color: colors.palette.neutral800,
}