import { useQuery } from '@tanstack/react-query';
import { getSystemStats } from '../lib/stats';

export function SystemStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['system-stats'],
    queryFn: getSystemStats,
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  if (isLoading) {
    return <div>Loading system statistics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.totalUsers}</dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Active Staff</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.activeStaff}</dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Monthly Volume</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            ${stats?.monthlyVolume.toFixed(2)}
          </dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Monthly Transactions</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.monthlyTransactions}</dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Completed Transactions</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.completedTransactions}</dd>
        </div>
      </div>
    </div>
  );
}