import { format } from 'date-fns';
import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';

export const providerColumns = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
  },
  {
    id: 'profile',
    header: 'Provider',
    accessorFn: row => ({ id: row.id, name: row.name, image: row.profileImage }),
    cell: ({ getValue }) => {
      const { name, image } = getValue();
      return (
        <div className="flex items-center space-x-3">
          <Avatar src={image} name={name} size="sm" />
          <div className="font-medium text-gray-900 dark:text-white">{name}</div>
        </div>
      );
    },
  },
  {
    id: 'providerType',
    header: 'Provider Type',
    accessorKey: 'providerType',
    filterFn: 'equals',
  },
  {
    id: 'serviceType',
    header: 'Service Type',
    accessorKey: 'serviceType',
    filterFn: 'equals',
  },
  {
    id: 'workAddress',
    header: 'Work Address',
    accessorKey: 'workAddress',
  },
  {
    id: 'permanentAddress',
    header: 'Permanent Address',
    accessorKey: 'permanentAddress',
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
    filterFn: 'equals',
  },
];