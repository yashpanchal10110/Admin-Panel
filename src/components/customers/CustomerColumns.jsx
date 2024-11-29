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
    id: 'serviceType',
    header: 'Service Type',
    accessorKey: 'serviceType',
    cell: ({ getValue }) => (
      <span className="px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {getValue()}
      </span>
    ),
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
      <Link
        to={`/customers/${row.original.id}`}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        View Details
      </Link>
    ),
  },
];