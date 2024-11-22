import { createContext, useContext, useState } from 'react';

const ProvidersContext = createContext();

const initialProviders = [
  {
    id: 'PRV001',
    name: 'John Smith',
    address: 'Chennai, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV002',
    name: 'Sarah Johnson',
    address: 'Mumbai, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV003',
    name: 'Michael Brown',
    address: 'Delhi, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV004',
    name: 'Emma Wilson',
    address: 'Bangalore, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV005',
    name: 'James Davis',
    address: 'Hyderabad, India',
    status: 'accepted',
    image: '👤'
  },
  {
    id: 'PRV006',
    name: 'Lisa Anderson',
    address: 'Kolkata, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV007',
    name: 'Raj Patel',
    address: 'Ahmedabad, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV008',
    name: 'Priya Sharma',
    address: 'Pune, India',
    status: 'declined',
    image: '👤'
  },
  {
    id: 'PRV009',
    name: 'Alex Thompson',
    address: 'Jaipur, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV010',
    name: 'Maria Garcia',
    address: 'Lucknow, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV011',
    name: 'Amit Kumar',
    address: 'Chandigarh, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV012',
    name: 'Sophie Turner',
    address: 'Goa, India',
    status: 'accepted',
    image: '👤'
  },
  {
    id: 'PRV013',
    name: 'David Chen',
    address: 'Kochi, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV014',
    name: 'Neha Verma',
    address: 'Indore, India',
    status: 'declined',
    image: '👤'
  },
  {
    id: 'PRV015',
    name: 'Tom Wilson',
    address: 'Bhopal, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV016',
    name: 'Anita Desai',
    address: 'Nagpur, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV017',
    name: 'Chris Martin',
    address: 'Surat, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV018',
    name: 'Ravi Shankar',
    address: 'Vadodara, India',
    status: 'accepted',
    image: '👤'
  },
  {
    id: 'PRV019',
    name: 'Linda Park',
    address: 'Mysore, India',
    status: 'pending',
    image: '👤'
  },
  {
    id: 'PRV020',
    name: 'Arun Mehta',
    address: 'Coimbatore, India',
    status: 'pending',
    image: '👤'
  }
];

export function ProvidersProvider({ children }) {
  const [providers, setProviders] = useState(initialProviders);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingProviders = filteredProviders.filter(provider => provider.status === 'pending');

  return (
    <ProvidersContext.Provider value={{
      providers: filteredProviders,
      pendingProviders,
      allProviders: filteredProviders,
      handleDelete,
      handleAccept,
      handleDecline,
      totalProviders: providers.length,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </ProvidersContext.Provider>
  );
}

export const useProviders = () => useContext(ProvidersContext);