import { useMemo } from 'react';
import { format } from 'date-fns';
import DataTable from '../common/DataTable';
import CustomerActions from './CustomerActions';
import Highlighter from 'react-highlight-words';

function CustomerTable({ data, searchTerm, onEdit, onBlock, onDelete }) {
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
      id: 'serviceType',
      header: 'Service Type',
      accessorKey: 'serviceType',
      cell: ({ getValue }) => (
        <Highlighter
          highlightClassName="bg-yellow-200 dark:bg-yellow-900"
          searchWords={[searchTerm]}
          autoEscape={true}
          textToHighlight={getValue() || 'N/A'}
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
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <CustomerActions
          customer={row.original}
          onEdit={onEdit}
          onBlock={onBlock}
          onDelete={onDelete}
        />
      ),
    },
  ], [searchTerm, onEdit, onBlock, onDelete]);

  return (
    <DataTable
      data={data}
      columns={columns}
      pageSize={10}
    />
  );
}

export default CustomerTable;