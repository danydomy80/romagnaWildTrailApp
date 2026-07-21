
# TASK 4: Form Iscrizione ed Elenco Pubblico Iscritto

## Obiettivo
Sviluppare la pagina di iscrizione e la tabella pubblica degli iscritti collegata a Supabase.

## 1.a Pagina Iscrizione (`iscrizione.html`)
Form responsivo con campi:
* **Nome** (text, required)
* **Cognome** (text, required)
* **Data di Nascita** (date, required)
* **Email** (email, required)
* **Telefono** (tel)
* **Squadra / Team** (text)
* **Percorso / Categoria** (select/radio, required):
  * `5K (+300m D+)`
  * `9K (+500m D+)`
  * `15K (+700m D+)`
* **Modalità di Pagamento** (select, required):
  * `Satispay`
  * `Bonifico Bancario`
* **Checkbox Obbligatoria:** Accettazione regolamento e idoneità fisica.

## 1.b Pagina Iscrizione (`iscrizione.html`)
* **Validazione:** Validazione HTML5 + controlli JS prima dell'invio.
* **Logica JS (`assets/js/pages/form.js`):**
  * Alla sottomissione, inviare i dati a Supabase tramite `supabase.from('registrations').insert(...)`.
  * Mostrare un feedback di successo/errore visivo pulito senza ricaricare la pagina.

## 2. Pagina Elenco Pubblico (`iscritti.html`)
* Tabella/Card che preleva i dati da Supabase.
* **Campi mostrati pubblicamente:** Nome, Cognome, Squadra, Percorso (5K/9K/15K), Stato Pagamento (`In Attesa` [Giallo], `Confermato` [Verde]).
* *Nota:* Nascondere Email, Telefono e Data di nascita per privacy.
* Campo di ricerca rapida JS per cercare per Nome, Cognome, Squadra, Percorso.