import { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

const initialConfig = {
  rewards: {
    coinsPerRupee: 10, // 10 coins = 1 Rs
    loginReward: 10,
    referralReward: 10,
    firstOrderReward: 100,
  },
  referral: {
    codePrefix: 'MISTRY',
    codeLength: 8,
  }
};

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(initialConfig);

  const updateRewardConfig = (newConfig) => {
    setConfig(prev => ({
      ...prev,
      rewards: {
        ...prev.rewards,
        ...newConfig
      }
    }));
  };

  const convertCoinsToRupees = (coins) => {
    return coins / config.rewards.coinsPerRupee;
  };

  const convertRupeesToCoins = (rupees) => {
    return rupees * config.rewards.coinsPerRupee;
  };

  return (
    <ConfigContext.Provider value={{
      config,
      updateRewardConfig,
      convertCoinsToRupees,
      convertRupeesToCoins
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);