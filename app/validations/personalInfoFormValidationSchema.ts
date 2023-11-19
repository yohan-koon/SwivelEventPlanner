import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const getPersonalInfoFormValidationSchema = (t: TFunction) => {
    return Yup.object().shape({
        firstName: Yup.string()
            .required(t('common:validations:required', { fieldName: t('personalInfoScreen:firstNameLabel') })),
        lastName: Yup.string()
            .required(t('common:validations:required', { fieldName: t('personalInfoScreen:lastNameLabel') })),
        email: Yup.string()
            .required(t('common:validations:required', { fieldName: t('personalInfoScreen:emailLabel') }))
            .email(t('common:validations:email')),
        phoneNumber: Yup.string()
            .required(t('common:validations:required', { fieldName: t('personalInfoScreen:phoneLabel') }))
            .max(10, t('common:validations:maxLength', { fieldName: t('personalInfoScreen:phoneLabel'), max: 10 }))
            .min(10, t('common:validations:minLength', { fieldName: t('personalInfoScreen:phoneLabel'), min: 10 })),
        address: Yup.string()
            .required(t('common:validations:required', { fieldName: t('personalInfoScreen:addressLabel') })),
    })
};