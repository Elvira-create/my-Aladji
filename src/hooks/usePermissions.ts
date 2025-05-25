import { useAuth } from '../components/AuthProvider';
import { ROLE_PERMISSIONS, Permission, UserRole } from '../types/roles';

export function usePermissions() {
  const { userProfile } = useAuth();
  
  const hasPermission = (permission: Permission) => {
    if (!userProfile?.role_id) return false;
    
    const rolePermissions = ROLE_PERMISSIONS[userProfile.role_id as UserRole];
    return rolePermissions?.includes(permission) ?? false;
  };

  return {
    hasPermission,
    isAdmin: userProfile?.role_id === 'admin',
    isManager: userProfile?.role_id === 'manager',
    isCashier: userProfile?.role_id === 'cashier',
    isClerk: userProfile?.role_id === 'clerk',
    isCustomer: userProfile?.role_id === 'customer',
  };
}