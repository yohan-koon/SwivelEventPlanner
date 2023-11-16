import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const getSignUpFormValidationSchema = (t: TFunction) => {
    return Yup.object().shape({
        email: Yup.string()
            .required(t('common:validations:required', { fieldName: t('signupScreen:emailLabel') }))
            .email(t('common:validations:email')),
        password: Yup.string()
            .required(t('common:validations:required', { fieldName: t('signupScreen:passwordLabel') }))
            .min(8, t('common:validations:minLength', { fieldName: t('signupScreen:passwordLabel'), min: 8 }))
            .max(50, t('common:validations:minLength', { fieldName: t('signupScreen:passwordLabel'), min: 8 })),
        confirmPassword: Yup.string()
            .required(t('common:validations:required', { fieldName: t('signupScreen:confirmPasswordLabel') }))
            .min(8, t('common:validations:minLength', { fieldName: t('signupScreen:confirmPasswordLabel'), min: 8 }))
            .max(50, t('common:validations:minLength', { fieldName: t('signupScreen:confirmPasswordLabel'), min: 8 }))
            .oneOf([Yup.ref('password')], t('common:validations:passwordsDoNotMatch')),
    })
};