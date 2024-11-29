import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { toast } from 'react-hot-toast';

function RewardConfigModal({ isOpen, onClose }) {
  const { config, updateRewardConfig } = useConfig();
  const [formData, setFormData] = useState({
    coinsPerRupee: config.rewards.coinsPerRupee,
    loginReward: config.rewards.loginReward,
    referralReward: config.rewards.referralReward,
    firstOrderReward: config.rewards.firstOrderReward,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRewardConfig(formData);
    toast.success('Reward configuration updated successfully');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-lg bg-white dark:bg-gray-800 p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Configure Rewards
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Coins per Rupee
              </label>
              <input
                type="number"
                min="1"
                value={formData.coinsPerRupee}
                onChange={(e) => setFormData({ ...formData, coinsPerRupee: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Number of coins equal to 1 Rupee
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Login Reward
              </label>
              <input
                type="number"
                min="0"
                value={formData.loginReward}
                onChange={(e) => setFormData({ ...formData, loginReward: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Referral Reward
              </label>
              <input
                type="number"
                min="0"
                value={formData.referralReward}
                onChange={(e) => setFormData({ ...formData, referralReward: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Order Reward
              </label>
              <input
                type="number"
                min="0"
                value={formData.firstOrderReward}
                onChange={(e) => setFormData({ ...formData, firstOrderReward: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default RewardConfigModal;