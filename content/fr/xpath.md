---
name: "oxml"
short_name: "OXML"
title: "Moteur XPath 1.0 — oxml"
description: "Support complet de la spécification XPath 1.0 avec axes, fonctions et prédicats."
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
translation_key: "xpath"
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
headline: "Moteur d'Évaluation XPath 1.0"
lead: "Interrogez et parcourez des arbres XML avec une conformité totale et une optimisation poussée."
prev_href: "/fr/cli/"
prev_label: "Outil CLI"
next_href: "/fr/mcp/"
next_label: "Serveur MCP"
toc_1: "Syntaxe & Axes"
toc_1_id: "syntax"
toc_2: "Fonctions Standard"
toc_2_id: "functions"
toc_3: "API Rust"
toc_3_id: "api"
cur_install: ""
cur_cli: ""
cur_xpath: " aria-current=\"page\""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: ""
cur_a11y: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Syntaxe & Axes

`oxml` implémente l'intégralité de la spécification W3C XPath 1.0, y compris les 13 axes de navigation :

- `child::` et `descendant::`
- `parent::` et `ancestor::`
- `following-sibling::` et `preceding-sibling::`
- `attribute::` (ou `@attr`)
- `self::` et `descendant-or-self::` (ou `//`)

## Fonctions Standard

Support complet des bibliothèques de fonctions XPath 1.0 :

- **Fonctions de nœuds :** `count()`, `id()`, `local-name()`, `namespace-uri()`, `name()`
- **Fonctions de chaînes :** `string()`, `concat()`, `starts-with()`, `contains()`, `string-length()`, `normalize-space()`
- **Fonctions booléennes :** `boolean()`, `not()`, `true()`, `false()`
- **Fonctions numériques :** `number()`, `sum()`, `floor()`, `ceiling()`, `round()`

## API Rust

Évaluez des requêtes directement en Rust :

```rust
use oxml::{Document, Value};

let xml = r#"<store><book price="20"/><book price="40"/></store>"#;
let doc = Document::parse(xml)?;

let books = doc.select("//book[@price > 25]")?;
assert_eq!(books.len(), 1);

let total: f64 = doc.eval_number("sum(//book/@price)")?;
assert_eq!(total, 60.0);
```

## Optimisations de Performance

- **Prédicats Entiers O(1) :** Évaluation instantanée en temps constant pour les prédicats numériques indexés (ex. `//item[1]`, `//row[5]`), évitant l'évaluation complète d'arbres d'expressions.
- **Parcours d'Axes Optimisé :** Itération directe au sein de l'arène pour les axes usuels (`child::`, `descendant-or-self::` / `//`), réduisant les allocations et les défauts de prédiction de branchement.
