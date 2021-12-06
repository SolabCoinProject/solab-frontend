import Header from './Header';
import Footer from './Footer';

const Container: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};
export default Container;
