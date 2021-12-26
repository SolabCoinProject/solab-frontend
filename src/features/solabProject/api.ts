import {
    IDoTaskCommunityParams,
    IProcessPurchaseParams,
    ISolabProject,
} from './types';
import { IResponseData } from '../../common/types';
import axiosClient from '../../libs/axiosClient';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const solabProjectApi = {
    app: {
        fetchSolabProject: (): Promise<IResponseData<ISolabProject>> => {
            const url = '/app/solab-project';
            return axiosClient.get(url);
        },
        doTaskCommunity: (
            data: IDoTaskCommunityParams
        ): Promise<IResponseData<ISolabProject>> => {
            const url = '/app/solab-project/do-task-community';
            return axiosClient.put(url, data);
        },
        processPurchaseInfo: (
            data: IProcessPurchaseParams
        ): Promise<IResponseData<ISolabProject>> => {
            const postData = { ...data };
            const storedRefs = JSON.parse(
                localStorage.getItem('storeRefs') ?? JSON.stringify([])
            );
            const refData = storedRefs.find(
                (storedData) => storedData.p === 'solab-project'
            );
            if (refData) {
                postData.refId = refData.u;
            }
            const url = '/app/solab-project/purchase';
            return axiosClient.post(url, postData);
        },
    },
};

export default solabProjectApi;
