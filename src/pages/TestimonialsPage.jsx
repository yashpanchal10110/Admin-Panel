import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { testimonialApi } from '../services/api';
import toast from 'react-hot-toast';
import TestimonialModal from '../components/TestimonialModal';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

function TestimonialsPage() {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(
    ['testimonials', page],
    () => testimonialApi.getTestimonials({ page }),
    {
      keepPreviousData: true,
    }
  );

  const deleteMutation = useMutation(
    (ids) => testimonialApi.deleteTestimonials(ids),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testimonials');
        toast.success('Testimonials deleted successfully');
        setSelectedIds([]);
      },
      onError: () => {
        toast.error('Failed to delete testimonials');
      },
    }
  );

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm('Are you sure you want to delete the selected testimonials?')) {
      deleteMutation.mutate(selectedIds);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900 rounded-lg">
        <p className="text-red-600 dark:text-red-200">Error loading testimonials: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Testimonials</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage customer testimonials and reviews
          </p>
        </div>
        <div className="flex space-x-4">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              disabled={deleteMutation.isLoading}
            >
              <FaTrash className="mr-2" />
              Delete Selected
            </button>
          )}
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Testimonial
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(testimonial.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds([...selectedIds, testimonial.id]);
                        } else {
                          setSelectedIds(selectedIds.filter(id => id !== testimonial.id));
                        }
                      }}
                      className="mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {testimonial.author}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                <div className="mt-4 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.rating}/5
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <nav className="flex space-x-2">
              <button
                onClick={() => setPage(old => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(old => old + 1)}
                disabled={!data?.hasMore}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </>
      )}

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        testimonial={editingTestimonial}
      />
    </div>
  );
}

export default TestimonialsPage;