---
name: "oxml"
short_name: "OXML"
title: "Migration depuis roxmltree vers oxml — oxml"
description: "Comment évoluer de roxmltree vers oxml : XPath 1.0 complet, DOM en arène mutable et validation W3C XML Schema."
keywords: "migration roxmltree oxml, alternative roxmltree rust, xml mutable rust, xpath rust, xml pur rust"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "migrate-roxmltree"
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
footer_note: "Boîte à outils XML purement Rust sans aucun code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Guide de Migration"
headline: "Migration depuis roxmltree vers oxml"
lead: "Conservez une sécurité 100% Rust tout en débloquant XPath 1.0, les mutations du DOM, la validation XSD et un écosystème d'outils unifié."
prev_href: "/fr/migrate-lxml/"
prev_label: "Migration depuis lxml"
next_href: "/fr/accessibility/"
next_label: "Accessibilité"
toc_1: "Pourquoi évoluer ?"
toc_1_id: "pourquoi-evoluer"
toc_2: "Comparatif des Capacités"
toc_2_id: "comparatif-capacites"
toc_3: "Migration du Code"
toc_3_id: "migration-code"
cur_install: ""
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
cur_migrate_roxmltree: " aria-current=\"page\""
form_origin: "https://oxmllib.com"
screenshot_alt: "Le site de documentation oxml montrant la navigation, des exemples de code et des guides d'architecture."
---

## Pourquoi évoluer ?

`roxmltree` est un analyseur XML en lecture seule très apprécié dans la communauté Rust pour son strict respect de `#![forbid(unsafe_code)]`. Cependant, de nombreux projets se heurtent à ses limites fonctionnelles :

1. **La Limite du Lecture-Seule :** `roxmltree` ne permet pas de modifier des nœuds, d'insérer des éléments enfants, de mettre à jour des attributs ou de sérialiser du XML. `oxml` propose un DOM en arène générationnelle entièrement mutable.
2. **Absence de XPath 1.0 :** `roxmltree` impose un parcours d'arbre récursif manuel. `oxml` inclut un moteur XPath 1.0 complet avec fonctions standard et raccourci entier $O(1)$.
3. **Zéro Validation de Schéma :** `roxmltree` vérifie uniquement la bonne formation syntaxique. L'écosystème `oxml` intègre `xmlschema` avec 95,2 % de conformité W3C XSD.
4. **Un Véritable Écosystème :** `oxml` propose un binaire CLI (`oxml-cli`), des liaisons WebAssembly (`oxml-wasm`), un serveur de langage (`oxml-lsp`) et un serveur Model Context Protocol pour agents IA (`oxml-mcp`).

## Comparatif des Capacités

| Fonctionnalité | `roxmltree` | Écosystème `oxml` | Avantage |
| :--- | :---: | :---: | :--- |
| **Sécurité (`#![forbid(unsafe_code)]`)** | Oui | Oui | Garantie identique : zéro bloc unsafe |
| **Mutation de l'Arbre DOM** | Non (Lecture seule) | Oui | Arène à recyclage générationnel d'emplacements |
| **Sérialisation et Formatage XML** | Non | Oui | Contrôle fin de l'indentation et des balises vides |
| **Moteur XPath 1.0** | Non | Oui | 13 axes de navigation + fonctions standard |
| **Conformité W3C XML Schema (XSD)** | Non | Oui | 95,2 % de réussite sur 35 942 tests |
| **Streaming Zéro-Copie** | Emprunt de tranches | BorrowedEvent | `Reader::next_borrowed()` sans allocation |
| **Outil en Ligne de Commande (CLI)** | Non | Oui | Traitement en flux via `oxml-cli` |
| **Outils pour Agents IA (MCP)** | Non | Oui | 5 outils MCP pour Claude et Cursor |

## Migration du Code

### 1. Analyse du Document et Accès aux Nœuds

Avec `roxmltree` :

```rust
use roxmltree::Document;

let text = "<library><book id='b1'>Dune</book></library>";
let doc = Document::parse(text)?;

// Parcours manuel obligatoire
for node in doc.descendants() {
    if node.tag_name().name() == "book" {
        assert_eq!(node.attribute("id"), Some("b1"));
        assert_eq!(node.text(), Some("Dune"));
    }
}
```

Avec `oxml` :

```rust
use oxml::parse;

let text = "<library><book id='b1'>Dune</book></library>";
let doc = parse(text)?;

// Parcours direct ou requête XPath déclarative
let root = doc.root_element().unwrap();
let book = doc.children(root)[0];

assert_eq!(doc.attribute(book, "id"), Some("b1"));
assert_eq!(doc.text(book), "Dune");

// Ou directement avec XPath 1.0 :
let titles = doc.select("//book[@id='b1']/text()")?;
assert_eq!(titles[0].to_str(&doc), "Dune");
```

### 2. Modification de Nœuds et Sérialisation (Impossible avec roxmltree)

`roxmltree` ne permet aucune modification. Avec `oxml` :

```rust
use oxml::{Document, parse};

let mut doc = parse("<library/>")?;
let root = doc.root_element().unwrap();

// Création et ajout d'un élément livre
let book = doc.create_element("book");
doc.set_attribute(book, "id", "b2");
doc.append_child(root, book);

// Ajout du contenu textuel
let text = doc.create_text("Neuromancien");
doc.append_child(book, text);

// Sérialisation du résultat formaté
let output = doc.serialize();
assert!(output.contains("<book id=\"b2\">Neuromancien</book>"));
```

### 3. Emprunt en Flux Zéro-Copie

Les deux bibliothèques supportent l'analyse sans allocation. Avec `oxml`, `Reader::next_borrowed()` produit des `BorrowedEvent<'a>` empruntant directement les chaînes depuis le tampon :

```rust
use oxml::stream::{BorrowedEvent, Reader};

let mut reader = Reader::new("<items><item id='1'>Data</item></items>")?;
while let Some(event) = reader.next_borrowed()? {
    if let BorrowedEvent::StartElement { name, attributes } = event {
        println!("Élément : {}", name.local);
    }
}
```
