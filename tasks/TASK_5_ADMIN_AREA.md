# TASK 5: Area Riservata Amministrativa (Login + Dashboard)

## Obiettivo
Creare l'area di gestione riservata agli organizzatori per la verifica e modifica delle iscrizioni.

## Pagina Login Admin (`admin-login.html`)
* Form con Email e Password.
* Logica JS (`authService.js`): Autenticazione tramite `supabase.auth.signInWithPassword()`.
* Reindirizzamento a `admin-dashboard.html` dopo il login.

## Pagina Dashboard Admin (`admin-dashboard.html`)
* **Protezione Accesso:** Se l'utente non è autenticato (`supabase.auth.getSession()`), reindirizzare immediatamente a `admin-login.html`.
* **Tabella Completa:** Mostra tutti i dati degli iscritti (inclusi Email e Telefono).
* **Funzionalità Management:**
  * **Cambio Stato:** Dropdown o bottone per passare lo stato da "In attesa" a "Confermata" o "Annullata".
  * **Edizione:** Modal per modificare nome, cognome, email o percorso in caso di errore dell'utente.
  * **Eliminazione:** Bottone con conferma per rimuovere iscrizioni duplicate.
* Bottone di **Logout** ben visibile.