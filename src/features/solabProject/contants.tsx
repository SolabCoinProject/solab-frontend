import {
    BsGlobe2,
    BsFacebook,
    BsTwitter,
    BsInstagram,
    BsYoutube,
} from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import { SiDiscord, SiMedium } from 'react-icons/si';
import { CgCommunity } from 'react-icons/cg';
import { GoMegaphone } from 'react-icons/go';
import { MdSocialDistance } from 'react-icons/md';

const taskTypeCommunity = 1;
const taskTypeReferral = 2;

const keyMetricUnitPositionLeft = 1;
const keyMetricUnitPositionRight = 2;

const keyMetricTypeNumber = 1;
const keyMetricTypeString = 2;

const socialTypeWeb = 1;
const socialTypeFacebook = 2;
const socialTypeTelegram = 3;
const socialTypeTwitter = 4;
const socialTypeInstagram = 5;
const socialTypeYoutube = 6;
const socialTypeDiscord = 7;
const socialTypeMedium = 8;

const mediaTypeImage = 1;
const mediaTypeVideo = 2;

const solabProjectConstants = {
    taskTypeCommunity,
    taskTypeReferral,
    taskArr: [taskTypeCommunity, taskTypeReferral],
    taskTypes: [
        {
            value: taskTypeCommunity,
            label: 'Community',
        },
        {
            value: taskTypeReferral,
            label: 'Referral',
        },
    ],
    keyMetricUnitPositionLeft,
    keyMetricUnitPositionRight,
    keyMetricUnitPosArr: [
        keyMetricUnitPositionLeft,
        keyMetricUnitPositionRight,
    ],
    keyMetricUnitPoses: [
        {
            value: keyMetricUnitPositionLeft,
            label: 'Left',
        },
        {
            value: keyMetricUnitPositionRight,
            label: 'Right',
        },
    ],
    keyMetricTypeNumber,
    keyMetricTypeString,
    keyMetricTypeArr: [keyMetricTypeNumber, keyMetricTypeString],
    keyMetricTypes: [
        {
            value: keyMetricTypeNumber,
            label: 'Number',
        },
        {
            value: keyMetricTypeString,
            label: 'String',
        },
    ],
    socialTypeWeb,
    socialTypeFacebook,
    socialTypeTelegram,
    socialTypeTwitter,
    socialTypeInstagram,
    socialTypeYoutube,
    socialTypeDiscord,
    socialTypeMedium,
    socialTypeArr: [
        socialTypeWeb,
        socialTypeFacebook,
        socialTypeTelegram,
        socialTypeTwitter,
        socialTypeInstagram,
        socialTypeYoutube,
        socialTypeDiscord,
        socialTypeMedium,
    ],
    socialTypes: [
        {
            value: socialTypeWeb,
            label: 'Web',
        },
        {
            value: socialTypeFacebook,
            label: 'Facebook',
        },
        {
            value: socialTypeTelegram,
            label: 'Telegram',
        },
        {
            value: socialTypeTwitter,
            label: 'Twitter',
        },
        {
            value: socialTypeInstagram,
            label: 'Instagram',
        },
        {
            value: socialTypeYoutube,
            label: 'Youtube',
        },
        {
            value: socialTypeDiscord,
            label: 'Discord',
        },
        {
            value: socialTypeMedium,
            label: 'Medium',
        },
    ],

    mediaTypeImage,
    mediaTypeVideo,
    mediaTypeArr: [mediaTypeImage, mediaTypeVideo],
    mediaTypes: [
        {
            value: mediaTypeImage,
            label: 'Image',
        },
        {
            value: mediaTypeVideo,
            label: 'Video',
        },
    ],
};

export const getSocialIcon = (
    socialType,
    className,
    fromSocialTask = false
) => {
    switch (socialType) {
        case socialTypeWeb:
            return <BsGlobe2 className={className} />;
        case socialTypeFacebook:
            return <BsFacebook className={className} />;
        case socialTypeTelegram:
            return (
                <FaTelegramPlane
                    className={`${className} ${
                        fromSocialTask ? 'text-solabBlue-500' : null
                    }`}
                />
            );
        case socialTypeTwitter:
            return (
                <BsTwitter
                    className={`${className} ${
                        fromSocialTask ? 'text-solabBlue-500' : null
                    }`}
                />
            );
        case socialTypeInstagram:
            return <BsInstagram className={className} />;
        case socialTypeYoutube:
            return <BsYoutube className={className} />;
        case socialTypeDiscord:
            return <SiDiscord className={className} />;
        case socialTypeMedium:
            return <SiMedium className={className} />;
        default:
            return <MdSocialDistance className={className} />;
    }
};

export const getTaskIcon = (taskType, className) => {
    switch (taskType) {
        case taskTypeCommunity:
            return <CgCommunity className={className} />;
        case taskTypeReferral:
            return <GoMegaphone className={className} />;
        default:
            return null;
    }
};

export default solabProjectConstants;
