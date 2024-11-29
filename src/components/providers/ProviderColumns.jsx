import Avatar from '../common/Avatar';
import StatusBadge from '../common/StatusBadge';

export const providerColumns = [
  {
    id: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <Avatar src={row.original.image} name={row.original.name} size="sm" />
    ),
  },
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
  },
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
  },
  {
    id: 'type',
    header: 'Provider Type',
    accessorKey: 'type',
  },
  {
    id: 'category',
    header: 'Service Type',
    accessorKey: 'category',
  },
  {
    id: 'mobile',
    header: 'Mobile Number',
    accessorKey: 'mobile',
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
  },
];