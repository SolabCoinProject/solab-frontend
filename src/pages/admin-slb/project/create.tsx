import {NextPage} from 'next';
import Container from '../../../components/admin/layout/Container';
import {useEffect} from 'react';
import {updateActiveSidebarItem} from '../../../features/layout/layoutSlice';
import {adminSidebarItemOptions} from '../../../features/layout/types';
import {useAppDispatch} from '../../../app/hooks';
import {IProject} from '../../../features/project/types';
import {format} from 'date-fns';
import ProjectFrom from '../../../features/project/ProjectForm';
import {projectActions} from '../../../features/project/projectSlice';

const Create: NextPage = () => {
    const dispatch = useAppDispatch();

    const createProjectInitialValues: Omit<IProject, '_id'> = {
        name: '',
        slug: '',
        description: '',
        thumbnail: '',
        pubKey: '',
        token: {
            thumbnail: '',
            symbol: '',
            category: '',
            decimals: 0,
            pubKey: '',
        },
        idoPrice: 0,
        idoSlots: 0,
        phrases: {
            preparation: {
                title: 'UPCOMING',
                description:
                    'This project is in preparation phase. Stay tuned.',
            },
            whitelist: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                endDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'WHITELIST REGISTRATION',
                description: 'You can now whitelist yourself for the lottery.',
            },
            sale: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                endDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'SALE',
                description: 'Winners can participate in the token sale.',
            },
            distribution: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'DISTRIBUTION',
                description: 'The tokens get distributed to Sale participants.',
            },
        },
        launchType: {
            name: '',
            paymentAmountAtDistribution: 0,
            tokenPaymentInterval: 0,
            tokenPaymentPercent: 0,
            tokenPaymentAllDate: '',
        },
        isClosed: false,
        isTBA: false,
        isPhraseTBA: false,
        raiseAmount: 0,
        media: []
    };

    useEffect(() => {
        dispatch(updateActiveSidebarItem(adminSidebarItemOptions.project));
    }, []);
    return <Container>
        <div className="p-4 block sm:flex items-center justify-between lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <h1 className="title">Create New Project</h1>
                </div>
            </div>
        </div>
        <div className="p-4 bg-blue-300 bg-opacity-50">
            <ProjectFrom
                initialValues={createProjectInitialValues}
                onSubmit={(values) => {
                    dispatch(
                        projectActions.createProject(values)
                    );
                }}
            />
        </div>
    </Container>;
};

export default Create;