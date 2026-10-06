---
name: "oxml"
short_name: "OXML"
title: "Architecture Zéro Unsafe — oxml"
description: "Sous le capot : comment oxml garantit la sécurité mémoire, l'arène générationnelle et l'accélération SWAR."
keywords: "parseur rust xml, xpath 1.0, oxml, zero code unsafe, schema xml, webassembly xml, mcp xml"
author: "Sebastien Rousseau"
date: "2026-10-04"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "architecture"
locale_path: "/fr/"
base_path: "/"
en_current: ""
fr_current: " aria-current=\"true\""
slug_install: "installation"
slug_cli: "cli"
slug_xpath: "xpath"
slug_wasm: "wasm"
slug_mcp: "mcp"
slug_lsp: "lsp"
slug_schema: "schema"
slug_arch: "architecture"
slug_conformance: "conformance"
slug_a11y: "accessibility"
label_skip: "Passer au contenu principal"
label_menu: "Menu"
label_nav: "Principal"
label_langs: "Langue"
label_theme: "Thème"
label_theme_system: "Système"
label_theme_light: "Clair"
label_theme_dark: "Sombre"
label_docs: "Documentation"
label_footer_nav: "Documentation"
label_made_with: "Créé avec SSG"
label_docs_nav: "Sections de documentation"
label_crumbs: "Fil d'Ariane"
label_pager: "Page"
label_prev: "Précédent"
label_next: "Suivant"
label_toc: "Sur cette page"
nav_home: "Accueil"
nav_install: "Installation"
nav_cli: "Outil CLI"
nav_xpath: "XPath 1.0"
nav_wasm: "WebAssembly"
nav_mcp: "Serveur MCP"
nav_lsp: "Serveur de langage"
nav_schema: "Schéma XML"
nav_arch: "Architecture"
nav_conformance: "Conformité"
nav_a11y: "Accessibilité"
nav_migrate_lxml: "Migration depuis lxml"
nav_migrate_roxmltree: "Migration depuis roxmltree"
nav_cookbook: "Livre de recettes"
nav_playground: "Bac à sable"
nav_compare: "Comparatif des bibliothèques"
nav_benchmarks: "Benchmarks"
nav_security: "Sécurité"
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Documentation"
headline: "Architecture Zéro Unsafe"
lead: "Conçu pour la sécurité mémoire maximale : `#![forbid(unsafe_code)]`, arène DOM et balayage SWAR."
prev_href: "/fr/schema/"
prev_label: "Schéma XML"
next_href: "/fr/compare/"
next_label: "Comparatif des bibliothèques"
toc_1: "Règle Zéro Unsafe"
toc_1_id: "zero-unsafe"
toc_2: "Allocation en Arène"
toc_2_id: "arena"
toc_3: "Accélération SWAR"
toc_3_id: "swar"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: " aria-current=\"page\""
cur_conformance: ""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
cur_cookbook: ""
cur_playground: ""
cur_compare: ""
cur_benchmarks: ""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Règle Zéro Unsafe

`oxml` applique strictement `#![forbid(unsafe_code)]` à la racine de tous les crates de l'espace de travail. Zéro exception :

- Zéro arithmétique de pointeurs bruts
- Zéro transmute non vérifié
- Zéro accès non contrôlé aux tranches

Toutes les vérifications de bornes sont garanties au niveau du compilateur.

## Allocation en Arène

`oxml::Document` repose sur une arène de nœuds à recyclage générationnel :

- **Accès O(1) :** Les nœuds sont référencés par des identifiants `NodeId` compacts et copiables.
- **Recyclage Générationnel :** Les suppressions incrémentent un compteur de génération, évitant toute corruption de mémoire.
- **Localité de Cache :** Stockage contigu en mémoire maximisant l'efficacité des caches L1/L2 du processeur.

## Accélération SWAR

Le balayage rapide de délimiteurs s'appuie sur la technique SWAR (SIMD Within A Register) par blocs de 8 octets, doublant le débit sans aucune instruction unsafe.

## Architecture de l'Écosystème

L'écosystème `oxml` est articulé en crates découplés partageant le même cœur sécurisé :

