import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

function NestedMenuItem({ item, depth = 0, isOpen }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.items && Object.keys(item.items).length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-4' : ''}`}>
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-between p-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
          depth === 0 ? 'font-medium' : ''
        }`}
      >
        <span className={`truncate ${!isOpen && depth === 0 ? 'hidden' : ''}`}>
          {item.name}
        </span>
        {hasChildren && isOpen && (
          <span className="text-xs">
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        )}
      </button>
      
      {hasChildren && isExpanded && isOpen && (
        <div className="mt-1 space-y-1">
          {Object.entries(item.items).map(([key, childItem]) => (
            <NestedMenuItem
              key={key}
              item={childItem}
              depth={depth + 1}
              isOpen={isOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NestedMenuItem;