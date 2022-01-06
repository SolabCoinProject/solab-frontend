import {NextPage} from "next";
import {TwitterTweetEmbed} from 'react-twitter-embed';


const TestEmbeb: NextPage = () => {
    return (
        <div className='w-10 h-10 mx-auto'>
            <TwitterTweetEmbed
                tweetId={'1477851865639682050'}
            />
        </div>
    )
}

export default TestEmbeb;