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
    bookingStatus: 'complete',
    totalBookings: 8,
    avatar: '👩',
    serviceType: 'Electrician'
  },
  {
    id: 'CUS002',
    name: 'Rahul Patel',
    email: 'rahul.patel@outlook.com',
    phone: '+91 87654 32109',
    address: '456 MG Road, Bangalore, Karnataka',
    joinDate: '2023-09-20',
    bookingStatus: 'pending',
    totalBookings: 5,
    avatar: '👨',
    serviceType: 'Plumber'
  },
  {
    id: 'CUS003',
    name: 'Anita Desai',
    email: 'anita.d@yahoo.com',
    phone: '+91 76543 21098',
    address: '789 Civil Lines, Delhi',
    joinDate: '2023-10-05',
    bookingStatus: 'cancel',
    totalBookings: 3,
    avatar: '👩',
    serviceType: 'Carpenter'
  },
  {
    id: 'CUS004',
    name: 'Vikram Singh',
    email: 'vikram.s@gmail.com',
    phone: '+91 89765 43211',
    address: '234 Lake Road, Pune, Maharashtra',
    joinDate: '2023-11-10',
    bookingStatus: 'complete',
    totalBookings: 6,
    avatar: '👨',
    serviceType: 'Mechanic'
  },
  {
    id: 'CUS005',
    name: 'Meera Kapoor',
    email: 'meera.k@yahoo.com',
    phone: '+91 78654 32112',
    address: '567 Hill View, Chennai, Tamil Nadu',
    joinDate: '2023-12-15',
    bookingStatus: 'pending',
    totalBookings: 2,
    avatar: '👩',
    serviceType: 'Painter'
  },
  {
    id: 'CUS006',
    name: 'Arjun Kumar',
    email: 'arjun.k@gmail.com',
    phone: '+91 67543 21123',
    address: '890 Beach Road, Kochi, Kerala',
    joinDate: '2024-01-20',
    bookingStatus: 'complete',
    totalBookings: 4,
    avatar: '👨',
    serviceType: 'Electrician'
  },
  {
    id: 'CUS007',
    name: 'Zara Ahmed',
    email: 'zara.a@outlook.com',
    phone: '+91 56432 11234',
    address: '123 Garden Street, Hyderabad, Telangana',
    joinDate: '2024-02-01',
    bookingStatus: 'cancel',
    totalBookings: 1,
    avatar: '👩',
    serviceType: 'Plumber'
  },
  {
    id: 'CUS008',
    name: 'Raj Malhotra',
    email: 'raj.m@yahoo.com',
    phone: '+91 45321 12345',
    address: '456 River View, Kolkata, West Bengal',
    joinDate: '2024-02-15',
    bookingStatus: 'complete',
    totalBookings: 7,
    avatar: '👨',
    serviceType: 'Mechanic'
  },
  {
    id: 'CUS009',
    name: 'Neha Reddy',
    email: 'neha.r@gmail.com',
    phone: '+91 34321 23456',
    address: '789 Mountain Road, Shimla, Himachal Pradesh',
    joinDate: '2024-02-28',
    bookingStatus: 'pending',
    totalBookings: 3,
    avatar: '👩',
    serviceType: 'Carpenter'
  },
  {
    id: 'CUS010',
    name: 'Karan Mehta',
    email: 'karan.m@outlook.com',
    phone: '+91 23432 34567',
    address: '234 Valley Lane, Jaipur, Rajasthan',
    joinDate: '2024-03-05',
    bookingStatus: 'complete',
    totalBookings: 5,
    avatar: '👨',
    serviceType: 'Painter'
  },
  {
    id: 'CUS011',
    name: 'Aisha Khan',
    email: 'aisha.k@yahoo.com',
    phone: '+91 12343 45678',
    address: '567 Desert Road, Ahmedabad, Gujarat',
    joinDate: '2024-03-10',
    bookingStatus: 'pending',
    totalBookings: 2,
    avatar: '👩',
    serviceType: 'Electrician'
  },
  {
    id: 'CUS012',
    name: 'Rohan Gupta',
    email: 'rohan.g@gmail.com',
    phone: '+91 98876 54321',
    address: '890 Forest Avenue, Bhopal, Madhya Pradesh',
    joinDate: '2024-03-12',
    bookingStatus: 'complete',
    totalBookings: 6,
    avatar: '👨',
    serviceType: 'Plumber'
  },
  {
    id: 'CUS013',
    name: 'Sanya Verma',
    email: 'sanya.v@outlook.com',
    phone: '+91 87765 43212',
    address: '123 Lake View, Lucknow, Uttar Pradesh',
    joinDate: '2024-03-15',
    bookingStatus: 'cancel',
    totalBookings: 1,
    avatar: '👩',
    serviceType: 'Mechanic'
  },
  {
    id: 'CUS014',
    name: 'Aditya Shah',
    email: 'aditya.s@yahoo.com',
    phone: '+91 76654 32123',
    address: '456 Hill Road, Surat, Gujarat',
    joinDate: '2024-03-18',
    bookingStatus: 'complete',
    totalBookings: 4,
    avatar: '👨',
    serviceType: 'Carpenter'
  },
  {
    id: 'CUS015',
    name: 'Riya Joshi',
    email: 'riya.j@gmail.com',
    phone: '+91 65543 21234',
    address: '789 Beach Lane, Visakhapatnam, Andhra Pradesh',
    joinDate: '2024-03-20',
    bookingStatus: 'pending',
    totalBookings: 3,
    avatar: '👩',
    serviceType: 'Painter'
  },
  {
    id: 'CUS016',
    name: 'Kabir Singh',
    email: 'kabir.s@outlook.com',
    phone: '+91 54432 12345',
    address: '234 Garden Road, Chandigarh',
    joinDate: '2024-03-22',
    bookingStatus: 'complete',
    totalBookings: 7,
    avatar: '👨',
    serviceType: 'Electrician'
  },
  {
    id: 'CUS017',
    name: 'Maya Pillai',
    email: 'maya.p@yahoo.com',
    phone: '+91 43321 23456',
    address: '567 River Road, Trivandrum, Kerala',
    joinDate: '2024-03-24',
    bookingStatus: 'pending',
    totalBookings: 2,
    avatar: '👩',
    serviceType: 'Plumber'
  },
  {
    id: 'CUS018',
    name: 'Vivek Tiwari',
    email: 'vivek.t@gmail.com',
    phone: '+91 32211 34567',
    address: '890 Mountain View, Dehradun, Uttarakhand',
    joinDate: '2024-03-26',
    bookingStatus: 'complete',
    totalBookings: 5,
    avatar: '👨',
    serviceType: 'Mechanic'
  },
  {
    id: 'CUS019',
    name: 'Nisha Iyer',
    email: 'nisha.i@outlook.com',
    phone: '+91 21123 45678',
    address: '123 Valley View, Coimbatore, Tamil Nadu',
    joinDate: '2024-03-28',
    bookingStatus: 'cancel',
    totalBookings: 1,
    avatar: '👩',
    serviceType: 'Carpenter'
  },
  {
    id: 'CUS020',
    name: 'Sameer Choudhury',
    email: 'sameer.c@yahoo.com',
    phone: '+91 11234 56789',
    address: '456 Desert Lane, Jodhpur, Rajasthan',
    joinDate: '2024-03-30',
    bookingStatus: 'complete',
    totalBookings: 6,
    avatar: '👨',
    serviceType: 'Painter'
  }
];

export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState(initialCustomers);

  const updateCustomer = (id, updatedData) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === id ? { ...customer, ...updatedData } : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    setCustomers(prevCustomers => 
      prevCustomers.filter(customer => customer.id !== id)
    );
  };

  return (
    <CustomersContext.Provider value={{
      customers,
      updateCustomer,
      deleteCustomer,
      totalCustomers: customers.length
    }}>
      {children}
    </CustomersContext.Provider>
  );
}

export const useCustomers = () => useContext(CustomersContext);