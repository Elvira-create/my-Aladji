import { useQuery } from '@tanstack/react-query';
import { getTerritoryCollections } from '../lib/collections';

type TerritoryStatusProps = {
  territoryId: string;
};

export function TerritoryStatus({ territoryId }: TerritoryStatusProps) {
  const { data: collections, isLoading } = useQuery({
    queryKey: ['territory-collections', territoryId],
    queryFn: () => getTerritoryCollections(territoryId),
  });

  if (isLoading) {
    return <div>Loading territory status...</div>;
  }

  const totalCollections = collections?.reduce((sum, col) => sum + col.amount, 0) || 0;
  const completedCollections = collections?.filter(col => col.status === 'completed').length || 0;
  const pendingCollections = collections?.filter(col => col.status === 'pending').length || 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Collections
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${totalCollections.toFixed(2)}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Completed Collections
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">
              {completedCollections}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Pending Collections
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-600">
              {pendingCollections}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}