import { IPaginationResponse, IPaginationData } from './../../common/types';
export interface ITier {
    _id: string;
    name: string;
    thumbnail: string;
    lotteryTickets: number;
    requiredLabAmount: number;
    usdcLimit: number;
    hasGuaranteedAllocation: string | boolean;
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
}
