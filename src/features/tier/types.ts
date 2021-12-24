import { IPaginationResponse, IPaginationData } from './../../common/types';
export interface ITier {
    _id: string;
    name: string;
    thumbnail: string;
    lotteryTickets: number;
    requiredLabAmount: number;
    usdcLimit: number;
    hasGuaranteedAllocation: string | boolean;
    order: number;
}

export interface ITierState {
    admin: {
        tiers: IPaginationData<ITier[]>;
        editingTier: ITier | null;
        loading: boolean;
        isCreateTierModalOpen: boolean;
        isEditTierModalOpen: boolean;
        reload: boolean;
    };
    app: {
        tiers: ITier[];
        isFetchingTier: boolean;
    };
}
