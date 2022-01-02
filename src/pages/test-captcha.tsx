import type {NextPage} from 'next';
import {recaptchaSiteKey} from "../config/app";
import ReCAPTCHA from 'react-google-recaptcha';


const TestCaptcha: NextPage = () => {
    return (
        <ReCAPTCHA
            sitekey={
                recaptchaSiteKey
            }
            onChange={() => {
                console.log("captcha done!")
            }}
        />
    )
}

export default TestCaptcha;