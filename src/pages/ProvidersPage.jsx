import { useState } from 'react';
import { useProviders } from '../context/ProvidersContext';
import { FaSearch, FaTrash } from 'react-icons/fa';
import ProviderModal from '../components/ProviderModal';

function ProvidersPage() {
  const { 
    allProviders, 
    searchQuery, 
    setSearchQuery,
    handleDelete 
  } = useProviders();

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Providers</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProviders.map((provider) => (
          <div 
            key={provider.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handleProviderClick(provider)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">
                  {provider.image}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{provider.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{provider.id}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(provider.id);
                }}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FaTrash />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Address:</span> {provider.address}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                <span className="font-medium">Status:</span>{' '}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  provider.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                  provider.status === 'declined' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <ProviderModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        provider={selectedProvider}
      />
    </div>
  );
}

export default ProvidersPage;