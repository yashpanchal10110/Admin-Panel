import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ProvidersPage from '../pages/ProvidersPage';
import ProviderProfile from '../pages/ProviderProfile';
import ServicesPage from '../pages/ServicesPage';
import CustomersPage from '../pages/CustomersPage';
import Header from './Header';

function MainContent({ sidebarOpen }) {
  return (
    <div className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900`}>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/providers/:id" element={<ProviderProfile />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default MainContent;