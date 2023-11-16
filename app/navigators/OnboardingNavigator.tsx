import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../theme";
import { ProfileImageUploadScreen, LoginScreen, SignUpScreen, UserInfoScreen } from "../screens";

export type OnboardingNavigatorParamList = {
    Login: undefined;
    SignUp: undefined;
    ProfileImageUpload: undefined;
    UserInfo: undefined;
};

const Stack = createNativeStackNavigator<OnboardingNavigatorParamList>();

export const OnboardingNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                navigationBarColor: colors.background,
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ProfileImageUpload" component={ProfileImageUploadScreen} />
            <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        </Stack.Navigator>
    );
};