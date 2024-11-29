import { useProviders } from '../../context/ProvidersContext';
import DataTable from '../../components/common/DataTable';
import { providerColumns } from '../../components/providers/ProviderColumns';

function ProvidersListPage() {
  const { allProviders } = useProviders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Providers</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and view all service providers
        </p>
      </div>

      <DataTable
        data={allProviders}
        columns={providerColumns}
        pageSize={10}
      />
    </div>
  );
}

export default ProvidersListPage;