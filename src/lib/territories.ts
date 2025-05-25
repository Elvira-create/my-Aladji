import { supabase } from './supabase';
import { Territory } from '../types/database';

export async function getTerritories() {
  const { data: territories, error } = await supabase
    .from('territories')
    .select('*')
    .order('name');

  if (error) throw error;
  return territories;
}

export async function getTerritory(id: string) {
  const { data: territory, error } = await supabase
    .from('territories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return territory;
}

export async function createTerritory(data: Partial<Territory>) {
  const { data: territory, error } = await supabase
    .from('territories')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return territory;
}

export async function updateTerritory(id: string, data: Partial<Territory>) {
  const { data: territory, error } = await supabase
    .from('territories')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return territory;
}

export async function assignClerkToTerritory(clerkId: string, territoryId: string) {
  const { data, error } = await supabase
    .from('clerk_territories')
    .insert({
      clerk_id: clerkId,
      territory_id: territoryId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTerritoryAssignments(territoryId: string) {
  const { data, error } = await supabase
    .from('clerk_territories')
    .select(`
      id,
      clerk:clerk_id(id, full_name, email),
      active,
      created_at
    `)
    .eq('territory_id', territoryId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}