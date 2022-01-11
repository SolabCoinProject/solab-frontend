import {IPaginationResponse, IResponseData} from './../../common/types';
import axiosClient from '../../libs/axiosClient';
import {
    IStaff,
    ILoginParams,
    ILoginResponse,
    IUser,
    IWalletConnectParams,
    IUserInfoUpdateParams,
    IUserKycUpdateParams,
    IUserFull,
} from './types';
import {queryParamsHandler} from '../../libs/queryParams';

const userApi = {
    admin: {
        login: (data: ILoginParams): Promise<ILoginResponse> => {
            const url = 'admin/auth/login';
            return axiosClient.post(url, {...data});
        },
        getCurrentStaff: (): Promise<IStaff> => {
            const url = 'admin/auth/current-staff';
            return axiosClient.get(url);
        },
        fetchUsers: (query: any): Promise<IPaginationResponse<IUserFull[]>> => {
            const docsQuery = queryParamsHandler(query);
            const queryParams = {
                page: query.page,
                limit: query.limit,
                q: JSON.stringify(docsQuery),
            };
            const url = 'admin/user';
            return axiosClient.get(url, {
                params: queryParams,
            });
        },
        updateUserKyc: (
            data: IUserKycUpdateParams
        ): Promise<IResponseData<null>> => {
            const url = 'admin/user/verify';
            return axiosClient.put(url, data);
        },
    },
    app: {
        getOrCreateUser: (
            data: IWalletConnectParams
        ): Promise<IResponseData<IUser>> => {
            const url = 'app/user/create';
            return axiosClient.post(url, {...data});
        },
        updateUserData: (
            walletAddress: string,
            data: IUserInfoUpdateParams
        ): Promise<IResponseData<IUser>> => {
            const url = `app/user/wallet/${walletAddress}/update`;
            return axiosClient.put(url, {...data});
        },
        updateKyc: (
            walletAddress: string,
            data: IUserKycUpdateParams
        ): Promise<IResponseData<IUser>> => {
            const url = `app/user/kyc/${walletAddress}/update`;
            return axiosClient.put(url, {...data});
        },
        stake: (userId: string, solabAmount: number, signature: string): Promise<IResponseData<IUser>> => {
            const url = `app/user/stake/${userId}`;
            return axiosClient.put(url, {solabAmount, signature});
        },
        claimInterest: (userId: string, claimDate: string): Promise<IResponseData<IUser>> => {
            const url = `app/user/claim-interest/${userId}`;
            return axiosClient.put(url, {claimDate});
        },
        unstake: (userId: string): Promise<IResponseData<IUser>> => {
            const url = `app/user/unstake/${userId}`;
            return axiosClient.put(url);
        }
    },
};

export default userApi;
