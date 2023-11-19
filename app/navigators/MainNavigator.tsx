import { StyleSheet, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { Icon, IconTypes } from '../components';
import { colors } from '../theme';
import { useTranslation } from 'react-i18next';
import { loadExistingUserAction, signOutAction, useReduxDispatch, useReduxSelector } from '../redux';

export type MainNavigatorParamList = {
    HomeNav: undefined,
    CartNav: undefined,
    ProfileNav: undefined,
}

const Tab = createBottomTabNavigator<MainNavigatorParamList>();

export const MainNavigator = () => {
    const activeTintColor = colors.palette.primary900;
    const inactiveTintColor = colors.palette.neutral400;
    const {t} = useTranslation();
    const dispatch = useReduxDispatch();
    const {firebaseUser} = useReduxSelector(state => state.user);

    useEffect(() => {
        if(!firebaseUser) {
            dispatch(signOutAction());
        }else{
            dispatch(loadExistingUserAction(firebaseUser?.uid))
        };
        
    },[])

    const renderTabBarIcon = (color: string, size: number, icon: IconTypes) => {
        return <Icon icon={icon} color={color} size={size} />
    }
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: $tabBarStyle}}>
            <Tab.Screen name="HomeNav" component={HomeNavigator} options={{
                tabBarActiveTintColor: activeTintColor,
                tabBarInactiveTintColor: inactiveTintColor,
                tabBarIcon: ({ color, size }) => renderTabBarIcon(color, size, 'home'),
                tabBarLabel: t('mainNavigator:home')
            }} />
            <Tab.Screen name="ProfileNav" component={ProfileNavigator} options={{
                tabBarActiveTintColor: activeTintColor,
                tabBarInactiveTintColor: inactiveTintColor,
                tabBarIcon: ({ color, size }) => renderTabBarIcon(color, size, 'more'),
                tabBarLabel: t('mainNavigator:profile')
            }} />
        </Tab.Navigator>
    )
}

const $tabBarStyle : ViewStyle = {
    backgroundColor: colors.palette.neutral900,
}