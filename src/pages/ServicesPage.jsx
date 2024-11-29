import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaPlus, FaUndo } from 'react-icons/fa';
import { useServices } from '../context/ServicesContext';
import ServicesTable from '../components/services/ServicesTable';
import ServiceForm from '../components/services/ServiceForm';
import { toast } from 'react-hot-toast';

function ServicesPage() {
  const { services, editMode, setEditMode, resetToDefault, addCategory, editCategory, deleteCategory } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteCategory(serviceId);
      toast.success('Service deleted successfully');
    }
  };

  const handleSubmit = (data) => {
    try {
      if (editingService) {
        editCategory(editingService.id, {
          name: data.name,
          icon: data.icon || '🔧',
          mainCategory: data.mainCategory,
          parentCategory: data.parentCategory
        });
        toast.success('Service updated successfully');
      } else {
        addCategory(data.parentCategory || '', {
          name: data.name,
          icon: data.icon || '🔧',
          mainCategory: data.mainCategory
        });
        toast.success('Service added successfully');
      }
      setIsModalOpen(false);
      setEditingService(null);
    } catch (error) {
      toast.error('Failed to save service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage service categories and listings
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 flex items-center"
          >
            <FaUndo className="mr-2" /> Reset
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Service
          </button>
        </div>
      </div>

      <ServicesTable
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg w-full rounded-lg bg-white dark:bg-gray-800 p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </Dialog.Title>

            <ServiceForm
              service={editingService}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingService(null);
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default ServicesPage;