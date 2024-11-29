import { useCustomers } from '../../context/CustomersContext';
import DataTable from '../../components/common/DataTable';
import { customerColumns } from '../../components/customers/CustomerColumns';

function CustomersListPage() {
  const { customers } = useCustomers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and view all customer information
        </p>
      </div>

      <DataTable
        data={customers}
        columns={customerColumns}
        pageSize={10}
      />
    </div>
  );
}

export default CustomersListPage;