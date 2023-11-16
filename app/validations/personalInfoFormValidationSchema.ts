import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const getPersonalInfoFormValidationSchema = (t: TFunction) => {
    return Yup.object().shape({
        firstName: Yup.string()
            .required(t('commonValidations:required', { fieldName: t('personalInfoScreen:firstNameLabel') })),
        lastName: Yup.string()
            .required(t('commonValidations:required', { fieldName: t('personalInfoScreen:lastNameLabel') })),
        email: Yup.string()
            .required(t('commonValidations:required', { fieldName: t('personalInfoScreen:emailLabel') }))
            .email(t('commonValidations:email')),
        phoneNumber: Yup.string()
            .required(t('commonValidations:required', { fieldName: t('personalInfoScreen:phoneLabel') })),
        address: Yup.string()
            .required(t('commonValidations:required', { fieldName: t('personalInfoScreen:addressLabel') })),
    })
};