import {IPaginationData} from '../../common/types';
import {ITier} from './../tier/types';

export interface IStaff {
    username: string;
    status: number;
    role: {
        name: string;
        permissions: [String] | undefined;
        haveFullControl: Boolean;
    };
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IUser {
    _id: string;
    walletAddress: string;
    email?: string;
    telegram?: {
        id: string;
        username: string;
        avatar: string;
        chatId?: string;
    };
    firstName?: string;
    lastName?: string;
    displayName?: string;
    address?: string;
    phone?: string;
    nation?: string;
    tier?: ITier;
    stake?: {
        totalSolab: number;
        lastInterestClaimDate: string;
        remainInterest: number;
        labRecord: number[];
    };
    isKycVerified: number;
    kycNote?: string;
    created_at: string;
    updated_at: string;
}

export interface IUserState {
    admin: {
        staff: IStaff | null;
        isLoading: boolean;
        isLoggingIn: boolean;
        isLoggedIn: boolean;
        authenticated: boolean;
        isFetchingStaff: boolean;
        users: IPaginationData<IUserFull[]>;
        isFetchingUsers: boolean;
        reloadUsers: boolean;
        isUpdatingUsersKyc: boolean;
    };
    app: {
        user: IUser | null;
        isFetchingUser: boolean;
        isUpdatingInfo: boolean;
        isUpdatingKyc: boolean;
        isStaking: boolean;
        isClaimingInterest: boolean;
        isUnstaking: boolean;
        isIncreaseStakeModalOpen: boolean;
        constants: {
            kycVerified: number;
            kycDenied: number;
            kycVerifying: number;
            kycNeverSubmitted: number;
            kycArr: number[];
            kycStatuses: {
                value: number;
                label: string;
            }[];
        };
    };
}

export interface ILoginParams {
    username: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    message: string;
}

export interface IWalletConnectParams {
    walletAddress: string;
}

export interface IUserInfoUpdateParams {
    email?: string;
    telegram?: {
        id: string;
        username: string;
    };
    firstName?: string;
    lastName?: string;
    displayName?: string;
    address?: string;
    phone?: string;
    nation?: string;
}

export interface IUserKycUpdateParams {
    personalId: string;
    docsExpiredDate: string;
    docsFront: string;
    docsBack: string;
    selfie: string;
}

export interface IFollowProjectParams {
    userId: string;
    refId?: string;
}

export interface IUserFull extends IUser {
    kyc?: {
        personalId: string;
        docsExpiredDate: string;
        docsFront: string;
        docsBack: string;
        selfie: string;
    };
}

export interface IUpdateUserKycParams {
    kycData: { address: string; kycStatus: number }[];
}

export interface IStakeParams {
    signature: string;
    userId: string;
    solabAmount: number;
}