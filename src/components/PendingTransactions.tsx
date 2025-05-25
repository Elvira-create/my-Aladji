import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPendingTransactions, updateTransactionStatus } from '../lib/transactions';
import { useAuth } from './AuthProvider';
import toast from 'react-hot-toast';

export function PendingTransactions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['pending-transactions'],
    queryFn: getPendingTransactions,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTransactionStatus(id, status, user?.id || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-transactions'] });
      toast.success('Transaction status updated');
    },
    onError: () => {
      toast.error('Failed to update transaction status');
    },
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (!transactions?.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No pending transactions.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(transaction.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.accounts.account_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${transaction.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.payment_method}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => updateStatusMutation.mutate({ id: transaction.id, status: 'completed' })}
                  className="text-green-600 hover:text-green-900"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatusMutation.mutate({ id: transaction.id, status: 'rejected' })}
                  className="text-red-600 hover:text-red-900"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}