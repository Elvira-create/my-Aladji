import { useQuery } from '@tanstack/react-query';
import { getTerritories, updateTerritory } from '../lib/territories';
import { Territory } from '../types/database';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ClerkAssignment } from './ClerkAssignment';
import { TerritoryAssignments } from './TerritoryAssignments';
import { UserIcon, PencilIcon, UsersIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export function TerritoryList() {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [editingTerritory, setEditingTerritory] = useState<Territory | null>(null);
  const [viewingAssignments, setViewingAssignments] = useState<Territory | null>(null);
  const { data: territories, isLoading, refetch } = useQuery({
    queryKey: ['territories'],
    queryFn: getTerritories,
  });

  const handleUpdateTerritory = async (territory: Territory) => {
    try {
      await updateTerritory(territory.id, {
        name: territory.name,
        description: territory.description,
        active: territory.active,
      });
      toast.success('Territory updated successfully');
      setEditingTerritory(null);
      refetch();
    } catch (error) {
      toast.error('Failed to update territory');
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading territories...</div>;
  }

  return (
    <>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {territories?.map((territory: Territory) => (
              <tr key={territory.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {territory.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {territory.description || 'No description'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    territory.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {territory.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <button
                    onClick={() => setEditingTerritory(territory)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedTerritory(territory)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <UserIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    Assign
                  </button>
                  <button
                    onClick={() => setViewingAssignments(territory)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    <UsersIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    View Clerks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Clerk Dialog */}
      <Dialog
        open={!!selectedTerritory}
        onClose={() => setSelectedTerritory(null)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Assign Clerk to {selectedTerritory?.name}
              </Dialog.Title>
              <div className="mt-4">
                <ClerkAssignment
                  territoryId={selectedTerritory?.id || ''}
                  onSuccess={() => {
                    setSelectedTerritory(null);
                    refetch();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Edit Territory Dialog */}
      <Dialog
        open={!!editingTerritory}
        onClose={() => setEditingTerritory(null)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Edit Territory
              </Dialog.Title>
              <div className="mt-4">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  if (editingTerritory) {
                    handleUpdateTerritory(editingTerritory);
                  }
                }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editingTerritory?.name || ''}
                      onChange={(e) => setEditingTerritory(prev => prev ? {...prev, name: e.target.value} : null)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={editingTerritory?.description || ''}
                      onChange={(e) => setEditingTerritory(prev => prev ? {...prev, description: e.target.value} : null)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingTerritory?.active || false}
                      onChange={(e) => setEditingTerritory(prev => prev ? {...prev, active: e.target.checked} : null)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active</label>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Territory
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* View Assignments Dialog */}
      <Dialog
        open={!!viewingAssignments}
        onClose={() => setViewingAssignments(null)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Clerks Assigned to {viewingAssignments?.name}
              </Dialog.Title>
              <div className="mt-4">
                <TerritoryAssignments
                  territoryId={viewingAssignments?.id || ''}
                  onClose={() => setViewingAssignments(null)}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}