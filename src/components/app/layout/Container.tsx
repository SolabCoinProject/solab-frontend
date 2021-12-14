import Header from './Header';
import Footer from './Footer';

const Container: React.FC = ({ children }) => {
    return (
        <div className='container-app'>
            <Header />
            {children}
            <Footer />
        </div>
    );
};
export default Container;
