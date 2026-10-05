---
name: "oxml"
short_name: "OXML"
title: "Installation & Setup — oxml"
description: "Install oxml for Rust, the oxml-cli command line binary, WebAssembly package, or MCP server."
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
translation_key: "install"
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
eyebrow: "Documentation"
headline: "Installation & Quick Start"
lead: "Get started with oxml across Rust projects, CLI environments, browser runtimes, and AI workflows."
prev_href: "/"
prev_label: "Home"
next_href: "/cli/"
next_label: "CLI Tool"
toc_1: "Cargo Setup"
toc_1_id: "cargo"
toc_2: "Feature Flags"
toc_2_id: "features"
toc_3: "Satellite Tools"
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

## Cargo Setup

Add `oxml` to your `Cargo.toml`:

```toml
[dependencies]
oxml = "0.0.10"
```

Or install using the Cargo command line:

```bash
cargo add oxml
```

`oxml` supports standard `no_std` environments with dynamic allocation (`alloc`).

## Feature Flags

Customize the runtime behavior and dependencies with optional feature flags:

| Feature | Description | Extra Dependencies |
| :
--- | :
--- | :
--- |
| `async` | Non-blocking streaming reader for `tokio::io::AsyncBufRead` | `tokio` |
| `tracing` | OpenTelemetry and Tokio diagnostic instrumentation spans | `tracing` |
| `serde` | Serialisation and deserialisation integration | `serde` |

Enable features in your manifest:

```toml
[dependencies]
oxml = { version = "0.0.10", features = ["async", "tracing"] }
```

## Satellite Tools

Install additional specialized tools from the synchronized `oxml` ecosystem:

- **Command-line tool:** `cargo install oxml-cli`
- **WebAssembly bundle:** `npm install @oxml/wasm`
- **Model Context Protocol server:** `cargo install oxml-mcp`
- **XML Schema validator:** `cargo add xmlschema`
