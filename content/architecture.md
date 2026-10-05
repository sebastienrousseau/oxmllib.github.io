---
name: "oxml"
short_name: "OXML"
title: "Zero-Unsafe Architecture — oxml"
description: "Under the hood: how oxml delivers memory safety, generational arena recycling, and SWAR streaming throughput."
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
translation_key: "architecture"
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
eyebrow: "Documentation"
headline: "Zero-Unsafe Architecture"
lead: "Designed for maximum memory safety and performance: `#![forbid(unsafe_code)]`, arena allocation, and SIMD scanning."
prev_href: "/schema/"
prev_label: "XML Schema"
next_href: "/conformance/"
next_label: "Conformance"
toc_1: "Zero Unsafe Rule"
toc_1_id: "zero-unsafe"
toc_2: "Arena Allocation"
toc_2_id: "arena"
toc_3: "SWAR Acceleration"
toc_3_id: "swar"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: " aria-current=\"page\""
cur_conformance: ""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Zero Unsafe Rule

`oxml` strictly enforces `#![forbid(unsafe_code)]` at crate root across all crates in the workspace. There are zero exceptions:

- No raw pointer arithmetic
- No unverified memory transmutes
- No unchecked slice access

Every boundary check is verified at compile-time or hardware-accelerated without compromising memory safety.

## Arena Allocation

`oxml::Document` backs its DOM with a generational slot-recycling node arena:

- **O(1) Node Lookup:** Nodes are addressed via lightweight, copyable `NodeId` tokens.
- **Generational Recycling:** Deleted nodes increment their slot generation counter. Accessing a stale `NodeId` safely fails rather than pointing to dangling or reallocated memory.
- **Cache Locality:** Nodes are stored in contiguous vectors, maximizing CPU L1/L2 cache hit rates.

## SWAR Acceleration

Safe delimiter scanning uses SIMD Within A Register (SWAR) across 8-byte chunks to scan character data and attribute values, delivering over +149% throughput vs scalar scanning without unsafe intrinsics.

## Zero-Copy Streaming Borrowing

For high-throughput pipelines where memory allocation overhead must be eliminated:

- `Reader::next_borrowed()` yields `BorrowedEvent<'a>` items that borrow string slices directly from the internal input buffer.
- Text nodes, tag names, and attribute values are inspected with zero heap copies.
- Preserves full streaming memory bounds while achieving peak throughput.
