import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { Icon, IconTypes } from '../components';
import { colors } from '../theme';

export type MainNavigatorParamList = {
    HomeNav: undefined,
    CartNav: undefined,
    ProfileNav: undefined,
}

const Tab = createBottomTabNavigator<MainNavigatorParamList>();

export const MainNavigator = () => {
    const activeTintColor = colors.palette.primary900;
    const inactiveTintColor = colors.palette.neutral400;

    const renderTabBarIcon = (color: string, size: number, icon: IconTypes) => {
        return <Icon icon={icon} color={color} size={size} />
    }
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen name="HomeNav" component={HomeNavigator} options={{
                tabBarActiveTintColor: activeTintColor,
                tabBarInactiveTintColor: inactiveTintColor,
                tabBarIcon: ({ color, size }) => renderTabBarIcon(color, size, 'home')
            }} />
            <Tab.Screen name="ProfileNav" component={ProfileNavigator} options={{
                tabBarActiveTintColor: activeTintColor,
                tabBarInactiveTintColor: inactiveTintColor,
                tabBarIcon: ({ color, size }) => renderTabBarIcon(color, size, 'more')
            }} />
        </Tab.Navigator>
    )
}