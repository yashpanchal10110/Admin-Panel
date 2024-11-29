import { useState } from 'react';
import { useProviders } from '../context/ProvidersContext';
import DataTable from '../components/common/DataTable';
import { providerRequestColumns } from '../components/providers/ProviderRequestColumns';
import { FaFileExcel, FaSearch, FaFilter } from 'react-icons/fa';
import { utils, writeFile } from 'xlsx';
import toast from 'react-hot-toast';
import { Menu } from '@headlessui/react';

function ProviderRequestsPage() {
  const { pendingProviders, handleAccept, handleDecline } = useProviders();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredProviders = pendingProviders.filter(provider => {
    const matchesSearch = !searchQuery || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !typeFilter || provider.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const providersWithActions = filteredProviders.map(provider => ({
    ...provider,
    onAccept: handleAccept,
    onDecline: handleDecline
  }));

  const exportToExcel = () => {
    try {
      const exportData = filteredProviders.map(provider => ({
        'Provider ID': provider.id,
        'Name': provider.name,
        'Type': provider.type,
        'Category': provider.category,
        'Mobile': provider.mobile,
        'Work Address': provider.workAddress,
        'Permanent Address': provider.permanentAddress,
        'Status': provider.status,
      }));

      const ws = utils.json_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Provider Requests');
      
      writeFile(wb, 'provider-requests.xlsx');
      toast.success('Provider requests exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export provider requests');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Provider Requests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredProviders.length} Total Requests
          </p>
        </div>
        <button
          onClick={exportToExcel}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <FaFileExcel className="mr-2" />
          Export
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID, or provider type..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">
            <FaFilter className="mr-2" />
            {typeFilter || 'All Types'}
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setTypeFilter('')}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left`}
                  >
                    All Types
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setTypeFilter('Individual')}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left`}
                  >
                    Individual
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setTypeFilter('Business')}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left`}
                  >
                    Business
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>

      <DataTable
        data={providersWithActions}
        columns={providerRequestColumns}
        pageSize={10}
        searchable={false}
      />
    </div>
  );
}

export default ProviderRequestsPage;