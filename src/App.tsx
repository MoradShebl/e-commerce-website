import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/pages/MainPage';
import NotFoundPage from './components/NotFoundPage';
import AdminPage from './components/AdminPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<MainPage />} />
          {/* Fallback route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
