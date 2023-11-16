import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const getLoginFormValidationSchema = (t: TFunction) => {
    return Yup.object().shape({
        email: Yup.string()
            .required(t('common:validations:required', { fieldName: t('loginScreen:emailLabel') }))
            .email(t('common:validations:email')),
        password: Yup.string()
            .required(t('common:validations:required', { fieldName: t('loginScreen:passwordLabel') }))
            .min(8, t('common:validations:minLength', { fieldName: t('loginScreen:passwordLabel'), min: 8 }))
            .max(50, t('common:validations:minLength', { fieldName: t('loginScreen:passwordLabel'), min: 8 })),
    })
};