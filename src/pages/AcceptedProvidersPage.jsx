import { useState } from 'react';
import { useProviders } from '../context/ProvidersContext';
import DataTable from '../components/common/DataTable';
import { providerColumns } from '../components/providers/ProviderTableColumns';

function AcceptedProvidersPage() {
  const { providers } = useProviders();
  
  // Filter only accepted providers
  const acceptedProviders = providers.filter(provider => provider.status === 'accepted');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accepted Providers</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View all accepted service providers
        </p>
      </div>

      <DataTable
        data={acceptedProviders}
        columns={providerColumns}
        pageSize={10}
      />
    </div>
  );
}

export default AcceptedProvidersPage;