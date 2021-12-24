import { IResponseData } from './../../common/types';
import axiosClient from '../../libs/axiosClient';
import {
    IStaff,
    ILoginParams,
    ILoginResponse,
    IUser,
    IWalletConnectParams,
    IUserInfoUpdateParams,
    IUserKycUpdateParams,
} from './types';

const userApi = {
    admin: {
        login: (data: ILoginParams): Promise<ILoginResponse> => {
            const url = 'admin/auth/login';
            return axiosClient.post(url, { ...data });
        },
        getCurrentStaff: (): Promise<IStaff> => {
            const url = 'admin/auth/current-staff';
            return axiosClient.get(url);
        },
    },
    app: {
        getOrCreateUser: (
            data: IWalletConnectParams
        ): Promise<IResponseData<IUser>> => {
            const url = 'app/user/create';
            return axiosClient.post(url, { ...data });
        },
        updateUserData: (
            walletAddress: string,
            data: IUserInfoUpdateParams
        ): Promise<IResponseData<IUser>> => {
            const url = `app/user/wallet/${walletAddress}/update`;
            return axiosClient.put(url, { ...data });
        },
        updateKyc: (
            walletAddress: string,
            data: IUserKycUpdateParams
        ): Promise<IResponseData<IUser>> => {
            const url = `app/user/kyc/${walletAddress}/update`;
            return axiosClient.put(url, { ...data });
        },
    },
};

export default userApi;
