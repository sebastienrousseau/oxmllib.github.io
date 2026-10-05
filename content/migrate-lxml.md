---
name: "oxml"
short_name: "OXML"
title: "Migrating from Python lxml to oxml — oxml"
description: "Step-by-step migration guide from Python lxml and libxml2 to pure-Rust memory safety, zero-copy streaming, and XPath 1.0."
keywords: "migrate lxml rust, lxml alternative rust, python xml to rust, oxml vs lxml, zero unsafe xml, libxml2 rust"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "migrate-lxml"
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
footer_note: "A pure Rust XML toolkit with zero unsafe code, published under MIT or Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Licensed under MIT or Apache-2.0."
eyebrow: "Migration Guide"
headline: "Migrating from Python lxml to oxml"
lead: "Upgrade your XML processing pipelines from Python's C-dependent libxml2 wrapper to pure-Rust memory safety, zero-copy streaming, and true multi-threaded concurrency."
prev_href: "/schema/"
prev_label: "XML Schema"
next_href: "/migrate-roxmltree/"
next_label: "Migrating from roxmltree"
toc_1: "Why Migrate?"
toc_1_id: "why-migrate"
toc_2: "Concept & API Mapping"
toc_2_id: "concept-mapping"
toc_3: "Code Comparisons"
toc_3_id: "code-comparisons"
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
cur_migrate_lxml: " aria-current=\"page\""
cur_migrate_roxmltree: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Why Migrate?

Python's `lxml` has powered XML processing for two decades by wrapping the C libraries `libxml2` and `libxslt`. However, production engineering demands have evolved:

1. **Memory Safety & Zero Vulnerabilities:** `libxml2` has suffered numerous CVEs (buffer overflows, use-after-free, memory leaks). `oxml` enforces `#![forbid(unsafe_code)]` with 100% pure, safe Rust.
2. **True Multi-Threading:** `lxml` is constrained by Python's Global Interpreter Lock (GIL). `oxml` structures (`Document`, `XPath`) implement `Send` and `Sync`, allowing multi-threaded parsing across CPU cores with Rayon or Tokio.
3. **Painless Cross-Compilation:** No C compiler toolchains, system package dependencies (`libxml2-dev`), or wheels mismatches across macOS, Linux (glibc/musl), and Windows.
4. **Edge & WebAssembly:** `oxml` compiles directly to WebAssembly (`oxml-wasm`), enabling identical XML processing in browsers and Cloudflare Workers.

## Concept & API Mapping

| Python `lxml.etree` | Rust `oxml` Ecosystem | Key Advantage |
| :--- | :--- | :--- |
| `etree.fromstring(xml)` | `oxml::parse(xml)` | Fast generational arena allocation |
| `etree.parse(file)` | `oxml::stream::Reader::from_reader(f)` | Bounded 34 KB buffer memory footprint |
| `tree.xpath("//book/text()")` | `doc.select("//book/text()")` | Complete W3C XPath 1.0 with $O(1)$ integer fast-path |
| `XPath(expr)(tree)` | `oxml::XPath::compile(expr)?` | Precompiled expression reuse across threads |
| `etree.iterparse(...)` | `reader.next_borrowed()` | Zero-copy `&str` borrowing directly from buffer |
| `etree.tostring(el)` | `oxml::format_xml(doc, ...)` | Indentation, minification, and empty element style control |
| `etree.XMLSchema(xsd).validate(doc)` | `xmlschema::validate(&doc, &schema)` | Pure-Rust XSD validator with 95.2% W3C conformance |
| Custom LLM agent scripts | `oxml-mcp` | 5 native MCP tools for Claude, Cursor, and AI agents |

## Code Comparisons

### 1. Document Parsing & XPath Queries

In Python with `lxml`:

```python
from lxml import etree

xml = """<catalog>
    <book id="bk101"><title>Dune</title><price>19.95</price></book>
    <book id="bk102"><title>Foundation</title><price>15.95</price></book>
</catalog>"""

root = etree.fromstring(xml.encode("utf-8"))
titles = root.xpath("//book[price > 18]/title/text()")
print(titles)  # ['Dune']
```

In Rust with `oxml`:

```rust
use oxml::{parse, XPath};

fn main() -> Result<(), Box<dyn std::error.Error>> {
    let xml = r#"<catalog>
        <book id="bk101"><title>Dune</title><price>19.95</price></book>
        <book id="bk102"><title>Foundation</title><price>15.95</price></book>
    </catalog>"#;

    let doc = parse(xml)?;
    let xpath = XPath::compile("//book[price > 18]/title/text()")?;
    let titles = xpath.evaluate(&doc);
    assert_eq!(titles.to_str(&doc), "Dune");
    Ok(())
}
```

### 2. High-Performance Streaming

In Python, `iterparse` requires careful manual node clearing (`elem.clear()`) to avoid unbounded memory expansion:

```python
for event, elem in etree.iterparse(file_obj, tag="item"):
    process(elem)
    elem.clear()  # Required to free C memory
```

In Rust with `oxml`, memory is strictly bounded by design with zero-copy slice borrowing:

```rust
use oxml::stream::{BorrowedEvent, Reader};

let mut reader = Reader::from_reader(file)?;
while let Some(event) = reader.next_borrowed()? {
    match event {
        BorrowedEvent::StartElement { name, .. } if name.local == "item" => {
            // Borrowed directly from reader buffer with 0 heap allocations
        }
        _ => {}
    }
}
```

### 3. XML Schema (XSD) Validation

In Python with `lxml`:

```python
schema = etree.XMLSchema(etree.parse("schema.xsd"))
doc = etree.parse("document.xml")
is_valid = schema.validate(doc)
if not is_valid:
    print(schema.error_log)
```

In Rust with `xmlschema`:

```rust
use xmlschema::{parse_schema, validate};

let schema = parse_schema(&std::fs::read_to_string("schema.xsd")?)?;
let doc = oxml::parse(&std::fs::read_to_string("document.xml")?)?;
let report = validate(&doc, &schema);

if report.is_valid() {
    println!("Document is strictly valid!");
} else {
    for violation in &report.violations {
        eprintln!("{violation}");
    }
}
```
