import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaPlus } from 'react-icons/fa';
import ProviderTable from '../components/providers/ProviderTable';
import ProviderForm from '../components/providers/ProviderForm';
import { useProviders } from '../context/ProvidersContext';
import toast from 'react-hot-toast';

function ProvidersPage() {
  const { providers } = useProviders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);

  const handleSubmit = async (data) => {
    try {
      if (editingProvider) {
        // Update existing provider logic here
        toast.success('Provider updated successfully');
      } else {
        // Add new provider logic here
        toast.success('Provider added successfully');
      }
      setIsModalOpen(false);
      setEditingProvider(null);
    } catch (error) {
      toast.error('Failed to save provider');
    }
  };

  const handleEdit = (provider) => {
    setEditingProvider(provider);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Providers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage service providers and businesses
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProvider(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Provider
        </button>
      </div>

      <ProviderTable 
        data={providers}
        onEdit={handleEdit}
      />

      <Dialog 
        open={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingProvider(null);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white dark:bg-gray-800 p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingProvider ? 'Edit Provider' : 'Add New Provider'}
            </Dialog.Title>

            <ProviderForm
              initialData={editingProvider || {
                name: '',
                providerType: '',
                serviceType: '',
                workAddress: '',
                permanentAddress: '',
                status: 'active'
              }}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingProvider(null);
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default ProvidersPage;