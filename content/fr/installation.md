---
name: "oxml"
short_name: "OXML"
title: "Installation & Configuration — oxml"
description: "Installez oxml pour Rust, le binaire CLI oxml-cli, le paquet WebAssembly ou le serveur MCP."
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
translation_key: "install"
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
headline: "Installation & Démarrage Rapide"
lead: "Commencez avec oxml dans vos projets Rust, environnements CLI, navigateurs et flux de travail IA."
prev_href: "/fr/"
prev_label: "Accueil"
next_href: "/fr/cli/"
next_label: "Outil CLI"
toc_1: "Configuration Cargo"
toc_1_id: "cargo"
toc_2: "Drapeaux de Fonctionnalités"
toc_2_id: "features"
toc_3: "Outils Satellites"
toc_3_id: "satellites"
cur_install: " aria-current=\"page\""
cur_cli: ""
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

## Configuration Cargo

Ajoutez `oxml` à votre fichier `Cargo.toml` :

```toml
[dependencies]
oxml = "0.0.10"
```

Ou installez-le directement via la ligne de commande Cargo :

```bash
cargo add oxml
```

`oxml` supporte les environnements `no_std` avec allocation dynamique (`alloc`).

## Drapeaux de Fonctionnalités

Personnalisez le comportement d'exécution avec les fonctionnalités optionnelles :

| Fonctionnalité | Description | Dépendances |
| :
--- | :
--- | :
--- |
| `async` | Lecteur de flux non-bloquant pour `tokio::io::AsyncBufRead` | `tokio` |
| `tracing` | Spans de diagnostic OpenTelemetry et Tokio | `tracing` |
| `serde` | Sérialisation et désérialisation intégrées | `serde` |

Activez les fonctionnalités souhaitées dans votre manifeste :

```toml
[dependencies]
oxml = { version = "0.0.10", features = ["async", "tracing"] }
```

## Outils Satellites

Installez les outils spécialisés de l'écosystème synchronisé `oxml` :

- **Outil en ligne de commande :** `cargo install oxml-cli`
- **Module WebAssembly :** `npm install @oxml/wasm`
- **Serveur MCP pour agents IA :** `cargo install oxml-mcp`
- **Validateur de Schéma XML :** `cargo add xmlschema`
