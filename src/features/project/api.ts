import { IResponseData } from '../../common/types';
import axiosClient from '../../libs/axiosClient';
import { IProject, IProjectFieldOptions } from './types';

const projectApi = {
    admin: {
        fetchProjects: (params: any): Promise<IResponseData<IProject[]>> => {
            const url = 'admin/project/';
            return axiosClient.get(url, {
                params,
            });
        },
        createProject(
            data: Omit<IProject, '_id'>
        ): Promise<IResponseData<IProject>> {
            const url = 'admin/project/create';
            return axiosClient.post(url, data);
        },

        fetchFieldOptions: (): Promise<IResponseData<IProjectFieldOptions>> => {
            const url = 'admin/project/field-options';
            return axiosClient.get(url);
        },
        editProject: (
            id: string,
            data: Omit<IProject, '_id'>
        ): Promise<IResponseData<IProject>> => {
            const url = `admin/project/${id}`;
            return axiosClient.put(url, data);
        },
    },
};

export default projectApi;
