// PersonnelInfosSchema.js
import * as yup from 'yup';

export const PersonnelInfosSchema = yup.object().shape({
    cin: yup.string().required('CIN is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phoneNumber: yup.string()
        .matches(/^\(\d{1,3}\) \d{3}-\d{6,}$/, 'Phone number must be in the format (212) 123-456789')
        .required('Phone Number is required'),
    dob: yup.date().required('Date of Birth is required'),
    country: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    address: yup.string().required('Address is required'),
});

export const aboutSchema = yup.object().shape({
    aboutMe: yup.string().min(500, "Your description must be at least 500 characters").required()
});