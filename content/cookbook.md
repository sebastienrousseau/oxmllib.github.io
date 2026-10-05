---
name: "oxml"
short_name: "OXML"
title: "Production XML Cookbook — Recipes & Patterns"
description: "Battle-tested recipes for enterprise XML processing: zero-copy gigabyte streaming, Billion Laughs mitigation, and complex namespace resolution."
keywords: "rust xml cookbook, xml streaming recipe, billion laughs rust, xpath namespace recipe, oxml patterns"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "cookbook"
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
eyebrow: "Production Patterns"
headline: "Production XML Cookbook"
lead: "Field-tested architectural patterns for high-throughput streaming, memory bounding, and security shielding."
prev_href: "/migrate-roxmltree/"
prev_label: "Migrating from roxmltree"
next_href: "/playground/"
next_label: "Playground"
toc_1: "Gigabyte-Scale Streaming"
toc_1_id: "streaming"
toc_2: "Denial of Service Shielding"
toc_2_id: "security"
toc_3: "Complex Namespace Traversal"
toc_3_id: "namespaces"
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
cur_migrate_roxmltree: ""
cur_cookbook: " aria-current=\"page\""
cur_playground: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml production cookbook showing safe Rust patterns and architecture recipes."
---

## Gigabyte-Scale Streaming

When processing multi-gigabyte XML data sets (such as Wikipedia XML dumps, OpenStreetMap feeds, or financial transaction logs), building an in-memory DOM inevitably leads to out-of-memory crashes.

`oxml` provides `Reader::next_borrowed()`, which streams events while borrowing string slices directly from the internal input buffer with zero heap allocation overhead.

### Pattern: Zero-Copy Entity Extraction

```rust
use oxml::parser::{BorrowedEvent, Reader};
use std::fs::File;
use std::io::BufReader;

fn process_large_dump(path: &str) -> Result<usize, Box<dyn std::error::Error>> {
    let file = File::open(path)?;
    let mut reader = Reader::from_reader(BufReader::with_capacity(64 * 1024, file));
    let mut total_records = 0;
    let mut in_record = false;

    while let Some(event) = reader.next_borrowed()? {
        match event {
            BorrowedEvent::StartElement { name, .. } if name == "record" => {
                in_record = true;
                total_records += 1;
            }
            BorrowedEvent::Text(content) if in_record => {
                // `content` is a borrowed string slice: zero allocation!
                if content.contains("CRITICAL_ALERT") {
                    println!("Matched alert in record #{total_records}");
                }
            }
            BorrowedEvent::EndElement { name } if name == "record" => {
                in_record = false;
            }
            _ => {}
        }
    }

    Ok(total_records)
}
```

## Denial of Service Shielding

Legacy C parsers like `libxml2` are famously susceptible to XML Entity Expansion attacks ("Billion Laughs" and quadratic blowout), where recursive DTD entity expansions multiply memory consumption exponentially until the host runs out of RAM.

### Billion Laughs Mitigation

`oxml` defends against entity expansion denial-of-service by design:

1. **Entity Expansion Recursion Limits:** Recursive general entity replacement is strictly bounded.
2. **Generational Depth Caps:** Nesting levels are bounded to prevent stack overflow.
3. **Pure Memory Bounding:** Because no raw pointer indirection exists, memory cannot be fragmented or held hostage by circular references.

```rust
use oxml::parser::Reader;

// Attack payload: nested entity expansions
let attack_xml = r#"<?xml version="1.0"?>
<!DOCTYPE lolz [
 <!ENTITY lol "lol">
 <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
 <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
]>
<root>&lol3;</root>"#;

let mut reader = Reader::from_str(attack_xml);
// Guaranteed: Safe termination with descriptive error, zero memory explosion.
```

## Complex Namespace Traversal

In XML 1.0, elements without a prefix in a namespaced document belong to the default namespace (`xmlns="http://example.com/ns"`). According to the W3C XPath 1.0 specification, unprefixed names in an XPath expression **only** match elements in no namespace.

### The Problem in Legacy Code

In `lxml` or standard tools, querying a document with a default namespace using `//entry` returns 0 results, confusing developers:

```xml
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry><title>Hello</title></entry>
</feed>
```

### The oxml Solution

Bind an explicit prefix to the namespace URI. Both `oxml-cli` and the Rust API bind prefixes explicitly so that expressions remain stable regardless of document prefix aliases:

#### CLI Approach:
```bash
oxml query --ns atom=http://www.w3.org/2005/Atom \
  -q "//atom:entry/atom:title/text()" feed.xml
```

#### Rust API Approach:
```rust
use oxml::Document;
use oxml::xpath::Context;

let xml = r#"<feed xmlns="http://www.w3.org/2005/Atom"><title>Release</title></feed>"#;
let doc = Document::parse(xml)?;

let mut ctx = Context::new();
ctx.register_namespace("atom", "http://www.w3.org/2005/Atom");

let nodes = doc.select_with_context("//atom:title", &ctx)?;
assert_eq!(nodes[0].text(), Some("Release"));
```

## W3C XML Schema (XSD) Validation Pipeline

Validate documents against complex enterprise XSD definitions in automated pipelines:

```rust
use xmlschema::Validator;

let schema_source = std::fs::read_to_string("schema.xsd")?;
let validator = Validator::from_str(&schema_source)?;

let xml_input = std::fs::read_to_string("incoming.xml")?;
match validator.validate(&xml_input) {
    Ok(()) => println!("Document conforms 100% to W3C XML Schema."),
    Err(errors) => {
        for err in errors {
            eprintln!("Validation failure at line {}: {}", err.line, err.message);
        }
    }
}
```
