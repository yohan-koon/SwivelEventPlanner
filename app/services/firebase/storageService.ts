import { ImagePickerResponse } from 'react-native-image-picker';
import { getDownloadURL, ref, uploadString, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase.config';
import { IImageUploadRequest } from '../../redux/user';
import { Platform } from 'react-native';
import { firebaseBuckets } from '../../constants';
/**
 * Upload image to firebase storage
 */
export const uploadImage = async (payload: IImageUploadRequest): Promise<string> => {
    const { uri, user } = payload;
    try {
        const response = await fetch(uri)
        const blob = await response.blob()
        const filename = uri.substring(uri.lastIndexOf('/')+1)
        const imageRef = ref(storage, `${firebaseBuckets.USER_IMAGES}/${user?.id}.${filename.split('.').pop()}`)
        await uploadBytes(imageRef, blob)
        const url = await getDownloadURL(imageRef)
        return url
    } catch (error) {
        throw error;
    }
}