import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { testimonialApi } from '../services/api';
import toast from 'react-hot-toast';

function TestimonialModal({ isOpen, onClose, testimonial }) {
  const [formData, setFormData] = useState({
    author: testimonial?.author || '',
    content: testimonial?.content || '',
    rating: testimonial?.rating || 5,
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (data) => testimonialApi.createTestimonial(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testimonials');
        toast.success('Testimonial created successfully');
        onClose();
      },
      onError: () => {
        toast.error('Failed to create testimonial');
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, data }) => testimonialApi.updateTestimonial(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testimonials');
        toast.success('Testimonial updated successfully');
        onClose();
      },
      onError: () => {
        toast.error('Failed to update testimonial');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testimonial) {
      updateMutation.mutate({ id: testimonial.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full rounded-lg bg-white dark:bg-gray-800 p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Author Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rating
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : testimonial ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default TestimonialModal;