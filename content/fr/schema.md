---
name: "oxml"
short_name: "OXML"
title: "Validation de Schéma XML (xmlschema) — oxml"
description: "Bibliothèque de validation W3C XML Schema (XSD) 1.0 avec zéro code unsafe."
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
translation_key: "schema"
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
headline: "xmlschema — Validateur XSD 1.0"
lead: "Moteur de validation XML Schema rigoureux pour pipelines de données critiques."
prev_href: "/fr/lsp/"
prev_label: "Serveur de langage"
next_href: "/fr/architecture/"
next_label: "Architecture"
toc_1: "Installation"
toc_1_id: "install"
toc_2: "Exemple de Validation"
toc_2_id: "example"
toc_3: "Types Reconnus"
toc_3_id: "types"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: " aria-current=\"page\""
cur_arch: ""
cur_conformance: ""
cur_a11y: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Installation

Ajoutez `xmlschema` à vos dépendances :

```toml
[dependencies]
xmlschema = "0.0.10"
```

## Exemple de Validation
 
Validez vos documents XML contre des schémas XSD officiels :

```rust
use xmlschema::{parse_schema, validate};

let xsd = std::fs::read_to_string("schema.xsd")?;
let schema = parse_schema(&xsd)?;

let xml = std::fs::read_to_string("document.xml")?;
let doc = oxml::parse(&xml)?;
let report = validate(&doc, &schema);

if report.is_valid() {
    println!("Document strictement valide !");
} else {
    for violation in &report.violations {
        eprintln!("Erreur de validation : {violation}");
    }
}
```

## Types Reconnus & Facettes

- **Types simples :** string, integer, decimal, boolean, dateTime, date, anyURI, hexBinary, base64Binary
- **Types complexes :** sequences, choices, all, déclarations d'attributs
- **Facettes de restriction :** minInclusive, maxInclusive, minExclusive, maxExclusive, length, minLength, maxLength, pattern (moteur regex dédié), enumeration
- **Comparaisons dans l'espace des valeurs :** les énumérations comparent selon l'espace des valeurs (ex. `true` et `1`, formatage numérique, insensibilité à la casse pour `hexBinary`)
- **Longueur binaire :** calcul de longueur en octets pour `xs:hexBinary` et `xs:base64Binary`
- **Conformité W3C :** **95,2 % de réussite** sur 35 942 tests tranchés (34 226 réussites, 0 panique) sur la suite W3C XSD de 39 420 tests.
