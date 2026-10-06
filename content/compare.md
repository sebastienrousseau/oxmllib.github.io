---
name: "oxml"
short_name: "OXML"
title: "Comparing oxml to Rust XML Libraries — oxml"
description: "An honest technical comparison between oxml, quick-xml, roxmltree, xot, xee, and libxml2. Trade-offs, benchmarks, and when to pick each crate."
keywords: "rust xml comparison, roxmltree vs quick-xml, oxml vs roxmltree, rust xpath, libxml2 alternative rust, xml crate comparison"
author: "Sebastien Rousseau"
date: "2026-10-06"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "compare"
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
eyebrow: "Architecture & Trade-offs"
headline: "Comparing oxml to Rust XML Peers"
lead: "An honest, technical assessment of architectural trade-offs across quick-xml, roxmltree, xot, xee, and libxml2. When to choose oxml, and when to pick an alternative."
prev_href: "/architecture/"
prev_label: "Architecture"
next_href: "/benchmarks/"
next_label: "Benchmarks"
toc_1: "Ecosystem Matrix"
toc_1_id: "matrix"
toc_2: "Head-to-Head Details"
toc_2_id: "head-to-head"
toc_3: "When Not to Use oxml"
toc_3_id: "when-not-to-use"
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
cur_compare: " aria-current=\"page\""
cur_benchmarks: ""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "Technical comparison table between oxml and other Rust XML crates."
---

<h2 id="matrix">Ecosystem Capability Matrix</h2>

<p>Every XML library makes deliberate trade-offs between memory footprint, mutation capability, streaming throughput, and query ergonomics. The table below compares the primary Rust XML libraries as of October 2026.</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Capability</th>
        <th scope="col">oxml</th>
        <th scope="col">quick-xml</th>
        <th scope="col">roxmltree</th>
        <th scope="col">xot</th>
        <th scope="col">xee</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Primary Model</th>
        <td>Mutable Arena DOM</td>
        <td>Pull Parser (Streaming)</td>
        <td>Read-Only Slice Tree</td>
        <td>Mutable Arena Tree</td>
        <td>Read-Only Tree</td>
      </tr>
      <tr>
        <th scope="row">Memory Safety</th>
        <td class="matrix-badge-pass"><code>#![forbid(unsafe_code)]</code></td>
        <td class="matrix-badge-pass">Safe Rust</td>
        <td class="matrix-badge-pass">Safe Rust</td>
        <td class="matrix-badge-pass">Safe Rust</td>
        <td class="matrix-badge-pass">Safe Rust</td>
      </tr>
      <tr>
        <th scope="row">DOM Mutation</th>
        <td class="matrix-badge-pass">O(1) Generational</td>
        <td class="matrix-badge-fail">None (Event Stream)</td>
        <td class="matrix-badge-fail">None (Read-Only)</td>
        <td class="matrix-badge-pass">Arena Mutation</td>
        <td class="matrix-badge-fail">None (Read-Only)</td>
      </tr>
      <tr>
        <th scope="row">XPath Support</th>
        <td class="matrix-badge-pass">W3C XPath 1.0</td>
        <td class="matrix-badge-fail">None</td>
        <td class="matrix-badge-fail">None (Cursor only)</td>
        <td class="matrix-badge-fail">None (Cursor only)</td>
        <td class="matrix-badge-pass">W3C XPath 3.1</td>
      </tr>
      <tr>
        <th scope="row">XML Schema (XSD)</th>
        <td class="matrix-badge-pass">Partial (95.2% W3C)</td>
        <td class="matrix-badge-fail">None</td>
        <td class="matrix-badge-fail">None</td>
        <td class="matrix-badge-fail">None</td>
        <td class="matrix-badge-fail">None</td>
      </tr>
      <tr>
        <th scope="row">WebAssembly</th>
        <td class="matrix-badge-pass">Native (&lt;220 KB)</td>
        <td>Supported (Reader)</td>
        <td>Supported (Read-Only)</td>
        <td>Supported (Tree)</td>
        <td>Supported (Engine)</td>
      </tr>
      <tr>
        <th scope="row">AI Agent (MCP)</th>
        <td class="matrix-badge-pass">Native (oxml-mcp)</td>
        <td class="matrix-badge-fail">None</td>
        <td class="matrix-badge-fail">None</td>
        <td class="matrix-badge-fail">None</td>
        <td class="matrix-badge-fail">None</td>
      </tr>
      <tr>
        <th scope="row">Core Dependencies</th>
        <td>0 (Parser core)</td>
        <td>0 (Minimal)</td>
        <td>0 (Minimal)</td>
        <td>Minimal</td>
        <td>Minimal</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="head-to-head">Head-to-Head Deep Dive</h2>

<h3>1. oxml vs quick-xml</h3>

<p><strong>quick-xml strengths:</strong> With over 379 million downloads, <code>quick-xml</code> is the performance standard for raw streaming pull-parsing in Rust. Because it does not build an in-memory document tree, it achieves streaming throughputs between 1.2 GB/s and 1.5 GB/s with near-zero heap allocations. If you are processing 50 GB log files, financial transaction streams, or running batch ETL where elements are processed and discarded immediately, <strong>quick-xml is the best choice</strong>.</p>

