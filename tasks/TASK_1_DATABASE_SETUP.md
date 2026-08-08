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
    email TEXT,
    phone TEXT NOT NULL,
    team TEXT,
    category_event TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'in_attesa' CHECK (status IN ('in_attesa', 'confermata', 'annullata')),
    notes TEXT
);

-- Abilita RLS (Row Level Security)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Policy 1: Inserimento consentito al pubblico (anon e authenticated)
CREATE POLICY "Permetti inserimento pubblico" 
ON public.registrations 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Lettura consentita per la query sottostante la Vista Pubblica
CREATE POLICY "Permetti lettura per vista" 
ON public.registrations 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- Policy 3: Gestione completa riservata agli Admin autenticati (Ottimizzata per le performance)
CREATE POLICY "Gestione completa agli Admin" 
ON public.registrations 
FOR ALL 
TO authenticated
USING ((SELECT auth.role()) = 'authenticated')
WITH CHECK ((SELECT auth.role()) = 'authenticated');

-- Vista pubblica per la pagina iscritti.html (In modalità SECURITY INVOKER per la massima sicurezza)
CREATE VIEW public.public_iscritti 
WITH (security_invoker = true) AS
  SELECT first_name, last_name, team, category_event, payment_method, status
  FROM public.registrations;

GRANT SELECT ON public.public_iscritti TO anon;
GRANT SELECT ON public.public_iscritti TO authenticated;

