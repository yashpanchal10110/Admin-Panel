import { create } from 'zustand';
import { categoriesData } from '../data/categoriesData';

const useCategoryStore = create((set, get) => ({
  categories: categoriesData,
  searchTerm: '',
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  addCategory: (category) => set((state) => ({
    categories: [...state.categories, { 
      ...category, 
      id: generateCategoryId(state.categories, category.parent),
      status: 'active'
    }]
  })),
  
  updateCategory: (id, updatedCategory) => set((state) => ({
    categories: state.categories.map(cat => 
      cat.id === id ? { ...cat, ...updatedCategory } : cat
    )
  })),
  
  deleteCategory: (id) => set((state) => {
    // Get all descendant categories
    const descendants = getDescendants(id, state.categories);
    const idsToRemove = [id, ...descendants.map(d => d.id)];
    
    return {
      categories: state.categories.filter(cat => !idsToRemove.includes(cat.id))
    };
  }),
  
  getChildCategories: (parentId) => {
    const state = get();
    return state.categories.filter(category => category.parent === parentId);
  },
  
  getCategoryPath: (categoryId) => {
    const state = get();
    const path = [];
    let current = state.categories.find(c => c.id === categoryId);
    
    while (current) {
      path.unshift(current.name);
      current = state.categories.find(c => c.id === current.parent);
    }
    
    return path.join(' > ');
  }
}));

// Helper function to generate a new category ID
const generateCategoryId = (categories, parentId) => {
  if (!parentId) {
    const rootCategories = categories.filter(c => !c.parent);
    const lastId = Math.max(...rootCategories.map(c => parseInt(c.id))) || 0;
    return (lastId + 1).toString();
  }

  const siblings = categories.filter(c => c.parent === parentId);
  const parentParts = parentId.split('.');
  const lastSiblingId = Math.max(...siblings.map(s => parseInt(s.id.split('.').pop()))) || 0;
  return `${parentId}.${lastSiblingId + 1}`;
};

// Helper function to get all descendant categories
const getDescendants = (categoryId, categories) => {
  const descendants = [];
  const children = categories.filter(c => c.parent === categoryId);
  
  children.forEach(child => {
    descendants.push(child);
    descendants.push(...getDescendants(child.id, categories));
  });
  
  return descendants;
};

export default useCategoryStore;