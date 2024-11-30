export const categoriesData = [
  {
    id: "1",
    name: "Business / Company",
    parent: null
  },
  {
    id: "1.1",
    name: "Civil Work / Construction",
    parent: "1"
  },
  {
    id: "1.1.1",
    name: "Designing Studios / Agencies",
    parent: "1.1"
  },
  {
    id: "1.1.1.1",
    name: "Civil design",
    parent: "1.1.1"
  },
  {
    id: "1.1.1.2",
    name: "Interior design",
    parent: "1.1.1"
  },
  {
    id: "1.1.1.3",
    name: "CNC design",
    parent: "1.1.1"
  },
  {
    id: "1.1.1.4",
    name: "3D design",
    parent: "1.1.1"
  },
  {
    id: "1.1.2",
    name: "Consultancy Civil Construction",
    parent: "1.1"
  },
  {
    id: "1.1.2.1",
    name: "PMC agency",
    parent: "1.1.2"
  },
  {
    id: "1.1.2.2",
    name: "Surveyor & Contouring",
    parent: "1.1.2"
  },
  {
    id: "1.1.2.3",
    name: "Civil work consultancy",
    parent: "1.1.2"
  },
  {
    id: "1.1.2.4",
    name: "Interior work consultancy",
    parent: "1.1.2"
  },
  {
    id: "1.1.3",
    name: "Thekedar / Contractor",
    parent: "1.1"
  },
  {
    id: "1.1.3.1",
    name: "Civil contractor",
    parent: "1.1.3"
  },
  {
    id: "1.1.3.2",
    name: "Interior contractor",
    parent: "1.1.3"
  },
  {
    id: "1.1.3.3",
    name: "Home decor contractor",
    parent: "1.1.3"
  },
  {
    id: "1.1.4",
    name: "Civil Equipment",
    parent: "1.1"
  },
  {
    id: "1.1.4.1",
    name: "Mixer machine (CC)",
    parent: "1.1.4"
  },
  {
    id: "1.1.4.2",
    name: "Tools & Machine",
    parent: "1.1.4"
  },
  {
    id: "1.1.4.3",
    name: "Excavation machinery (JCB)",
    parent: "1.1.4"
  },
  {
    id: "1.1.4.4",
    name: "Crane",
    parent: "1.1.4"
  },
  {
    id: "1.1.4.5",
    name: "Tractor trolley",
    parent: "1.1.4"
  },
  {
    id: "1.1.4.6",
    name: "Water pump & Borewells",
    parent: "1.1.4"
  },
  {
    id: "1.1.5",
    name: "Material Supplier",
    parent: "1.1"
  },
  {
    id: "1.1.5.1",
    name: "All types of construction materials",
    parent: "1.1.5"
  },
  {
    id: "1.1.5.2",
    name: "Shops",
    parent: "1.1.5"
  }
];

// Helper function to create a tree structure
export const buildCategoryTree = (categories) => {
  const idMap = {};
  const root = [];

  // First pass: Create nodes and id mapping
  categories.forEach(category => {
    idMap[category.id] = {
      ...category,
      children: []
    };
  });

  // Second pass: Create tree structure
  categories.forEach(category => {
    const node = idMap[category.id];
    if (category.parent === null) {
      root.push(node);
    } else {
      const parent = idMap[category.parent];
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  return root;
};

// Helper function to get category path
export const getCategoryPath = (categoryId, categories) => {
  const path = [];
  let current = categories.find(c => c.id === categoryId);
  
  while (current) {
    path.unshift(current.name);
    current = categories.find(c => c.id === current.parent);
  }
  
  return path.join(' > ');
};

// Helper function to get all children categories
export const getChildCategories = (categoryId, categories) => {
  return categories.filter(category => category.parent === categoryId);
};

// Helper function to get all parent categories
export const getParentCategories = (categories) => {
  return categories.filter(category => categories.some(c => c.parent === category.id));
};