<figure class="diagram-card">
  <svg viewBox="0 0 800 400" width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="arch-diag1-fr-title arch-diag1-fr-desc">
    <title id="arch-diag1-fr-title">Diagramme d'Architecture de l'Écosystème oxml</title>
    <desc id="arch-diag1-fr-desc">Diagramme illustrant le moteur central oxml (Analyseur, DOM, XPath 1.0) se ramifiant en six crates d'intégrations et outils : oxml-cli, oxml-wasm, oxml-mcp, oxml-lsp, oxml-json et xmlschema.</desc>
    <defs>
      <marker id="arrow-fr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ink-soft)" />
      </marker>
    </defs>
    <!-- Background Frame for Toolchain -->
    <rect x="20" y="160" width="760" height="220" rx="12" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="40" y="188" font-family="var(--sans)" font-size="12" font-weight="700" letter-spacing="0.06em" fill="var(--ink-muted)">INTÉGRATIONS &amp; OUTILS</text>
    <!-- Core Engine Box -->
    <rect x="250" y="24" width="300" height="84" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2" />
    <text x="400" y="50" font-family="var(--sans)" font-size="11" font-weight="700" letter-spacing="0.08em" fill="var(--accent)" text-anchor="middle">CŒUR SÉCURISÉ</text>
    <text x="400" y="74" font-family="var(--mono)" font-size="18" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml</text>
    <text x="400" y="94" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Analyseur · DOM Générationnel · XPath 1.0</text>
    <!-- Trunk Line & Distributor -->
    <line x1="400" y1="108" x2="400" y2="135" stroke="var(--ink-soft)" stroke-width="2" />
    <line x1="150" y1="135" x2="650" y2="135" stroke="var(--ink-soft)" stroke-width="2" />
    <!-- Drops to Row 1 -->
    <line x1="150" y1="135" x2="150" y2="204" stroke="var(--ink-soft)" stroke-width="2" marker-end="url(#arrow-fr)" />
    <line x1="400" y1="135" x2="400" y2="204" stroke="var(--ink-soft)" stroke-width="2" marker-end="url(#arrow-fr)" />
    <line x1="650" y1="135" x2="650" y2="204" stroke="var(--ink-soft)" stroke-width="2" marker-end="url(#arrow-fr)" />
    <!-- Drop lines to Row 2 -->
    <line x1="150" y1="265" x2="150" y2="294" stroke="var(--ink-soft)" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-fr)" />
    <line x1="400" y1="265" x2="400" y2="294" stroke="var(--ink-soft)" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-fr)" />
    <line x1="650" y1="265" x2="650" y2="294" stroke="var(--ink-soft)" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow-fr)" />
    <!-- Row 1 Cards -->
    <rect x="40" y="205" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="150" y="228" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-cli</text>
    <text x="150" y="248" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Terminal &amp; CI/CD</text>
    <rect x="290" y="205" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="400" y="228" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-wasm</text>
    <text x="400" y="248" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">WebAssembly Navigateur</text>
    <rect x="540" y="205" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="650" y="228" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-mcp</text>
    <text x="650" y="248" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">JSON-RPC Agents IA</text>
    <!-- Row 2 Cards -->
    <rect x="40" y="295" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="150" y="318" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-lsp</text>
    <text x="150" y="338" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Serveur de Langage IDE</text>
    <rect x="290" y="295" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="400" y="318" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-json</text>
    <text x="400" y="338" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Convertisseur JSON</text>
    <rect x="540" y="295" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="650" y="318" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">xmlschema</text>
    <text x="650" y="338" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Validation XSD W3C</text>
  </svg>
  <figcaption class="diagram-caption">Figure 1 : Architecture modulaire partageant le cœur sécurisé zéro-unsafe.</figcaption>
  <details class="diagram-details"><summary>Voir le code Mermaid</summary><pre class="highlight language-mermaid"><code class="language-mermaid">graph TD
  subgraph Core["Cœur Sécurisé"]
    OXML["oxml&lt;br/&gt;(Analyseur, DOM, XPath 1.0)"]
  end
  subgraph Toolchain["Intégrations &amp; Outils"]
    CLI["oxml-cli&lt;br/&gt;(Terminal &amp; CI/CD)"]
    WASM["oxml-wasm&lt;br/&gt;(WebAssembly Navigateur)"]
    MCP["oxml-mcp&lt;br/&gt;(JSON-RPC Agents IA)"]
    LSP["oxml-lsp&lt;br/&gt;(Serveur de Langage IDE)"]
    JSON["oxml-json&lt;br/&gt;(Convertisseur JSON)"]
    XSD["xmlschema&lt;br/&gt;(Validation XSD W3C)"]
  end
  OXML --&gt; CLI
  OXML --&gt; WASM
  OXML --&gt; MCP
  OXML --&gt; LSP
  OXML --&gt; JSON
  OXML --&gt; XSD</code></pre></details>
</figure>

## Emprunt en Flux Zéro-Copie

Pour les flux de données à très haut débit nécessitant l'élimination des allocations mémoire :

- `Reader::next_borrowed()` produit des événements `BorrowedEvent<'a>` qui empruntent directement les tranches de chaînes (`&str`) depuis le tampon interne.
- Nœuds de texte, noms de balises et attributs sont inspectés sans duplication sur le tas.
- Garantit une empreinte mémoire bornée à 34 Ko lors de l'ingestion de flux de plusieurs gigaoctets.

