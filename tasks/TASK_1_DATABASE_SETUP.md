# TASK 1: Configurazione Database & Supabase

## Obiettivo
Creare il progetto su Supabase, configurare il database PostgreSQL e le tabelle necessarie per gestire l'evento, inclusi i dati anagrafici e la modalità di pagamento.

## Istruzioni
1. Creare un account gratuito su https://supabase.com.
2. Creare un nuovo progetto (es. `rwt-talamello-2026`).
3. Nell'editor SQL di Supabase, eseguire lo script per creare la tabella `registrations`
4. Creare l'utente Admin nella sezione Authentication -> Users su Supabase (es. admin@evento.com con password sicura).
5. Salvare la SUPABASE_URL e la SUPABASE_ANON_KEY per la configurazione JS.

```sql
CREATE TABLE public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birth_date DATE NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    team TEXT,
    category_event TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'in_attesa' CHECK (status IN ('in_attesa', 'confermata', 'annullata')),
    notes TEXT
);

-- Abilita RLS (Row Level Security)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Lettura pubblica limitata (o totale, filtrata via codice)
CREATE POLICY "Permetti lettura pubblica" ON public.registrations 
FOR SELECT USING (true);

-- Policy: Inserimento pubblico (chiunque può registrarsi)
CREATE POLICY "Permetti inserimento pubblico" ON public.registrations 
FOR INSERT WITH CHECK (true);

-- Policy: Modifica ed eliminazione riservate ad utenti autenticati (Admin)
CREATE POLICY "Gestione completa agli Admin" ON public.registrations 
FOR ALL USING (auth.role() = 'authenticated');

