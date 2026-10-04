---
name: "oxml"
short_name: "OXML"
title: "Accessibilité & WCAG AAA — oxml"
description: "Standards d'accessibilité WCAG 2.2 AAA, contrastes rigoureux et navigation clavier."
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
translation_key: "a11y"
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
headline: "Accessibilité & WCAG AAA"
lead: "Conçu avec le thème Lucid : contraste AAA vérifié, navigation clavier et repères sémantiques."
prev_href: "/fr/conformance/"
prev_label: "Conformité"
next_href: "/fr/"
next_label: "Accueil"
toc_1: "WCAG 2.2 AAA"
toc_1_id: "wcag"
toc_2: "Navigation Clavier"
toc_2_id: "keyboard"
toc_3: "Reflux Réactif"
toc_3_id: "reflow"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: ""
cur_a11y: " aria-current=\"page\""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## WCAG 2.2 AAA

Le site de documentation utilise le thème **Lucid** et respecte les normes d'accessibilité les plus exigeantes :

- **Contraste de Texte (1.4.6 AAA) :** Tous les textes atteignent un ratio de contraste d'au moins **7:1**.
- **Contraste Non-Textuel (1.4.11) :** Les bordures interactives et indicateurs de focus atteignent au moins **4.5:1**.
- **Taille de Cible (2.5.5 AAA) :** Tous les boutons et liens respectent une zone tactile d'au moins 44x44 pixels.

## Navigation Clavier

- **Lien d'évitement :** Accès direct au contenu principal dès la première tabulation.
- **Anneau de focus visible :** Contour net de 3px sur tous les éléments actifs.
- **Ordre logique :** Rôles sémantiques clairs (`header`, `nav`, `main`, `aside`, `footer`).

## Reflux Réactif

- **Affichage à 320px (1.4.10) :** Reflux complet sans défilement horizontal à 320px de largeur ou à 200% de zoom.
