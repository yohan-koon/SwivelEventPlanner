import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../theme";
import { ProfileImageUploadScreen, LoginScreen, SignUpScreen, PersonalInfoScreen } from "../screens";

export type OnboardingNavigatorParamList = {
    Login: undefined;
    SignUp: undefined;
    ProfileImageUpload: undefined;
    PersonalInfo: undefined;
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
            <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        </Stack.Navigator>
    );
};