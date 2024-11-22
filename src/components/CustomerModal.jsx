import { Dialog } from '@headlessui/react';

function CustomerModal({ isOpen, onClose, customer }) {
  if (!isOpen || !customer) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full rounded-lg bg-white dark:bg-gray-800 p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
            Customer Details
          </Dialog.Title>

          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl">
                {customer.avatar}
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{customer.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{customer.id}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contact Information</p>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-medium">Email:</span> {customer.email}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-medium">Phone:</span> {customer.phone}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="mt-2 text-gray-900 dark:text-white">{customer.address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Information</p>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-medium">Join Date:</span> {new Date(customer.joinDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-medium">Total Bookings:</span> {customer.totalBookings}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
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

export default CustomerModal;