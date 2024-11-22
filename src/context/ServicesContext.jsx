import { createContext, useContext, useState, useEffect } from 'react';
import { servicesData as initialServices } from '../data/servicesData';

const ServicesContext = createContext();
const STORAGE_KEY = 'services_data';

export function ServicesProvider({ children }) {
  const [services, setServices] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialServices;
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  const addCategory = (parentPath, newCategory) => {
    setServices(prev => {
      const updated = { ...prev };
      let current = updated;
      
      if (parentPath) {
        const path = parentPath.split('.');
        for (const key of path) {
          if (!current[key]) {
            current[key] = { items: {} };
          }
          current = current[key].items;
        }
      }
      
      const key = `${newCategory.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      current[key] = { 
        name: newCategory.name, 
        items: {},
        createdAt: new Date().toISOString()
      };
      
      return updated;
    });
  };

  const editCategory = (path, newName) => {
    setServices(prev => {
      const updated = { ...prev };
      const pathArray = path.split('.');
      const key = pathArray.pop();
      let current = updated;
      
      for (const segment of pathArray) {
        current = current[segment].items;
      }
      
      current[key].name = newName;
      current[key].updatedAt = new Date().toISOString();
      return updated;
    });
  };

  const deleteCategory = (path) => {
    setServices(prev => {
      const updated = { ...prev };
      const pathArray = path.split('.');
      const key = pathArray.pop();
      let current = updated;
      
      for (const segment of pathArray) {
        current = current[segment].items;
      }
      
      delete current[key];
      return updated;
    });
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all categories to default?')) {
      setServices(initialServices);
    }
  };

  return (
    <ServicesContext.Provider value={{
      services,
      editMode,
      setEditMode,
      addCategory,
      editCategory,
      deleteCategory,
      resetToDefault
    }}>
      {children}
    </ServicesContext.Provider>
  );
}

export const useServices = () => useContext(ServicesContext);