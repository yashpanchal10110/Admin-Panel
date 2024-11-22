import { createContext, useContext, useState } from 'react';

const CustomersContext = createContext();

const initialCustomers = [
  {
    id: 'CUS001',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    address: '123 Park Street, Mumbai, Maharashtra',
    joinDate: '2023-08-15',
    status: 'active',
    totalBookings: 8,
    avatar: '👩'
  },
  {
    id: 'CUS002',
    name: 'Rahul Patel',
    email: 'rahul.patel@outlook.com',
    phone: '+91 87654 32109',
    address: '456 MG Road, Bangalore, Karnataka',
    joinDate: '2023-09-20',
    status: 'active',
    totalBookings: 5,
    avatar: '👨'
  },
  {
    id: 'CUS003',
    name: 'Anita Desai',
    email: 'anita.d@yahoo.com',
    phone: '+91 76543 21098',
    address: '789 Civil Lines, Delhi',
    joinDate: '2023-10-05',
    status: 'inactive',
    totalBookings: 3,
    avatar: '👩'
  },
  {
    id: 'CUS004',
    name: 'Suresh Kumar',
    email: 'suresh.k@gmail.com',
    phone: '+91 65432 10987',
    address: '321 Anna Salai, Chennai, Tamil Nadu',
    joinDate: '2023-11-12',
    status: 'active',
    totalBookings: 12,
    avatar: '👨'
  },
  {
    id: 'CUS005',
    name: 'Meera Reddy',
    email: 'meera.r@hotmail.com',
    phone: '+91 54321 09876',
    address: '654 Jubilee Hills, Hyderabad, Telangana',
    joinDate: '2023-12-01',
    status: 'active',
    totalBookings: 6,
    avatar: '👩'
  },
  {
    id: 'CUS006',
    name: 'Arjun Malhotra',
    email: 'arjun.m@gmail.com',
    phone: '+91 43210 98765',
    address: '987 Sector 18, Noida, Uttar Pradesh',
    joinDate: '2024-01-15',
    status: 'active',
    totalBookings: 4,
    avatar: '👨'
  },
  {
    id: 'CUS007',
    name: 'Zara Khan',
    email: 'zara.k@outlook.com',
    phone: '+91 32109 87654',
    address: '147 Koregaon Park, Pune, Maharashtra',
    joinDate: '2024-02-01',
    status: 'inactive',
    totalBookings: 2,
    avatar: '👩'
  },
  {
    id: 'CUS008',
    name: 'Vikram Singh',
    email: 'vikram.s@yahoo.com',
    phone: '+91 21098 76543',
    address: '258 Salt Lake, Kolkata, West Bengal',
    joinDate: '2024-02-15',
    status: 'active',
    totalBookings: 7,
    avatar: '👨'
  },
  {
    id: 'CUS009',
    name: 'Neha Gupta',
    email: 'neha.g@gmail.com',
    phone: '+91 10987 65432',
    address: '369 Vastrapur, Ahmedabad, Gujarat',
    joinDate: '2024-03-01',
    status: 'active',
    totalBookings: 9,
    avatar: '👩'
  },
  {
    id: 'CUS010',
    name: 'Karthik Raj',
    email: 'karthik.r@hotmail.com',
    phone: '+91 09876 54321',
    address: '741 Aundh, Pune, Maharashtra',
    joinDate: '2024-03-15',
    status: 'active',
    totalBookings: 3,
    avatar: '👨'
  }
];

export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getActiveCustomersCount = () => {
    return customers.filter(customer => customer.status === 'active').length;
  };

  return (
    <CustomersContext.Provider value={{
      customers: filteredCustomers,
      totalCustomers: customers.length,
      activeCustomers: getActiveCustomersCount(),
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter
    }}>
      {children}
    </CustomersContext.Provider>
  );
}

export const useCustomers = () => useContext(CustomersContext);