import Avatar from '../common/Avatar';

export const providerRequestColumns = [
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
    id: 'providerType',
    header: 'Provider Type',
    accessorKey: 'type',
  },
  {
    id: 'mobile',
    header: 'Mobile Number',
    accessorKey: 'mobile',
  },
  {
    id: 'service',
    header: 'Service',
    accessorKey: 'category',
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          onClick={() => row.original.onAccept(row.original.id)}
          className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200"
        >
          Accept
        </button>
        <button
          onClick={() => row.original.onDecline(row.original.id)}
          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200"
        >
          Decline
        </button>
      </div>
    ),
  },
];