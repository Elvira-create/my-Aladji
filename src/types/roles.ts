export type UserRole = 'admin' | 'manager' | 'cashier' | 'clerk' | 'customer';

export const ROLE_PERMISSIONS = {
  admin: ['manage_users', 'manage_roles', 'manage_system', 'view_all'],
  manager: ['manage_staff', 'manage_territories', 'view_reports', 'manage_cashiers'],
  cashier: ['manage_transactions', 'validate_payments', 'generate_reports'],
  clerk: ['manage_customers', 'collect_payments', 'view_territory'],
  customer: ['view_account', 'make_transactions', 'view_history']
} as const;

export type Permission = keyof typeof ROLE_PERMISSIONS;