import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/providers':
        return 'Providers';
      case '/services':
        return 'Services';
      case '/earnings':
        return 'Earnings';
      default:
        if (location.pathname.startsWith('/providers/')) {
          return 'Provider Details';
        }
        return 'System Overview';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{getPageTitle()}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              Y
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">yashpanchall432@gmail.com</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;