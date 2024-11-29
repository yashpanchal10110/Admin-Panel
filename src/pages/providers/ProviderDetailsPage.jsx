import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProviders } from '../../context/ProvidersContext';
import Avatar from '../../components/common/Avatar';
import StatusBadge from '../../components/common/StatusBadge';
import RatingStars from '../../components/common/RatingStars';
import WorkHistoryCard from '../../components/providers/WorkHistoryCard';
import { toast } from 'react-hot-toast';

function ProviderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { providers, updateProvider, deleteProvider, blockProvider, unblockProvider } = useProviders();
  const provider = providers.find(p => p.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(provider ? {
    name: provider.name,
    type: provider.type,
    category: provider.category,
    mobile: provider.mobile,
    workAddress: provider.workAddress,
    permanentAddress: provider.permanentAddress
  } : {});

  if (!provider) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Provider not found</h2>
      </div>
    );
  }

  const handleSave = () => {
    try {
      updateProvider(id, formData);
      setIsEditing(false);
      toast.success('Provider details updated successfully');
    } catch (error) {
      toast.error('Failed to update provider details');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this provider? This action cannot be undone.')) {
      try {
        deleteProvider(id);
        toast.success('Provider deleted successfully');
        navigate('/providers');
      } catch (error) {
        toast.error('Failed to delete provider');
      }
    }
  };

  const handleBlockToggle = () => {
    try {
      if (provider.status === 'blocked') {
        unblockProvider(id);
        toast.success('Provider unblocked successfully');
      } else {
        blockProvider(id);
        toast.success('Provider blocked successfully');
      }
    } catch (error) {
      toast.error('Failed to update provider status');
    }
  };

  const handleViewWorkHistory = () => {
    navigate(`/providers/${id}/work-history`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Details</h1>
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: provider.name,
                    type: provider.type,
                    category: provider.category,
                    mobile: provider.mobile,
                    workAddress: provider.workAddress,
                    permanentAddress: provider.permanentAddress
                  });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Details
            </button>
          )}
          <button
            onClick={handleBlockToggle}
            className={`px-4 py-2 rounded-md ${
              provider.status === 'blocked'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-yellow-600 hover:bg-yellow-700'
            } text-white`}
          >
            {provider.status === 'blocked' ? 'Unblock Provider' : 'Block Provider'}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Provider
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar src={provider.image} name={provider.name} size="xl" />
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{provider.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{provider.id}</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                {isEditing ? (
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Business">Business</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">{provider.type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{provider.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{provider.mobile}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work Address</label>
                {isEditing ? (
                  <textarea
                    value={formData.workAddress}
                    onChange={(e) => setFormData({ ...formData, workAddress: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{provider.workAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Permanent Address</label>
                {isEditing ? (
                  <textarea
                    value={formData.permanentAddress}
                    onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{provider.permanentAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
                <div className="mt-1">
                  <RatingStars rating={provider.rating} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <div className="mt-1">
                  <StatusBadge status={provider.status} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <WorkHistoryCard providerId={id} onViewAll={handleViewWorkHistory} />
        </div>
      </div>
    </div>
  );
}

export default ProviderDetailsPage;