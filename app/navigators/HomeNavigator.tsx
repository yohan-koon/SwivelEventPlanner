import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";

export type HomeNavigatorParamList = {
    Home: undefined,
}

const Stack = createNativeStackNavigator<HomeNavigatorParamList>();

export const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}