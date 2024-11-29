import { createContext, useContext, useState } from 'react';

const ProvidersContext = createContext();

const initialProviders = [
  {
    id: 'PRV001',
    name: 'John Smith',
    workAddress: '123 Work Street, Chennai, India',
    permanentAddress: '456 Home Avenue, Chennai, India',
    status: 'active',
    image: '👤',
    type: 'Individual',
    category: 'Plumbing',
    mobile: '+91 98765 43210',
    rating: 4.5,
    jobsCompleted: 25
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
    rating: 4.2,
    jobsCompleted: 18
  },
  {
    id: 'PRV003',
    name: 'Michael Brown',
    workAddress: '567 Shop Complex, Delhi, India',
    permanentAddress: '890 Housing Society, Delhi, India',
    status: 'blocked',
    image: '👤',
    type: 'Individual',
    category: 'Carpentry',
    mobile: '+91 76543 21098',
    rating: 3.8,
    jobsCompleted: 12
  }
];

export function ProvidersProvider({ children }) {
  const [providers, setProviders] = useState(initialProviders);

  const updateProvider = (id, updatedData) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, ...updatedData } : provider
    ));
  };

  const deleteProvider = (id) => {
    setProviders(prev => prev.filter(provider => provider.id !== id));
  };

  const blockProvider = (id) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, status: 'blocked' } : provider
    ));
  };

  const unblockProvider = (id) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, status: 'active' } : provider
    ));
  };

  const handleAccept = (id) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, status: 'active' } : provider
    ));
  };

  const handleDecline = (id) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, status: 'declined' } : provider
    ));
  };

  const pendingProviders = providers.filter(provider => provider.status === 'pending');
  const activeProviders = providers.filter(provider => provider.status === 'active');
  const blockedProviders = providers.filter(provider => provider.status === 'blocked');

  return (
    <ProvidersContext.Provider value={{
      providers,
      pendingProviders,
      activeProviders,
      blockedProviders,
      updateProvider,
      deleteProvider,
      blockProvider,
      unblockProvider,
      handleAccept,
      handleDecline,
      totalProviders: providers.length,
      allProviders: providers
    }}>
      {children}
    </ProvidersContext.Provider>
  );
}

export const useProviders = () => useContext(ProvidersContext);