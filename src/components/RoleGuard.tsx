import { ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { ROLE_PERMISSIONS, UserRole } from '../types/roles';

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
};

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { userProfile } = useAuth();
  
  if (!userProfile?.role_id) {
    return fallback;
  }

  // Check if user's role is in the allowed roles
  const hasPermission = allowedRoles.includes(userProfile.role_id as UserRole);

  return hasPermission ? <>{children}</> : fallback;
}