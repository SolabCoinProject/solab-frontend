import { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ILoginParams } from '../../features/user/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userActions } from '../../features/user/userSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import routes from '../../config/routes';
import * as Yup from 'yup';

const Login: NextPage = () => {
    const loginInitialValues: ILoginParams = { username: '', password: '' };
    const dispatch = useAppDispatch();
    const isStaffLoggedIn = useAppSelector(
        (state) => state.user.admin.isLoggedIn
    );
    const router = useRouter();
    useEffect(() => {
        if (isStaffLoggedIn || Boolean(localStorage.getItem('accessToken'))) {
            router.push(routes.admin.dashboard);
        }
    });
    return (
        <main className='bg-blue-900'>
            <div className='mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0'>
                <div className='bg-blue-300 shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0'>
                    <div className='p-6 sm:p-8 lg:p-16 space-y-8'>
                        <h2 className='text-2xl lg:text-3xl font-bold text-white-500'>
                            Sign in
                        </h2>
                        <Formik
                            initialValues={loginInitialValues}
                            onSubmit={(values, { setSubmitting }) => {
                                dispatch(userActions.staffLogin(values));
                                setSubmitting(false);
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string()
                                    .matches(
                                        /^[a-zA-Z0-9]+$/,
                                        'Username must be alphanumeric'
                                    )
                                    .min(
                                        8,
                                        'Username must be between 8 and 15 characters'
                                    )
                                    .max(
                                        15,
                                        'Username must be between 8 and 15 characters'
                                    )

                                    .required('Required'),
                                password: Yup.string()
                                    .min(
                                        8,
                                        'Password must be between 8 and 15 characters'
                                    )
                                    .max(
                                        15,
                                        'Password must be between 8 and 15 characters'
                                    )
                                    .required('Required'),
                            })}
                        >
                            {({ values, isSubmitting }) => {
                                return (
                                    <Form className='mt-8 space-y-6'>
                                        <div>
                                            <label className='text-sm font-medium text-white-500 block mb-2'>
                                                Username
                                            </label>
                                            <Field
                                                className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                type='text'
                                                placeholder='Enter your username'
                                                name='username'
                                            />
                                            <ErrorMessage
                                                name='username'
                                                render={(msg) => (
                                                    <span className='font-bold text-red-500'>
                                                        {msg}
                                                    </span>
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <label className='text-sm font-medium text-white-500 block mb-2'>
                                                Password
                                            </label>
                                            <Field
                                                className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                type='password'
                                                placeholder='Enter your password'
                                                name='password'
                                            />
                                            <ErrorMessage
                                                name='password'
                                                render={(msg) => (
                                                    <span className='font-bold text-red-500'>
                                                        {msg}
                                                    </span>
                                                )}
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            className='btn btn-gradient'
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? 'Loading...'
                                                : 'Submit'}
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
