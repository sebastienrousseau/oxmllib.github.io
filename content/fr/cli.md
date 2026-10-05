---
name: "oxml"
short_name: "OXML"
title: "Interface en Ligne de Commande (oxml-cli) — oxml"
description: "Interrogez, validez, formatez et filtrez des documents XML depuis le terminal."
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
translation_key: "cli"
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
headline: "oxml-cli — Outil XML en Ligne de Commande"
lead: "Exécutez des requêtes XPath, validez des documents et traitez des flux XML dans votre terminal."
prev_href: "/fr/installation/"
prev_label: "Installation"
next_href: "/fr/xpath/"
next_label: "XPath 1.0"
toc_1: "Installation"
toc_1_id: "install"
toc_2: "Requêtes XPath"
toc_2_id: "querying"
toc_3: "Pipelines & CI"
toc_3_id: "piping"
cur_install: ""
cur_cli: " aria-current=\"page\""
cur_xpath: ""
cur_wasm: ""
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

Installez `oxml-cli` avec Cargo :

```bash
cargo install oxml-cli
```

Vérifiez l'installation :

```bash
oxml --version
```

## Requêtes XPath

Exécutez des expressions XPath 1.0 directement sur des fichiers XML :

```bash
# Extraire les titres de livres disponibles
oxml query '//book[@available="true"]/title' catalog.xml

# Compter les éléments correspondants
oxml query --count '//item' feed.xml

# Formater les résultats au format JSON
oxml query --json '//record' data.xml
```

## Pipelines & CI

Validez la structure et intégrez oxml dans vos scripts Unix et pipelines d'intégration continue :

```bash
# Vérifier la conformité syntaxique
oxml check document.xml

# Traiter un flux réseau en direct
curl -s https://example.com/rss.xml | oxml query '//item[1]/title'
```
