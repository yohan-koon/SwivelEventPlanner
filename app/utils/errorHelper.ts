import {showMessage} from 'react-native-flash-message';

export type MessageType = 'success' | 'danger' | 'warning' | 'info';

export const displayMessage = (message: string, title?: string, type: MessageType = 'danger') => {
    showMessage({description: message, message: title ?? getMessageTitle(type), type: type})
}

const getMessageTitle = (type: MessageType) => {
    switch (type) {
        case 'success':
            return 'Success';
        case 'danger':
            return 'Error';
        case 'warning':
            return 'Warning';
        case 'info':
            return 'Info';
        default:
            return '';
    }
}