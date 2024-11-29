import axios from 'axios';
import { mockTestimonials } from './mockData';

const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API implementation
const mockApi = {
  getTestimonials: ({ page = 1, limit = 10 }) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const testimonials = mockTestimonials.slice(start, end);
    const hasMore = mockTestimonials.length > end;

    return Promise.resolve({
      testimonials,
      hasMore,
      total: mockTestimonials.length
    });
  },

  getTestimonialById: (id) => {
    const testimonial = mockTestimonials.find(t => t.id === id);
    if (!testimonial) {
      return Promise.reject({ message: 'Testimonial not found' });
    }
    return Promise.resolve(testimonial);
  },

  createTestimonial: (data) => {
    const newTestimonial = {
      id: mockTestimonials.length + 1,
      ...data,
      date: new Date().toISOString()
    };
    mockTestimonials.unshift(newTestimonial);
    return Promise.resolve(newTestimonial);
  },

  updateTestimonial: (id, data) => {
    const index = mockTestimonials.findIndex(t => t.id === id);
    if (index === -1) {
      return Promise.reject({ message: 'Testimonial not found' });
    }
    const updatedTestimonial = {
      ...mockTestimonials[index],
      ...data,
    };
    mockTestimonials[index] = updatedTestimonial;
    return Promise.resolve(updatedTestimonial);
  },

  deleteTestimonials: (ids) => {
    ids.forEach(id => {
      const index = mockTestimonials.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTestimonials.splice(index, 1);
      }
    });
    return Promise.resolve({ message: 'Testimonials deleted successfully' });
  }
};

// Use mock API for development
export const testimonialApi = process.env.NODE_ENV === 'production' ? {
  getTestimonials: async ({ page = 1, limit = 10 }) => {
    try {
      const response = await api.get(`/testimonials?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status,
        statusText: error.response?.statusText,
      };
    }
  },

  getTestimonialById: async (id) => {
    try {
      const response = await api.get(`/testimonials/${id}`);
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status,
        statusText: error.response?.statusText,
      };
    }
  },

  createTestimonial: async (data) => {
    try {
      const response = await api.post('/testimonials', data);
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status,
        statusText: error.response?.statusText,
      };
    }
  },

  updateTestimonial: async (id, data) => {
    try {
      const response = await api.put(`/testimonials/${id}`, data);
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status,
        statusText: error.response?.statusText,
      };
    }
  },

  deleteTestimonials: async (ids) => {
    try {
      const response = await api.post('/testimonials/delete', { ids });
      return response.data;
    } catch (error) {
      throw {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status,
        statusText: error.response?.statusText,
      };
    }
  },
} : mockApi;

export default api;