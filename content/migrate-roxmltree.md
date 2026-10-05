---
name: "oxml"
short_name: "OXML"
title: "Migrating from roxmltree to oxml — oxml"
description: "How to upgrade from read-only roxmltree parsing to oxml: full XPath 1.0, mutable generational arena DOM, and W3C XML Schema validation."
keywords: "migrate roxmltree oxml, roxmltree alternative rust, mutable xml rust, xpath rust, pure safe rust xml"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "migrate-roxmltree"
locale_path: "/"
base_path: "/"
en_current: " aria-current=\"true\""
fr_current: ""
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
label_skip: "Skip to main content"
label_menu: "Menu"
label_nav: "Main"
label_langs: "Language"
label_theme: "Theme"
label_theme_system: "System"
label_theme_light: "Light"
label_theme_dark: "Dark"
label_docs: "Documentation"
label_footer_nav: "Documentation"
label_made_with: "Made with SSG"
label_docs_nav: "Documentation sections"
label_crumbs: "Breadcrumb"
label_pager: "Page"
label_prev: "Previous"
label_next: "Next"
label_toc: "On this page"
nav_home: "Home"
nav_install: "Installation"
nav_cli: "CLI Tool"
nav_xpath: "XPath 1.0"
nav_wasm: "WebAssembly"
nav_mcp: "MCP Server"
nav_lsp: "Language Server"
nav_schema: "XML Schema"
nav_arch: "Architecture"
nav_conformance: "Conformance"
nav_a11y: "Accessibility"
nav_migrate_lxml: "Migrating from lxml"
nav_migrate_roxmltree: "Migrating from roxmltree"
nav_cookbook: "Cookbook"
nav_playground: "Playground"
footer_note: "A pure Rust XML toolkit with zero unsafe code, published under MIT or Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Licensed under MIT or Apache-2.0."
eyebrow: "Migration Guide"
headline: "Migrating from roxmltree to oxml"
lead: "Retain 100% safe Rust while unlocking full XPath 1.0, mutable DOM operations, XSD validation, and unified tooling."
prev_href: "/migrate-lxml/"
prev_label: "Migrating from lxml"
next_href: "/accessibility/"
next_label: "Accessibility"
toc_1: "Why Upgrade?"
toc_1_id: "why-upgrade"
toc_2: "Feature Comparison"
toc_2_id: "feature-comparison"
toc_3: "Code Migration"
toc_3_id: "code-migration"
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
cur_cookbook: ""
cur_playground: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Why Upgrade?

`roxmltree` is a widely respected read-only XML parser in the Rust community known for its strict `#![forbid(unsafe_code)]` enforcement. However, many projects eventually hit structural limitations:

1. **Read-Only Wall:** `roxmltree` cannot modify nodes, insert children, update attributes, or serialize XML. `oxml` provides a mutable generational arena DOM.
2. **Missing XPath 1.0:** `roxmltree` requires manual recursive tree-walking functions. `oxml` includes a complete, compliant XPath 1.0 engine with standard functions and $O(1)$ integer predicate optimization.
3. **No Schema Validation:** `roxmltree` only verifies XML well-formedness. The `oxml` ecosystem includes `xmlschema` with 95.2% W3C XSD conformance.
4. **Beyond a Library:** `oxml` ships a CLI binary (`oxml-cli`), WebAssembly bindings (`oxml-wasm`), Language Server (`oxml-lsp`), and AI Model Context Protocol server (`oxml-mcp`).

## Feature Comparison

| Capability | `roxmltree` | `oxml` Toolkit | Advantage |
| :--- | :---: | :---: | :--- |
| **Safety (`#![forbid(unsafe_code)]`)** | Yes | Yes | Identical guarantee: zero unsafe blocks |
| **DOM Tree Mutation** | No (Read-only) | Yes | Generational slot recycling arena |
| **XML Serialization & Formatting** | No | Yes | Indentation and empty-element controls |
| **XPath 1.0 Engine** | No | Yes | 13 navigational axes + standard functions |
| **W3C XML Schema (XSD)** | No | Yes | 95.2% conformance over 35,942 tests |
| **Zero-Copy Streaming** | Slice borrowing | BorrowedEvent | `Reader::next_borrowed()` zero-copy slices |
| **CLI & Shell Integration** | No | Yes | `oxml-cli` pipe processing |
| **AI / MCP Tools** | No | Yes | 5 native tools for Claude & Cursor |

## Code Migration

### 1. Document Parsing & Node Access

In `roxmltree`:

```rust
use roxmltree::Document;

let text = "<library><book id='b1'>Dune</book></library>";
let doc = Document::parse(text)?;

// Manual traversal required to find elements
for node in doc.descendants() {
    if node.tag_name().name() == "book" {
        assert_eq!(node.attribute("id"), Some("b1"));
        assert_eq!(node.text(), Some("Dune"));
    }
}
```

In `oxml`:

```rust
use oxml::parse;

let text = "<library><book id='b1'>Dune</book></library>";
let doc = parse(text)?;

// Direct traversal or high-level XPath query
let root = doc.root_element().unwrap();
let book = doc.children(root)[0];

assert_eq!(doc.attribute(book, "id"), Some("b1"));
assert_eq!(doc.text(book), "Dune");

// Or with XPath 1.0:
let titles = doc.select("//book[@id='b1']/text()")?;
assert_eq!(titles[0].to_str(&doc), "Dune");
```

### 2. Modifying Nodes and Serializing (Impossible in roxmltree)

`roxmltree` cannot mutate document trees. In `oxml`:

```rust
use oxml::{Document, parse};

let mut doc = parse("<library/>")?;
let root = doc.root_element().unwrap();

// Create and append a new book element
let book = doc.create_element("book");
doc.set_attribute(book, "id", "b2");
doc.append_child(root, book);

// Add text content
let text = doc.create_text("Neuromancer");
doc.append_child(book, text);

// Serialize formatted output
let output = doc.serialize();
assert!(output.contains("<book id=\"b2\">Neuromancer</book>"));
```

### 3. Zero-Copy Streaming Borrowing

Both libraries support zero-allocation scanning. In `oxml`, `Reader::next_borrowed()` yields `BorrowedEvent<'a>` items that borrow string slices directly from the input buffer:

```rust
use oxml::stream::{BorrowedEvent, Reader};

let mut reader = Reader::new("<items><item id='1'>Data</item></items>")?;
while let Some(event) = reader.next_borrowed()? {
    if let BorrowedEvent::StartElement { name, attributes } = event {
        println!("Element: {}", name.local);
    }
}
```
