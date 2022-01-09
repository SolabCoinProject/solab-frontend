import {NextPage} from "next";
import Container from "../../../components/admin/layout/Container";
import Formik from 'formik'

const Config: NextPage = () => {
    return <Container>
        <div className="p-4 block sm:flex items-center justify-between lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <h1 className="title">Config</h1>
                </div>
            </div>
        </div>
        <div className='p-4'>
            <Formik

            >

            </Formik>
        </div>
    </Container>
}

export default Config;