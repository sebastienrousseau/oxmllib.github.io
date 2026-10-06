---
name: "oxml"
short_name: "OXML"
title: "Serveur de Langage (oxml-lsp) — oxml"
description: "Diagnostics XML en temps réel, validation de schéma et complétion dans votre éditeur."
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
translation_key: "lsp"
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
headline: "oxml-lsp — Serveur de Langage XML"
lead: "Diagnostics instantanés, complétion de schéma et validation XPath dans votre éditeur favori."
prev_href: "/fr/wasm/"
prev_label: "WebAssembly"
next_href: "/fr/schema/"
next_label: "Schéma XML"
toc_1: "Installation"
toc_1_id: "install"
toc_2: "Configuration Éditeur"
toc_2_id: "editors"
toc_3: "Fonctionnalités"
toc_3_id: "capabilities"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: " aria-current=\"page\""
cur_schema: ""
cur_arch: ""
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

## Installation

Installez `oxml-lsp` depuis crates.io :

```bash
cargo install oxml-lsp
```

## Configuration Éditeur

Configurez votre éditeur pour associer `oxml-lsp` aux fichiers `.xml` :

### Neovim (nvim-lspconfig)

```lua
require'lspconfig'.oxml_lsp.setup{
  cmd = { "oxml-lsp" },
  filetypes = { "xml", "xsd", "svg" },
}
```

### VS Code & Zed

Déclarez `oxml-lsp` comme binaire serveur pour les fichiers XML dans vos préférences.

## Fonctionnalités

- **Diagnostics à la frappe :** Détection instantanée des balises non fermées et erreurs de syntaxe.
- **Survol informatif :** Affichage de la documentation des balises et types d'attributs.
- **Formatage à l'enregistrement :** Réindentation déterministe et soignée.
