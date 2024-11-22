import { FaTools } from 'react-icons/fa';
import NestedMenuItem from './NestedMenuItem';
import { servicesData } from '../data/servicesData';

function ServicesMenu({ isOpen }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center p-3 text-gray-600 dark:text-gray-300">
        <FaTools className="w-5 h-5" />
        {isOpen && <span className="ml-3">Services</span>}
      </div>
      {Object.entries(servicesData).map(([key, item]) => (
        <NestedMenuItem key={key} item={item} isOpen={isOpen} />
      ))}
    </div>
  );
}

export default ServicesMenu;