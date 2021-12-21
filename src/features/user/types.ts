import { ITier } from './../tier/types';
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
    walletAddress: string;
    email?: string;
    telegram?: {
        id: string;
        username: string;
    };
    firstName?: string;
    lastName?: string;
    displayName?: string;
    tier?: ITier;
    stake: {
        totalSolab: number;
        totalLab: number;
        interest: number;
        history:
            | [
                  {
                      days: number;
                      solabAmount: number;
                      labAmount: number;
                      withdrawDate: string;
                  }
              ]
            | [];
    };
    isKycVerified: number;
    kycNote?: string;
}

export interface IUserState {
    admin: {
        staff: IStaff | null;
        isLoading: boolean;
        isLoggingIn: boolean;
        isLoggedIn: boolean;
        authenticated: boolean;
        isFetchingStaff: boolean;
    };
    app: {
        user: IUser | null;
        isFetchingUser: boolean;
        isUpdatingInfo: boolean;
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
}
