import { NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Container from '../../components/admin/layout/Container';
import { updateActiveSidebarItem } from '../../features/layout/layoutSlice';
import { adminSidebarItemOptions } from '../../features/layout/types';

const Dashboard: NextPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateActiveSidebarItem(adminSidebarItemOptions.dashboard));
    }, []);
    return (
        <Container>
            <h1>asdasdasd</h1>
        </Container>
    );
};

export default Dashboard;
