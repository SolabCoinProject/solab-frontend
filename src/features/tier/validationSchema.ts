import * as Yup from 'yup';

const tierValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    lotteryTickets: Yup.number()
        .min(0, 'Must be positive')
        .required('Lottery tickets is required'),
    requiredLabAmount: Yup.number()
        .min(0, 'Must be positive')
        .required('Required lab amount is required'),
    usdcLimit: Yup.number()
        .min(0, 'Must be positive')
        .required('USDC limit per slot is required'),
    hasGuaranteedAllocation: Yup.string()
        .oneOf(['yes', 'no'], 'Must be yes or no')
        .required('Must be yes or no'),
    thumbnail: Yup.string()
        .url('Must be an url')
        .required('Thumbnail is required'),
    order: Yup.number()
        .min(0, 'Must be positive')
        .required('Order is required'),
});

export default tierValidationSchema;
