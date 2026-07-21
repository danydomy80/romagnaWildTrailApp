
# TASK 2: Layout Base, Navbar, Footer e Home Page (Romagna Wild Trail)

## Obiettivo
Creare l'interfaccia principale del sito web con lo stile dinamico del "Romagna Wild Trail" (Talamello, 22 Novembre 2026).

## Specifiche Grafiche e Contenuti
1. **Hero Section:**
   * Titolo: **ROMAGNA WILD TRAIL**
   * Sottotitolo/Luogo: **TALAMELLO (RN) - 22 NOVEMBRE 2026 - ORE 09:00**
   * Descrizione: *"La varietà di questo splendido territorio, che alterna dolci colline a rilievi montuosi nella natura rigogliosa della Valmarecchia."*
   * Bottoni CTA:
     * **[ ISCRIVITI ORA ]** (colore Arancione `#FF3B00`, porta a `iscrizione.html`)
     * **[ INFO & REGOLAMENTO ]** (trasparente con bordo Lime `#A2FF00`, porta a `regolamento.html`)

2. **Sezione Distanze & Categorie:**
   3 Card traslucide/moderne con i percorsi:
   * **5K** | Dislivello: +300m | Categorie: Camminata ludico-motoria / Trekking
   * **9K** | Dislivello: +500m | Categorie: Trail & Trekking
   * **15K** | Dislivello: +700m | Categorie: Trail non competitivo

3. **Footer:**
   * Logo RWR, Patrocinio UISP Rimini.
   * Contatti rapidi: WhatsApp (`3517077545`), Facebook (`Romagna WILD RACE - RWR`).
   * Link discreto al Login Admin (`admin-login.html`).

## Specifiche Tecniche Frontend
* Usare le CSS Variables definite in ARCHITECTURE.md (--primary-blue, --accent-lime, --action-orange, --dark-navy).
* Includere un file JS `assets/js/components/navbar.js` per gestire l'apertura/chiusura del menu hamburger su dispositivi mobile.