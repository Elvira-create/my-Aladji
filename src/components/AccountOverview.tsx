import { useQuery } from '@tanstack/react-query';
import { getAccountDetails } from '../lib/accounts';
import { useAuth } from './AuthProvider';

export function AccountOverview() {
  const { user } = useAuth();
  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts', user?.id],
    queryFn: () => getAccountDetails(user?.id || ''),
  });

  if (isLoading) {
    return <div>Loading account details...</div>;
  }

  if (!accounts?.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No accounts found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <div key={account.id} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Account {account.account_number}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {account.account_type}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-gray-900">
                  ${account.balance.toFixed(2)}
                </p>
                <p className={`mt-1 text-sm ${
                  account.status === 'active' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {account.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}