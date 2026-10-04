<!--
SPDX-FileCopyrightText: 2026 Sebastien Rousseau <sebastian.rousseau@gmail.com>
SPDX-License-Identifier: Apache-2.0 OR MIT
-->

<div align="center">

# oxmllib.com

**Official Documentation Website for the oxml Pure Rust XML Toolkit**

[![Website](https://img.shields.io/website?url=https%3A%2F%2Foxmllib.com)](https://oxmllib.com)
[![License: MIT or Apache 2.0](https://img.shields.io/badge/License-MIT%2FApache--2.0-blue.svg)](LICENSE)
[![WCAG 2.2 AAA](https://img.shields.io/badge/WCAG-2.2%20AAA-success.svg)](https://oxmllib.com/accessibility/)

</div>

---

## Overview

`oxmllib.com` is the official documentation platform and knowledge base for the [`oxml`](https://github.com/sebastienrousseau/oxml) ecosystem—a fast, ergonomic, memory-safe pure Rust XML toolkit built with `#![forbid(unsafe_code)]`.

Built strictly using the [Lucid theme](https://ssg-themes.github.io/lucid/) on the [Static Site Generator (SSG)](https://static-site-generator.com/) engine, `oxmllib.com` enforces rigorous standards:
- **WCAG 2.2 AAA Accessibility**: 7:1 minimum contrast ratios, 44px minimum target sizes, full keyboard navigation, zero client-side JavaScript required for baseline readability.
- **Bilingual Internationalization**: Complete parallel English (`en`) and French (`fr`) manuals.
- **High-Resolution Photography**: Optimized responsive stock photography hosted on [CloudCDN](https://cloudcdn.pro).
- **Agentic AI Discovery**: Automated generation of `llms.txt`, `llms-full.txt`, `mcp.json`, and `ai-plugin.json` for AI coding agents.

---

## Ecosystem Documentation

The website hosts in-depth documentation for all seven crates and tools in the `oxml` ecosystem:

| Section | Topic | Description |
| :--- | :--- | :--- |
| [`/installation/`](https://oxmllib.com/installation/) | **Installation & Quick Start** | Cargo manifest setup, feature flags, and binary installation |
| [`/cli/`](https://oxmllib.com/cli/) | **`oxml-cli`** | Streaming XPath extraction, formatting, linting, and batch processing |
| [`/xpath/`](https://oxmllib.com/xpath/) | **XPath 1.0 Engine** | 13 axis steps, predicates, standard functions, and variable binding |
| [`/mcp/`](https://oxmllib.com/mcp/) | **`oxml-mcp`** | Model Context Protocol server enabling LLMs to query XML documents |
| [`/wasm/`](https://oxmllib.com/wasm/) | **`oxml-wasm`** | Browser and Edge runtime WebAssembly bindings with TypeScript types |
| [`/lsp/`](https://oxmllib.com/lsp/) | **`oxml-lsp`** | Language Server Protocol daemon for editor diagnostics and hover docs |
| [`/schema/`](https://oxmllib.com/schema/) | **`xmlschema`** | W3C XML Schema (XSD 1.0) structural validator in pure safe Rust |
| [`/architecture/`](https://oxmllib.com/architecture/) | **Architecture** | Generational arena DOM, SWAR chunked scanning, zero unsafe code |
| [`/conformance/`](https://oxmllib.com/conformance/) | **Conformance** | W3C XML recommendation test suite compliance and benchmarks |
| [`/accessibility/`](https://oxmllib.com/accessibility/) | **Accessibility** | WCAG 2.2 AAA audit metrics, contrast checks, and keyboard traversal |

---

## Local Development

### Prerequisites

- [Rust](https://rustup.rs/) (stable toolchain)
- [SSG](https://crates.io/crates/cargo-ssg) (`cargo install cargo-ssg --locked`)

### Build Commands

```bash
# Build the website into public/
make build

# Validate schemas, frontmatter, and accessibility gates
make check

# Clean build artifacts
make clean
```

---

## Deployment

The website is automatically built and deployed to GitHub Pages on every push to `main` via `.github/workflows/pages.yml`.

---

## License

Licensed under either of:
- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT License ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.
