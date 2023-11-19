import {createDrawerNavigator} from '@react-navigation/drawer';
import {ProfileScreen} from '../screens';
import {DrawerLayout, Icon, NetworkImage} from '../components';
import {ImageStyle} from 'react-native-fast-image';
import {ms} from '../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {spacing} from '../theme';
import { useReduxSelector } from '../redux';

export type ProfileNavigatorParamList = {
  Profile: undefined;
};

const Drawer = createDrawerNavigator<ProfileNavigatorParamList>();

export const ProfileNavigator = () => {
  const {user} = useReduxSelector(state => state.user);
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerLayout {...props} />}
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <NetworkImage
              style={$image}
              source={{uri: user?.imageUrl}}
              placeholder="user"
            />
          </TouchableOpacity>
        ),
      })}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const $image: ImageStyle = {
  width: ms(36),
  height: ms(36),
  borderRadius: ms(18),
  marginLeft: spacing.xs,
};
