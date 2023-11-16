import React, {useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainNavigator } from './MainNavigator';

export type RootNavigatorParamList = {
    Login: undefined;
    MainNav: undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <NavigationContainer>
            {isAuthenticated ? <MainNavigator /> : <OnboardingNavigator />}
        </NavigationContainer>
    );
};
