import common from './common';
import loginScreen from './login-screen';
import signupScreen from './signup-screen';
import profileImageUploadScreen from './profile-image-upload-screen';
import personalInfoScreen from './personal-info-screen';
import profileNavigator from './profile-navigator';
import mainNavigator from './main-navigator';
import profileScreen from './profile-screen';
import organizers from './organizers';
import photos from './photos';
import homeScreen from './home-screen';

const en = {
    common,
    loginScreen,
    signupScreen,
    profileImageUploadScreen,
    personalInfoScreen,
    profileNavigator,
    mainNavigator,
    profileScreen,
    organizers,
    photos,
    homeScreen
}

export default en;
export type Translations = typeof en