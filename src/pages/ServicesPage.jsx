import { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaUndo } from 'react-icons/fa';
import { useServices } from '../context/ServicesContext';
import { Transition } from '@headlessui/react';

function ServiceItem({ item, path = '', depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(depth < 1);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [showAddForm, setShowAddForm] = useState(false);
  const { editMode, editCategory, deleteCategory } = useServices();
  const hasChildren = item.items && Object.keys(item.items).length > 0;

  const handleSave = () => {
    if (newName.trim()) {
      editCategory(path, newName);
      setIsEditing(false);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(path);
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-6' : ''} mb-4`}>
      <div
        className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm ${
          hasChildren ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
        }`}
      >
        <div className="flex-1 flex items-center" onClick={() => hasChildren && setIsExpanded(!isExpanded)}>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onClick={(e) => e.stopPropagation()}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">{item.name}</span>
          )}
          {hasChildren && (
            <span className="ml-2 text-gray-500 dark:text-gray-400">
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
        </div>

        {editMode && (
          <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 text-green-600 hover:text-green-700"
                  title="Save"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewName(item.name);
                  }}
                  className="p-1 text-red-600 hover:text-red-700"
                  title="Cancel"
                >
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="p-1 text-green-600 hover:text-green-700"
                  title="Add Subcategory"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-blue-600 hover:text-blue-700"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <Transition
        show={showAddForm}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <AddCategoryForm 
          parentPath={path} 
          onClose={() => setShowAddForm(false)} 
          depth={depth + 1}
        />
      </Transition>
      
      {hasChildren && isExpanded && (
        <div className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
          {Object.entries(item.items).map(([key, childItem]) => (
            <ServiceItem 
              key={key} 
              item={childItem} 
              path={path ? `${path}.${key}` : key} 
              depth={depth + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AddCategoryForm({ parentPath = '', onClose, depth = 0 }) {
  const [name, setName] = useState('');
  const { addCategory } = useServices();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addCategory(parentPath, { name: name.trim() });
      setName('');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`${depth === 0 ? 'Category' : 'Subcategory'} name`}
          className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ServicesPage() {
  const { services, editMode, setEditMode, resetToDefault } = useServices();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage service categories
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 flex items-center"
            title="Reset to Default Categories"
          >
            <FaUndo className="mr-2" /> Reset
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-md ${
              editMode
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {editMode ? 'Done' : 'Edit Categories'}
          </button>
          {editMode && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaPlus className="mr-2" /> Add Category
            </button>
          )}
        </div>
      </div>

      <Transition
        show={showAddForm}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <AddCategoryForm onClose={() => setShowAddForm(false)} />
      </Transition>

      <div className="grid grid-cols-1 gap-6">
        {Object.entries(services).map(([key, item]) => (
          <ServiceItem key={key} item={item} path={key} />
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;