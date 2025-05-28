
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';


const VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZnRlcW9idHF0dnV4aWx3aHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2ODEzMTMsImV4cCI6MjA2MzI1NzMxM30.H9vpQZ9LfnsSSW-75O9CyYW4-ZCsSHUVex_k_6LXpCI"
const supabaseUrl = 'https://fvfteqobtqtvuxilwhxi.supabase.co'

// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZnRlcW9idHF0dnV4aWx3aHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2ODEzMTMsImV4cCI6MjA2MzI1NzMxM30.H9vpQZ9LfnsSSW-75O9CyYW4-ZCsSHUVex_k_6LXpCI";
// const superbaseAnonkey= process.env.VITE_SUPABASE_ANON_KEY;
// const supabaseUrl = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, VITE_SUPABASE_ANON_KEY);

