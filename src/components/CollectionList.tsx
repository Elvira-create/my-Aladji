import { useQuery } from '@tanstack/react-query';
import { getCollections } from '../lib/collections';
import { useAuth } from './AuthProvider';
import { Transaction } from '../types/database';

export function CollectionList() {
  const { user } = useAuth();
  const { data: collections, isLoading } = useQuery({
    queryKey: ['collections', user?.id],
    queryFn: () => getCollections(user?.id || ''),
  });

  if (isLoading) {
    return <div>Loading collections...</div>;
  }

  if (!collections?.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No collections found for today.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {collections.map((collection: Transaction) => (
            <tr key={collection.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(collection.created_at).toLocaleTimeString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {collection.account_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${collection.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${collection.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    collection.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {collection.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}