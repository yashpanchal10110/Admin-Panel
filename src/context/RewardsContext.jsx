import { createContext, useContext, useState } from 'react';

const RewardsContext = createContext();

const initialRewards = {
  loginReward: 10,
  referralReward: 10,
  firstOrderReward: 100,
};

const initialUsers = [
  {
    id: 'USR001',
    name: 'Rahul Sharma',
    email: 'rahul.s@gmail.com',
    totalCoins: 130,
    referredBy: null,
    referrals: ['USR002', 'USR003'],
    lastLogin: '2024-03-15T10:30:00Z',
    firstOrderCompleted: true,
    rewardHistory: [
      { type: 'login', amount: 10, date: '2024-03-15T10:30:00Z' },
      { type: 'referral', amount: 10, date: '2024-03-14T15:20:00Z' },
      { type: 'referral', amount: 10, date: '2024-03-13T09:15:00Z' },
      { type: 'first_order', amount: 100, date: '2024-03-10T14:30:00Z' },
    ]
  },
  {
    id: 'USR002',
    name: 'Priya Patel',
    email: 'priya.p@gmail.com',
    totalCoins: 120,
    referredBy: 'USR001',
    referrals: ['USR004'],
    lastLogin: '2024-03-14T09:20:00Z',
    firstOrderCompleted: true,
    rewardHistory: [
      { type: 'login', amount: 10, date: '2024-03-14T09:20:00Z' },
      { type: 'first_order', amount: 100, date: '2024-03-12T11:45:00Z' },
      { type: 'referral', amount: 10, date: '2024-03-11T16:30:00Z' },
    ]
  },
  {
    id: 'USR003',
    name: 'Amit Kumar',
    email: 'amit.k@gmail.com',
    totalCoins: 20,
    referredBy: 'USR001',
    referrals: [],
    lastLogin: '2024-03-13T14:15:00Z',
    firstOrderCompleted: false,
    rewardHistory: [
      { type: 'login', amount: 10, date: '2024-03-13T14:15:00Z' },
      { type: 'login', amount: 10, date: '2024-03-12T10:30:00Z' },
    ]
  },
  {
    id: 'USR004',
    name: 'Sneha Gupta',
    email: 'sneha.g@gmail.com',
    totalCoins: 110,
    referredBy: 'USR002',
    referrals: [],
    lastLogin: '2024-03-12T11:45:00Z',
    firstOrderCompleted: true,
    rewardHistory: [
      { type: 'login', amount: 10, date: '2024-03-12T11:45:00Z' },
      { type: 'first_order', amount: 100, date: '2024-03-11T13:20:00Z' },
    ]
  }
];

export function RewardsProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [rewards] = useState(initialRewards);

  const getUserById = (id) => users.find(user => user.id === id);

  const getReferralChain = (userId) => {
    const user = getUserById(userId);
    if (!user) return null;

    const chain = {
      ...user,
      referrals: user.referrals.map(refId => getReferralChain(refId)).filter(Boolean)
    };

    return chain;
  };

  const addReward = (userId, type) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          const amount = rewards[`${type}Reward`];
          return {
            ...user,
            totalCoins: user.totalCoins + amount,
            rewardHistory: [
              {
                type,
                amount,
                date: new Date().toISOString()
              },
              ...user.rewardHistory
            ]
          };
        }
        return user;
      });
    });
  };

  return (
    <RewardsContext.Provider value={{
      users,
      rewards,
      getUserById,
      getReferralChain,
      addReward
    }}>
      {children}
    </RewardsContext.Provider>
  );
}

export const useRewards = () => useContext(RewardsContext);