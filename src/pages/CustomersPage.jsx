import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaSearch, FaFileExcel } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useCustomers } from '../context/CustomersContext';
import CustomerTable from '../components/customers/CustomerTable';
import CustomerForm from '../components/customers/CustomerForm';
import { exportToExcel } from '../utils/excelExport';

function CustomersPage() {
  const { customers, updateCustomer, deleteCustomer } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const filteredCustomers = customers.filter((customer) =>
    ['id', 'name', 'address', 'bookingStatus'].some((key) =>
      customer[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = async (customerId) => {
    try {
      deleteCustomer(customerId);
      toast.success('Customer deleted successfully');
    } catch (error) {
      toast.error('Failed to delete customer');
    }
  };

  const handleSubmit = async (data) => {
    try {
      updateCustomer(editingCustomer.id, data);
      toast.success('Customer updated successfully');
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      toast.error('Failed to update customer');
    }
  };

  const handleExport = () => {
    const exportData = filteredCustomers.map(({
      id,
      name,
      email,
      phone,
      address,
      joinDate,
      bookingStatus,
      totalBookings,
      serviceType
    }) => ({
      'Customer ID': id,
      'Name': name,
      'Email': email,
      'Phone': phone,
      'Address': address,
      'Join Date': new Date(joinDate).toLocaleDateString(),
      'Booking Status': bookingStatus,
      'Total Bookings': totalBookings,
      'Service Type': serviceType
    }));

    if (exportToExcel(exportData, 'customers-data')) {
      toast.success('Customers data exported successfully');
    } else {
      toast.error('Failed to export customers data');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage customer information and accounts
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <FaFileExcel className="mr-2" />
          Export to Excel
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, ID, address, or booking status..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <CustomerTable
        data={filteredCustomers}
        searchTerm={searchTerm}
        onEdit={handleEdit}
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