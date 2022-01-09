import {IResponseData} from "../../common/types";
import axiosClient from "../../libs/axiosClient";
import {IConfig} from "./types";

const configApi = {
    admin: {
        fetchConfigBySlug: (slug: string): Promise<IResponseData<IConfig>> => {
            const url = `admin/config/${slug}`;
            return axiosClient.get(url);
        },
        updateConfigBySlug: (slug: string, value: string | number): Promise<IResponseData<IConfig>> => {
            const url = `admin/config/${slug}`;
            return axiosClient.put(url, {value});
        }
    }
}

export default configApi;