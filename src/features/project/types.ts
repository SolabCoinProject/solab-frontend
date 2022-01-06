import {IOptionNumber, IPaginationData,} from '../../common/types';

export interface IProject {
    _id: string;
    name: string;
    slug: string;
    description: string;
    pubKey: string;
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
        decimals: number;
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
            socialType: number;
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
    communityTasks?: [
        {
            uuid: string;
            userLinkRequired: boolean;
            socialType: number;
            description: string;
            url: string;
            content?: string;
        }
    ];
    media: { mediaType: number; link: string; thumbnail: string }[];
    isClosed: boolean;
    isTBA: boolean;
    isPhraseTBA: boolean;
    raiseAmount: number;
    createdAt?: string;
    updatedAt?: string;

}

export interface IProjectFieldOptions {
    taskTypes: [IOptionNumber] | [];
    keyMetricUnitPoses: [IOptionNumber] | [];
    socialTypes: [IOptionNumber] | [];
    keyMetricTypes: [IOptionNumber] | [];
}

export interface IProjectsByPhrase {
    all: IProject[],
    whitelist: IProject[],
    upcoming: IProject[],
    sale: IProject[],
    distribution: IProject[],
    closed: IProject[],
    tba: IProject[],
}

export interface IProjectState {
    admin: {
        projects: IPaginationData<IProject[]>;
        isFetchingProject: boolean;
        isCreateProjectModalOpen: boolean;
        reload: boolean;
        isCreatingProject: boolean;
        isFetchingFieldOptions: boolean;
        fieldOptions: IProjectFieldOptions;
        isEditProjectModalOpen: boolean;
        editingProject: IProject | null;
        isEditingProject: boolean;
        isFetchingProjectById: boolean;
    };
    app: {
        projectsByPhrase: IProjectsByPhrase;
        isFetchingProjectByPhrase: boolean;
        isFetchingProjectBySlug: boolean;
        project: IProject | null
    };
}
