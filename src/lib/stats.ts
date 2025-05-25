import { supabase } from './supabase';

export async function getSystemStats() {
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('role_id, active');

  if (usersError) throw usersError;

  const { data: transactions, error: transactionsError } = await supabase
    .from('transactions')
    .select('amount, status')
    .gte('created_at', new Date(new Date().setDate(new Date().getDate() - 30)).toISOString());

  if (transactionsError) throw transactionsError;

  return {
    totalUsers: users.length,
    activeStaff: users.filter(u => u.active && ['clerk', 'cashier', 'manager'].includes(u.role_id)).length,
    monthlyTransactions: transactions.length,
    monthlyVolume: transactions.reduce((sum, t) => sum + (t.amount || 0), 0),
    completedTransactions: transactions.filter(t => t.status === 'completed').length,
  };
}