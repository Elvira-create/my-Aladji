import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../components/AuthProvider';
import { usePermissions } from '../hooks/usePermissions';
import { RoleGuard } from '../components/RoleGuard';
import { TerritoryList } from '../components/TerritoryList';
import { TerritoryForm } from '../components/TerritoryForm';
import { PendingTransactions } from '../components/PendingTransactions';
import { CollectionList } from '../components/CollectionList';
import { TerritoryStatus } from '../components/TerritoryStatus';
import { AccountOverview } from '../components/AccountOverview';
import { TransactionList } from '../components/TransactionList';
import { SystemStats } from '../components/SystemStats';

// Role-specific dashboard components
const AdminDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">System Overview</h2>
    <SystemStats />
    
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <PendingTransactions />
        </div>
      </div>
    </div>
  </div>
);

const ManagerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Territory Management</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Territory
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <TerritoryList />
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Create New Territory
              </Dialog.Title>
              <div className="mt-4">
                <TerritoryForm onSuccess={() => setIsOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const CashierDashboard = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Transaction Overview</h2>
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <PendingTransactions />
      </div>
    </div>
  </div>
);

const ClerkDashboard = () => {
  const { userProfile } = useAuth();
  const territories = userProfile?.territories || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Collection Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Collections</h3>
            <CollectionList />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Territory Status</h3>
            {territories.map(territory => (
              <TerritoryStatus key={territory.id} territoryId={territory.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Account Overview</h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <AccountOverview />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
            <TransactionList accountId={user?.id || ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { userProfile } = useAuth();
  const { hasPermission } = usePermissions();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Welcome, {userProfile?.full_name}
          </h1>
          
          <RoleGuard allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleGuard>

          <RoleGuard allowedRoles={['manager']}>
            <ManagerDashboard />
          </RoleGuard>

          <RoleGuard allowedRoles={['cashier']}>
            <CashierDashboard />
          </RoleGuard>

          <RoleGuard allowedRoles={['clerk']}>
            <ClerkDashboard />
          </RoleGuard>

          <RoleGuard allowedRoles={['customer']}>
            <CustomerDashboard />
          </RoleGuard>
        </div>
      </div>
    </div>
  );
}