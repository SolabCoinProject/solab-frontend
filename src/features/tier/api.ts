import { IResponseData } from '../../common/types';
import axiosClient from '../../libs/axiosClient';
import { ITier } from './types';

const tierApi = {
    admin: {
        createTier: (
            data: Omit<ITier, '_id'>
        ): Promise<IResponseData<ITier>> => {
            const url = 'admin/tier/create';
            return axiosClient.post(url, data);
        },
        fetchTiers: (params: any): Promise<IResponseData<ITier[]>> => {
            const url = 'admin/tier/';
            return axiosClient.get(url, {
                params,
            });
        },
        updateTier: (
            id: string,
            data: Omit<ITier, '_id'>
        ): Promise<IResponseData<ITier>> => {
            const url = `admin/tier/${id}/update`;
            return axiosClient.put(url, data);
        },
    },
    app: {
        fetchTiers: (): Promise<IResponseData<ITier[]>> => {
            const url = 'app/tier';
            return axiosClient.get(url);
        },
    },
};

export default tierApi;
