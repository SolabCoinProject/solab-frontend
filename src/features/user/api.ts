import { IPaginationResponse, IResponseData } from './../../common/types';
import axiosClient from '../../libs/axiosClient';
import * as _ from 'lodash';
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
import { parseISO } from 'date-fns';

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
        fetchUsers: (query: any): Promise<IPaginationResponse<IUserFull[]>> => {
            let docsQuery = _.omit(query, ['page', 'limit']);
            if (docsQuery.created_at_from) {
                docsQuery.created_at = {
                    ...docsQuery.created_at,
                    $gte: parseISO(docsQuery.created_at_from),
                };
            }
            if (docsQuery.created_at_to) {
                docsQuery.created_at = {
                    ...docsQuery.created_at,
                    $lte: parseISO(docsQuery.created_at_to),
                };
            }
            docsQuery = _.omit(docsQuery, ['created_at_from', 'created_at_to']);
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
