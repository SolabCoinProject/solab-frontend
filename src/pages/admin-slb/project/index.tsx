import {NextPage} from 'next';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import Container from '../../../components/admin/layout/Container';
import {updateActiveSidebarItem} from '../../../features/layout/layoutSlice';
import {adminSidebarItemOptions} from '../../../features/layout/types';
import {projectActions} from '../../../features/project/projectSlice';
import CreateProjectModal from '../../../features/project/CreateProjectModal';
import EditProjectModal from '../../../features/project/EditProjectModal';

const Project: NextPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const projects = useAppSelector((state) => state.project.admin.projects);
    const reload = useAppSelector((state) => state.project.admin.reload);
    useEffect(() => {
        dispatch(updateActiveSidebarItem(adminSidebarItemOptions.project));
        dispatch(projectActions.fetchProjects(router.query));
    }, []);
    useEffect(() => {
        if (reload) {
            dispatch(projectActions.fetchProjects(router.query));
            dispatch(projectActions.setReload(false));
        }
    }, [reload]);
    return (
        <Container>
            <div className="p-4 block sm:flex items-center justify-between lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <h1 className="title">Project</h1>
                    </div>
                    <div className="sm:flex">
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <button
                                className="btn btn-gradient"
                                onClick={() =>
                                    dispatch(
                                        projectActions.openCreateProjectModal()
                                    )
                                }
                            >
                                Add Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-4">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden rounded-lg bg-blue-light">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-light text-white-500">
                                <tr>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Slug
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Description
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Thumbnail
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Token
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Ido Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Ido slots
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-4 text-left text-xs text-white-500 font-bold uppercase"
                                    >
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {projects.docs.map((project) => {
                                    return (
                                        <tr key={project._id}>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                {project._id}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                {project.name}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                {project.slug}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                {project.description}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                <div className="h-10 w-10 rounded-full relative">
                                                    <Image
                                                        layout="fill"
                                                        src={
                                                            project.thumbnail
                                                        }
                                                        unoptimized={
                                                            true
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                {project.token.symbol}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                {new Intl.NumberFormat().format(
                                                    project.idoPrice
                                                )}
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-base font-medium text-white-500">
                                                {new Intl.NumberFormat().format(
                                                    project.idoSlots
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-pink"
                                                    onClick={() => {
                                                        router.push(`/admin-slb/project/${project._id}`);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button className="btn btn-pink ml-3">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CreateProjectModal/>
            <EditProjectModal/>
        </Container>
    );
};

export default Project;
