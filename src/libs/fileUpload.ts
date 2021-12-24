// import axiosClient from './axiosClient';
import { getUnixTime } from 'date-fns';
import axios from 'axios';
import { solabApiUrl } from '../config/app';
axios.defaults.withCredentials = false;

export const handleUserFileUpload = async (
    file: any,
    fileName: string,
    folder: string,
    walletAddress
) => {
    try {
        const size = file.size / 1024 / 1024;
        if (size > 5) {
            return false;
        }
        const securedRes: any = await axios.get(
            `${solabApiUrl}/s3/secured-url`,
            {
                params: {
                    name: `${folder}/${walletAddress}-${getUnixTime(
                        new Date()
                    ).toString()}-${fileName}`,
                    walletAddress: walletAddress,
                },
            }
        );

        const { securedUrl } = securedRes.data.data;

        const res: any = await axios.put(securedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });
        return securedUrl.split('?')[0];
    } catch (err) {
        return false;
    }
};
