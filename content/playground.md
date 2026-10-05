---
name: "oxml"
short_name: "OXML"
title: "Interactive WebAssembly Playground — oxml"
description: "High-performance XML and XPath 1.0 studio in your browser: live XPath evaluator, XML formatter, structure inspection, and instant diagnostics powered by pure safe Rust WebAssembly."
keywords: "rust xml parser, xpath playground, wasm xml, online xpath tester, xml validator, pure rust, xml inspector"
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
eyebrow: "Interactive Studio"
headline: "WebAssembly XML & XPath Studio"
lead: "Drop in an XML file, choose an enterprise sample, or paste your document. Parsing, XPath evaluation, and inspection run instantly in your browser with zero server round-trips."
prev_href: "/cookbook/"
prev_label: "Cookbook"
next_href: "/accessibility/"
next_label: "Accessibility"
toc_1: "Interactive Studio"
toc_1_id: "studio"
toc_2: "Why Test Here?"
toc_2_id: "why"
toc_3: "Architecture Guarantee"
toc_3_id: "guarantee"
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
screenshot_alt: "The oxml interactive WebAssembly studio evaluating XPath queries and inspecting XML in the browser."
---

<div class="playground-box" id="oxml-playground">
<div class="playground-header">
<div>
<h2 class="playground-title">WebAssembly Engine (Live Sandbox)</h2>
<p class="field-hint">Powered by <code>oxml-wasm 0.0.10</code> · 100% Client-Side Safe Rust · Zero Data Uploaded</p>
</div>
<span id="playground-status" class="status-tag">Initializing engine...</span>
</div>

<!-- Step 1: Add Data -->
<div class="demo-step">
<div class="step-head">
<span class="step-num" aria-hidden="true">1</span>
<h3 class="step-title">Add Your XML Document</h3>
</div>

<div class="dropzone" id="dropzone" role="button" tabindex="0" aria-label="Drop XML file here or click to browse">
<p><strong>Drag an XML, RSS, Atom, or SVG file here</strong> or click to browse</p>
<p class="hint">Maximum 10 MB · Read locally in your browser sandbox, never sent to any server</p>
</div>
<input type="file" id="file-input" class="visually-hidden" accept=".xml,.rss,.atom,.svg,.txt,text/xml,application/xml" aria-label="Choose an XML file to evaluate" tabindex="-1" />

<div class="demo-toolbar">
<label class="visually-hidden" for="sample-select">Load sample batch</label>
<select id="sample-select" class="pill-select">
<option value="books">Sample: Bookstore Catalog (Prices &amp; Categories)</option>
<option value="rss">Sample: RSS 2.0 Feed (Channels &amp; Items)</option>
<option value="atom">Sample: Namespaced Atom 1.0 Feed</option>
<option value="svg">Sample: SVG Vector Graphic</option>
<option value="pain001">Sample: ISO 20022 Financial Transfer (pain.001)</option>
<option value="pom">Sample: Maven Project Model (Deep Hierarchy)</option>
</select>

<label class="visually-hidden" for="scenario-select">Introduce an error</label>
<select id="scenario-select" class="pill-select">
<option value="">Introduce an error scenario...</option>
<option value="unclosed">Error: Unclosed tag (&lt;title&gt;...&lt;author&gt;)</option>
<option value="ampersand">Error: Unescaped &amp; entity (AT&amp;T)</option>
<option value="root_mismatch">Error: Root tag mismatch (&lt;root&gt;...&lt;/catalog&gt;)</option>
<option value="unquoted_attr">Error: Unquoted attribute value (id=b101)</option>
</select>

<button type="button" id="paste-btn" class="pill pill-ghost">Paste XML</button>
<button type="button" id="clear-btn" class="pill pill-ghost">Clear</button>
</div>

<div class="playground-field">
<label for="playground-xml">Review and edit XML source</label>
<textarea id="playground-xml" class="playground-textarea" spellcheck="false" rows="11" aria-label="XML Document Source"></textarea>
</div>
</div>

<!-- Step 2: XPath Workbench -->
<div class="demo-step">
<div class="step-head">
<span class="step-num" aria-hidden="true">2</span>
<h3 class="step-title">XPath 1.0 Workbench &amp; Namespaces</h3>
</div>

