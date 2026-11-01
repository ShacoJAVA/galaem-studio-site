import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://etowcnopkqpkvexizxxx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b3djbm9wa3Fwa3ZleGl6eHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1MzA2MzQsImV4cCI6MjEwOTEwNjYzNH0.LUTLnkv-GjYDrsnyYoQmTV1wt9v-oHrQMzYVayMhz-Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
