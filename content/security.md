---
name: "oxml"
short_name: "OXML"
title: "Security Architecture & Threat Model — oxml"
description: "Zero unsafe code, W3C entity expansion limits, XXE mitigation, continuous fuzzing, and responsible vulnerability disclosure."
keywords: "rust xml security, xxe rust, billion laughs rust, forbid unsafe code, xml parser security"
author: "Sebastien Rousseau"
date: "2026-10-06"
layout: "doc"
language: "en"
lang_code: "EN"
lang_change: "Change language"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "security"
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
eyebrow: "Assurance & Hardening"
headline: "Security Architecture & Threat Model"
lead: "Engineered from the ground up for memory safety: #![forbid(unsafe_code)], proactive defenses against XXE and Billion Laughs attacks, and automated continuous fuzzing."
prev_href: "/conformance/"
prev_label: "W3C Conformance"
next_href: "/migrate-lxml/"
next_label: "Migrating from lxml"
toc_1: "Memory Safety Guarantees"
toc_1_id: "memory-safety"
toc_2: "XML Attack Mitigations"
toc_2_id: "threat-model"
toc_3: "Fuzzing & Vulnerability Policy"
toc_3_id: "fuzzing-policy"
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
cur_benchmarks: ""
cur_security: " aria-current=\"page\""
form_origin: "https://oxmllib.com"
screenshot_alt: "Security architecture and XML threat model documentation for oxml."
---

<h2 id="memory-safety">Memory Safety &amp; Zero-Unsafe Guarantee</h2>

<p>Historically, XML parsers implemented in C and C++ (including <code>libxml2</code>, <code>Expat</code>, and <code>Xerces</code>) have been subject to severe memory safety vulnerabilities: buffer overruns, use-after-free conditions, integer truncation, and out-of-bounds pointer arithmetic.</p>

<p><code>oxml</code> guarantees compile-time memory safety across its entire codebase:</p>

<ul>
  <li><strong><code>#![forbid(unsafe_code)]</code>:</strong> Statically enforced at the root of every crate in the workspace. Any attempt to introduce an <code>unsafe</code> block fails compilation during <code>cargo check</code> and CI gating.</li>
  <li><strong>Generational Arena Management:</strong> DOM node lifetimes are bounded by the document container. Node relationships use safe generational indices instead of raw pointers, eliminating dangling references and use-after-free bugs.</li>
  <li><strong>Zero External Dependencies:</strong> The core parser and DOM modules depend strictly on the Rust standard library (and <code>core</code>/<code>alloc</code> under <code>no_std</code>), eliminating transitive supply-chain risks.</li>
</ul>

<h2 id="threat-model">XML Attack Mitigations &amp; Threat Model</h2>

<p>Untrusted XML documents can be crafted maliciously to exhaust CPU, consume unbounded RAM, or exfiltrate private system files. <code>oxml</code> implements strict, deterministic defenses against standard XML attack vectors:</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Vulnerability Class</th>
        <th scope="col">Attack Vector</th>
        <th scope="col">oxml Mitigation Strategy</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><strong>XXE Injection (CWE-611)</strong></th>
        <td>External DTDs and <code>SYSTEM</code> entities attempting to read local files (e.g. <code>/etc/passwd</code>) or trigger SSRF network requests.</td>
        <td class="matrix-badge-pass"><strong>Disabled by default.</strong> External DTD retrieval is disabled. No network sockets or filesystem reads are ever initiated during parsing.</td>
      </tr>
      <tr>
        <th scope="row"><strong>Billion Laughs (CWE-776)</strong></th>
        <td>Exponential entity expansion where recursive internal general entities expand into gigabytes of memory.</td>
        <td class="matrix-badge-pass"><strong>Bounded expansion depth.</strong> Recursion depth is capped at 32 levels, and total expanded entity byte count is capped at 10 MB. Exceeding limits aborts parsing immediately.</td>
      </tr>
      <tr>
        <th scope="row"><strong>Quadratic Blowup</strong></th>
        <td>Thousands of large entities defined within a single DTD to consume CPU time quadratically.</td>
        <td class="matrix-badge-pass"><strong>Linear scan threshold.</strong> Cumulative entity expansion length is tracked globally against input length.</td>
      </tr>
      <tr>
        <th scope="row"><strong>Stack Overflow / Deep Nesting</strong></th>
        <td>XML documents with thousands of deeply nested open tags designed to smash the call stack.</td>
        <td class="matrix-badge-pass"><strong>Maximum depth limit.</strong> Maximum element nesting depth is enforced (default 512). Parsing fails deterministically with <code>SyntaxError::DepthLimitExceeded</code>.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="fuzzing-policy">Continuous Fuzzing &amp; Vulnerability Disclosure</h2>

<h3>Continuous Fuzzing Harnesses</h3>
<p>All parsers and XPath evaluators are subjected to continuous fuzzing using <code>cargo-fuzz</code> (backed by LLVM LibFuzzer) and <code>honggfuzz-rs</code>:</p>

<ul>
  <li>Fuzz targets cover streaming token parsing, XPath query compilation, and XSD facet validation.</li>
  <li>Corpus includes W3C XML conformance suites, AFL/LibFuzzer regression dictionaries, and mutated malformed XML inputs.</li>
  <li>Automated GitHub Actions CI runs <code>cargo-deny</code> and <code>cargo-audit</code> to verify that dependencies have no known security advisories.</li>
</ul>

<h3>Responsible Vulnerability Disclosure</h3>
<p>If you identify a security defect, unexpected panic, or resource exhaustion vulnerability in any <code>oxml</code> crate:</p>

<ol>
  <li><strong>Email:</strong> Send a confidential report to <a href="mailto:security@oxmllib.com"><code>security@oxmllib.com</code></a>.</li>
  <li><strong>GitHub Security Advisories:</strong> Alternatively, open a private vulnerability report via <a href="https://github.com/sebastienrousseau/oxml/security/advisories/new">GitHub Security Advisory</a>.</li>
  <li><strong>SLA:</strong> We acknowledge reports within <strong>24 hours</strong>, provide an initial assessment within <strong>48 hours</strong>, and coordinate CVE assignment and patch release within <strong>7 days</strong>.</li>
</ol>
