import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { debounce } from '../../utils/debounce';

function CustomerSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = debounce((value) => {
    onSearch(value);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by ID, name, address, or service type..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
}

export default CustomerSearch;