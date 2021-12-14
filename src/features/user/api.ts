import axiosClient from '../../libs/axiosClient';
import { IStaff, ILoginParams, ILoginResponse } from './types';

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
};

export default userApi;
