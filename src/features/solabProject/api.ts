import {
    IDoTaskCommunityParams,
    IFetchRegisterInfoParams,
    IProcessPurchaseParams,
    ISolabProject,
    ISolabRegisteredInfo,
    IUpdateSolabWhitelistParams,
} from './types';
import {IPaginationResponse, IResponseData} from '../../common/types';
import axiosClient from '../../libs/axiosClient';
import {IFollowProjectParams} from '../user/types';
import {queryParamsHandler} from '../../libs/queryParams';

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
            const postData = {...data};
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
        followProject: (
            data: IFollowProjectParams
        ): Promise<IResponseData<ISolabProject>> => {
            const putData = {...data};
            const storedRefs = JSON.parse(
                localStorage.getItem('storeRefs') ?? JSON.stringify([])
            );
            const refData = storedRefs.find(
                (storedData) => storedData.p === 'solab-project'
            );
            if (refData) {
                putData.refId = refData.u;
            }
            const url = '/app/solab-project/follow';
            return axiosClient.put(url, putData);
        },
        fetchRegisterInfo: (
            data: IFetchRegisterInfoParams
        ): Promise<IResponseData<ISolabRegisteredInfo>> => {
            const url = `/app/solab-project/register-info/${data.userId}`;
            return axiosClient.get(url);
        },
    },

    admin: {
        fetchSolabRegisteredInfos: (
            query: any
        ): Promise<IPaginationResponse<ISolabRegisteredInfo[]>> => {
            const docsQuery = queryParamsHandler(query);
            const queryParams = {
                page: query.page,
                limit: query.limit,
                q: JSON.stringify(docsQuery),
            };
            const url = 'admin/solab-project/register-infos';
            return axiosClient.get(url, {
                params: queryParams,
            });
        },
        updateSolabWhitelist: (
            data: IUpdateSolabWhitelistParams
        ): Promise<IResponseData<null>> => {
            const url = 'admin/solab-project/update-whitelist';
            return axiosClient.put(url, data);
        },

        fetchTotalTokenPayment: (): Promise<IResponseData<{ _id: string; amount: number }[]>> => {
            const url = 'admin/solab-project/total-token-payment';
            return axiosClient.get(url);
        },

        fetchTotalFund: (): Promise<IResponseData<number>> => {
            const url = 'admin/solab-project/total-fund';
            return axiosClient.get(url);
        }

    },
};

export default solabProjectApi;
