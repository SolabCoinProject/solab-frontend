import { IUserFull, IUser } from './../user/types';
import { IPaginationData } from '../../common/types';

export interface ISolabProject {
    _id: string;
    name: string;
    slug: string;
    pubKey: string;
    description: string;
    thumbnail: string;
    token: {
        thumbnail: string;
        address: string;
        symbol: string;
        category: string;
        others?: { label: string; value: string }[];
    };
    keyMetrics?: {
        value: string | number;
        label: string;
        unit?: string;
        unitPosition?: number;
        valueType?: number;
    }[];
    social?: {
        socialType: number;
        link: string;
    }[];
    buyAmountOptions: number[];
    details?: { title: string; content: string }[];
    idoStartDate: string;
    idoEndDate: string;
    task?: {
        uuid: string;
        taskType: number;
        settings: any;
        doneBy: string[];
        rewardTickets: number;
    }[];
    isClosed: boolean;
    media: { mediaType: number; link: string; thumbnail: string }[];
    firstPayment: {
        date: string;
        amount: number;
    };
    lastPayment: {
        date: string;
        amount: number;
    };
    registeredUsers: string[];
    followers: string[];
}

export interface ISolabRegisteredInfo {
    _id: string;
    user: string | IUser | IUserFull;
    bought: number;
    tickets: number;
    isInWhiteList: number;
    created_at: string;
    updated_at: string;
}

export interface ISolabProjectState {
    app: {
        solabProject: ISolabProject | null;
        isFetchingSolabProject: boolean;
        isDoingTaskCommunity: boolean;
        isPurchaseProcessing: boolean;
        isFollowingProject: boolean;
        solabRegisteredInfo: ISolabRegisteredInfo | null;
        isFetchingRegisterInfo: boolean;
        isTaskModalOpen: boolean;
        openTask: any;
        reloadRegisterInfo: boolean;
    };
    admin: {
        solabRegisteredInfos: IPaginationData<ISolabRegisteredInfo[]>;
        isFetchingSolabRegisteredInfos: boolean;
        reloadSolabRegisteredInfos: boolean;
        isUpdatingSolabWhitelist: boolean;
        isFetchingTotalTokenPayment: boolean;
        totalTokenPayment: { _id: string; amount: number }[];
    };
}

export interface IDoTaskCommunityParams {
    taskUuid: string;
    walletAddress: string;
}

export interface IProcessPurchaseParams {
    walletAddress: string;
    signature: string;
    amount: number;
    refId?: string;
}

export interface IFetchRegisterInfoParams {
    userId: string;
}

export interface IUpdateSolabWhitelistParams {
    registerData: {
        _id: string;
        isInWhitelist: number;
    }[];
}
