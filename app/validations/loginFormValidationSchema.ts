import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const getLoginFormValidationSchema = (t: TFunction) => {
    return Yup.object().shape({
        email: Yup.string()
            .required(t('commonValidations.required', { fieldName: t('loginScreen.emailLabel') }))
            .email(t('commonValidations.email')),
        password: Yup.string()
            .required(t('commonValidations.required', { fieldName: t('loginScreen.passwordLabel') }))
            .min(8, t('commonValidations.minLength', { fieldName: t('loginScreen.passwordLabel'), min: 8 }))
            .max(50, t('commonValidations.minLength', { fieldName: t('loginScreen.passwordLabel'), min: 8 })),
    })
};