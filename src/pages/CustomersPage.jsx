import { useState, useMemo } from 'react';
import { Dialog } from '@headlessui/react';
import { useCustomers } from '../context/CustomersContext';
import CustomerTable from '../components/customers/CustomerTable';
import CustomerForm from '../components/customers/CustomerForm';
import { FaSearch } from 'react-icons/fa';
import { createCustomerSearchIndex, searchCustomers } from '../utils/customerSearch';
import toast from 'react-hot-toast';

function CustomersPage() {
  const { customers, updateCustomer, deleteCustomer, blockCustomer } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const searchIndex = useMemo(() => createCustomerSearchIndex(customers), [customers]);
  const filteredCustomers = useMemo(() => 
    searchCustomers(searchIndex, searchTerm),
    [searchIndex, searchTerm]
  );

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleBlock = async (customer) => {
    try {
      await blockCustomer(customer.id);
      toast.success(`Customer ${customer.status === 'active' ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      toast.error('Failed to update customer status');
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      toast.success('Customer deleted successfully');
    } catch (error) {
      toast.error('Failed to delete customer');
    }
  };

  const handleSubmit = async (data) => {
    try {
      await updateCustomer(editingCustomer.id, data);
      toast.success('Customer updated successfully');
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      toast.error('Failed to update customer');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage customer information and accounts
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID, name, email, address, or service type..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <CustomerTable
        data={filteredCustomers}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onBlock={handleBlock}
        onDelete={handleDelete}
      />

      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCustomer(null);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg w-full rounded-lg bg-white dark:bg-gray-800 p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Edit Customer Details
            </Dialog.Title>

            <CustomerForm
              customer={editingCustomer}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingCustomer(null);
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default CustomersPage;