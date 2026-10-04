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
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Documentation"
headline: "Architecture Zéro Unsafe"
lead: "Conçu pour la sécurité mémoire maximale : `#![forbid(unsafe_code)]`, arène DOM et balayage SWAR."
prev_href: "/fr/schema/"
prev_label: "Schéma XML"
next_href: "/fr/conformance/"
next_label: "Conformité"
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
