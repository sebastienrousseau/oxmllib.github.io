---
name: "oxml"
short_name: "OXML"
title: "W3C Conformance & Benchmarks — oxml"
description: "Extensive testing against the official W3C XML Conformance Test Suite with detailed performance benchmarks."
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
translation_key: "conformance"
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
headline: "W3C Conformance & Benchmarks"
lead: "Rigorously validated against official W3C XML test suites and benchmarked for streaming and tree throughput."
prev_href: "/architecture/"
prev_label: "Architecture"
next_href: "/accessibility/"
next_label: "Accessibility"
toc_1: "W3C Test Suite"
toc_1_id: "w3c"
toc_2: "Throughput Benchmarks"
toc_2_id: "benchmarks"
toc_3: "Memory Footprint"
toc_3_id: "memory"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: " aria-current=\"page\""
cur_a11y: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## W3C Test Suite

`oxml` integrates the official W3C XML Conformance Test Suite (`xmlts20130923`) directly into automated CI:

- Automated test runner downloads and verifies official XML 1.0 test cases.
- Validates well-formedness, entity expansion limits, and character encodings (UTF-8, UTF-16).
- Rejects non-well-formed XML documents with deterministic diagnostic locations.

## Throughput Benchmarks

Streaming event parsing throughput measured with Criterion on standard datasets (10 MB XML):

| Engine | Safety | Throughput (MB/s) | Relative Speed |
| :
--- | :
--- | :
--- | :
--- |
| **`oxml (SWAR)`** | **100% Safe** | **680 MB/s** | **1.0x (Baseline)** |
| `quick-xml` | Safe mode | 455 MB/s | 0.67x |
| `roxmltree` | Safe DOM | 310 MB/s | 0.46x |

## Memory Footprint

Generational arena recycling bounds memory consumption even during heavy tree modifications, preventing allocator fragmentation.
