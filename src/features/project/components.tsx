import {IProject} from './types';
import {differenceInSeconds, format, isAfter, isBefore} from 'date-fns';
import {BsFacebook, BsGlobe2, BsInstagram, BsTwitter, BsYoutube} from 'react-icons/bs';
import {FaTelegramPlane} from 'react-icons/fa';
import {SiDiscord, SiMedium} from 'react-icons/si';
import {MdSocialDistance} from 'react-icons/md';
import {CgCommunity} from 'react-icons/cg';
import {GoMegaphone} from 'react-icons/go';
import Countdown from 'react-countdown';

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

const inWhitelistStatusWaiting = 2;
const inWhitelistStatusRejected = 3;
const inWhitelistStatusApproved = 1;

const projectConstants = {
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

    inWhitelistStatusApproved,
    inWhitelistStatusRejected,
    inWhitelistStatusWaiting,

    inWhitelistStatuses: [
        {
            value: inWhitelistStatusApproved,
            label: 'Approved',
        },
        {
            value: inWhitelistStatusWaiting,
            label: 'Waiting',
        },
        {
            value: inWhitelistStatusRejected,
            label: 'Rejected',
        },
    ],
};

export const getProjectPhraseStatusTag = (project: IProject) => {
    if (project.isTBA) {
        return <span
            className="absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium">
                                                TBA
                                                </span>;
    }
    if (project.isPhraseTBA) {
        return <span
            className="absolute bg-solabWhite-700 text-solabCyan-500 top-3 left-2 px-0.5 rounded font-medium">
                                                Upcoming
                                                </span>;
    }

    if (project.isClosed) {
        return <span
            className="absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium">
                                                Closed
                                                </span>;
    }
    if (isBefore(new Date(), new Date(project.phrases.whitelist.startDate))) {
        return <span
            className="absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium">
                                                Upcoming
                                                </span>;
    }
    if (isAfter(new Date(), new Date(project.phrases.whitelist.startDate)) && isBefore(new Date(), new Date(project.phrases.whitelist.endDate))) {
        return <span
            className="absolute bg-solabCyan-500 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium">
                                                Whitelist Registration
                                                </span>;
    }
    if (isAfter(new Date(), new Date(project.phrases.whitelist.endDate)) && isBefore(new Date(), new Date(project.phrases.sale.endDate))) {
        return <span
            className="absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium">
                                                Sale
                                                </span>;
    }
    if (isAfter(new Date(), new Date(project.phrases.sale.endDate))) {
        return <span
            className="absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium">
                                                Distribution
                                                </span>;
    }

};
export const getSocialIcon = (
    socialType,
    className,
    fromSocialTask = false
) => {
    switch (socialType) {
        case socialTypeWeb:
            return <BsGlobe2 className={className}/>;
        case socialTypeFacebook:
            return <BsFacebook className={className}/>;
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
            return <BsInstagram className={className}/>;
        case socialTypeYoutube:
            return <BsYoutube className={className}/>;
        case socialTypeDiscord:
            return <SiDiscord className={className}/>;
        case socialTypeMedium:
            return <SiMedium className={className}/>;
        default:
            return <MdSocialDistance className={className}/>;
    }
};

export const getTaskIcon = (taskType, className) => {
    switch (taskType) {
        case taskTypeCommunity:
            return <CgCommunity className={className}/>;
        case taskTypeReferral:
            return <GoMegaphone className={className}/>;
        default:
            return null;
    }
};

export const getProjectPhraseStatusTag2 = (project: IProject) => {
    if (project.isPhraseTBA) {
        return 'Upcoming';
    }
    if (project.isClosed) {
        return 'Closed';
    }
    if (isBefore(new Date(), new Date(project.phrases.whitelist.startDate))) {
        return 'Upcoming';
    }
    if (isAfter(new Date(), new Date(project.phrases.whitelist.startDate)) && isBefore(new Date(), new Date(project.phrases.whitelist.endDate))) {
        return 'Whitelist Registration';
    }
    if (isAfter(new Date(), new Date(project.phrases.whitelist.endDate)) && isBefore(new Date(), new Date(project.phrases.sale.endDate))) {
        return 'Sale';
    }
    if (isAfter(new Date(), new Date(project.phrases.sale.endDate))) {
        return 'Distribution';
    }
};

