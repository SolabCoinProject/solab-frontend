import {IResponseData} from '../../common/types';
import axiosClient from '../../libs/axiosClient';
import {IProject, IProjectFieldOptions, IProjectsByPhrase} from './types';

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
        fetchById: (id: string): Promise<IResponseData<IProject>> => {
            const url = `admin/project/${id}`;
            return axiosClient.get(url);
        },
    },
    app: {
        fetchProjectsByPhrase: (): Promise<IResponseData<IProjectsByPhrase>> => {
            const url = 'app/project/projects-by-phrase';
            return axiosClient.get(url);
        },
        fetchProjectBySlug: (slug: string): Promise<IResponseData<IProject>> => {
            const url = `app/project/${slug}`;
            return axiosClient.get(url);
        }
    }
};

export default projectApi;
