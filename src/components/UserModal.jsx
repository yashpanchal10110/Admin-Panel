import { Dialog } from '@headlessui/react';
import { FaCoins, FaUser, FaCalendar, FaGift } from 'react-icons/fa';
import { useConfig } from '../context/ConfigContext';

function UserModal({ isOpen, onClose, user }) {
  const { convertCoinsToRupees } = useConfig();
  
  if (!isOpen || !user) return null;

  const getRewardIcon = (type) => {
    switch (type) {
      case 'login':
        return <FaUser className="text-blue-500" />;
      case 'referral':
        return <FaGift className="text-purple-500" />;
      case 'first_order':
        return <FaCoins className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full rounded-lg bg-white dark:bg-gray-800 p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
            User Details
          </Dialog.Title>

          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Coins</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{user.totalCoins}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ≈ ₹{convertCoinsToRupees(user.totalCoins).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Referral Information</h4>
                {user.referredBy && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Referred by: {user.referredBy}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Referrals made: {user.referrals.length}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reward History</h4>
                <div className="space-y-2">
                  {user.rewardHistory.map((reward, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getRewardIcon(reward.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {reward.type.charAt(0).toUpperCase() + reward.type.slice(1).replace('_', ' ')} Reward
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(reward.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        +{reward.amount} coins
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default UserModal;