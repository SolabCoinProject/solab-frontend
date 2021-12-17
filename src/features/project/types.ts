import { IPaginationResponse, IPaginationData } from '../../common/types';

export interface IProject {
    _id: string;
    name: string;
    slug: string;
    description: string;
    thumbnail: string;
    token: {
        thumbnail: string;
        symbol: string;
        category?: string;
        others?: [
            {
                label: string;
                value: string;
            }
        ];
    };
    keyMetrics?: [
        {
            value: string;
            label: string;
            unit?: string;
            unitPosition?: number;
            valueType: number;
        }
    ];
    social?: [
        {
            type: number;
            link: string;
        }
    ];
    idoPrice: number;
    idoSlots: number;
    details?: [
        {
            title: string;
            content: string;
        }
    ];
    phrases: {
        preparation: {
            title: string;
            description: string;
        };
        whitelist: {
            startDate: string;
            endDate: string;
            title: string;
            description: string;
        };
        lottery: {
            startDate: string;
            endDate: string;
            title: string;
            description: string;
        };
        sale: {
            startDate: string;
            endDate: string;
            title: string;
            description: string;
        };
        distribution: {
            startDate: string;
            title: string;
            description: string;
        };
    };
    launchType: {
        name: string;
        paymentAmountAtDistribution: number;
        tokenPaymentInterval: number;
        tokenPaymentPercent: number;
        tokenPaymentAllDate?: string;
    };
    task?: [
        {
            taskType: number;
            settings: any;
        }
    ];
    createdAt?: string;
    updatedAt?: string;
}

export interface IProjectState {
    admin: {
        projects: IPaginationData<IProject[]>;
        isFetchingProject: boolean;
        isCreateProjectModalOpen: boolean;
        reload: boolean;
    };
}
