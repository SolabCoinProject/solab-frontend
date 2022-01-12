import {NextPage} from 'next';
import Container from '../../../components/admin/layout/Container';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import {solabPriceSlug} from '../../../features/config/constants';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useEffect} from 'react';
import {configActions} from '../../../features/config/configSlice';

const Config: NextPage = () => {
    const solabPriceConfig = useAppSelector(state => state.config.admin.solabPriceConfig);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(configActions.fetchConfigBySlug({slug: solabPriceSlug}));
    }, [dispatch]);

    return <Container>
        <div className="p-4 block sm:flex items-center justify-between lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <h1 className="title">Config</h1>
                </div>
            </div>
        </div>
        <div className="p-4">
            <Formik
                initialValues={{
                    slug: solabPriceConfig.slug,
                    value: solabPriceConfig.value
                }}
                onSubmit={(values, {setSubmitting}) => {
                    dispatch(configActions.updateConfigBySlug({
                        slug: values.slug,
                        value: values.value
                    }));
                }}
                enableReinitialize={true}
            >
                {({values, isSubmitting, setFieldValue, errors}) => {
                    return <Form>
                        <div className="mt-3 text-solabWhite-500">
                            <label className="text-sm font-medium block mb-2">
                                Solab price
                            </label>
                            <Field
                                className="w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                type="number"
                                placeholder="Enter Value"
                                name="value"
                            />
                            <ErrorMessage
                                name="value"
                                render={(msg) => (
                                    <span className="font-bold text-red-500">
                                                {msg}
                                            </span>
                                )}
                            />
                        </div>
                        <button type="submit" className="btn btn-pink">Submit</button>
                    </Form>;
                }
                }
            </Formik>
        </div>
    </Container>;

};

export default Config;