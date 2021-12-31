import type { NextPage } from 'next';
import Image from 'next/image';

const TestS3 = () => {
    return (
        <Image
            src='https://test-bucket-longdo.s3.ap-southeast-1.amazonaws.com/sample-selfie.jpg'
            width={100}
            height={100}
            unoptimized={true}
        />
    );
};

export default TestS3;
