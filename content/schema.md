---
name: "oxml"
short_name: "OXML"
title: "XML Schema Validation (xmlschema) — oxml"
description: "W3C XML Schema (XSD) 1.0 validation library with zero unsafe code and complete type constraints."
keywords: "rust xml parser, xpath 1.0, oxml, zero unsafe code, xml schema, webassembly xml, mcp xml"
author: "Sebastien Rousseau"
date: "2026-10-04"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "schema"
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
footer_note: "A pure Rust XML toolkit with zero unsafe code, published under MIT or Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Licensed under MIT or Apache-2.0."
eyebrow: "Documentation"
headline: "xmlschema — XSD 1.0 Validator"
lead: "Rigorous W3C XML Schema validation engine built for enterprise compliance and high assurance pipelines."
prev_href: "/lsp/"
prev_label: "Language Server"
next_href: "/architecture/"
next_label: "Architecture"
toc_1: "Installation"
toc_1_id: "install"
toc_2: "Validation Example"
toc_2_id: "example"
toc_3: "Supported Types"
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

Add `xmlschema` to your dependencies:

```toml
[dependencies]
xmlschema = "0.0.10"
```

## Validation Example

Validate XML documents against standard XSD schemas:

```rust
use xmlschema::{parse_schema, validate};

let xsd = std::fs::read_to_string("schema.xsd")?;
let schema = parse_schema(&xsd)?;

let xml = std::fs::read_to_string("document.xml")?;
let doc = oxml::parse(&xml)?;
let report = validate(&doc, &schema);

if report.is_valid() {
    println!("Document is strictly valid!");
} else {
    for violation in &report.violations {
        eprintln!("Validation error: {violation}");
    }
}
```

## Supported Types & Facets

- **Simple types:** string, integer, decimal, boolean, dateTime, date, anyURI, hexBinary, base64Binary
- **Complex types:** sequences, choices, all groups, attribute declarations
- **Restriction facets:** minInclusive, maxInclusive, minExclusive, maxExclusive, length, minLength, maxLength, pattern (regex engine), enumeration
- **Value-space comparisons:** enumerations compare in the datatype value space (e.g. `true` and `1`, numeric formatting, case-insensitive `hexBinary`)
- **Binary length validation:** octet-based length validation for `xs:hexBinary` and `xs:base64Binary`
- **W3C Conformance:** **95.2% pass rate** over 35,942 decided tests (34,226 pass, 0 panics) across the 39,420-test W3C XSD test suite.
