---
name: "oxml"
short_name: "OXML"
title: "Conformité W3C & Benchmarks — oxml"
description: "Tests rigoureux face à la suite officielle W3C XML et mesures de performances comparatives."
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
translation_key: "conformance"
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
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Documentation"
headline: "Conformité W3C & Benchmarks"
lead: "Validé face aux suites officielles W3C XML et évalué pour le débit de streaming et d'arborescence."
prev_href: "/fr/architecture/"
prev_label: "Architecture"
next_href: "/fr/accessibility/"
next_label: "Accessibilité"
toc_1: "Suite W3C"
toc_1_id: "w3c"
toc_2: "Mesures de Débit"
toc_2_id: "benchmarks"
toc_3: "Empreinte Mémoire"
toc_3_id: "memory"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: " aria-current=\"page\""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Suite W3C XML

`oxml` intègre la suite officielle de conformité W3C XML (`xmlts20130923`) dans ses tests continus :

- Téléchargement et vérification automatisés des cas de test XML 1.0.
- Validation de la syntaxe, de l'expansion d'entités et des encodages (UTF-8, UTF-16).
- Rejet systématique des documents non conformes avec localisation précise des erreurs.

## Conformité W3C XML Schema (XSD)

`xmlschema` est vérifié en continu contre la suite officielle de tests W3C XML Schema (`xsts-2007-06-20`), vérifiée par empreinte SHA-256 :

- **39 420 cas de test au total** exécutés sous CI en mode release.
- **95,2 % de réussite** sur 35 942 tests tranchés (34 226 réussites, 1 716 échecs, 0 panique).
- **91,2 % de couverture globale de la suite** avec cliquet anti-régression strict.

## Mesures de Débit

Débit d'analyse de flux mesuré avec Criterion sur des jeux de données réels (10 Mo) :

| Moteur | Sécurité | Débit (Mo/s) | Vitesse Relative |
| :
--- | :
--- | :
--- | :
--- |
| **`oxml (SWAR)`** | **100% Sûr** | **680 Mo/s** | **1.0x (Référence)** |
| `quick-xml` | Mode sûr | 455 Mo/s | 0.67x |
| `roxmltree` | DOM sûr | 310 Mo/s | 0.46x |

## Empreinte Mémoire

Le recyclage d'arène borne l'utilisation mémoire même en cas de modifications massives de l'arbre, évitant la fragmentation de l'allocateur.
