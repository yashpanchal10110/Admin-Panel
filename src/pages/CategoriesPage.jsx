import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import useCategoryStore from '../stores/categoryStore';
import CategoryTable from '../components/categories/CategoryTable';
import CategoryForm from '../components/categories/CategoryForm';

function CategoriesPage() {
  const { categories, searchTerm, setSearchTerm, addCategory, updateCategory, deleteCategory } = useCategoryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      toast.success('Category deleted successfully');
    }
  };

  const handleSubmit = (data) => {
    try {
      if (editingCategory) {
        updateCategory(editingCategory.id, data);
        toast.success('Category updated successfully');
      } else {
        addCategory(data);
        toast.success('Category added successfully');
      }
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      toast.error('Failed to save category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage service categories
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg w-full rounded-lg bg-white dark:bg-gray-800 p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </Dialog.Title>

            <CategoryForm
              category={editingCategory}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingCategory(null);
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default CategoriesPage;