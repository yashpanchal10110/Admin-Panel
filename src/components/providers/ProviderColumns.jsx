import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';
import RatingStars from '../common/RatingStars';

export const providerColumns = [
  {
    id: 'provider',
    header: 'Provider',
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
    id: 'type',
    header: 'Type',
    accessorKey: 'type',
  },
  {
    id: 'category',
    header: 'Category',
    accessorKey: 'category',
  },
  {
    id: 'rating',
    header: 'Rating',
    accessorKey: 'rating',
    cell: ({ getValue }) => <RatingStars rating={getValue()} />,
  },
  {
    id: 'jobsCompleted',
    header: 'Jobs Completed',
    accessorKey: 'jobsCompleted',
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
      <div className="flex space-x-2">
        <Link
          to={`/providers/${row.original.id}`}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Details
        </Link>
      </div>
    ),
  },
];