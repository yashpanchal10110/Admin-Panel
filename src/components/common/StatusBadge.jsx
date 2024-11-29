import clsx from 'clsx';

function StatusBadge({ status, className }) {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
  
  const statusClasses = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };

  return (
    <span className={clsx(baseClasses, statusClasses[status.toLowerCase()], className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default StatusBadge;