import { useQuery } from '@tanstack/react-query';
import { getTerritoryAssignments } from '../lib/territories';

type TerritoryAssignmentsProps = {
  territoryId: string;
  onClose?: () => void;
};

export function TerritoryAssignments({ territoryId, onClose }: TerritoryAssignmentsProps) {
  const { data: assignments, isLoading } = useQuery({
    queryKey: ['territory-assignments', territoryId],
    queryFn: () => getTerritoryAssignments(territoryId),
  });

  if (isLoading) {
    return <div>Loading assignments...</div>;
  }

  if (!assignments?.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No clerks assigned to this territory yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {assignments.map((assignment:any) => (
            <li key={assignment.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">
                      {assignment.clerk.full_name.charAt(0)}
                    </span>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {assignment.clerk.full_name}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {assignment.clerk.email}
                  </p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    assignment.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {assignment.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}