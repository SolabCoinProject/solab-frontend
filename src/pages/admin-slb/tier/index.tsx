import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Container from '../../../components/admin/layout/Container';
import { updateActiveSidebarItem } from '../../../features/layout/layoutSlice';
import { adminSidebarItemOptions } from '../../../features/layout/types';
import CreateTierModal from '../../../features/tier/CreateTierModal';
import { tierActions } from '../../../features/tier/tierSlice';
import Image from 'next/image';
import EditTierModal from '../../../features/tier/EditTierModal';

const Tier: NextPage = () => {
    const dispatch = useAppDispatch();
    const reload = useAppSelector((state) => state.tier.admin.reload);
    const tiers = useAppSelector((state) => state.tier.admin.tiers);

    const router = useRouter();
    useEffect(() => {
        dispatch(updateActiveSidebarItem(adminSidebarItemOptions.tier));
        dispatch(tierActions.fetchTiers(router.query));
    }, []);
    useEffect(() => {
        if (reload) {
            dispatch(tierActions.fetchTiers(router.query));
            dispatch(tierActions.setReload(false));
        }
    }, [reload]);
    return (
        <Container>
            <div className='p-4 block sm:flex items-center justify-between lg:mt-1.5'>
                <div className='mb-1 w-full'>
                    <div className='mb-4'>
                        <h1 className='title'>Tier</h1>
                    </div>
                    <div className='sm:flex'>
                        <div className='flex items-center space-x-2 sm:space-x-3 ml-auto'>
                            <button
                                className='btn btn-gradient'
                                onClick={() =>
                                    dispatch(tierActions.openCreateTierModal())
                                }
                            >
                                Add Tier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col p-4'>
                <div className='overflow-x-auto'>
                    <div className='align-middle inline-block min-w-full'>
                        <div className='shadow overflow-hidden rounded-lg bg-blue-light'>
                            <table className='table-fixed min-w-full divide-y divide-gray-200'>
                                <thead className='bg-blue-light text-white-500'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Id
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Thumbnail
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Lottery Tickets
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Required Lab Amount
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            USDC Limit Per Slot
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Order
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Has GuaranteeAllocation
                                        </th>
                                        <th
                                            scope='col'
                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {tiers.docs.map((tier) => (
                                        <tr key={tier._id}>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                {tier._id}
                                            </td>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                {tier.name}
                                            </td>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                <div className='h-10 w-10 rounded-full relative'>
                                                    <Image
                                                        layout='fill'
                                                        src={tier.thumbnail}
                                                        unoptimized={
                                                            true
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                {tier.lotteryTickets}
                                            </td>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                {tier.requiredLabAmount}
                                            </td>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                {tier.usdcLimit}
                                            </td>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                {tier.order}
                                            </td>
                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                {tier.hasGuaranteedAllocation
                                                    ? 'yes'
                                                    : 'no'}
                                            </td>
                                            <td>
                                                <button
                                                    className='btn btn-pink'
                                                    onClick={() => {
                                                        dispatch(
                                                            tierActions.openEditTierModal(
                                                                tier
                                                            )
                                                        );
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button className='btn btn-pink ml-3'>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CreateTierModal />
            <EditTierModal />
        </Container>
    );
};
export default Tier;
