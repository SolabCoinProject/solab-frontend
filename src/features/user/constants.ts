export const kycVerified = 1;
export const kycDenied = 0;
export const kycVerifying = 2;
export const kycNeverSubmitted = 3;

export const kycStatuses = [
    {
        value: kycVerified,
        label: 'Verified',
    },
    {
        value: kycDenied,
        label: 'Denied',
    },
    {
        value: kycVerifying,
        label: 'Verifying',
    },
    {
        value: kycNeverSubmitted,
        label: 'Never Submitted',
    },
];
