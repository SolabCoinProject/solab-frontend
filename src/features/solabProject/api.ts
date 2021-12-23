import { ISolabProject } from './types';
import { IResponseData } from '../../common/types';
import axiosClient from '../../libs/axiosClient';

const solabProjectApi = {
    app: {
        fetchSolabProject: (): Promise<IResponseData<ISolabProject>> => {
            const url = '/app/solab-project';
            return axiosClient.get(url);
        },
    },
};

export default solabProjectApi;