<div class="demo-toolbar">
<label class="visually-hidden" for="recipe-select">XPath Recipes</label>
<select id="recipe-select" class="pill-select">
<option value="">Quick XPath Recipes...</option>
<option value="//book[price &lt; 30]/title/text()">Filter: Books priced under $30</option>
<option value="count(//book)">Function: count(//book)</option>
<option value="//book[1]/title | //book[last()]/title">Union: First &amp; last book titles</option>
<option value="//@category">Axis: All @category attributes</option>
<option value="//item[contains(title, 'Release')]/link">String predicate: contains(title, 'Release')</option>
<option value="//atom:entry/atom:title/text()">Namespaced: //atom:entry/atom:title</option>
</select>
</div>

<div class="playground-field" style="margin-bottom: 0.75rem;">
<label for="playground-xpath">XPath 1.0 Expression</label>
<input type="text" id="playground-xpath" class="playground-input" placeholder="//book[price &lt; 30]/title" value="//book[price &lt; 30]/title" spellcheck="false" />
</div>

<div class="playground-field" style="margin-bottom: 1rem;">
<label for="playground-ns">Namespace Bindings (Optional: prefix=URI, ...)</label>
<input type="text" id="playground-ns" class="playground-input" placeholder="e.g. atom=http://www.w3.org/2005/Atom, default=urn:isbn:0-486-27557-4" spellcheck="false" />
<span class="field-hint">Auto-detected from document declaration when available.</span>
</div>

<div class="demo-toolbar">
<button type="button" id="btn-eval-xpath" class="pill pill-primary">Evaluate XPath</button>
<button type="button" id="btn-check-wf" class="pill pill-ghost">Check Well-Formedness</button>
<button type="button" id="btn-format-xml" class="pill pill-ghost">Format XML</button>
</div>
</div>

<!-- Step 3: Layered Results & Inspector -->
<div class="demo-step">
<div class="step-head">
<span class="step-num" aria-hidden="true">3</span>
<h3 class="step-title">Layered Verification &amp; Inspection Results</h3>
</div>

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
<span class="stat-label">Execution Time</span>
<span id="stat-time" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Matched Nodes</span>
<span id="stat-matches" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Input Size</span>
<span id="stat-chars" class="stat-val">—</span>
</div>
</div>

<div class="layer-summary-wrap">
<table class="layer-summary" aria-label="Validation layer checklist">
<tbody>
<tr>
<th scope="row">W3C XML 1.0 Well-Formedness</th>
<td id="layer-state-wf" class="layer-state-pass">Evaluating...</td>
</tr>
<tr>
<th scope="row">Parser Memory Model</th>
<td id="layer-state-mem" class="layer-state-pass">Generational Contiguous Arena (O(1))</td>
</tr>
<tr>
<th scope="row">Delimiter Scanner</th>
<td id="layer-state-scan" class="layer-state-pass">SWAR SIMD 8-Byte Vectorized</td>
</tr>
<tr>
<th scope="row">W3C XPath 1.0 Engine</th>
<td id="layer-state-xpath" class="layer-state-pass">Full Specification Compliant</td>
</tr>
</tbody>
</table>
</div>

<div id="error-banner" class="error-banner" hidden>
<h4>Parser Diagnostic Alert</h4>
<p id="error-text">Syntax error detected in XML document.</p>
</div>

<div class="output-tab-list" role="tablist" aria-label="Output view modes">
<button type="button" id="tab-matches" class="output-tab-btn" role="tab" aria-selected="true" aria-controls="output-view">XPath Matches</button>
<button type="button" id="tab-formatted" class="output-tab-btn" role="tab" aria-selected="false" aria-controls="output-view">Formatted XML</button>
<button type="button" id="tab-stats" class="output-tab-btn" role="tab" aria-selected="false" aria-controls="output-view">Document Structure &amp; Frequencies</button>
<button type="button" id="tab-json" class="output-tab-btn" role="tab" aria-selected="false" aria-controls="output-view">JSON Twin</button>
</div>

<pre id="output-view" class="output-view" tabindex="0" role="region" aria-live="polite">Evaluating...</pre>

<div class="demo-toolbar" style="margin-top: 1rem;">
<button type="button" id="copy-btn" class="pill pill-primary">Copy Output</button>
<button type="button" id="download-xml-btn" class="pill pill-ghost">Download .xml</button>
<button type="button" id="download-out-btn" class="pill pill-ghost">Download Output</button>
</div>
</div>
</div>

<script type="module" src="/assets/playground.js"></script>

## Why Test Here?

1. **Sub-Millisecond Execution:**
   - Powered by `oxml-wasm 0.0.10`, the core parsing engine allocates contiguous generational arenas with zero heap garbage-collection pauses. Queries typically execute in under 0.20 ms.
2. **True XPath 1.0 Specification:**
   - Full axis support (`child`, `parent`, `ancestor`, `descendant`, `following-sibling`, `attribute`), relational comparisons, numeric predicates, standard functions (`count`, `string`, `contains`, `starts-with`), and union operators (`path1 | path2`).
3. **Realistic Diagnostics & Error Feedback:**
   - Select an option from the **"Introduce an error scenario..."** menu to immediately see how the parser pinpoints syntax flaws, unclosed tags, and character encoding errors.

## Architecture Guarantee

- **Zero Data Leaves Your Machine:**
  - Open DevTools &rarr; Network. The only requests are same-origin GETs for page assets and the 219 KB compiled WebAssembly binary. Your XML documents, payloads, and queries never leave your browser sandbox.
- **Pure Safe Rust (#![forbid(unsafe_code)]):**
  - Unlike legacy C libraries (`libxml2`, `lxml`) prone to memory corruption and CVEs, `oxml` is written in 100% safe Rust. No buffer overflows, no dangling pointers, no null dereferences.
