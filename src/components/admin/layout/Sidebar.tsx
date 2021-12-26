import { useAppSelector } from '../../../app/hooks';
import routes from '../../../config/routes';
import Link from 'next/link';
import { adminSidebarItemOptions } from '../../../features/layout/types';
import { RiDashboardLine } from 'react-icons/ri';
import { GiBowTieRibbon } from 'react-icons/gi';
import { AiOutlineProject } from 'react-icons/ai';
import { VscEditorLayout } from 'react-icons/vsc';
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
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
