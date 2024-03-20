import * as yup from 'yup';

export const supportMessagesSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    description: yup.string().required()
});