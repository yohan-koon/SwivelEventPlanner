import {
  ViewStyle,
  View,
  FlatList,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  EventInfo,
  Photos,
  Screen,
  Seperator,
  Spacer,
  Text,
  ImageSlider,
  ImageSliderSkeleton,
  OrganizersSkeleton
} from '../components';
import {colors, spacing} from '../theme';
import {Organizer} from '../components/Organizer';
import {displayMessage, ms} from '../utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeNavigatorParamList} from '../navigators/HomeNavigator';
import {useReduxDispatch, useReduxSelector} from '../redux';
import { getPhotosAction } from '../redux/photos';
import { getOrganizersAction } from '../redux/organizers';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeNavigatorParamList>>();
  const dispatch = useReduxDispatch();

  const {
    photos,
    getPhotos: {loading: getPhotosLoading, error: getPhotosError},
  } = useReduxSelector(state => state.photos);

  const {
    organizers,
    getOrganizers: {loading: getOrganizersLoading, error: getOrganizersError},
  } = useReduxSelector(state => state.organizers);

  useEffect(() => {
    //Dispatch getPhotosAction to get photos from API
    dispatch(getPhotosAction())

    //Dispatch getOrganizersAction to get organizers from API
    dispatch(getOrganizersAction());
  }, []);

  /**
   * useEffect hook to handle loading, error and data for photos
   */
  useEffect(() => {
    if (getPhotosLoading === 'loading') return;
    if (getPhotosError) return displayMessage(getPhotosError);
  }, [getPhotosLoading, getPhotosError, photos]);

  /**
   * useEffect hook to handle loading, error and data for organizers
   */
  useEffect(() => {
    if (getOrganizersLoading === 'loading') return;
    if (getOrganizersError) return displayMessage(getOrganizersError);
  }, [getOrganizersLoading, getOrganizersError, organizers]);

  const renderPostInfoContainer = () => {
    return (
      <TouchableOpacity
        style={$postInfoContainer}
        onPress={() => navigation.navigate('Posts')}>
        <Text text={photos ? `${photos.length}` : '0'} preset="h3" style={$postCount} />
        <Text tx="homeScreen:posts" />
      </TouchableOpacity>
    );
  };

  const renderHeaderContainer = () => {
    return (
      <>
        {getPhotosLoading === 'loading' ? <ImageSliderSkeleton /> : <ImageSlider images={photos?.map(photo => photo.thumbnailUrl)} />}
        <EventInfo style={$eventInfoContainer} />
        <Text tx="organizers:title" preset="h4" style={$organizersTitle} />
        <Spacer mainAxisSize={spacing.md} />
      </>
    );
  };

  const renderFooterContainer = () => {
    return photos && photos?.length > 0 ? (<View style={$footerContainer}>
      <Seperator size={1.5} />
      <Photos style={$photosContainer} photos={photos}/>
      <Seperator size={1.5} isEnablePadding={false} />
      {renderPostInfoContainer()}
    </View>) : <></>
  };

  return (
    <Screen safeAreaEdges={[]} contentContainerStyle={$root} preset="fixed">
      <FlatList
        data={organizers}
        renderItem={item => <Organizer data={item.item} />}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <Seperator size={1.5} style={$organizationSeperatorContainer} />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeaderContainer}
        ListFooterComponent={renderFooterContainer}
        ListEmptyComponent={() => <OrganizersSkeleton />}
      />
    </Screen>
  );
};

const $root: ViewStyle = {};

const $eventInfoContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
  marginTop: spacing.lg,
};

const $organizersTitle: TextStyle = {
  marginHorizontal: spacing.sm,
  marginTop: spacing.xl,
  fontWeight: '500',
};

const $organizationSeperatorContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
};

const $photosContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
  marginTop: spacing.xl,
};

const $footerContainer: ViewStyle = {
  marginBottom: spacing.xl,
};

const $postInfoContainer: ViewStyle = {
  alignItems: 'center',
  borderBottomWidth: ms(1),
  borderBottomColor: colors.palette.neutral300,
  paddingVertical: spacing.xs,
};

const $postCount: TextStyle = {
  color: colors.palette.primary900,
  fontWeight: '600',
};
