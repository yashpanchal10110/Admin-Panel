import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import StatsCard from '../components/StatsCard';
import { useProviders } from '../context/ProvidersContext';

const weeklyData = [
  { period: 'Mon', amount: 5000 },
  { period: 'Tue', amount: 7000 },
  { period: 'Wed', amount: 6000 },
  { period: 'Thu', amount: 8000 },
  { period: 'Fri', amount: 12000 },
  { period: 'Sat', amount: 15000 },
  { period: 'Sun', amount: 10000 },
];

const monthlyData = [
  { period: 'JAN', amount: 15000 },
  { period: 'FEB', amount: 20000 },
  { period: 'MAR', amount: 18000 },
  { period: 'APR', amount: 22000 },
  { period: 'MAY', amount: 25000 },
  { period: 'JUN', amount: 30000 },
  { period: 'JUL', amount: 28000 },
];

const yearlyData = [
  { period: '2017', amount: 250000 },
  { period: '2018', amount: 300000 },
  { period: '2019', amount: 350000 },
  { period: '2020', amount: 400000 },
  { period: '2021', amount: 450000 },
  { period: '2022', amount: 500000 },
  { period: '2023', amount: 550000 },
];

function Dashboard() {
  const { totalProviders } = useProviders();
  const [timeFilter, setTimeFilter] = useState('month');

  const getFilteredData = () => {
    switch (timeFilter) {
      case 'week':
        return weeklyData;
      case 'year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value="150"
          icon="📅"
        />
        <StatsCard
          title="Total Earnings"
          value="₹25000"
          subtitle="(After taxes)"
          icon="💰"
        />
        <StatsCard
          title="Providers"
          value={totalProviders}
          subtitle={`${totalProviders} Active`}
          icon="👥"
        />
        <StatsCard
          title="Total Customers"
          value="75"
          icon="👤"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Earnings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Earning over time</p>
          </div>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <LineChart
            width={800}
            height={300}
            data={getFilteredData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#4F46E5" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;