# 🏃‍♂️ Romagna Wild Trail 2026 - Official Website

Sito web ufficiale e piattaforma di iscrizione per l'evento sportivo **Romagna Wild Trail 2026**, in programma il **22 Novembre 2026** a **Talamello (RN)**, nella splendida cornice della Valmarecchia.

Il progetto è realizzato con un'architettura **Jamstack** leggera, moderna e priva di framework pesanti, garantendo la massima velocità di caricamento, facilità di manutenzione e una perfetta resa responsive su qualsiasi dispositivo.

---

## 🎨 Design System & Visual Identity

Il design richiama l'energia e lo spirito "Wild" della corsa e del territorio:

* **Cyan / Azzurro Intenso (`--primary-blue`): `#00B4D8`** - Sfondi principali e sezioni dinamiche.
* **Verde Lime / Neon (`--accent-lime`): `#A2FF00`** - Badge, accenti visivi e dettagli per i percorsi.
* **Arancione Corsa (`--action-orange`): `#FF3B00`** - Call to Action principali (Pulsanti di iscrizione).
* **Blu Navy Scuro (`--dark-navy`): `#0B1B3D`** - Testi, footer e contrasti per una leggibilità ottimale.

---

## 🛠️ Tech Stack & Architettura

* **Frontend:** HTML5, CSS3 (Modern Flexbox/Grid, CSS Variables, Responsive), Vanilla JS (ES Modules & Classes).
* **Hosting Frontend:** [Netlify](https://www.netlify.com/) (Static Web Hosting).
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security + Supabase Auth per gli Admin).
* **Librerie CDN:** Supabase JS SDK (`@supabase/supabase-js`), FontAwesome (Icone), Swiper.js (Gallery).

---

## 📂 Struttura del Progetto

```text
/
├── assets/
│   ├── css/
│   │   ├── main.css           # Variabili CSS, reset e stili globali
│   │   ├── navbar.css         # Componente Header e Menu Responsive
│   │   ├── components.css     # Buttons, Cards, Modali e Badge
│   │   └── pages/             # Stili dedicati (es. admin.css, form.css)
│   ├── js/
│   │   ├── config/
│   │   │   └── supabase.js    # Inizializzazione del client Supabase
│   │   ├── services/
│   │   │   ├── authService.js # Autenticazione e gestione sessione Admin
│   │   │   └── dbService.js   # Interrogazioni CRUD Iscrizioni
│   │   ├── components/
│   │   │   ├── navbar.js      # Menu Hamburger e nav dinamica
│   │   │   └── footer.js      # Footer e contatti
│   │   └── pages/             # JS specifico per pagina (form, admin, iscritti)
│   └── images/
│       ├── logo.png           # Logo RWR
│       └── gallery2025/       # Foto dell'edizione precedente
├── index.html                 # Vetrina / Home Page
├── regolamento.html           # Info, Percorsi (5K, 9K, 15K) e Regolamento
├── iscrizione.html            # Form d'Iscrizione online
├── iscritti.html               # Elenco Pubblico degli Iscritti
├── gallery.html                # Album fotografico
├── admin-login.html           # Login riservato agli organizzatori
├── admin-dashboard.html       # Pannello Amministrativo (Gestione stato/dati)
├── ARCHITECTURE.md            # Documento d'Architettura Tecnica
├── README.md                  # Questo file
└── tasks/                     # Task dettagliati per agenti AI