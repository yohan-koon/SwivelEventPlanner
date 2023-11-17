import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, PostsScreen } from "../screens";

export type HomeNavigatorParamList = {
    Home: undefined,
    Posts: undefined,
}

const Stack = createNativeStackNavigator<HomeNavigatorParamList>();

export const HomeNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Posts" component={PostsScreen}/>
        </Stack.Navigator>
    )
}