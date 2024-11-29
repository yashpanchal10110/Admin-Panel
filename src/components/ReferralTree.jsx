import { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaUser } from 'react-icons/fa';

function ReferralTree({ node, onUserClick }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReferrals = node.referrals && node.referrals.length > 0;

  return (
    <div className="ml-4">
      <div 
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
        onClick={() => onUserClick(node)}
      >
        {hasReferrals && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-gray-500 dark:text-gray-400"
          >
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        )}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <FaUser className="text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{node.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{node.totalCoins} coins</p>
          </div>
        </div>
      </div>
      
      {hasReferrals && isExpanded && (
        <div className="ml-4 mt-2 border-l-2 border-gray-200 dark:border-gray-700">
          {node.referrals.map((child, index) => (
            <ReferralTree key={index} node={child} onUserClick={onUserClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReferralTree;