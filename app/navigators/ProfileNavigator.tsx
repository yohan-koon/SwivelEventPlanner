import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../screens";

export type ProfileNavigatorParamList = {
    Profile: undefined,
}

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

export const ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}