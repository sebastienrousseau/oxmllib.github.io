---
name: "oxml"
short_name: "OXML"
title: "Reproducible Benchmarks & Performance — oxml"
description: "Transparent, reproducible Criterion benchmarks comparing oxml, quick-xml, roxmltree, and xot across real-world datasets."
keywords: "rust xml benchmarks, xml parser performance, quick-xml speed, roxmltree memory, oxml benchmark"
author: "Sebastien Rousseau"
date: "2026-10-06"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "benchmarks"
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
eyebrow: "Proof & Performance"
headline: "Reproducible Benchmarks & Performance"
lead: "Transparent Criterion benchmarks comparing oxml against quick-xml, roxmltree, and xot across real-world and synthetic corpora."
prev_href: "/compare/"
prev_label: "Compare Libraries"
next_href: "/conformance/"
next_label: "W3C Conformance"
toc_1: "Methodology & Setup"
toc_1_id: "methodology"
toc_2: "Streaming & DOM Throughput"
toc_2_id: "throughput"
toc_3: "Memory & XPath Evaluation"
toc_3_id: "memory-xpath"
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
cur_playground: ""
cur_compare: ""
cur_benchmarks: " aria-current=\"page\""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "Criterion performance benchmark charts comparing oxml to other Rust XML parsers."
---

<h2 id="methodology">Methodology &amp; Test Environment</h2>

<p>Trustworthy benchmarks must be reproducible by any engineer with a single terminal command. All tests reported below use standard Criterion harnesses compiled under release optimization with native target CPU flags.</p>

<pre><code class="language-bash"># Reproduce benchmarks on your local hardware:
git clone https://github.com/sebastienrousseau/oxml.git
cd oxml
cargo bench
</code></pre>

<h3>Hardware &amp; Toolchain Specification</h3>
<ul>
  <li><strong>Processor:</strong> Apple M3 Max (14 CPU cores: 10 performance, 4 efficiency) / AMD EPYC 7763 (64 cores, x86_64).</li>
  <li><strong>RAM:</strong> 36 GB Unified LPDDR5 (Apple Silicon) / 128 GB ECC DDR4 (Linux).</li>
  <li><strong>Operating Systems:</strong> macOS 15.4 / Ubuntu 24.04 LTS (Kernel 6.8).</li>
  <li><strong>Compiler:</strong> Rust 1.86.0 (LLVM 19), <code>opt-level = 3</code>, <code>codegen-units = 1</code>, <code>lto = "thin"</code>.</li>
  <li><strong>Benchmark Date:</strong> October 2026.</li>
</ul>

<h3>Test Corpora</h3>
<ul>
  <li><strong>Search Engine Sitemap (3.2 MB):</strong> 25,000 URL elements with W3C XML namespaces (<code>sitemaps.org/schemas/sitemap/0.9</code>).</li>
  <li><strong>SVG Vector Icon Library (1.8 MB):</strong> 12,000 path elements, deep attribute sets, coordinate strings.</li>
  <li><strong>Maven Project Object Model (120 KB):</strong> Deeply nested dependencies, plugins, and XML text nodes.</li>
  <li><strong>Synthetic Scaled XML (10 KB, 1 MB, 50 MB):</strong> Balanced element trees for raw token throughput validation.</li>
</ul>

<h2 id="throughput">Streaming &amp; DOM Construction Throughput</h2>

<p>Comparing raw token streaming pull-parsing against full in-memory DOM construction on the 3.2 MB Sitemap corpus:</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Library</th>
        <th scope="col">Operation Mode</th>
        <th scope="col">Throughput (MB/s)</th>
        <th scope="col">Relative</th>
        <th scope="col">Architectural Trade-off</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><strong>quick-xml</strong></th>
        <td>Pull Parser (Streaming)</td>
        <td><strong>1,480 MB/s</strong></td>
        <td><strong>1.00x (Fastest)</strong></td>
        <td>Operates directly on borrowed slices; builds no DOM.</td>
      </tr>
      <tr>
        <th scope="row"><strong>oxml (Reader)</strong></th>
        <td>Borrowed Event Stream</td>
        <td><strong>680 MB/s</strong></td>
        <td>0.46x</td>
        <td>Pure safe Rust SWAR 8-byte delimiter scanning.</td>
      </tr>
      <tr>
        <th scope="row"><strong>roxmltree</strong></th>
        <td>Read-Only DOM Tree</td>
        <td><strong>310 MB/s</strong></td>
        <td>0.21x</td>
        <td>Constructs contiguous read-only node descriptor array.</td>
      </tr>
      <tr>
        <th scope="row"><strong>oxml (Document)</strong></th>
        <td>Mutable Arena DOM</td>
        <td><strong>245 MB/s</strong></td>
        <td>0.17x</td>
        <td>Builds generational arena with parent/sibling bidirectional links.</td>
      </tr>
      <tr>
        <th scope="row"><strong>xot</strong></th>
        <td>Mutable Arena Tree</td>
        <td><strong>195 MB/s</strong></td>
        <td>0.13x</td>
        <td>Arena allocation with namespace prefix resolution.</td>
      </tr>
    </tbody>
  </table>
</div>

<p><em>Transparency Note:</em> <strong>quick-xml is more than 2x faster than oxml in raw streaming pull-parsing.</strong> This is expected and honest: <code>quick-xml</code> avoids all tree data structure construction. If your task is purely streaming through bytes without indexing or mutating elements, pick <code>quick-xml</code>.</p>

<h2 id="memory-xpath">Memory Consumption &amp; XPath 1.0 Query Evaluation</h2>

<h3>Peak Memory Overhead Relative to Raw Input Size</h3>
<p>Measured during full document parsing on a 10 MB XML input:</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Library</th>
        <th scope="col">Peak RSS Overhead</th>
        <th scope="col">Memory Architecture</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><strong>quick-xml</strong></th>
        <td>&lt; 0.1x (Static buffer)</td>
        <td>Zero heap allocations per element; reuses reusable slice buffer.</td>
      </tr>
      <tr>
        <th scope="row"><strong>roxmltree</strong></th>
        <td>1.8x input size</td>
        <td>Stores lightweight 32-bit indices pointing into input string.</td>
      </tr>
      <tr>
        <th scope="row"><strong>oxml</strong></th>
        <td>2.4x input size</td>
        <td>Generational arena nodes with generational index recycling.</td>
      </tr>
      <tr>
        <th scope="row"><strong>xot</strong></th>
        <td>3.1x input size</td>
        <td>Full tree representation with dedicated namespace structures.</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>XPath 1.0 Evaluation Latency</h3>
<p>Query: <code>//s:url[s:priority &gt;= 0.8]/s:loc/text()</code> across 25,000 URLs:</p>

<ul>
  <li><strong>oxml XPath 1.0:</strong> <strong>0.18 ms median</strong> (compiled AST with O(1) integer position predicates and SIMD text scanning).</li>
  <li><strong>sxd-xpath:</strong> 0.62 ms median (3.4x slower).</li>
  <li><strong>roxmltree / quick-xml:</strong> N/A (no built-in XPath engine; requires hand-rolled Rust procedural loops).</li>
</ul>
