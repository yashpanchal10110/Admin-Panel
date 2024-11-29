import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaGift, FaUsers, FaCoins, FaRupeeSign, FaCog } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useRewards } from '../context/RewardsContext';
import { useConfig } from '../context/ConfigContext';
import UserModal from '../components/UserModal';
import ReferralTree from '../components/ReferralTree';
import RewardConfigModal from '../components/RewardConfigModal';

function ReferralPage() {
  const { users, getReferralChain } = useRewards();
  const { config, convertCoinsToRupees } = useConfig();
  const [copied, setCopied] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const referralCode = 'MISTRY2024';

  const totalCoins = users.reduce((sum, user) => sum + user.totalCoins, 0);
  const totalReferrals = users.reduce((sum, user) => sum + user.referrals.length, 0);
  const totalValue = convertCoinsToRupees(totalCoins);

  const handleCopy = () => {
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Get the root users (users not referred by anyone)
  const rootUsers = users.filter(user => !user.referredBy);
  const referralTrees = rootUsers.map(user => getReferralChain(user.id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Referral System</h1>
        <button
          onClick={() => setIsConfigOpen(true)}
          className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <FaCog className="mr-2" />
          <span>Configure Rewards</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{users.length}</h3>
            </div>
            <FaUsers className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Referrals</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalReferrals}</h3>
            </div>
            <FaGift className="text-3xl text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Coins</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCoins}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {config.rewards.coinsPerRupee} coins = ₹1
              </p>
            </div>
            <FaCoins className="text-3xl text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ₹{totalValue.toFixed(2)}
              </h3>
            </div>
            <FaRupeeSign className="text-3xl text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Rewards Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-200">Login Reward</h3>
            <p className="mt-1 text-blue-600 dark:text-blue-300">{config.rewards.loginReward} coins per login</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-medium text-purple-800 dark:text-purple-200">Referral Reward</h3>
            <p className="mt-1 text-purple-600 dark:text-purple-300">{config.rewards.referralReward} coins per referral</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-medium text-green-800 dark:text-green-200">First Order Reward</h3>
            <p className="mt-1 text-green-600 dark:text-green-300">{config.rewards.firstOrderReward} coins</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Referral Code</h2>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <code className="text-lg font-mono">{referralCode}</code>
          </div>
          <CopyToClipboard text={referralCode} onCopy={handleCopy}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </CopyToClipboard>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Referral Network</h2>
        <div className="space-y-4">
          {referralTrees.map((tree, index) => (
            <ReferralTree key={index} node={tree} onUserClick={handleUserClick} />
          ))}
        </div>
      </div>

      <UserModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />

      <RewardConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />
    </div>
  );
}

export default ReferralPage;