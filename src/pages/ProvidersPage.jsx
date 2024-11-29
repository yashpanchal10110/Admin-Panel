import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviders } from '../context/ProvidersContext';
import DataTable from '../components/common/DataTable';
import { providerColumns } from '../components/providers/ProviderColumns';
import ProviderSearch from '../components/providers/ProviderSearch';
import { exportToExcel } from '../utils/excelExport';
import { FaFileExcel } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

function ProvidersPage() {
  const { activeProviders } = useProviders();
  const navigate = useNavigate();
  const [filteredProviders, setFilteredProviders] = useState(activeProviders);

  const handleSearch = ({ searchTerm }) => {
    if (!searchTerm) {
      setFilteredProviders(activeProviders);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = activeProviders.filter(provider => 
      provider.name.toLowerCase().includes(term) ||
      provider.id.toLowerCase().includes(term) ||
      provider.workAddress.toLowerCase().includes(term) ||
      provider.type.toLowerCase().includes(term) ||
      provider.category.toLowerCase().includes(term)
    );
    
    setFilteredProviders(filtered);
  };

  const handleRowClick = (provider) => {
    navigate(`/providers/${provider.id}`);
  };

  const handleExport = () => {
    const exportData = filteredProviders.map(({
      id,
      name,
      type,
      category,
      mobile,
      workAddress,
      permanentAddress,
      status,
      rating,
      jobsCompleted
    }) => ({
      'Provider ID': id,
      'Name': name,
      'Type': type,
      'Category': category,
      'Mobile': mobile,
      'Work Address': workAddress,
      'Permanent Address': permanentAddress,
      'Status': status,
      'Rating': rating,
      'Jobs Completed': jobsCompleted
    }));

    if (exportToExcel(exportData, 'active-providers')) {
      toast.success('Providers data exported successfully');
    } else {
      toast.error('Failed to export providers data');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Active Providers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage active service providers and businesses
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

      <ProviderSearch onSearch={handleSearch} />

      <DataTable 
        data={filteredProviders}
        columns={providerColumns}
        onRowClick={handleRowClick}
        pageSize={10}
      />
    </div>
  );
}

export default ProvidersPage;