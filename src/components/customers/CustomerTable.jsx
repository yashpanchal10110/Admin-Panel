import { useMemo } from 'react';
import { format } from 'date-fns';
import DataTable from '../common/DataTable';
import CustomerActions from './CustomerActions';
import Highlighter from 'react-highlight-words';

function CustomerTable({ data, searchTerm, onEdit, onDelete }) {
  const columns = useMemo(() => [
    {
      id: 'id',
      header: 'Customer ID',
      accessorKey: 'id',
      cell: ({ getValue }) => (
        <Highlighter
          highlightClassName="bg-yellow-200 dark:bg-yellow-900"
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={getValue()}
        />
      ),
    },
    {
      id: 'name',
      header: 'Full Name',
      accessorKey: 'name',
      cell: ({ getValue }) => (
        <Highlighter
          highlightClassName="bg-yellow-200 dark:bg-yellow-900"
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={getValue()}
        />
      ),
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'phone',
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      id: 'address',
      header: 'Address',
      accessorKey: 'address',
      cell: ({ getValue }) => (
        <Highlighter
          highlightClassName="bg-yellow-200 dark:bg-yellow-900"
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={getValue()}
        />
      ),
    },
    {
      id: 'joinDate',
      header: 'Registration Date',
      accessorKey: 'joinDate',
      cell: ({ getValue }) => format(new Date(getValue()), 'PP'),
    },
    {
      id: 'bookingStatus',
      header: 'Booking Status',
      accessorKey: 'bookingStatus',
      cell: ({ getValue }) => {
        const status = getValue();
        const statusColors = {
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
          complete: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          cancel: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        
        return (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <CustomerActions
          customer={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ], [searchTerm, onEdit, onDelete]);

  return (
    <DataTable
      data={data}
      columns={columns}
      pageSize={10}
    />
  );
}

export default CustomerTable;