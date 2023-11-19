import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { User, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainNavigator } from './MainNavigator';
import { auth } from '../config';
import { loadExistingUserAction, setFirebaseUser, useReduxDispatch, useReduxSelector } from '../redux';

export type RootNavigatorParamList = {
    Login: undefined;
    MainNav: undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

export const RootNavigator = () => {
    const dispatch = useReduxDispatch();
    const { user, firebaseUser } = useReduxSelector(state => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch(setFirebaseUser(user));
        })
    }, []);

    useEffect(() => {
        if (firebaseUser && user && user.imageUrl && user.firstName && user.lastName) {
            setIsAuthenticated(true);
        }
    }, [user]);

    return (
        <NavigationContainer>
            {!isAuthenticated ? <OnboardingNavigator /> : <MainNavigator />}
        </NavigationContainer>
    );
};
