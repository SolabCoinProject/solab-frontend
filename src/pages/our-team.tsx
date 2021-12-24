import type { NextPage } from 'next';
import Container from '../components/app/layout/Container';
import Image from 'next/image';
import { FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

const OurTeam: NextPage = () => {
    return (
        <Container>
            <div
                className='bg-no-repeat bg-center bg-cover px-5 py-48 lg:px-72 flex items-center justify-center flex-col'
                style={{
                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/our-team-banner.jpeg')`,
                }}
            >
                <h2 className='font-bold text-2xl sm:text-3xl text-center'>
                    The Team
                </h2>
                <p className='text-center text-xs sm:text-base'>
                    The Solab platform is a decentralized platform on the Solana
                    blockchain. Featuring an industry-leading launchpad with
                    guaranteed allocations, token vesting, token generator, an
                    NFT marketplace, and more. Explore all of our documentation
                    here.
                </p>
            </div>
            <div className='pt-24 max-w-3xl px-4 mx-auto'>
                <h2 className='font-bold text-2xl sm:text-3xl text-center'>
                    Executive Team
                </h2>
                <div className='flex mt-12 items-center justify-center sm:justify-start flex-col sm:flex-row'>
                    <div className='p-20 relative rounded-lg'>
                        <Image
                            src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/daniel.png'
                            alt='daniel'
                            layout='fill'
                            className='rounded-lg'
                        />
                    </div>
                    <div className='sm:ml-6 flex flex-col justify-center sm:justify-between items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0'>
                        <div className='flex items-center'>
                            <h3 className='text-xxl font-bold'>
                                Daniel Mathew
                            </h3>
                            <Link href='#'>
                                <a target='_blank'>
                                    <FaLinkedinIn className='text-solabBlue-500  ml-2' />
                                </a>
                            </Link>
                        </div>
                        <p className='text-solabGray-100'>Founder & CEO</p>
                        <p className='text-solabGray-100'>
                            Daniel Mathew founded the companies behind the
                            greater Solab, Mr. Mathew built his career in
                            finance in a variety of industries including
                            payments, and e-commerce.
                        </p>
                    </div>
                </div>
                <div className='flex mt-12 items-center justify-center sm:justify-start flex-col sm:flex-row'>
                    <div className='p-20 relative rounded-lg'>
                        <Image
                            src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/riki.png'
                            alt='riki'
                            layout='fill'
                            className='rounded-lg'
                        />
                    </div>
                    <div className='sm:ml-6 flex flex-col justify-center sm:justify-between items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0'>
                        <div className='flex items-center'>
                            <h3 className='text-xxl font-bold'>Riki Price</h3>
                            <Link href='#'>
                                <a target='_blank'>
                                    <FaLinkedinIn className='text-solabBlue-500  ml-2' />
                                </a>
                            </Link>
                        </div>
                        <p className='text-solabGray-100'>Co-Founder & CTO</p>
                        <p className='text-solabGray-100'>
                            Well-qualified Full Stack Developer familiar with
                            wide range of programming utilities and languages.
                            Knowledgeable of backend and frontend development
                            requirements. Collaborative team player with
                            excellent technical abilities offering 12 years of
                            related experience.
                        </p>
                    </div>
                </div>
                <div className='flex mt-12 items-center justify-center sm:justify-start flex-col sm:flex-row'>
                    <div className='p-20 relative rounded-lg'>
                        <Image
                            src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/lucas.png'
                            alt='lucas'
                            layout='fill'
                            className='rounded-lg'
                        />
                    </div>
                    <div className='sm:ml-6 flex flex-col justify-center sm:justify-between items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0'>
                        <div className='flex items-center'>
                            <h3 className='text-xxl font-bold'>Lucas Ridley</h3>
                            <Link href='#'>
                                <a target='_blank'>
                                    <FaLinkedinIn className='text-solabBlue-500  ml-2' />
                                </a>
                            </Link>
                        </div>
                        <p className='text-solabGray-100'>CMO</p>
                        <p className='text-solabGray-100'>
                            Experienced Digital Marketing Specialist with a
                            demonstrated history of working in the logistics and
                            supply chain industry and retail industry. Skilled
                            in Search Engine Optimization (SEO), Teamwork,
                            Marketing, Digital Marketing, and Online Marketing.
                        </p>
                    </div>
                </div>
                <div className='flex mt-12 items-center justify-center sm:justify-start flex-col sm:flex-row'>
                    <div className='p-20 relative rounded-lg'>
                        <Image
                            src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/laurie.png'
                            alt='laurie'
                            layout='fill'
                            className='rounded-lg'
                        />
                    </div>
                    <div className='sm:ml-6 flex flex-col justify-center sm:justify-between items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0'>
                        <div className='flex items-center'>
                            <h3 className='text-xxl font-bold'>Laurie Neil</h3>
                            <Link href='#'>
                                <a target='_blank'>
                                    <FaLinkedinIn className='text-solabBlue-500  ml-2' />
                                </a>
                            </Link>
                        </div>
                        <p className='text-solabGray-100'>COO</p>
                        <p className='text-solabGray-100'>
                            A professional executive with pragmatic thinking,
                            change leadership, customer focus with experience
                            across Australia and Asia (Singapore, Vietnam,
                            Indonesia, Japan, Hong Kong, Philippines, Malaysia)
                        </p>
                    </div>
                </div>
            </div>
            <div className='pt-24 max-w-7xl px-4 mx-auto'>
                <h2 className='font-bold text-2xl sm:text-3xl text-center'>
                    Team Members
                </h2>
                <div className='grid grid-cols-1 lg:grid-cols-4'>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/courtney.png'
                                alt='Courtney'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Courtney Henry</h3>
                        <p className='text-solabGray-100'>Community Manager</p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/annettee.png'
                                alt='Annette Black'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Annette Black</h3>
                        <p className='text-solabGray-100'>Growth Hacker</p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/theresa.png'
                                alt='Courtney'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Theresa Webb</h3>
                        <p className='text-solabGray-100'>
                            Customer Support Lead
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/wade.png'
                                alt='Wade Warren'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Wade Warren</h3>
                        <p className='text-solabGray-100'>Data Scientist</p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/camaron.png'
                                alt='Courtney'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>
                            Cameron Williamson
                        </h3>
                        <p className='text-solabGray-100'>Graphic Designer</p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/jerome.png'
                                alt='Jerome Bell'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Jerome Bell</h3>
                        <p className='text-solabGray-100'>Graphic Designer</p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/robert.png'
                                alt='Robert Fox'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Robert Fox</h3>
                        <p className='text-solabGray-100'>Backend Developer</p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/jacob.png'
                                alt='Jacob Jones'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Jacob Jones</h3>
                        <p className='text-solabGray-100'>Security Engineer</p>
                    </div>
                    <div></div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/bessie.png'
                                alt='Bessie Cooper'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Bessie Cooper</h3>
                        <p className='text-solabGray-100'>Customer Support</p>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center mt-12'>
                        <div className='w-32 h-32 relative rounded-full'>
                            <Image
                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/team/kathin.png'
                                alt='Kathryn Murphy'
                                layout='fill'
                                className='rounded-full'
                            />
                        </div>
                        <h3 className='text-xxl font-bold'>Kathryn Murphy</h3>
                        <p className='text-solabGray-100'>Customer Support</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default OurTeam;