<p><strong>Where oxml wins:</strong> <code>quick-xml</code> does not provide a DOM, XPath evaluation, or schema validation. If your application needs to locate nodes via XPath expressions (such as <code>//soap:Body//m:GetStockPrice</code>), mutate node attributes, re-order children, or serialize formatted XML, <code>quick-xml</code> requires you to implement your own tree data structures. <code>oxml</code> provides a high-level, generational arena DOM with full XPath 1.0 evaluation out of the box.</p>

<h3>2. oxml vs roxmltree</h3>

<p><strong>roxmltree strengths:</strong> <code>roxmltree</code> (&gt;66M downloads) is an exceptionally mature, read-only XML tree representation. By intentionally forbidding mutation and node insertion, it stores the document as a contiguous array of node descriptors referencing the original input string. Memory consumption is predictably low (typically 1.5x to 2x the raw document size), and document parsing is fast and memory-efficient.</p>

<p><strong>Where oxml wins:</strong> <code>roxmltree</code> is strictly read-only. You cannot add children, update text, rename tags, or delete elements. Furthermore, <code>roxmltree</code> does not include an XPath engine; queries must be performed manually using Rust iterator methods (e.g. <code>node.children().filter(...)</code>). <code>oxml</code> combines mutable arena operations with standard XPath 1.0 queries and XSD validation.</p>

<h3>3. oxml vs xot</h3>

<p><strong>xot strengths:</strong> <code>xot</code> is a mutable XML tree library that treats XML namespaces, prefixes, and comments as first-class citizens. Like <code>oxml</code>, it uses an arena allocation pattern to avoid pointer indirection and reference counting cycles.</p>

<p><strong>Where oxml wins:</strong> <code>oxml</code> ships as an integrated ecosystem: a pure-Rust XPath 1.0 engine, partial W3C XML Schema validation (<code>xmlschema</code>), WebAssembly bindings, a developer CLI tool, and an MCP server for AI agents, all versioned together without dependency mismatches.</p>

<h3>4. oxml vs xee</h3>

<p><strong>xee strengths:</strong> <code>xee</code> (developed by Paligo) is the premier pure-Rust implementation of <strong>W3C XPath 3.1</strong> and partial XSLT 3.0. If you require XPath 2.0 or 3.1 capabilities—including regular expression functions (<code>fn:matches</code>), sequence operations, dynamic maps, arrays, or XSLT transformation templates—<strong>xee is the library to choose</strong>.</p>

<p><strong>Where oxml wins:</strong> <code>oxml</code> targets W3C XPath 1.0 and pairs it with mutable DOM manipulation, partial XSD validation, and cross-platform runtimes (WASM, CLI, MCP). If you do not require XPath 3.1 constructs, <code>oxml</code> provides a unified, zero-unsafe package.</p>

<h3>5. oxml vs lxml &amp; libxml2</h3>

<p><strong>libxml2 / lxml context:</strong> <code>libxml2</code> is the venerable C library underlying Python's <code>lxml</code>, R's <code>xml2</code>, and PHP's XML extensions. In 2025, libxml2 experienced a maintainer transition that highlighted long-standing security challenges inherent in large legacy C codebases (buffer overflows, integer overflows, memory exhaustion, and use-after-free bugs).</p>

<p><strong>Where lxml wins:</strong> Decades of maturity, full XSLT 1.0 support, Schematron, RelaxNG, and complete Python ecosystem integration.</p>

<p><strong>Where oxml wins:</strong> Complete memory safety enforced by <code>#![forbid(unsafe_code)]</code> at compile time. Pure Rust ensures that untrusted XML inputs cannot trigger undefined behavior, memory corruption, or remote code execution. <code>oxml</code> compiles cleanly to WebAssembly without Emscripten C runtime shims and provides a native Model Context Protocol (MCP) server for modern AI agent integrations.</p>

<h2 id="when-not-to-use">When Not to Use oxml — Honestly</h2>

<p>We believe engineering honesty builds long-term trust. We explicitly recommend choosing alternative tools under the following conditions:</p>

<ol>
  <li><strong>Multi-Gigabyte Streaming Pipelines:</strong> If your input files exceed available RAM or you only need to extract values sequentially without building a DOM, use <code>quick-xml</code>.</li>
  <li><strong>Strict Read-Only Document Crawling:</strong> If you only need to inspect small-to-medium documents without modifying them or running XPath queries, use <code>roxmltree</code> for minimal memory consumption.</li>
  <li><strong>XPath 3.1 and XSLT Transformations:</strong> If you require XPath 3.1 functions, sequence comprehension, or XSLT stylesheets, use <code>xee</code> or <code>Saxon</code>.</li>
  <li><strong>Exhaustive XSD 1.1 with Complex Redefines:</strong> If you depend on edge-case XSD 1.1 features or complex schema redefinitions, use <code>libxml2</code> or <code>Saxon</code> until <code>xmlschema</code> achieves 100% W3C coverage.</li>
</ol>
