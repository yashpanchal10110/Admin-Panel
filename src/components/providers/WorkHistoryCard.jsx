import { FaHistory } from 'react-icons/fa';
import { useWorkHistory } from '../../context/WorkHistoryContext';

function WorkHistoryCard({ providerId, onViewAll }) {
  const { getRecentWorkHistory } = useWorkHistory();
  const recentHistory = getRecentWorkHistory(providerId, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Work History</h3>
          <button
            onClick={onViewAll}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentHistory.map((work) => (
            <div
              key={work.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => onViewAll()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{work.customerName}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{work.serviceName}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ₹{work.serviceCharge}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {work.description}
              </p>
            </div>
          ))}
        </div>

        {recentHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6">
            <FaHistory className="text-4xl text-gray-400 dark:text-gray-600 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No work history available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkHistoryCard;