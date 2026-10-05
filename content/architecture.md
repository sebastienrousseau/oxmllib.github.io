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
nav_cookbook: "Cookbook"
nav_playground: "Playground"
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
cur_cookbook: ""
cur_playground: ""
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

## Ecosystem Architecture

The `oxml` ecosystem is cleanly separated into specialized, decoupled crates that share the zero-unsafe core:

<figure class="diagram-card">
  <svg viewBox="0 0 800 400" width="800" height="400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="arch-diag1-title arch-diag1-desc">
    <title id="arch-diag1-title">oxml Ecosystem Architecture Diagram</title>
    <desc id="arch-diag1-desc">Diagram showing the core oxml engine (Parser, DOM, XPath 1.0) branching out into six runtime integrations and tooling crates: oxml-cli, oxml-wasm, oxml-mcp, oxml-lsp, oxml-json, and xmlschema.</desc>
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ink-soft)" />
      </marker>
    </defs>
    <!-- Background Frame for Toolchain -->
    <rect x="20" y="160" width="760" height="220" rx="12" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="40" y="188" font-family="var(--sans)" font-size="12" font-weight="700" letter-spacing="0.06em" fill="var(--ink-muted)">RUNTIME INTEGRATIONS &amp; TOOLING</text>
    <!-- Core Engine Box -->
    <rect x="250" y="24" width="300" height="84" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2" />
    <text x="400" y="50" font-family="var(--sans)" font-size="11" font-weight="700" letter-spacing="0.08em" fill="var(--accent)" text-anchor="middle">CORE ENGINE</text>
    <text x="400" y="74" font-family="var(--mono)" font-size="18" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml</text>
    <text x="400" y="94" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Parser · Generational DOM · XPath 1.0</text>
    <!-- Trunk Line & Distributor -->
    <line x1="400" y1="108" x2="400" y2="135" stroke="var(--ink-soft)" stroke-width="2" />
    <line x1="150" y1="135" x2="650" y2="135" stroke="var(--ink-soft)" stroke-width="2" />
    <!-- Drops to Row 1 -->
    <line x1="150" y1="135" x2="150" y2="204" stroke="var(--ink-soft)" stroke-width="2" marker-end="url(#arrow)" />
    <line x1="400" y1="135" x2="400" y2="204" stroke="var(--ink-soft)" stroke-width="2" marker-end="url(#arrow)" />
    <line x1="650" y1="135" x2="650" y2="204" stroke="var(--ink-soft)" stroke-width="2" marker-end="url(#arrow)" />
    <!-- Drop lines to Row 2 -->
    <line x1="150" y1="265" x2="150" y2="294" stroke="var(--ink-soft)" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow)" />
    <line x1="400" y1="265" x2="400" y2="294" stroke="var(--ink-soft)" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow)" />
    <line x1="650" y1="265" x2="650" y2="294" stroke="var(--ink-soft)" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#arrow)" />
    <!-- Row 1 Cards -->
    <rect x="40" y="205" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="150" y="228" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-cli</text>
    <text x="150" y="248" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Terminal &amp; CI/CD</text>
    <rect x="290" y="205" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="400" y="228" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-wasm</text>
    <text x="400" y="248" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">Browser WebAssembly</text>
    <rect x="540" y="205" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="650" y="228" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-mcp</text>
    <text x="650" y="248" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">AI Agent JSON-RPC</text>
    <!-- Row 2 Cards -->
    <rect x="40" y="295" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="150" y="318" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-lsp</text>
    <text x="150" y="338" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">IDE Language Server</text>
    <rect x="290" y="295" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="400" y="318" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">oxml-json</text>
    <text x="400" y="338" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">JSON / Streaming Converter</text>
    <rect x="540" y="295" width="220" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" stroke-width="1" />
    <text x="650" y="318" font-family="var(--mono)" font-size="14" font-weight="700" fill="var(--ink)" text-anchor="middle">xmlschema</text>
    <text x="650" y="338" font-family="var(--sans)" font-size="12" fill="var(--ink-soft)" text-anchor="middle">W3C XSD Conformance</text>
  </svg>
  <figcaption class="diagram-caption">Figure 1: Modular crate architecture sharing the zero-unsafe core engine.</figcaption>
  <details class="diagram-details"><summary>View Mermaid source</summary><pre class="highlight language-mermaid"><code class="language-mermaid">graph TD
  subgraph Core["Core Engine"]
    OXML["oxml&lt;br/&gt;(Parser, DOM, XPath 1.0)"]
  end
  subgraph Toolchain["Runtime Integrations &amp; Tooling"]
    CLI["oxml-cli&lt;br/&gt;(Terminal &amp; CI/CD)"]
    WASM["oxml-wasm&lt;br/&gt;(Browser WebAssembly)"]
    MCP["oxml-mcp&lt;br/&gt;(AI Agent JSON-RPC)"]
    LSP["oxml-lsp&lt;br/&gt;(IDE Language Server)"]
    JSON["oxml-json&lt;br/&gt;(JSON/Streaming Converter)"]
    XSD["xmlschema&lt;br/&gt;(W3C XSD Conformance)"]
  end
  OXML --&gt; CLI
  OXML --&gt; WASM
  OXML --&gt; MCP
  OXML --&gt; LSP
  OXML --&gt; JSON
  OXML --&gt; XSD</code></pre></details>
</figure>

## Zero-Copy Streaming Borrowing

For high-throughput pipelines where memory allocation overhead must be eliminated:

