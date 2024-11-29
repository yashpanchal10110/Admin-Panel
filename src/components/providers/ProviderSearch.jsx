import { FaSearch } from 'react-icons/fa';

function ProviderSearch({ onSearch }) {
  return (
    <div className="relative">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by name, ID, or provider type..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
}

export default ProviderSearch;