<figure class="diagram-card">
  <svg viewBox="0 0 800 370" width="800" height="370" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="arch-diag2-fr-title arch-diag2-fr-desc">
    <title id="arch-diag2-fr-title">Diagramme de Séquence de l'Emprunt en Flux Zéro-Copie</title>
    <desc id="arch-diag2-fr-desc">Diagramme de séquence illustrant le flux zéro-copie : le flux d'entrée remplit un tampon circulaire de 34 Ko, BorrowedEvent emprunte une tranche &amp;str sans allocation sur le tas, la logique applicative l'inspecte, puis le pointeur du tampon avance.</desc>
    <defs>
      <marker id="seq-arrow-fr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)" />
      </marker>
      <marker id="ret-arrow-fr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ink-muted)" />
      </marker>
    </defs>
    <!-- Lifelines -->
    <line x1="110" y1="70" x2="110" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <line x1="300" y1="70" x2="300" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <line x1="500" y1="70" x2="500" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <line x1="690" y1="70" x2="690" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <!-- Participant Boxes -->
    <rect x="25" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="110" y="42" font-family="var(--sans)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Flux d'Entrée</text>
    <text x="110" y="58" font-family="var(--mono)" font-size="11" fill="var(--ink-muted)" text-anchor="middle">Fichier/Socket Multi-Go</text>
    <rect x="215" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--accent)" stroke-width="1.5" />
    <text x="300" y="42" font-family="var(--sans)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Tampon Circulaire</text>
    <text x="300" y="58" font-family="var(--mono)" font-size="11" fill="var(--accent)" text-anchor="middle">Plafond Fixe 34 Ko</text>
    <rect x="415" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="500" y="42" font-family="var(--mono)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">BorrowedEvent&lt;&apos;a&gt;</text>
    <text x="500" y="58" font-family="var(--sans)" font-size="11" fill="var(--ink-muted)" text-anchor="middle">Tranche Directe &amp;str</text>
    <rect x="605" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="690" y="42" font-family="var(--sans)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Application</text>
    <text x="690" y="58" font-family="var(--sans)" font-size="11" fill="var(--ink-muted)" text-anchor="middle">Logique Métier</text>
    <!-- Step 1: Stream -> Ring Buffer -->
    <circle cx="110" cy="115" r="10" fill="var(--accent)" />
    <text x="110" y="119" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--accent-ink)" text-anchor="middle">1</text>
    <line x1="125" y1="115" x2="294" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#seq-arrow-fr)" />
    <text x="210" y="107" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Remplissage du bloc interne (E/S)</text>
    <!-- Step 2: Ring Buffer -> BorrowedEvent -->
    <circle cx="300" cy="165" r="10" fill="var(--accent)" />
    <text x="300" y="169" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--accent-ink)" text-anchor="middle">2</text>
    <line x1="315" y1="165" x2="494" y2="165" stroke="var(--accent)" stroke-width="2" marker-end="url(#seq-arrow-fr)" />
    <text x="405" y="157" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Emprunt de tranche (&amp;str, 0 allocation)</text>
    <!-- Step 3: BorrowedEvent -> Application -->
    <circle cx="500" cy="215" r="10" fill="var(--accent)" />
    <text x="500" y="219" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--accent-ink)" text-anchor="middle">3</text>
    <line x1="515" y1="215" x2="684" y2="215" stroke="var(--accent)" stroke-width="2" marker-end="url(#seq-arrow-fr)" />
    <text x="600" y="207" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Inspection Balise / Attribut / Texte</text>
    <!-- Step 4: Application -> Ring Buffer (Advance) -->
    <circle cx="690" cy="265" r="10" fill="var(--ink-muted)" />
    <text x="690" y="269" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--bg)" text-anchor="middle">4</text>
    <line x1="675" y1="265" x2="306" y2="265" stroke="var(--ink-muted)" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#ret-arrow-fr)" />
    <text x="490" y="257" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink-muted)" text-anchor="middle">Libération de la tranche &amp; avance du pointeur</text>
    <!-- Memory Cap Banner -->
    <rect x="180" y="315" width="440" height="34" rx="6" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="400" y="337" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Zéro Allocation sur le Tas · Empreinte Mémoire Bornée à 34 Ko</text>
  </svg>
  <figcaption class="diagram-caption">Figure 2 : Séquence d'emprunt en flux continu avec tampon borné à 34 Ko.</figcaption>
  <details class="diagram-details"><summary>Voir le code Mermaid</summary><pre class="highlight language-mermaid"><code class="language-mermaid">sequenceDiagram
  autonumber
  participant Stream as Flux d'Entrée (Multi-Go)
  participant Ring as Tampon Circulaire 34 Ko
  participant Event as BorrowedEvent (&amp;str)
  participant App as Logique Applicative
  Stream-&gt;&gt;Ring: Remplissage du bloc interne
  Ring-&gt;&gt;Event: Emprunt de tranche sans allocation
  Event-&gt;&gt;App: Inspection Balise / Attribut / Texte
  App--&gt;&gt;Ring: Libération de la tranche &amp; avance du pointeur</code></pre></details>
</figure>

