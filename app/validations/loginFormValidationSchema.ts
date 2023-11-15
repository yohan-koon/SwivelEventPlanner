import * as Yup from 'yup';
import { UseTranslationResponse } from 'react-i18next';
import { TFunction } from 'i18next';

export const getLoginFormValidationSchema = (t: TFunction) => {
    return Yup.object().shape({
        username: Yup.string()
            .required(t('common:validations:required', { fieldName: t('loginScreen:usernamePlaceholder') }))
            .min(6, t('common:validations:minLength', { fieldName: t('loginScreen:usernamePlaceholder'), min: 8 }))
            .max(50, t('common:validations:minLength', { fieldName: t('loginScreen:usernamePlaceholder'), min: 8 })),
        password: Yup.string()
            .required(t('common:validations:required', { fieldName: t('loginScreen:passwordPlaceholder') }))
            .min(8, t('common:validations:minLength', { fieldName: t('loginScreen:passwordPlaceholder'), min: 8 }))
            .max(50, t('common:validations:minLength', { fieldName: t('loginScreen:passwordPlaceholder'), min: 8 })),
    })
};