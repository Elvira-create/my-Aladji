import { supabase } from './supabase';

export async function getCollections(clerkId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('transactions')
    .select('*, accounts(*)')
    .eq('clerk_id', clerkId)
    .gte('created_at', today.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTerritoryCollections(territoryId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      accounts(*),
      clerk:clerk_id(*)
    `)
    .eq('territories.id', territoryId)
    .gte('created_at', today.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}