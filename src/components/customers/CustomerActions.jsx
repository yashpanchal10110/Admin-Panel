import { Menu } from '@headlessui/react';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

function CustomerActions({ customer, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      onDelete(customer.id);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
        <FaEllipsisV className="text-gray-500 dark:text-gray-400" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => onEdit(customer)}
                className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
              >
                <FaEdit className="mr-2" /> Edit Details
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleDelete}
                className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400`}
              >
                <FaTrash className="mr-2" /> Delete Customer
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default CustomerActions;