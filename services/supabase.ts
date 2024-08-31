import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://jmfhvbtymbscetnqglch.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZmh2YnR5bWJzY2V0bnFnbGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMDM1OTEsImV4cCI6MjA0MDY3OTU5MX0.MIrc29f42eQ4yhEPav-9aL9wkKfPUs5z9GJrFj8o53g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});