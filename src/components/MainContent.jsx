import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ProvidersPage from '../pages/ProvidersPage';
import ProviderDetailsPage from '../pages/providers/ProviderDetailsPage';
import WorkHistoryPage from '../pages/providers/WorkHistoryPage';
import ProviderRequestsPage from '../pages/ProviderRequestsPage';
import CustomersPage from '../pages/CustomersPage';
import CustomerDetailsPage from '../pages/customers/CustomerDetailsPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import ReferralPage from '../pages/ReferralPage';
import CategoriesPage from '../pages/CategoriesPage';
import Header from './Header';

function MainContent({ sidebarOpen }) {
  return (
    <div className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900`}>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/providers/requests" element={<ProviderRequestsPage />} />
          <Route path="/providers/:id" element={<ProviderDetailsPage />} />
          <Route path="/providers/:id/work-history" element={<WorkHistoryPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/referrals" element={<ReferralPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default MainContent;