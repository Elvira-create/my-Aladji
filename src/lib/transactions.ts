import { supabase } from './supabase';
import { Transaction } from '../types/database';

export async function createTransaction(data: Partial<Transaction>) {
  const { data: transaction, error } = await supabase
    .from('transactions')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return transaction;
}

export async function getTransactions(accountId: string) {
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('account_id', accountId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return transactions;
}

export async function getPendingTransactions() {
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*, accounts(*)')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return transactions;
}

export async function updateTransactionStatus(id: string, status: string, cashierId: string) {
  const { data: transaction, error } = await supabase
    .from('transactions')
    .update({ status, cashier_id: cashierId })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return transaction;
}