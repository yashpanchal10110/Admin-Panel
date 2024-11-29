import { Menu } from '@headlessui/react';
import { FaFilter } from 'react-icons/fa';

const providerTypes = [
  { value: 'individual', label: 'Individual Provider' },
  { value: 'business', label: 'Business Provider' },
];

const serviceTypes = [
  { value: 'individual', label: 'Individual' },
  { value: 'business', label: 'Business' },
];

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

function ProviderTableFilters({ table }) {
  return (
    <div className="flex items-center space-x-4">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">
          <FaFilter className="mr-2" />
          Filters
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Provider Type
              </label>
              <select
                value={table.getColumn('providerType')?.getFilterValue() ?? ''}
                onChange={e => table.getColumn('providerType')?.setFilterValue(e.target.value)}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">All</option>
                {providerTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service Type
              </label>
              <select
                value={table.getColumn('serviceType')?.getFilterValue() ?? ''}
                onChange={e => table.getColumn('serviceType')?.setFilterValue(e.target.value)}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">All</option>
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={table.getColumn('status')?.getFilterValue() ?? ''}
                onChange={e => table.getColumn('status')?.setFilterValue(e.target.value)}
                className="w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">All</option>
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default ProviderTableFilters;