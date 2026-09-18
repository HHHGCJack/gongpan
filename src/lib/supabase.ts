import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://fttrstntocxevmztzdho.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dHJzdG50b2N4ZXZtenR6ZGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MTc0MjksImV4cCI6MjA4ODE5MzQyOX0.uO08r3yb0JGncry_s8g-VrHeymbhWXzVDbguoa_orU8';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) 
  || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) 
  || DEFAULT_SUPABASE_URL;

const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) 
  || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) 
  || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

