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
nav_migrate_lxml: "Migrating from lxml"
nav_migrate_roxmltree: "Migrating from roxmltree"
nav_cookbook: "Cookbook"
nav_playground: "Playground"
nav_compare: "Compare Libraries"
nav_benchmarks: "Benchmarks"
nav_security: "Security"
footer_note: "A pure Rust XML toolkit with zero unsafe code, published under MIT or Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Licensed under MIT or Apache-2.0."
eyebrow: "Standards & Verification"
headline: "W3C Standards Conformance"
lead: "Rigorously validated against official W3C XML 1.0, W3C XML Schema (XSD), and XPath 1.0 test suites with continuous regression ratchets."
prev_href: "/benchmarks/"
prev_label: "Benchmarks"
next_href: "/security/"
next_label: "Security"
toc_1: "XML 1.0 Conformance"
toc_1_id: "xml-conformance"
toc_2: "XML Schema (XSD) Suite"
toc_2_id: "xsd-conformance"
toc_3: "XPath 1.0 Validation"
toc_3_id: "xpath-conformance"
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

<h2 id="xml-conformance">W3C XML 1.0 Conformance Suite</h2>

<p><code>oxml</code> integrates the official W3C XML Conformance Test Suite (<code>xmlts20130923</code>) directly into continuous integration:</p>

<ul>
  <li><strong>XML 1.0 (Fifth Edition) Compliance:</strong> Validates character ranges, UTF-8/UTF-16 encoding decoding, element nesting, and entity replacement.</li>
  <li><strong>Well-Formedness Gate:</strong> 100% pass rate across all valid and invalid test documents in the core W3C suite.</li>
  <li><strong>Deterministic Diagnostics:</strong> Rejects invalid XML with precise line, column, and byte-offset error coordinates.</li>
</ul>

<h2 id="xsd-conformance">W3C XML Schema (XSD) Conformance</h2>

<p><code>xmlschema</code> is verified continuously against the official W3C XML Schema Test Suite (<code>xsts-2007-06-20</code>), pinned cryptographically by SHA-256 hash:</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Test Metric</th>
        <th scope="col">Count / Rate</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Total Test Cases in Suite</th>
        <td>39,420 tests</td>
        <td class="matrix-badge-pass">Executed in automated CI</td>
      </tr>
      <tr>
        <th scope="row">Decided Test Cases</th>
        <td>35,942 tests</td>
        <td class="matrix-badge-pass">Evaluated under release mode</td>
      </tr>
      <tr>
        <th scope="row">Passing Test Cases</th>
        <td>34,226 passed</td>
        <td class="matrix-badge-pass"><strong>95.2% pass rate</strong></td>
      </tr>
      <tr>
        <th scope="row">Failing Test Cases</th>
        <td>1,716 failed</td>
        <td>Cataloged in baseline ratchet</td>
      </tr>
      <tr>
        <th scope="row">Panic / Crash Count</th>
        <td><strong>0 panics</strong></td>
        <td class="matrix-badge-pass">100% panic-free termination</td>
      </tr>
    </tbody>
  </table>
</div>

<p>A ratcheted baseline file guards against any regression: if any previously passing test fails in a pull request, CI immediately fails the build.</p>

<h2 id="xpath-conformance">XPath 1.0 Specification Conformance</h2>

<p>The <code>oxml</code> XPath engine is tested against the OASIS and W3C XPath 1.0 specification suites:</p>

<ul>
  <li><strong>Axis Navigation:</strong> Complete support for all 13 axes: <code>child</code>, <code>descendant</code>, <code>parent</code>, <code>ancestor</code>, <code>following-sibling</code>, <code>preceding-sibling</code>, <code>following</code>, <code>preceding</code>, <code>attribute</code>, <code>namespace</code>, <code>self</code>, <code>descendant-or-self</code>, <code>ancestor-or-self</code>.</li>
  <li><strong>Standard Functions:</strong> <code>count()</code>, <code>id()</code>, <code>local-name()</code>, <code>namespace-uri()</code>, <code>name()</code>, <code>string()</code>, <code>concat()</code>, <code>starts-with()</code>, <code>contains()</code>, <code>substring-before()</code>, <code>substring-after()</code>, <code>substring()</code>, <code>string-length()</code>, <code>normalize-space()</code>, <code>translate()</code>, <code>boolean()</code>, <code>not()</code>, <code>true()</code>, <code>false()</code>, <code>lang()</code>, <code>number()</code>, <code>sum()</code>, <code>floor()</code>, <code>ceiling()</code>, <code>round()</code>.</li>
  <li><strong>Performance Guarantee:</strong> Fast-path optimization for 1-based integer position predicates (e.g. <code>[1]</code>, <code>[last()]</code>) evaluates in O(1) time without full node-set materialization.</li>
</ul>

<p>For throughput and latency numbers across different corpus sizes, see the dedicated <a href="/benchmarks/">Benchmarks page</a>.</p>
