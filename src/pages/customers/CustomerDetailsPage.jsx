import { useParams } from 'react-router-dom';
import { useCustomers } from '../../context/CustomersContext';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';

function CustomerDetailsPage() {
  const { id } = useParams();
  const { customers } = useCustomers();
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Customer not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar src={customer.avatar} name={customer.name} size="xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{customer.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{customer.id}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-gray-900 dark:text-white">{customer.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Phone</label>
                  <p className="text-gray-900 dark:text-white">{customer.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Address</label>
                  <p className="text-gray-900 dark:text-white">{customer.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h2>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Join Date</label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</label>
                  <p className="text-gray-900 dark:text-white">{customer.totalBookings}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">Status</label>
                  <div className="mt-1">
                    <StatusBadge status={customer.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsPage;