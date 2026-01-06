import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound';

// Service Pages
import WeddingPhotography from './pages/services/WeddingPhotography';
import PreWeddingPhotography from './pages/services/PreWeddingPhotography';
import MaternityPhotography from './pages/services/MaternityPhotography';
import BabyPhotography from './pages/services/BabyPhotography';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="booking" element={<Booking />} />
                    <Route path="services/wedding" element={<WeddingPhotography />} />
                    <Route path="services/prewedding" element={<PreWeddingPhotography />} />
                    <Route path="services/maternity" element={<MaternityPhotography />} />
                    <Route path="services/baby" element={<BabyPhotography />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
