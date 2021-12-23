import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Container from '../components/app/layout/Container';
import { solabProjectActions } from '../features/solabProject/solabProjectSlice';
import Image from 'next/image';
import loaderCyan from '../assets/images/loader-cyan.svg';
import Link from 'next/link';
import { getSocialIcon } from '../features/solabProject/contants';
import solabProjectConstants from '../features/solabProject/contants';
import NumberFormat from 'react-number-format';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';
import { differenceInSeconds, format, isAfter, isBefore } from 'date-fns';
SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

import Countdown from 'react-countdown';
import { useRouter } from 'next/router';

const SolabIDO: NextPage = () => {
    const dispatch = useAppDispatch();
    const solabProject = useAppSelector(
        (state) => state.solabProject.app.solabProject
    );
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    useEffect(() => {
        dispatch(solabProjectActions.fetchSolabProject());
    }, []);

    const router = useRouter();

    const countDownRenderFunc = ({
        hours,
        minutes,
        seconds,
        completed,
        days,
    }) => {
        if (completed) {
            return (
                <button
                    type='button'
                    className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500'
                    onClick={() => {
                        router.reload();
                    }}
                >
                    Click here to reload
                </button>
            );
        }
        return (
            <div className='w-11/12 mx-auto mt-4'>
                <h3 className='text-center text-solabGray-100 text-lg md:text-xl'>
                    Whitelist start in
                </h3>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {days}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Days
                        </span>
                    </div>
                    <span className='font-bold text-xl lg:text-2xl'>:</span>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {hours}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Hours
                        </span>
                    </div>
                    <span className='font-bold text-xl lg:text-2xl'>:</span>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {minutes}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Minutes
                        </span>
                    </div>
                    <span className='font-bold text-xl lg:text-2xl'>:</span>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {seconds}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Sec
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const getProjectPhraseAndCountDown = () => {
        const result = {
            status: '',
            countDown: '' as any,
        };
        if (solabProject) {
            if (solabProject.isClosed) {
                result.status = 'Closed';
            } else if (
                isBefore(new Date(), new Date(solabProject.idoStartDate))
            ) {
                const seconds = differenceInSeconds(
                    new Date(solabProject.idoStartDate),
                    new Date()
                );
                result.status = 'In preparation';
                result.countDown = (
                    <>
                        <Countdown
                            date={Date.now() + seconds * 1000}
                            autoStart={true}
                            renderer={countDownRenderFunc}
                        />
                        <p className='text-solabGray-100 text-center text-sm md:text-base mt-4'>
                            Whitelist registration will start in{' '}
                            {format(
                                new Date(solabProject.idoStartDate),
                                'MMMM do yyyy, hh a OOOO'
                            )}
                        </p>
                    </>
                );
            } else if (isAfter(new Date(), new Date(solabProject.idoEndDate))) {
                result.status = 'Distribution';
            } else {
                result.status = 'Whitelist registration';
            }
        }
        return result;
    };

    return (
        <Container>
            <div className='mt-8 p-4 max-w-7xl mx-auto'>
                {solabProject ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <div className='flex items-center'>
                                <Image
                                    width={80}
                                    height={80}
                                    src={solabProject.thumbnail as string}
                                />
                                <h1 className='text-3xl uppercase ml-5'>
                                    {solabProject.name}
                                </h1>
                            </div>
                            <p className='mt-4 text-solabGray-100'>
                                {solabProject.description}
                            </p>
                            <div className='mt-6 flex gap-4'>
                                {solabProject.social?.map((item) => (
                                    <Link href={item.link}>
                                        <a>
                                            <div className='w-10 h-10 flex items-center justify-center bg-solabGray-300 rounded'>
                                                {getSocialIcon(
                                                    item.socialType,
                                                    'w-4 h-4'
                                                )}
                                            </div>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                            <div className='mt-6 p-4 bg-solabGray-300 rounded-lg'>
                                <Swiper
                                    style={
                                        {
                                            '--swiper-navigation-color':
                                                '#1EE8BB',
                                            '--swiper-pagination-color':
                                                '#1EE8BB',
                                        } as any
                                    }
                                    spaceBetween={10}
                                    navigation={true}
                                    pagination={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    className='mySwiper2'
                                    loop={true}
                                >
                                    {solabProject.media.map((md) => (
                                        <SwiperSlide className='h-48 md:h-72 lg:h-96 rounded-lg'>
                                            {md.mediaType ===
                                            solabProjectConstants.mediaTypeImage ? (
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${md.link})`,
                                                    }}
                                                    className='w-full h-full bg-no-repeat bg-cover bg-center rounded-lg'
                                                ></div>
                                            ) : md.mediaType ===
                                              solabProjectConstants.mediaTypeVideo ? (
                                                <iframe
                                                    className='w-full h-full rounded-lg'
                                                    src={md.link}
                                                    title='YouTube video player'
                                                    allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                ></iframe>
                                            ) : (
                                                ''
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={3}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    className='mySwiper mt-4 mx-auto'
                                >
                                    {solabProject.media.map((md) => (
                                        <SwiperSlide className='h-12 md:h-14 lg:h-20'>
                                            <div
                                                style={{
                                                    backgroundImage: `url(${md.thumbnail})`,
                                                }}
                                                className='w-full h-full bg-no-repeat bg-cover bg-center rounded-lg'
                                            ></div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className='bg-solabGray-300 p-6 rounded-lg'>
                            <h2 className='text-xl md:text-2xl font-bold'>
                                Project Key Metrics
                            </h2>
                            {solabProject.keyMetrics?.map((item) => (
                                <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                    <span className='text-solabGray-100 text-sm'>
                                        {item.label}
                                    </span>
                                    <span className='font-bold text-sm'>
                                        {item.valueType ===
                                        solabProjectConstants.keyMetricTypeNumber ? (
                                            item.unitPosition ===
                                                solabProjectConstants.keyMetricUnitPositionLeft &&
                                            item.unit ? (
                                                <NumberFormat
                                                    thousandsGroupStyle='thousand'
                                                    value={item.value}
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    prefix={item.unit}
                                                />
                                            ) : (
                                                <NumberFormat
                                                    thousandsGroupStyle='thousand'
                                                    value={item.value}
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    suffix={item.unit}
                                                />
                                            )
                                        ) : (
                                            item.value
                                        )}
                                    </span>
                                </div>
                            ))}
                            <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                <span className='text-solabGray-100 text-sm'>
                                    Status
                                </span>
                                <span className='font-bold py-1 px-2 bg-solabWhite-700 text-solabBlack-500 rounded text-sm'>
                                    {getProjectPhraseAndCountDown().status}
                                </span>
                            </div>
                            <div>
                                {getProjectPhraseAndCountDown().countDown}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='text-center mx-auto'>
                        <Image src={loaderCyan} height={100} width={100} />
                    </div>
                )}
            </div>
        </Container>
    );
};

export default SolabIDO;
