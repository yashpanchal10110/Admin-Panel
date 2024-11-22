import { useState } from 'react';
import { useProviders } from '../context/ProvidersContext';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ProviderModal from './ProviderModal';

function ProvidersTable() {
  const {
    pendingProviders,
    totalProviders,
    handleAccept,
    handleDecline
  } = useProviders();

  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAll = () => {
    navigate('/providers');
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvider(null);
  };

  const handleAcceptProvider = (id) => {
    handleAccept(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Provider Requests</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {pendingProviders.length} Pending Requests
            </p>
          </div>
          <button 
            onClick={handleViewAll}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300"
          >
            View All Providers
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Addresses</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pendingProviders.slice(0, 5).map((provider) => (
                <tr 
                  key={provider.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => handleProviderClick(provider)}
                >
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">
                      {provider.image}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{provider.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{provider.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{provider.address}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleAccept(provider.id)}
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(provider.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                      >
                        Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProviderModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        provider={selectedProvider}
        onAccept={handleAcceptProvider}
      />
    </div>
  );
}

export default ProvidersTable;