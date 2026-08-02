// assets/js/config/supabase.js

// Prendi URL e ANON_KEY dalla tua dashboard Supabase
const SUPABASE_URL = 'https://vsggwkhcedcayiamhxlx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZ2d3a2hjZWRjYXlpYW1oeGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MDE5MjEsImV4cCI6MjEwMDk3NzkyMX0.cRxPgBFJHPrJRMuPUZrSjdBq4VmYljb1jW9vd4HG_tg';

// Inizializzazione globale
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);