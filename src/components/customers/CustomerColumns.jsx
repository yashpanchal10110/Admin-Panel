import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';

export const customerColumns = [
  {
    id: 'customer',
    header: 'Customer',
    accessorFn: row => ({ id: row.id, name: row.name, image: row.image }),
    cell: ({ getValue }) => {
      const { id, name, image } = getValue();
      return (
        <div className="flex items-center space-x-3">
          <Avatar src={image} name={name} size="sm" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{id}</div>
          </div>
        </div>
      );
    },
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
    id: 'registrationDate',
    header: 'Registration Date',
    accessorKey: 'joinDate',
    cell: ({ getValue }) => format(new Date(getValue()), 'PP'),
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <Link
        to={`/customers/${row.original.id}`}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        View Details
      </Link>
    ),
  },
];