- `Reader::next_borrowed()` yields `BorrowedEvent<'a>` items that borrow string slices directly from the internal input buffer.
- Text nodes, tag names, and attribute values are inspected with zero heap copies.
- Preserves bounded 34 KB memory usage while streaming multi-gigabyte documents at peak throughput.

<figure class="diagram-card">
  <svg viewBox="0 0 800 370" width="800" height="370" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="arch-diag2-title arch-diag2-desc">
    <title id="arch-diag2-title">Zero-Copy Streaming Borrowing Sequence Diagram</title>
    <desc id="arch-diag2-desc">Sequence diagram illustrating zero-copy streaming: Input Stream fills a 34 KB ring buffer, BorrowedEvent borrows a string slice with zero heap allocations, Application Logic inspects the slice, and the ring buffer pointer advances.</desc>
    <defs>
      <marker id="seq-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)" />
      </marker>
      <marker id="ret-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--ink-muted)" />
      </marker>
    </defs>
    <!-- Lifelines -->
    <line x1="110" y1="70" x2="110" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <line x1="300" y1="70" x2="300" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <line x1="500" y1="70" x2="500" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <line x1="690" y1="70" x2="690" y2="300" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4 4" />
    <!-- Participant Boxes -->
    <rect x="25" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="110" y="42" font-family="var(--sans)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Input Stream</text>
    <text x="110" y="58" font-family="var(--mono)" font-size="11" fill="var(--ink-muted)" text-anchor="middle">Multi-GB File/Socket</text>
    <rect x="215" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--accent)" stroke-width="1.5" />
    <text x="300" y="42" font-family="var(--sans)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Ring Buffer</text>
    <text x="300" y="58" font-family="var(--mono)" font-size="11" fill="var(--accent)" text-anchor="middle">34 KB Constant Cap</text>
    <rect x="415" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="500" y="42" font-family="var(--mono)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">BorrowedEvent&lt;&apos;a&gt;</text>
    <text x="500" y="58" font-family="var(--sans)" font-size="11" fill="var(--ink-muted)" text-anchor="middle">&amp;str Direct Slice</text>
    <rect x="605" y="20" width="170" height="50" rx="8" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="690" y="42" font-family="var(--sans)" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">Application</text>
    <text x="690" y="58" font-family="var(--sans)" font-size="11" fill="var(--ink-muted)" text-anchor="middle">Business Logic</text>
    <!-- Step 1: Stream -> Ring Buffer -->
    <circle cx="110" cy="115" r="10" fill="var(--accent)" />
    <text x="110" y="119" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--accent-ink)" text-anchor="middle">1</text>
    <line x1="125" y1="115" x2="294" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#seq-arrow)" />
    <text x="210" y="107" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Fill internal chunk</text>
    <!-- Step 2: Ring Buffer -> BorrowedEvent -->
    <circle cx="300" cy="165" r="10" fill="var(--accent)" />
    <text x="300" y="169" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--accent-ink)" text-anchor="middle">2</text>
    <line x1="315" y1="165" x2="494" y2="165" stroke="var(--accent)" stroke-width="2" marker-end="url(#seq-arrow)" />
    <text x="405" y="157" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Borrow slice (&amp;str, 0 heap alloc)</text>
    <!-- Step 3: BorrowedEvent -> Application -->
    <circle cx="500" cy="215" r="10" fill="var(--accent)" />
    <text x="500" y="219" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--accent-ink)" text-anchor="middle">3</text>
    <line x1="515" y1="215" x2="684" y2="215" stroke="var(--accent)" stroke-width="2" marker-end="url(#seq-arrow)" />
    <text x="600" y="207" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Inspect Tag / Attribute / Text</text>
    <!-- Step 4: Application -> Ring Buffer (Advance) -->
    <circle cx="690" cy="265" r="10" fill="var(--ink-muted)" />
    <text x="690" y="269" font-family="var(--sans)" font-size="11" font-weight="700" fill="var(--bg)" text-anchor="middle">4</text>
    <line x1="675" y1="265" x2="306" y2="265" stroke="var(--ink-muted)" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#ret-arrow)" />
    <text x="490" y="257" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink-muted)" text-anchor="middle">Release slice &amp; advance ring pointer</text>
    <!-- Memory Cap Banner -->
    <rect x="180" y="315" width="440" height="34" rx="6" fill="var(--surface-soft)" stroke="var(--line)" stroke-width="1" />
    <text x="400" y="337" font-family="var(--sans)" font-size="12" font-weight="600" fill="var(--ink)" text-anchor="middle">Zero Heap Copies · Bounded 34 KB Constant Memory Ceiling</text>
  </svg>
  <figcaption class="diagram-caption">Figure 2: Zero-copy streaming sequence with bounded 34 KB buffer borrowing.</figcaption>
  <details class="diagram-details"><summary>View Mermaid source</summary><pre class="highlight language-mermaid"><code class="language-mermaid">sequenceDiagram
  autonumber
  participant Stream as Input Stream (Multi-GB)
  participant Ring as 34 KB Ring Buffer
  participant Event as BorrowedEvent (&amp;str)
  participant App as Application Logic
  Stream-&gt;&gt;Ring: Fill internal chunk
  Ring-&gt;&gt;Event: Borrow slice without heap allocation
  Event-&gt;&gt;App: Inspect Tag / Attribute / Text
  App--&gt;&gt;Ring: Release slice &amp; advance ring buffer pointer</code></pre></details>
</figure>

