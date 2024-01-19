# PRIMO RILASCIO

## Database

- Articoli: a se stanti
  - [ ] immagini nel bucket (emanuele)
- News: a se stanti
  - [ ] immagini nel bucket (emanuele)
- Scraped: a se stanti
- Live e video:
  - sono solo dei link a youtube caricati su database
  - [x(ancora da collegare)] Può essere collegato a un responsible, (tabella live_responsibles) (emanuele)
- Responsibles
  - legato a una organizzazione (id_organizzazione)
- Organizzazione: a sé stante
- Eventi
  - legato a una organizzazione

## pagine del sito:

- [x] Chabad (arriva da elia?)
- Tutti gli articoli (no filtri per rilascio)
  - [ ] paginazione (simone)
- Singolo articolo
  - [x] altri articoli con link (emanuele)
  - [x] vai a tutti gli articoli (emanuele)
- Tutte le news
  - [ ] paginazione (emanuele)
- Singola news
  - [ ] altre news con link (emanuele)
  - [ ] vai a tutte le news (emanuele)
  - [ ] markdown con mdx (simone)
- tutte le Live e video
  - [x] paginazione (emanuele)
  - [ ] apri link in una nuova scheda (emanuele)
  - [ ] sezione JIMTv
    - [ ] funzionalità (simone)
    - [ ] design (emanuele)
- Tutte le organizzazioni
  - [ ] mostrare contatti : social con icone + telefono, mail, iban (simone con emanuele)
  - [x] aggiunger link a singola organizzazione (emanuele)
- Singola organizzazione
  - [x/2] collegare a db (compresi eventi e responsabili) (emanuele)
  - [ ] contatti deve scorrere ai contatti (simone con emanuele)
  - [ ] mostrare contatti : social con icone + telefono, mail, iban (emanuele)
  - [ ] markdown con mdx (simone)
- contribute
  - tutte le organizzazioni con un link di donazione
  - [ ] collegare al database (compresi i responsabili) (emanuele)
  - [ ] link che manda alla donazione (target=\_blank) (emanuele)
  - [ ] link che manda alla organizzazione (emanuele)
- [ ] contatti manda al footer (emanuele)

## Altri

- [ ] tutti i link tutto il sito (emanuele)
- [ ] newsletter (simone)
- [ ] tasto share (simone)
- [ ] SEO e opengraph e JSON-LD (boh)
  - [ ] hreflang (simone)
- [ ] editor articoli (simone)
- [ ] i18n (simone)
  - [ ] aggiungere colonna translations jsonb
  - [ ] creare funzione translationMapper()
- [ ] singola funzione per il parsing del markdown (simone)
- [ ] bug fix scraper (simone)
- [ ] feed rss jimtv (simone)

## Nuovi

HEADER (DESKTOP)

- [x] Button contattaci, manca href (eh)
- [x] Button newsletter, manca href (eh)
- [x] Non va il tasto delle lingue (st)
  - [x] sostituire tutti gli <a> con <Link> (eh) ===> FATTO SU TUTTO IL SITO
- [x] Togliere lingua ebraica finche non la si usa (eh)

HEADER (MOBILE)

- [x] Dropdown delle lingue non funziona (st)
  - [x] Sistemare ovunque c'è un elenco di lingue con il config
- [ ] Manca il cursor pointer sull'hamburger (eh)
- [x] Scegliere con cognizione le voci che compaiono/scompaiono sulla navbar mentre si ridimensiona (eh)
- [ ] sistemare la lente piccola in PageHeader

HOMEPAGE

- [ ] Mettere i contenuti live-video, dividendo quelli dalla jimtv da quelli caricati su database (st)
  - [ ] https://www.npmjs.com/package/rss-parser
- [x] Aggiungere href agli eventi, una volta estrapolato l'url (vedi punto "EVENTI") (eh)

NOTIZIE e [slug], ARTICOLI e [slug]

- [ ] Non va tasto share (st)
  - [ ] discutere come farlo (st, eh)
  - [ ] https://developers.facebook.com/docs/plugins/share-button/

LIVE-VIDEO

- [x] Abilitare visualizzazione video da youtube (eh)
  - [x] <div set:html={htmlCodeFromSupabase} class="[&>iframe]:bg-red-500"></div>
- [ ] Includere i video jimtv con feed rss (st)
- [x] Mettere in sidebar l'evento prossimo (eh)
- [x] Aggiungere graficamente sezione jim tv (eh)

PUNTI CHABAD

- [x] Mettere le icone social giuste alle card (eh)
- [x] Cambiare bottone delle card (eh)
- [ ] Aggiungere filtro città (st)
- [ ] Far comparire i responsible delle organizzazioni, se si ha un'idea di dove e come (st)

PUNTI CHABAD [SLUG]

- [ ] la ricerca è fatta in base alla città ma dovrebbe essere fatta in base alla provincia
  - aggiungere il campo provincia su db
  - modificare il filtro
  - eventualmente nel footer mostrare tutte le provincie trovate con una distinct
- [ ] controllare che i contatti siano collegati correttamente (st)
  - [ ] alcune cose non compaiono
- [ ] collegare markdown per descrizione, con possibilità di mettere immagini (e video?) (st)
- [ ] OrganizationSection da errore non compreso (st)

EVENTI

- [x] Cambiare icona bottone delle card (eh)
- [ ] Aggiungere filtro per città (st)


EVENTI [SLUG]

- [x] Far comparire i contatti dell'evento sulla sidebar (eh)

CONTRIBUISCI

- [ ] Far comparire i responsibles delle organizzazioni sulle card (st)
- [x] Aggiungere alla sidebar il prossimo evento (eh)

NEWSLETTER

- [ ] Rendere attiva newsletter e sua relativa form (st)

FOOTER

- [ ] Generare i termini e condizioni (eh)
- [ ] Collegare le sedi (città) alle organizzazioni relative nella pagina punti chabad (st)
- [x] Collegare i vari social di chabad.it e aggiungere i mancanti (eh)

- [ ] HEADER: sia sulla page, che sulla home, l'header dovrebbe comparire quando si scorre verso l'alto dal basso della pagina

- [x] DIFFERENZIARE SU DATABASE ARTICOLI E NEWS (TABELLE DIVERSE?)

SCRAPER (st)

- [ ] Scrapare gli articoli dai siti che ho messo tra le const di chabad.js
- [ ] Mettere gli articoli scrapati nella pagina delle world-news e sulla home
- [ ] Collegare il titolo della sezione della home alla pagina
- [ ] Non si vede l'immagine principale, in seguito alle modifiche fatte (new)

POPOLAMENTI (eh)

-[ ] Mettere città giuste per il filtro delle organizzazioni (disegnare il filtro nella pagina?)
-[ ] Popolare dati e foto delle organizzazioni e produrre markdown
-[ ] Fare degli articoli di partenza con markdown e scrivere qualche notizia
-[ ] Segnare i responsibles delle varie organizzazioni
-[ ] Cambiatre il campo telephone in phone dappertutto 

# POST RILASCIO

- [ ] Non va tasto ricerca, se si vuol fare (st)
  - [ ] fare prima la ui (eh)
