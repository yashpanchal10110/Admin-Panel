import { useParams } from 'react-router-dom';
import { useProviders } from '../context/ProvidersContext';

function ProviderProfile() {
  const { id } = useParams();
  const { allProviders } = useProviders();
  const provider = allProviders.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Provider not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl">
            {provider.image}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{provider.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{provider.id}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Address:</span>
                <p className="text-gray-800 dark:text-white">{provider.address}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  provider.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                  provider.status === 'declined' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderProfile;