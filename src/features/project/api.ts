import { IResponseData } from '../../common/types';
import axiosClient from '../../libs/axiosClient';
import { IProject } from './types';

const projectApi = {
    admin: {
        fetchProjects: (params: any): Promise<IResponseData<IProject[]>> => {
            const url = 'admin/project/';
            return axiosClient.get(url, {
                params,
            });
        },
    },
};

export default projectApi;
