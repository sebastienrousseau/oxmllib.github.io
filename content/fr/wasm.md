---
name: "oxml"
short_name: "OXML"
title: "WebAssembly & Navigateur (oxml-wasm) — oxml"
description: "Analyse XML haute performance et requêtes XPath dans les navigateurs et Node.js."
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
translation_key: "wasm"
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
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Documentation"
headline: "oxml-wasm — Moteur XML WebAssembly"
lead: "Une alternative sûre et moderne au DOMParser du navigateur avec zéro fuite mémoire."
prev_href: "/fr/mcp/"
prev_label: "Serveur MCP"
next_href: "/fr/lsp/"
next_label: "Serveur de langage"
toc_1: "Installation"
toc_1_id: "install"
toc_2: "Utilisation JavaScript"
toc_2_id: "usage"
toc_3: "Avantages Mémoire"
toc_3_id: "memory"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: " aria-current=\"page\""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: ""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
cur_cookbook: ""
cur_playground: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Installation

Installez via npm ou yarn :

```bash
npm install @oxml/wasm
```

## Utilisation JavaScript

Utilisez `oxml-wasm` dans Node.js ou les modules ES du navigateur :

```javascript
import { Document } from '@oxml/wasm';

const xml = `
  <catalog>
    <product sku="A100"><name>Widget</name><price>19.99</price></product>
    <product sku="B200"><name>Gadget</name><price>29.99</price></product>
  </catalog>
`;

const doc = Document.parse(xml);
const results = doc.select("//product[price < 25]/name");
console.log(results[0].textContent); // Widget
```

## Avantages Mémoire

Contrairement au `DOMParser` natif du navigateur, qui peut générer des cycles de références complexes, `oxml-wasm` fonctionne dans un tampon mémoire linéaire déterministe avec désallocation immédiate.
