import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import SmoothScroll from '../common/SmoothScroll';

const Layout = () => {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);

    return (
        <SmoothScroll>
            <div className="min-h-screen flex flex-col bg-[#050505]">
                {!isAuthPage && <Header />}
                <main className={`flex-grow ${isAuthPage ? 'pt-0' : 'pt-20'}`}>
                    <Outlet />
                </main>
                {!isAuthPage && <Footer />}
                {!isAuthPage && <WhatsAppButton />}
            </div>
        </SmoothScroll>
    );
};

export default Layout;
