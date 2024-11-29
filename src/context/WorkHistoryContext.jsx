import { createContext, useContext } from 'react';

const WorkHistoryContext = createContext();

const mockWorkHistory = [
  {
    id: 1,
    providerId: 'PRV001',
    customerName: 'John Smith',
    workAddress: '123 Main St, Mumbai',
    serviceName: 'Plumbing Repair',
    serviceCharge: 1500,
    timeRequired: '2 hours',
    description: 'Fixed leaking pipe and replaced washers in bathroom',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ],
    date: '2024-03-15'
  },
  {
    id: 2,
    providerId: 'PRV001',
    customerName: 'Sarah Johnson',
    workAddress: '456 Park Ave, Delhi',
    serviceName: 'Sink Installation',
    serviceCharge: 3000,
    timeRequired: '3 hours',
    description: 'Installed new kitchen sink with garbage disposal',
    images: [
      'https://example.com/image4.jpg',
      'https://example.com/image5.jpg'
    ],
    date: '2024-03-14'
  },
  {
    id: 3,
    providerId: 'PRV001',
    customerName: 'Michael Brown',
    workAddress: '789 Lake View, Bangalore',
    serviceName: 'Bathroom Renovation',
    serviceCharge: 8000,
    timeRequired: '8 hours',
    description: 'Complete bathroom renovation including new fixtures',
    images: [
      'https://example.com/image6.jpg'
    ],
    date: '2024-03-13'
  },
  {
    id: 4,
    providerId: 'PRV001',
    customerName: 'Emily Davis',
    workAddress: '321 River Road, Chennai',
    serviceName: 'Water Heater Repair',
    serviceCharge: 2000,
    timeRequired: '2.5 hours',
    description: 'Diagnosed and repaired faulty water heater',
    images: [],
    date: '2024-03-12'
  },
  {
    id: 5,
    providerId: 'PRV001',
    customerName: 'David Wilson',
    workAddress: '654 Hill Street, Pune',
    serviceName: 'Pipe Replacement',
    serviceCharge: 4000,
    timeRequired: '4 hours',
    description: 'Replaced old rusted pipes with new PVC pipes',
    images: [
      'https://example.com/image7.jpg',
      'https://example.com/image8.jpg'
    ],
    date: '2024-03-11'
  },
  {
    id: 6,
    providerId: 'PRV001',
    customerName: 'Lisa Anderson',
    workAddress: '987 Garden Lane, Hyderabad',
    serviceName: 'Faucet Installation',
    serviceCharge: 1200,
    timeRequired: '1 hour',
    description: 'Installed new bathroom faucets',
    images: [
      'https://example.com/image9.jpg'
    ],
    date: '2024-03-10'
  },
  {
    id: 7,
    providerId: 'PRV001',
    customerName: 'Robert Taylor',
    workAddress: '147 Beach Road, Kolkata',
    serviceName: 'Drainage Repair',
    serviceCharge: 2500,
    timeRequired: '3 hours',
    description: 'Cleared blocked drainage and repaired pipe',
    images: [
      'https://example.com/image10.jpg',
      'https://example.com/image11.jpg'
    ],
    date: '2024-03-09'
  },
  {
    id: 8,
    providerId: 'PRV001',
    customerName: 'Jennifer Martin',
    workAddress: '258 Valley View, Ahmedabad',
    serviceName: 'Toilet Repair',
    serviceCharge: 1800,
    timeRequired: '2 hours',
    description: 'Fixed leaking toilet and replaced flush mechanism',
    images: [
      'https://example.com/image12.jpg'
    ],
    date: '2024-03-08'
  },
  {
    id: 9,
    providerId: 'PRV001',
    customerName: 'William Clark',
    workAddress: '369 Mountain Road, Jaipur',
    serviceName: 'Water Tank Installation',
    serviceCharge: 5000,
    timeRequired: '5 hours',
    description: 'Installed new water tank with pump system',
    images: [
      'https://example.com/image13.jpg',
      'https://example.com/image14.jpg',
      'https://example.com/image15.jpg'
    ],
    date: '2024-03-07'
  },
  {
    id: 10,
    providerId: 'PRV001',
    customerName: 'Patricia Lee',
    workAddress: '741 Forest Avenue, Lucknow',
    serviceName: 'Shower Installation',
    serviceCharge: 3500,
    timeRequired: '4 hours',
    description: 'Installed new shower system with pressure regulator',
    images: [
      'https://example.com/image16.jpg',
      'https://example.com/image17.jpg'
    ],
    date: '2024-03-06'
  }
];

export function WorkHistoryProvider({ children }) {
  const getProviderWorkHistory = (providerId) => {
    return mockWorkHistory.filter(history => history.providerId === providerId);
  };

  const getRecentWorkHistory = (providerId, limit = 3) => {
    return mockWorkHistory
      .filter(history => history.providerId === providerId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  return (
    <WorkHistoryContext.Provider value={{
      getProviderWorkHistory,
      getRecentWorkHistory
    }}>
      {children}
    </WorkHistoryContext.Provider>
  );
}

export const useWorkHistory = () => useContext(WorkHistoryContext);