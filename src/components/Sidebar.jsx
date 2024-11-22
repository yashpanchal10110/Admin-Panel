import { NavLink, useLocation } from 'react-router-dom';
import { FaChartPie, FaUsers, FaCalendar, FaCreditCard, FaChartLine, FaCog, FaChevronDown, FaChevronRight, FaTools, FaUserFriends } from 'react-icons/fa';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const menuItems = [
  { name: 'Dashboard', icon: FaChartPie, path: '/' },
  { name: 'Customers', icon: FaUserFriends, path: '/customers' },
  {
    name: 'Providers',
    icon: FaUsers,
    isDropdown: true,
    subItems: [
      { name: 'Individual Providers', path: '/providers' },
      { name: 'Business Providers', path: '/providers/business' },
    ],
  },
  { name: 'Services', icon: FaTools, path: '/services' },
  {
    name: 'Bookings',
    icon: FaCalendar,
    isDropdown: true,
    subItems: [
      { name: 'Bookings List', path: '/bookings/list' },
      { name: 'Booking Statuses', path: '/bookings/statuses' },
    ],
  },
  {
    name: 'Payments',
    icon: FaCreditCard,
    isDropdown: true,
    subItems: [
      { name: 'Payments List', path: '/payments/list' },
      { name: 'Payment Methods', path: '/payments/methods' },
      { name: 'Payment Statuses', path: '/payments/statuses' },
    ],
  },
  { name: 'Earnings', icon: FaChartLine, path: '/earnings' },
  {
    name: 'Settings',
    icon: FaCog,
    isDropdown: true,
    subItems: [
      { name: 'Global Settings', path: '/settings/global' },
      { name: 'Users', path: '/settings/users' },
      { name: 'Roles & Permissions', path: '/settings/roles' },
    ],
  },
];

function Sidebar({ isOpen }) {
  const [expandedItems, setExpandedItems] = useState({});
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const toggleExpand = (name) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const MenuItem = ({ item }) => {
    if (item.isDropdown) {
      const isActiveDropdown = item.subItems.some(subItem => isActive(subItem.path));
      
      return (
        <div>
          <button
            onClick={() => toggleExpand(item.name)}
            className={`w-full flex items-center justify-between p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isActiveDropdown ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-white' : ''
            }`}
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5" />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </div>
            {isOpen && (
              <div className="text-sm">
                {expandedItems[item.name] ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            )}
          </button>
          {isOpen && expandedItems[item.name] && (
            <div className="ml-6 py-2 space-y-1">
              {item.subItems.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-white' : ''
                    }`
                  }
                >
                  {subItem.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        to={item.path}
        className={`flex items-center p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive(item.path) ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-white' : ''
        }`}
      >
        <item.icon className="w-5 h-5" />
        {isOpen && <span className="ml-3">{item.name}</span>}
      </NavLink>
    );
  };

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-white dark:bg-gray-800 transition-all duration-300 border-r border-gray-200 dark:border-gray-700 overflow-y-auto`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold text-gray-800 dark:text-white ${!isOpen && 'hidden'}`}>
          The Mistry
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => (
          <MenuItem key={item.name} item={item} />
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;