---
name: "oxml"
short_name: "OXML"
title: "Language Server Protocol (oxml-lsp) — oxml"
description: "Real-time XML diagnostics, schema validation, syntax checking, and hover info in your editor."
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
translation_key: "lsp"
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
headline: "oxml-lsp — XML Language Server"
lead: "Bring instant syntax diagnostics, schema completions, and XPath validations into any LSP-compatible editor."
prev_href: "/wasm/"
prev_label: "WebAssembly"
next_href: "/schema/"
next_label: "XML Schema"
toc_1: "Installation"
toc_1_id: "install"
toc_2: "Editor Configuration"
toc_2_id: "editors"
toc_3: "Capabilities"
toc_3_id: "capabilities"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: " aria-current=\"page\""
cur_schema: ""
cur_arch: ""
cur_conformance: ""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Installation

Install `oxml-lsp` from crates.io:

```bash
cargo install oxml-lsp
```

## Editor Configuration

Configure your editor to use `oxml-lsp` for `.xml` files:

### Neovim (nvim-lspconfig)

```lua
require'lspconfig'.oxml_lsp.setup{
  cmd = { "oxml-lsp" },
  filetypes = { "xml", "xsd", "svg" },
}
```

### VS Code & Zed

Add `oxml-lsp` as the language server binary for XML mode in settings.

## Capabilities

- **Diagnostics as you type:** Catch unclosed tags, attribute duplicates, and mismatched quotes instantly.
- **Hover information:** View element documentation and attribute types directly under your cursor.
- **Formatting on save:** Deterministic, whitespace-preserving reformatting.
