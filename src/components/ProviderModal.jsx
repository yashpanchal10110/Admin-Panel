import { Dialog } from '@headlessui/react';

function ProviderModal({ isOpen, onClose, provider, onAccept }) {
  if (!isOpen || !provider) return null;

  const handleAccept = () => {
    onAccept(provider.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white dark:bg-gray-800 p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
            Provider Details
          </Dialog.Title>

          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">
                {provider.image}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{provider.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{provider.id}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Address:</span>
                <p className="text-gray-900 dark:text-white">{provider.address}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
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

          <div className="mt-6 flex justify-end space-x-3">
            {provider.status === 'pending' && (
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Accept Request
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ProviderModal;