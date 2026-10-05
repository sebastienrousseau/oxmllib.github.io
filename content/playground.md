---
name: "oxml"
short_name: "OXML"
title: "Interactive WebAssembly Playground — oxml"
description: "Test XPath 1.0 queries, validate well-formedness, and format XML documents directly in your browser with pure safe Rust WebAssembly."
keywords: "rust xml parser, xpath playground, wasm xml, online xpath tester, xml validator, pure rust"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "playground"
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
eyebrow: "Interactive Tool"
headline: "WebAssembly XML Playground"
lead: "Evaluate XPath 1.0 expressions, check document well-formedness, and format XML in real-time powered by oxml-wasm."
prev_href: "/cookbook/"
prev_label: "Cookbook"
next_href: "/accessibility/"
next_label: "Accessibility"
toc_1: "Interactive Engine"
toc_1_id: "playground"
toc_2: "Playground Capabilities"
toc_2_id: "capabilities"
toc_3: "Architecture & Security"
toc_3_id: "security"
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
cur_cookbook: ""
cur_playground: " aria-current=\"page\""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml interactive WebAssembly playground evaluating XPath queries in the browser."
---

## Interactive Engine

Test XML processing without installing anything. The playground below executes compiled Rust WebAssembly directly in your browser tab with zero server round-trips.

<div class="playground-box" id="oxml-playground">
<div class="playground-header">
<div>
<h2 class="playground-title">WebAssembly Live Engine</h2>
<p class="field-hint">Pure safe Rust running directly inside your browser sandbox.</p>
</div>
<span id="playground-status" class="status-tag">Initializing engine...</span>
</div>

<div class="playground-grid">
<div class="playground-col">
<div class="playground-field">
<label for="playground-samples">Load Sample XML Document</label>
<select id="playground-samples" class="playground-select">
<option value="books">Bookstore Catalog (XPath Filters & Numeric Predicates)</option>
<option value="rss">RSS 2.0 Feed (Channel & Items Extraction)</option>
<option value="atom">Namespaced Atom Feed (Prefix Binding & Entries)</option>
<option value="svg">SVG Vector Graphics (Attributes & Union Operators)</option>
</select>
</div>

<div class="playground-field">
<label for="playground-xml">XML Document Source</label>
<textarea id="playground-xml" class="playground-textarea" spellcheck="false" rows="12" aria-label="XML Document Source"></textarea>
</div>

<div class="playground-field">
<label for="playground-xpath">XPath 1.0 Expression</label>
<input type="text" id="playground-xpath" class="playground-input" placeholder="//book[price &lt; 30]/title" value="//book[price &lt; 30]/title" spellcheck="false" />
</div>

<div class="playground-field">
<label for="playground-ns">Namespace Bindings (Optional: prefix=uri, ...)</label>
<input type="text" id="playground-ns" class="playground-input" placeholder="e.g. atom=http://www.w3.org/2005/Atom" spellcheck="false" />
</div>

<div class="playground-actions">
<button type="button" id="btn-eval-xpath" class="playground-btn btn-primary">Evaluate XPath</button>
<button type="button" id="btn-check-wf" class="playground-btn">Check Well-Formedness</button>
<button type="button" id="btn-format-xml" class="playground-btn">Format XML</button>
</div>
</div>

<div class="playground-col">
<div class="playground-stats" aria-label="Document statistics">
<div class="stat-pill">
<span class="stat-label">Root Node</span>
<span id="stat-root" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Total Nodes</span>
<span id="stat-nodes" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Exec Time</span>
<span id="stat-time" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Matched</span>
<span id="stat-matches" class="stat-val">—</span>
</div>
</div>

<div class="playground-field playground-output-box">
<label for="playground-output">Evaluation Results</label>
<pre id="playground-output" class="playground-output" tabindex="0" role="region" aria-live="polite">Evaluating...</pre>
</div>
</div>
</div>
</div>

<script type="module" src="/assets/playground.js"></script>

## Playground Capabilities

The playground exercises the exact same `oxml` core engine that runs in server-side Rust, `oxml-cli`, and `oxml-mcp`:

1. **XPath 1.0 Full Specification:**
   - Location paths (`/rss/channel/item`), attribute axes (`/@lang`, `//@width`), and union operators (`path1 | path2`).
   - Relational and numeric predicates (`//book[price < 30]`, `//item[position() <= 2]`).
   - XPath core functions (`count(...)`, `string(...)`, `contains(...)`, `starts-with(...)`).
2. **Explicit XML Namespaces:**
   - Resolve prefixed queries against documents declaring default or custom namespaces using standard `prefix=URI` bindings.
3. **Sub-Millisecond Verification:**
   - Generational arena node allocation and SWAR register scanning execute typically in under 0.20 ms for typical documents.

## Architecture & Security

Why does `oxml` have an in-browser playground while C-based tools (`lxml`, `libxml2`, `xml2`) do not?

- **Zero C Dependencies:** `lxml` and `xml2` bind against 200,000+ lines of legacy C code in `libxml2`. Compiling `libxml2` to WebAssembly requires complex Emscripten toolchains and produces multi-megabyte payloads vulnerable to legacy memory leaks.
- **Pure Safe Rust:** `oxml-wasm` compiles cleanly via `wasm-pack` with `#![forbid(unsafe_code)]`. The entire binary footprint is under 220 KB gzipped.
- **Client-Side Sandbox:** Zero data is transmitted to an external server. Your XML documents, payloads, and queries stay 100% inside your browser session.
