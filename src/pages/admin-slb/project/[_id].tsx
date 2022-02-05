import {NextPage} from 'next';
import Container from '../../../components/admin/layout/Container';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {projectActions} from '../../../features/project/projectSlice';
import ProjectFrom from '../../../features/project/ProjectForm';
import {format} from 'date-fns';

const Edit: NextPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const editingProject = useAppSelector(
        (state) => state.project.admin.editingProject
    );

    useEffect(() => {
        const {_id} = router.query;
        if (_id) {
            dispatch(projectActions.fetchProjectById(_id as string));
        }
    }, [router]);


    return <Container>
        <div className="p-4 block sm:flex items-center justify-between lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <h1 className="title">Edit Project</h1>
                </div>
            </div>
        </div>
        {
            editingProject ? <div className="p-4 bg-gray-100 bg-opacity-50">
                <ProjectFrom
                    initialValues={{
                        ...editingProject
                        , phrases: {
                            ...editingProject?.phrases,
                            whitelist: {
                                ...editingProject?.phrases.whitelist,
                                startDate: format(new Date(editingProject?.phrases.whitelist.startDate as string), 'yyyy-MM-dd HH:mm:ss'),
                                endDate: format(new Date(editingProject?.phrases.whitelist.endDate as string), 'yyyy-MM-dd HH:mm:ss'),
                            },
                            sale: {
                                ...editingProject?.phrases.sale,
                                startDate: format(new Date(editingProject?.phrases.sale.startDate as string), 'yyyy-MM-dd HH:mm:ss'),
                                endDate: format(new Date(editingProject?.phrases.sale.endDate as string), 'yyyy-MM-dd HH:mm:ss'),
                            },
                            distribution: {
                                ...editingProject?.phrases.distribution,
                                startDate: format(new Date(editingProject?.phrases.distribution.startDate as string), 'yyyy-MM-dd HH:mm:ss'),
                            },
                        }
                    }}
                    onSubmit={(values) => {
                        dispatch(
                            projectActions.editProject({
                                id: editingProject._id,
                                data: values
                            })
                        );
                    }}
                />
            </div> : null
        }
    </Container>;
};

export default Edit;