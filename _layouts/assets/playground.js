// SPDX-License-Identifier: MIT OR Apache-2.0
// Copyright (c) 2026 oxml. All rights reserved.

import initWasm, { parse, isWellFormed } from './wasm/oxml_wasm.js';

const SAMPLES = {
  books: {
    name: 'Bookstore Catalog',
    xpath: '//book[price < 30]/title',
    ns: '',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>19.99</price>
  </book>
  <book category="programming">
    <title lang="en">Rust in Action</title>
    <author>Tim McNamara</author>
    <year>2021</year>
    <price>49.99</price>
  </book>
  <book category="philosophy">
    <title lang="en">Meditations</title>
    <author>Marcus Aurelius</author>
    <year>180</year>
    <price>14.50</price>
  </book>
</bookstore>`
  },
  rss: {
    name: 'RSS 2.0 Feed',
    xpath: '/rss/channel/item/title',
    ns: '',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rust Engineering Dispatch</title>
    <link>https://oxmllib.com/</link>
    <description>Zero-unsafe high-throughput XML tooling in Rust</description>
    <item>
      <title>v0.0.10: Zero-Copy Streaming Borrowing Released</title>
      <link>https://oxmllib.com/architecture/</link>
      <pubDate>Mon, 05 Oct 2026 10:00:00 GMT</pubDate>
    </item>
    <item>
      <title>XPath 1.0 Performance: O(1) Index Predicates</title>
      <link>https://oxmllib.com/xpath/</link>
      <pubDate>Sun, 04 Oct 2026 14:00:00 GMT</pubDate>
    </item>
    <item>
      <title>W3C XML Schema Suite Pass Rate Hits 95.2%</title>
      <link>https://oxmllib.com/schema/</link>
      <pubDate>Sat, 03 Oct 2026 09:30:00 GMT</pubDate>
    </item>
  </channel>
</rss>`
  },
  atom: {
    name: 'Namespaced Atom Feed',
    xpath: '//atom:entry/atom:title',
    ns: 'atom=http://www.w3.org/2005/Atom',
    xml: `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Developer News</title>
  <updated>2026-10-05T12:00:00Z</updated>
  <id>urn:uuid:60a76c80-d399-11d9-b93C-0003939e0af6</id>
  <entry>
    <title>High Performance Safe Parsing</title>
    <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</id>
    <updated>2026-10-05T11:45:00Z</updated>
    <summary>How generational arenas prevent dangling pointers.</summary>
  </entry>
  <entry>
    <title>Native Model Context Protocol (MCP) XML Server</title>
    <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6b</id>
    <updated>2026-10-05T09:15:00Z</updated>
    <summary>Structured XML evaluation for Claude and Cursor agents.</summary>
  </entry>
</feed>`
  },
  svg: {
    name: 'SVG Vector Graphic',
    xpath: '//circle/@cx | //rect/@width',
    ns: '',
    xml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect x="10" y="10" width="80" height="80" rx="10" fill="#08417f" />
  <circle cx="50" cy="50" r="30" fill="#93bef7" />
  <circle cx="50" cy="50" r="10" fill="#ffffff" />
</svg>`
  }
};

let wasmReady = false;

async function bootstrap() {
  const statusEl = document.getElementById('playground-status');
  const samplesSelect = document.getElementById('playground-samples');
  const xmlArea = document.getElementById('playground-xml');
  const xpathInput = document.getElementById('playground-xpath');
  const nsInput = document.getElementById('playground-ns');
  const evalBtn = document.getElementById('btn-eval-xpath');
  const wfBtn = document.getElementById('btn-check-wf');
  const formatBtn = document.getElementById('btn-format-xml');
  const outputEl = document.getElementById('playground-output');
  const statRoot = document.getElementById('stat-root');
  const statNodes = document.getElementById('stat-nodes');
  const statTime = document.getElementById('stat-time');
  const statMatches = document.getElementById('stat-matches');

  if (!statusEl || !xmlArea) return;

  try {
    statusEl.textContent = 'Loading oxml-wasm WebAssembly binary...';
    // Determine the base URL dynamically from the script location
    const wasmUrl = new URL('./wasm/oxml_wasm_bg.wasm', import.meta.url);
    await initWasm(wasmUrl);
    wasmReady = true;
    statusEl.textContent = 'oxml-wasm 0.0.10 engine active (#![forbid(unsafe_code)])';
    statusEl.className = 'status-tag status-success';
  } catch (err) {
    statusEl.textContent = 'WASM initialization failed: ' + (err.message || err);
    statusEl.className = 'status-tag status-error';
    if (outputEl) {
      outputEl.textContent = 'Error loading WebAssembly module:\n' + (err.stack || err);
    }
    return;
  }

  function setSample(key) {
    const s = SAMPLES[key];
    if (!s) return;
    xmlArea.value = s.xml;
    xpathInput.value = s.xpath;
    nsInput.value = s.ns;
    runEvaluation();
  }

  function runEvaluation() {
    if (!wasmReady) return;
    const xml = xmlArea.value;
    const xpath = xpathInput.value.trim();
    const nsStr = nsInput.value.trim();

    const namespaces = nsStr ? nsStr.split(',').map(s => s.trim()).filter(Boolean) : null;

    const t0 = performance.now();
    try {
      const doc = parse(xml);
      const parseTime = performance.now() - t0;

      statRoot.textContent = doc.rootName() || '(none)';
      statNodes.textContent = doc.size.toString();

      if (!xpath) {
        statMatches.textContent = '0';
        statTime.textContent = parseTime.toFixed(2) + ' ms';
        outputEl.textContent = '<!-- XML is well-formed. Specify an XPath query above to evaluate. -->';
        return;
      }

      const q0 = performance.now();
      let count = 0;
      let results = [];
      let isScalar = false;
      let scalarVal = '';

      try {
        count = doc.queryCount(xpath, namespaces);
        results = doc.queryText(xpath, namespaces);
      } catch (countErr) {
        // Might be a scalar expression like count(...) or string(...)
        try {
          scalarVal = doc.queryValue(xpath, namespaces);
          isScalar = true;
        } catch {
          throw countErr;
        }
      }

      const totalTime = performance.now() - t0;
      statTime.textContent = totalTime.toFixed(2) + ' ms';

      if (isScalar) {
        statMatches.textContent = '1 (scalar)';
        outputEl.textContent = `Result (scalar value):\n\n${scalarVal}`;
      } else {
        statMatches.textContent = `${count} match${count === 1 ? '' : 'es'}`;
        if (results.length === 0) {
          outputEl.textContent = `XPath query returned 0 matches for: ${xpath}`;
        } else {
          outputEl.textContent = results.map((r, i) => `[${i + 1}] ${r}`).join('\n\n');
        }
      }
    } catch (err) {
      statTime.textContent = (performance.now() - t0).toFixed(2) + ' ms';
      statMatches.textContent = 'Error';
      outputEl.textContent = `Evaluation Error:\n${err.message || err}`;
    }
  }

  function checkWellFormed() {
    if (!wasmReady) return;
    const xml = xmlArea.value;
    const t0 = performance.now();
    const wf = isWellFormed(xml);
    const elapsed = (performance.now() - t0).toFixed(2);
    statTime.textContent = `${elapsed} ms`;

    if (wf) {
      try {
        const doc = parse(xml);
        statRoot.textContent = doc.rootName() || '(none)';
        statNodes.textContent = doc.size.toString();
        statMatches.textContent = 'Valid';
        outputEl.textContent = `Well-Formedness Check: PASSED\n\n- Syntax: 100% valid XML 1.0\n- Root element: <${doc.rootName()}>\n- Total DOM nodes: ${doc.size}\n- Verification time: ${elapsed} ms`;
      } catch (e) {
        outputEl.textContent = `Well-Formedness Check: PASSED (${elapsed} ms)`;
      }
    } else {
      statMatches.textContent = 'Invalid';
      outputEl.textContent = `Well-Formedness Check: FAILED\n\nThe XML document is NOT well-formed.`;
    }
  }

  function formatXml() {
    if (!wasmReady) return;
    const xml = xmlArea.value;
    const t0 = performance.now();
    try {
      const doc = parse(xml);
      const formatted = doc.toXml();
      const elapsed = (performance.now() - t0).toFixed(2);
      statTime.textContent = `${elapsed} ms`;
      statRoot.textContent = doc.rootName() || '(none)';
      statNodes.textContent = doc.size.toString();
      outputEl.textContent = formatted;
    } catch (err) {
      outputEl.textContent = `Serialization Error:\n${err.message || err}`;
    }
  }

  if (samplesSelect) {
    samplesSelect.addEventListener('change', (e) => {
      setSample(e.target.value);
    });
  }

  if (evalBtn) {
    evalBtn.addEventListener('click', runEvaluation);
  }

  if (wfBtn) {
    wfBtn.addEventListener('click', checkWellFormed);
  }

  if (formatBtn) {
    formatBtn.addEventListener('click', formatXml);
  }

  xpathInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runEvaluation();
    }
  });

  nsInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runEvaluation();
    }
  });

  // Load initial sample
  setSample('books');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
