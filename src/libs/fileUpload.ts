import axiosClient from './axiosClient';
import { getUnixTime } from 'date-fns';

export const handleUserFileUpload = async (
    file: any,
    fileName: string,
    folder: string,
    walletAddress
) => {
    // axiosClient
    //     .get('/s3/secured-url', {
    //         params: {
    //             name: `${folder}/${fileName}`,
    //             walletAddress: walletAddress,
    //         },
    //     })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {});
    try {
        const { securedUrl }: any = await axiosClient.get('/s3/secured-url', {
            params: {
                name: `${folder}/${walletAddress}-${getUnixTime(
                    new Date()
                ).toString()}-${fileName}`,
                walletAddress: walletAddress,
            },
        });
        const res: any = await axiosClient.put(securedUrl, file, {
            withCredentials: false,
            headers: {
                'Content-Type': file.type,
                'x-amz-acl': 'public-read',
            },
        });
        console.log(securedUrl, res);
    } catch (err) {}
};
