import * as yup from 'yup';

export const companyInfosSchema = yup.object().shape({
    companyName: yup.string().required('Company Name is required'),
    phoneNumber: yup.string()
        .matches(/^\(\d{1,3}\) \d{3}-\d{6,}$/, 'Phone number must be in the format (212) 123-456789')
        .required('Phone Number is required'),
    country: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    address: yup.string().required('Address is required'),
    size: yup.string().required('Size is required'),
    foundedYear: yup.number().required('Year is required'),
    industry: yup.string().required('Industry is required'),
});

export const companyDescSchema = yup.object().shape({
    description: yup.string().min(500, "Your description must be at least 500 characters").required()
});