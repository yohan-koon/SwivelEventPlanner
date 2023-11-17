import common from './common';
import loginScreen from './login-screen';
import signupScreen from './signup-screen';
import profileImageUploadScreen from './profile-image-upload-screen';
import personalInfoScreen from './personal-info-screen';
import profileNavigator from './profile-navigator';
import mainNavigator from './main-navigator';
import profileScreen from './profile-screen';

const en = {
    common,
    loginScreen,
    signupScreen,
    profileImageUploadScreen,
    personalInfoScreen,
    profileNavigator,
    mainNavigator,
    profileScreen
}

export default en;
export type Translations = typeof en