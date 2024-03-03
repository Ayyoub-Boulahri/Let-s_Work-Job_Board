import * as yup from 'yup';

export const jobOfferSchema = yup.object().shape({
    title: yup.string().required('title is required'),
    grade: yup.string().required('grade is required'),
    job_type: yup.string().required('job type is required').default('Full-time'),
    salary: yup.number().required('salary is required'),
    currency: yup.string().required('currency is required').default('USD'),
    pay_period: yup.string().required('payement period is required').default('Year'),
    delais_depot: yup.date().required('Deadline is required'),
    description: yup.string().required('Description is required'),
});