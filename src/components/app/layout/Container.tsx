import Header from './Header';

const Container: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};
export default Container;
