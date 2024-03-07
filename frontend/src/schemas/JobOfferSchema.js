import * as yup from 'yup';

export const jobOfferSchema = yup.object().shape({
    title: yup.string().required('title is required'),
    grade: yup.string().required('grade is required'),
    job_type: yup.string().default('Full-time'),
    salary: yup.number().required('salary is required'),
    currency: yup.string().default('USD'),
    pay_period: yup.string().default('Year'),
    delais_depot: yup.date().required('Deadline is required'),
    description: yup.string().required('Description is required'),
});