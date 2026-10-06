---
name: "oxml"
short_name: "OXML"
title: "Model Context Protocol (oxml-mcp) — oxml"
description: "Equip LLM coding assistants and AI agents with native XML parsing, XPath queries, and XSD validation."
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
translation_key: "mcp"
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
nav_compare: "Compare Libraries"
nav_benchmarks: "Benchmarks"
nav_security: "Security"
footer_note: "A pure Rust XML toolkit with zero unsafe code, published under MIT or Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Licensed under MIT or Apache-2.0."
eyebrow: "Documentation"
headline: "oxml-mcp — Model Context Protocol Server"
lead: "Seamless XML capabilities for Claude Desktop, Cursor, Gemini CLI, and autonomous AI coding agents."
prev_href: "/xpath/"
prev_label: "XPath 1.0"
next_href: "/wasm/"
next_label: "WebAssembly"
toc_1: "Agent Tools"
toc_1_id: "tools"
toc_2: "Configuration"
toc_2_id: "config"
toc_3: "Transports"
toc_3_id: "transports"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: " aria-current=\"page\""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: ""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
cur_cookbook: ""
cur_playground: ""
cur_compare: ""
cur_benchmarks: ""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Agent Tools

`oxml-mcp` exposes five high-level, structured tools to LLMs:

- **`xml_check`**: Fast syntax and well-formedness diagnostics without building an in-memory tree.
- **`xml_format`**: Format, indent (customizable spaces), or minify XML with empty-element style controls (`self-closing`, `spaced`, `expanded`).
- **`xml_inspect`**: Structural inspection returning root name, depth, element frequencies, and declared namespaces.
- **`xml_query`**: Evaluate XPath 1.0 expressions and return matching string values or counts.
- **`xml_validate`**: Validate documents against W3C XML Schema (XSD) definitions with exact line and column diagnostics.

## Configuration

Add `oxml-mcp` to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "oxml": {
      "command": "oxml-mcp",
      "args": []
    }
  }
}
```

## Transports

`oxml-mcp` supports multiple production transport protocols:

1. **Standard I/O (`stdio`):** Default for local subprocess invocation in desktop clients.
2. **Server-Sent Events (`sse`):** HTTP streaming for remote agent clusters and web clients.
3. **Streamable WebSockets:** Low-latency bidirectional RPC communication.
