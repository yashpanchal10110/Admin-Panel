import { createContext, useContext, useState } from 'react';

const ProvidersContext = createContext();

const initialProviders = [
  {
    id: 'PRV001',
    name: 'John Smith',
    workAddress: '123 Work Street, Chennai, India',
    permanentAddress: '456 Home Avenue, Chennai, India',
    status: 'pending',
    image: '👤',
    type: 'Individual',
    category: 'Plumbing',
    mobile: '+91 98765 43210',
    rating: 4.5,
    jobsCompleted: 0
  },
  {
    id: 'PRV002',
    name: 'Sarah Johnson',
    workAddress: '789 Business Park, Mumbai, India',
    permanentAddress: '321 Residential Colony, Mumbai, India',
    status: 'pending',
    image: '👤',
    type: 'Business',
    category: 'Electrical',
    mobile: '+91 87654 32109',
    rating: 0,
    jobsCompleted: 0
  },
  {
    id: 'PRV003',
    name: 'Michael Brown',
    workAddress: '567 Shop Complex, Delhi, India',
    permanentAddress: '890 Housing Society, Delhi, India',
    status: 'pending',
    image: '👤',
    type: 'Individual',
    category: 'Carpentry',
    mobile: '+91 76543 21098',
    rating: 0,
    jobsCompleted: 0
  },
  {
    id: 'PRV004',
    name: 'Emma Wilson',
    workAddress: '234 Commercial Center, Bangalore, India',
    permanentAddress: '567 Apartment Complex, Bangalore, India',
    status: 'pending',
    image: '👤',
    type: 'Business',
    category: 'Painting',
    mobile: '+91 65432 10987',
    rating: 0,
    jobsCompleted: 0
  },
  {
    id: 'PRV005',
    name: 'James Davis',
    workAddress: '890 Market Road, Hyderabad, India',
    permanentAddress: '123 Residential Area, Hyderabad, India',
    status: 'accepted',
    image: '👤',
    type: 'Individual',
    category: 'Plumbing',
    mobile: '+91 54321 09876',
    rating: 4.2,
    jobsCompleted: 15
  }
];

export function ProvidersProvider({ children }) {
  const [providers, setProviders] = useState(initialProviders);

  const handleDelete = (id) => {
    setProviders(prev => prev.filter(provider => provider.id !== id));
  };

  const handleAccept = (id) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, status: 'accepted' } : provider
    ));
  };

  const handleDecline = (id) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, status: 'declined' } : provider
    ));
  };

  const pendingProviders = providers.filter(provider => provider.status === 'pending');

  return (
    <ProvidersContext.Provider value={{
      providers,
      pendingProviders,
      allProviders: providers,
      handleDelete,
      handleAccept,
      handleDecline,
      totalProviders: providers.length,
    }}>
      {children}
    </ProvidersContext.Provider>
  );
}

export const useProviders = () => useContext(ProvidersContext);