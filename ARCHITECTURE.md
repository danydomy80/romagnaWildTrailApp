# Architettura del Progetto - Romagna Wild Trail 2026

## 1. Visione Generale
Sito web ufficiale per l'evento sportivo "Romagna Wild Trail" che si terrà il 22 Novembre 2026 a Talamello (RN).
Sito responsive, performante, sviluppato in HTML5, CSS3 (con palette personalizzata basata sulla brand identity) e Vanilla JS con moduli ES.

## 2. Tech Stack
* **Frontend:** HTML5, CSS3 (Flexbox/Grid, CSS Variables, Responsive), Vanilla JS (ES Modules & Classes).
* **Hosting Frontend:** Netlify (Deploy via Drag & Drop o Git).
* **Backend & Database:** Supabase (PostgreSQL + Supabase Auth per l'Admin).
* **Librerie esterne (via CDN):** Supabase JS SDK (`@supabase/supabase-js`), FontAwesome (icone), Swiper.js (per la gallery/slider).

## 3. Design System & Style Guide
* **Colori Principali:**
  * `--primary-blue`: `#00B4D8` (Background sfumato, header)
  * `--accent-lime`: `#A2FF00` (Badge, bottoni secondari, fulmini/dettagli)
  * `--action-orange`: `#FF3B00` (CTA Iscrizione, evidenziatori)
  * `--dark-navy`: `#0B1B3D` (Testo principale, footer)
* **Font consigliato:** Sans-serif d'impatto e moderno (es. `Montserrat` o `Oswald` per i titoli, `Inter` o `Roboto` per i testi).

## 4. Schema Database (Supabase PostgreSQL)
Tabella `registrations`:
* `id` (uuid, primary key)
* `created_at` (timestamptz)
* `first_name` (text, not null)
* `last_name` (text, not null)
* `birth_date` (date, not null)
* `email` (text, not null)
* `phone` (text)
* `team` (text)
* `category_event` (text, not null) -> Opzioni: "5K (+300m)", "9K (+500m)", "15K (+700m)"
* `payment_method` (text, not null) -> Opzioni: "Satispay", "Bonifico", "Cassa / In Loco"
* `status` (text, default: 'in_attesa') -> Opzioni: "in_attesa", "confermata", "annullata"
* `notes` (text)

Vista Pubblica `public_iscritti` (WITH security_invoker = true per la pagina `iscritti.html`):
* `first_name`, `last_name`, `team`, `category_event`, `payment_method`, `status`

## 5. Struttura delle Directory
```text
/
├── assets/
│   ├── css/
│   │   ├── main.css           # Stili globali, variabili, reset
│   │   ├── navbar.css         # Stili componenti
│   │   ├── components.css     # Button, Card, Modal, ecc.
│   │   └── pages/             # Stili specifici per pagina (es. admin.css)
│   ├── js/
│   │   ├── config/
│   │   │   └── supabase.js    # Inizializzazione client Supabase
│   │   ├── services/
│   │   │   ├── authService.js # Gestione Login/Logout Admin
│   │   │   └── dbService.js   # Interrogazioni CRUD Iscrizioni
│   │   ├── components/
│   │   │   ├── navbar.js      # Rendering/gestione menu responsive
│   │   │   └── footer.js      # Rendering footer
│   │   └── pages/             # JS specifico per pagina (es. form.js, admin.js)
│   └── images/
│       ├── logo.png
│       └── gallery2025/       # Foto evento 2025
├── index.html                 # Vetrina / Home
├── regolamento.html           # Info e Regolamento
├── iscrizione.html            # Form Iscrizione
├── iscritti.html               # Elenco Pubblico Iscriti
├── gallery.html                # Album foto 2025
├── admin-login.html           # Login per gli amministratori
├── admin-dashboard.html       # Pannello di controllo riservato
├── ARCHITECTURE.md
└── tasks/                     # File Task per agenti AI