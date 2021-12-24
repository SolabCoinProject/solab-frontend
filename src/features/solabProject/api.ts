import { IDoTaskCommunityParams, ISolabProject } from './types';
import { IResponseData } from '../../common/types';
import axiosClient from '../../libs/axiosClient';

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
    },
};

export default solabProjectApi;