const countDownRender = ({
                             hours,
                             minutes,
                             seconds,
                             completed,
                             days,
                         }) => {
    return (
        <div className="w-11/12 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center text-xl lg:text-2xl font-bold">
                        {days}
                    </h2>
                    <span className="text-solabGray-100 text-xs lg:text-base">
                            Days
                        </span>
                </div>
                <span className="font-bold text-xl lg:text-2xl">:</span>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center text-xl lg:text-2xl font-bold">
                        {hours}
                    </h2>
                    <span className="text-solabGray-100 text-xs lg:text-base">
                            Hours
                        </span>
                </div>
                <span className="font-bold text-xl lg:text-2xl">:</span>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center text-xl lg:text-2xl font-bold">
                        {minutes}
                    </h2>
                    <span className="text-solabGray-100 text-xs lg:text-base">
                            Minutes
                        </span>
                </div>
                <span className="font-bold text-xl lg:text-2xl">:</span>
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center text-xl lg:text-2xl font-bold">
                        {seconds}
                    </h2>
                    <span className="text-solabGray-100 text-xs lg:text-base">
                            Sec
                        </span>
                </div>
            </div>
        </div>
    );
};

export const getProjectCountdown = (project: IProject) => {
    if (project.isPhraseTBA) {
        return <>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                Whitelist registration starts in
            </h3>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                TBA
            </h3>
        </>;
    }
    if (project.isClosed) {
        return <h3 className="text-center text-solabGray-100 text-lg md:text-xl">Closed</h3>;
    }
    if (isBefore(new Date(), new Date(project.phrases.whitelist.startDate))) {
        const seconds = differenceInSeconds(
            new Date(project.phrases.whitelist.startDate),
            new Date()
        );
        return <>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                Whitelist registration starts in
            </h3>
            <Countdown
                date={Date.now() + seconds * 1000}
                autoStart={true}
                renderer={countDownRender}
            />
            <p className="text-solabGray-100 text-center text-base mt-1">
                Whitelist registration starts on{' '}
                {format(
                    new Date(project.phrases.whitelist.startDate),
                    'MMMM do yyyy, hh:mm a OOOO'
                )}
            </p>
        </>;
    }

    if (isAfter(new Date(), new Date(project.phrases.whitelist.startDate)) && isBefore(new Date(), new Date(project.phrases.whitelist.endDate))) {
        const seconds = differenceInSeconds(
            new Date(project.phrases.whitelist.endDate),
            new Date()
        );
        return <>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                Whitelist registration ends in
            </h3>
            <Countdown
                date={Date.now() + seconds * 1000}
                autoStart={true}
                renderer={countDownRender}
            />
            <p className="text-solabGray-100 text-center text-base mt-1">
                Whitelist registration end on{' '}
                {format(
                    new Date(project.phrases.whitelist.endDate),
                    'MMMM do yyyy, hh:mm a OOOO'
                )}
            </p>
        </>;
    }

    if (isAfter(new Date(), new Date(project.phrases.whitelist.endDate)) && isBefore(new Date(), new Date(project.phrases.sale.startDate))) {
        const seconds = differenceInSeconds(
            new Date(project.phrases.sale.startDate),
            new Date()
        );
        return <>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                Sale starts in
            </h3>
            <Countdown
                date={Date.now() + seconds * 1000}
                autoStart={true}
                renderer={countDownRender}
            />
            <p className="text-solabGray-100 text-center text-base mt-1">
                Sale starts on{' '}
                {format(
                    new Date(project.phrases.sale.startDate),
                    'MMMM do yyyy, hh:mm a OOOO'
                )}
            </p>
        </>;
    }

    if (isAfter(new Date(), new Date(project.phrases.sale.startDate)) && isBefore(new Date(), new Date(project.phrases.sale.endDate))) {
        const seconds = differenceInSeconds(
            new Date(project.phrases.sale.endDate),
            new Date()
        );
        return <>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                Sale ends in
            </h3>
            <Countdown
                date={Date.now() + seconds * 1000}
                autoStart={true}
                renderer={countDownRender}
            />
            <p className="text-solabGray-100 text-center text-base mt-1">
                Sale ends on{' '}
                {format(
                    new Date(project.phrases.sale.endDate),
                    'MMMM do yyyy, hh:mm a OOOO'
                )}
            </p>
        </>;
    }

    if (isAfter(new Date(), new Date(project.phrases.sale.endDate)) && isBefore(new Date(), new Date(project.phrases.distribution.startDate))) {
        const seconds = differenceInSeconds(
            new Date(project.phrases.distribution.startDate),
            new Date()
        );
        return <>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                Distribution starts in
            </h3>
            <Countdown
                date={Date.now() + seconds * 1000}
                autoStart={true}
                renderer={countDownRender}
            />
            <p className="text-solabGray-100 text-center text-base mt-1">
                Sale ends on{' '}
                {format(
                    new Date(project.phrases.distribution.startDate),
                    'MMMM do yyyy, hh:mm a OOOO'
                )}
            </p>
        </>;
    }

    if (isAfter(new Date(), new Date(project.phrases.distribution.startDate))) {
        return <>
            <h3 className="text-center text-solabGray-100 text-lg md:text-xl">
                Distribution in progress
            </h3>
        </>;
    }

};

export default projectConstants;