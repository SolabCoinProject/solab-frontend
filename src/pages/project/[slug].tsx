import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {Fragment, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {projectActions} from '../../features/project/projectSlice';
import Container from '../../components/app/layout/Container';
import Image from 'next/image';
import loaderCyan from '../../assets/images/loader-cyan.svg';
import Link from 'next/link';
import {getSocialIcon, getProjectPhraseStatusTag2, getProjectCountdown} from '../../features/project/components';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {FreeMode, Navigation, Pagination, Thumbs} from 'swiper';
import projectConstants from '../../features/project/components';
import NumberFormat from 'react-number-format';
import {Tab} from '@headlessui/react';
import {Tab as ReactTab, TabList, TabPanel, Tabs} from 'react-tabs';
import ReactHtmlParser from 'react-html-parser';


SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);


const ProjectDetail: NextPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.project.app.project);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    useEffect(() => {
        const {slug} = router.query;
        dispatch(projectActions.fetchProjectBySlug({slug: slug as string}));
    }, [router]);
    return <Container>
        <div className="mt-8 p-4 max-w-7xl mx-auto">
            {
                project && !project.isTBA ?
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center">
                                    <Image
                                        width={80}
                                        height={80}
                                        src={project.token.thumbnail as string}
                                        className="rounded-lg"
                                        unoptimized={true}
                                    />
                                    <h1 className="text-3xl uppercase ml-5">
                                        {project.name}
                                    </h1>
                                </div>
                                <p className="mt-4 text-solabGray-100">
                                    {project.description}
                                </p>
                                <div className="mt-6 flex gap-4">
                                    {project.social?.map((item) => (
                                        <Link href={item.link}>
                                            <a>
                                                <div
                                                    className="w-10 h-10 flex items-center justify-center bg-solabGray-300 rounded">
                                                    {getSocialIcon(
                                                        item.socialType,
                                                        'w-4 h-4'
                                                    )}
                                                </div>
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-solabGray-300 rounded-lg">
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
                                        thumbs={{swiper: thumbsSwiper}}
                                        className="mySwiper2"
                                        loop={true}
                                    >
                                        {
                                            project.media.map(md => (
                                                <SwiperSlide className="h-48 md:h-72 lg:h-96 rounded-lg">
                                                    {md.mediaType ===
                                                    projectConstants.mediaTypeImage ? (
                                                        <div
                                                            style={{
                                                                backgroundImage: `url(${md.link})`,
                                                            }}
                                                            className="w-full h-full bg-no-repeat bg-cover bg-center rounded-lg"
                                                        ></div>
                                                    ) : md.mediaType ===
                                                    projectConstants.mediaTypeVideo ? (
                                                        <iframe
                                                            className="w-full h-full rounded-lg"
                                                            src={md.link}
                                                            title="YouTube video player"
                                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen={true}
                                                        ></iframe>
                                                    ) : (
                                                        ''
                                                    )}
                                                </SwiperSlide>
                                            ))
                                        }

                                    </Swiper>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={3}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        className="mySwiper mt-4 mx-auto"
                                    >
                                        {project.media.map((md) => (
                                            <SwiperSlide className="h-12 md:h-14 lg:h-20">
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${md.thumbnail})`,
                                                    }}
                                                    className="w-full h-full bg-no-repeat bg-cover bg-center rounded-lg"
                                                ></div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="bg-solabGray-300 p-4 rounded-lg">
                                <h2 className="text-xl md:text-2xl font-bold">
                                    Project Key Metrics
                                </h2>
                                {
                                    project.keyMetrics?.map(item => (
                                        <div
                                            className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                                            <span className="text-solabGray-100 text-sm">
                                                {item.label}
                                            </span>
                                            <span className="font-bold text-sm text-right">
                                                {
                                                    item.valueType === projectConstants.keyMetricTypeNumber ? (
                                                        item.unitPosition === projectConstants.keyMetricUnitPositionLeft && item.unit ? (
                                                            <NumberFormat
                                                                thousandsGroupStyle="thousand"
                                                                value={item.value}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                prefix={item.unit}
                                                            />
                                                        ) : (
                                                            <NumberFormat
                                                                thousandsGroupStyle="thousand"
                                                                value={item.value}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                suffix={item.unit}
                                                            />
                                                        )
                                                    ) : (
                                                        item.value
                                                    )
                                                }
                                            </span>
                                        </div>
                                    ))
                                }
                                <div
                                    className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                                    <span className="text-solabGray-100 text-sm">Status</span>
                                    <span
                                        className="font-bold py-1 px-2 bg-solabWhite-700 text-solabBlack-500 rounded text-sm">
                                        {getProjectPhraseStatusTag2(project)}
                                    </span>
                                </div>
                                <div className="w-full text-center mt-3">
                                    {getProjectCountdown(project)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Tab.Group>
                                <Tab.List className={'border-b border-solabGray-50 gap-x-6 flex overflow-x-auto'}>
                                    <Tab as={Fragment}>
                                        {({selected}) => (
                                            <div
                                                className={`w-min whitespace-nowrap cursor-pointer`}
                                            >
                                                <span
                                                    className={`${
                                                        selected
                                                            ? 'font-bold'
                                                            : 'text-solabGray-100'
                                                    }`}
                                                >
                                                    DESCRIPTION
                                                </span>
                                                {selected ? (
                                                    <hr className="gradient-background-1 mt-1 py-px border-0"/>
                                                ) : null}
                                            </div>
                                        )}
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className="mt-8">
                                    <Tab.Panel>
                                        <Tabs
                                            className="lg:flex text-solabGray-100 gap-x-8 overflow-x-auto"
                                            selectedTabClassName="font-bold text-solabCyan-500 active-dot"
                                            selectedTabPanelClassName="py-8 px-10 bg-solabGray-300 rounded-lg text-solabWhite-500"
                                        >
                                            <TabList
                                                className="lg:block flex gap-x-4 overflow-x-auto lg:overflow-x-visible">
                                                {project.details?.map(
                                                    (detail) => (
                                                        <ReactTab
                                                            className={`w-min whitespace-nowrap cursor-pointer`}
                                                        >
                                                            {detail.title}
                                                        </ReactTab>
                                                    )
                                                )}
                                            </TabList>
                                            <div className="w-full">
                                                {project.details?.map(
                                                    (detail) => (
                                                        <TabPanel className="mt-8 lg:mt-0 overflow-x-auto">
                                                            {ReactHtmlParser(
                                                                detail.content
                                                            )}
                                                        </TabPanel>
                                                    )
                                                )}
                                            </div>
                                        </Tabs>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </>
                    : <div className="text-center mx-auto">
                        <Image src={loaderCyan} height={100} width={100}/>
                    </div>
            }
        </div>
    </Container>;
};

export default ProjectDetail;