import {useAppSelector} from '../../../app/hooks';
import routes from '../../../config/routes';
import Link from 'next/link';
import {adminSidebarItemOptions} from '../../../features/layout/types';
import {RiDashboardLine} from 'react-icons/ri';
import {GiBowTieRibbon} from 'react-icons/gi';
import {AiOutlineCheck, AiOutlineProject, AiOutlineUser,} from 'react-icons/ai';
import {VscEditorLayout} from 'react-icons/vsc';
import {CgSelect} from 'react-icons/cg';
import {Listbox, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {IoSettingsOutline} from 'react-icons/io5'

const Sidebar: React.FC = () => {
    const isSidebarOpen = useAppSelector(
        (state) => state.layout.admin.isSidebarOpen
    );
    const activeSidebarItem = useAppSelector(
        (state) => state.layout.admin.activeSidebarItem
    );

    return (
        <aside
            className={`fixed z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 ${
                isSidebarOpen ? 'flex' : 'hidden'
            }`}
        >
            <div className='relative z-0 flex-1 flex flex-col min-h-0 border-r border-blue-light bg-blue-300 pt-0 mt-4'>
                <div className='flex-1 flex flex-col pt-5 overflow-y-auto'>
                    <div className='flex-1 px-3 bg-blue-300 divide-y space-y-1'>
                        <ul className='space-y-2 pb-2'>
                            <li>
                                <Link href={routes.admin.dashboard}>
                                    <a
                                        className={`sidebar-link group ${
                                            activeSidebarItem ===
                                            adminSidebarItemOptions.dashboard
                                                ? 'sidebar-link-active'
                                                : ''
                                        }`}
                                    >
                                        <RiDashboardLine
                                            className={`sidebar-icon ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.dashboard
                                                    ? 'sidebar-icon-active'
                                                    : ''
                                            }`}
                                        />
                                        <span
                                            className={`sidebar-content ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.dashboard
                                                    ? 'sidebar-content-active'
                                                    : ''
                                            }`}
                                        >
                                            Dashboard
                                        </span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={routes.admin.tiers}>
                                    <a
                                        className={`sidebar-link group ${
                                            activeSidebarItem ===
                                            adminSidebarItemOptions.tier
                                                ? 'sidebar-link-active'
                                                : ''
                                        }`}
                                    >
                                        <GiBowTieRibbon
                                            className={`sidebar-icon ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.tier
                                                    ? 'sidebar-icon-active'
                                                    : ''
                                            }`}
                                        />
                                        <span
                                            className={`sidebar-content ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.tier
                                                    ? 'sidebar-content-active'
                                                    : ''
                                            }`}
                                        >
                                            Tiers
                                        </span>
                                    </a>
                                </Link>
                                <li>
                                    <Link href={routes.admin.project}>
                                        <a
                                            className={`sidebar-link group ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.project
                                                    ? 'sidebar-link-active'
                                                    : ''
                                            }`}
                                        >
                                            <AiOutlineProject
                                                className={`sidebar-icon ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.project
                                                        ? 'sidebar-icon-active'
                                                        : ''
                                                }`}
                                            />
                                            <span
                                                className={`sidebar-content ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.project
                                                        ? 'sidebar-content-active'
                                                        : ''
                                                }`}
                                            >
                                                Projects
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routes.admin.demoEditor}>
                                        <a
                                            className={`sidebar-link group ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.demoEditor
                                                    ? 'sidebar-link-active'
                                                    : ''
                                            }`}
                                        >
                                            <VscEditorLayout
                                                className={`sidebar-icon ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.demoEditor
                                                        ? 'sidebar-icon-active'
                                                        : ''
                                                }`}
                                            />
                                            <span
                                                className={`sidebar-content ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.demoEditor
                                                        ? 'sidebar-content-active'
                                                        : ''
                                                }`}
                                            >
                                                Demo Editor
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routes.admin.user}>
                                        <a
                                            className={`sidebar-link group ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.user
                                                    ? 'sidebar-link-active'
                                                    : ''
                                            }`}
                                        >
                                            <AiOutlineUser
                                                className={`sidebar-icon ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.user
                                                        ? 'sidebar-icon-active'
                                                        : ''
                                                }`}
                                            />
                                            <span
                                                className={`sidebar-content ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.user
                                                        ? 'sidebar-content-active'
                                                        : ''
                                                }`}
                                            >
                                                User
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routes.admin.config}>
                                        <a
                                            className={`sidebar-link group ${
                                                activeSidebarItem ===
                                                adminSidebarItemOptions.config
                                                    ? 'sidebar-link-active'
                                                    : ''
                                            }`}
                                        >
                                            <IoSettingsOutline
                                                className={`sidebar-icon ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.config
                                                        ? 'sidebar-icon-active'
                                                        : ''
                                                }`}
                                            />
                                            <span
                                                className={`sidebar-content ${
                                                    activeSidebarItem ===
                                                    adminSidebarItemOptions.config
                                                        ? 'sidebar-content-active'
                                                        : ''
                                                }`}
                                            >
                                                Settings
                                            </span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Listbox
                                        value='Solab Project'
                                        onChange={() => {
                                        }}
                                    >
                                        <div className='relative mt-1'>
                                            <Listbox.Button
                                                className='relative w-full py-2 pl-3 pr-10 text-left rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
                                                <span className='block truncate'>
                                                    SolabProject
                                                </span>
                                                <span
                                                    className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                                    <CgSelect
                                                        className='w-5 h-5 text-gray-400'
                                                        aria-hidden='true'
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave='transition ease-in duration-100'
                                                leaveFrom='opacity-100'
                                                leaveTo='opacity-0'
                                            >
                                                <Listbox.Options
                                                    className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                                    <Listbox.Option
                                                        key='1'
                                                        className={({
                                                                        active,
                                                                    }) =>
                                                            `${
                                                                active
                                                                    ? 'text-amber-900 bg-amber-100'
                                                                    : 'text-gray-900'
                                                            }
                          cursor-pointer select-none relative py-2 pl-10 pr-4 bg-solabWhite-500`
                                                        }
                                                        value='abc'
                                                    >
                                                        {({
                                                              selected,
                                                              active,
                                                          }) => (
                                                            <>
                                                                <Link
                                                                    href={
                                                                        routes
                                                                            .admin
                                                                            .solab_whitelist
                                                                    }
                                                                >
                                                                    <a>
                                                                        <span
                                                                            className={` ${
                                                                                selected
                                                                                    ? 'font-medium'
                                                                                    : 'font-normal'
                                                                            } block truncate`}
                                                                        >
                                                                            Whitelist
                                                                        </span>
                                                                    </a>
                                                                </Link>
                                                                {selected ? (
                                                                    <span
                                                                        className={`${
                                                                            active
                                                                                ? 'text-amber-600'
                                                                                : 'text-amber-600'
                                                                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                    >
                                                                        <AiOutlineCheck
                                                                            className='w-5 h-5'
                                                                            aria-hidden='true'
                                                                        />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </li>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
