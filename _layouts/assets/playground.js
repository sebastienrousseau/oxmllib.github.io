// SPDX-License-Identifier: MIT OR Apache-2.0
// Copyright (c) 2026 oxml. All rights reserved.

import initWasm, { parse, isWellFormed } from './wasm/oxml_wasm.js';

const SAMPLES = {
  books: {
    name: 'Bookstore Catalog (Numeric Predicates & Filters)',
    xpath: '//book[price < 30]/title',
    ns: '',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction" id="b101">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>19.99</price>
  </book>
  <book category="programming" id="b102">
    <title lang="en">Rust in Action</title>
    <author>Tim McNamara</author>
    <year>2021</year>
    <price>49.99</price>
  </book>
  <book category="philosophy" id="b103">
    <title lang="en">Meditations</title>
    <author>Marcus Aurelius</author>
    <year>180</year>
    <price>14.50</price>
  </book>
</bookstore>`
  },
  rss: {
    name: 'RSS 2.0 Newsfeed (Channels & Items)',
    xpath: '/rss/channel/item/title',
    ns: '',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rust Systems Dispatch</title>
    <link>https://oxmllib.com/</link>
    <description>Zero-unsafe XML high-throughput engineering</description>
    <language>en-gb</language>
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
    name: 'Namespaced Atom 1.0 Feed (Prefix Binding)',
    xpath: '//atom:entry/atom:title',
    ns: 'atom=http://www.w3.org/2005/Atom',
    xml: `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Engineering Releases</title>
  <updated>2026-10-05T12:00:00Z</updated>
  <id>urn:uuid:60a76c80-d399-11d9-b93C-0003939e0af6</id>
  <entry>
    <title>Zero-Copy Memory Bounded Parser</title>
    <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</id>
    <updated>2026-10-05T11:45:00Z</updated>
    <summary>Constant 34 KB memory footprint across gigabyte streams.</summary>
  </entry>
  <entry>
    <title>Native Model Context Protocol (MCP) XML Server</title>
    <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6b</id>
    <updated>2026-10-05T09:15:00Z</updated>
    <summary>Structured XML tools for autonomous AI agent pipelines.</summary>
  </entry>
</feed>`
  },
  svg: {
    name: 'SVG 2.0 Vector Graphics (Attributes & Unions)',
    xpath: '//circle/@cx | //rect/@width',
    ns: '',
    xml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect x="10" y="10" width="80" height="80" rx="10" fill="#08417f" />
  <circle cx="50" cy="50" r="30" fill="#93bef7" />
  <circle cx="50" cy="50" r="10" fill="#ffffff" />
</svg>`
  },
  pain001: {
    name: 'ISO 20022 Financial Transfer (pain.001)',
    xpath: '//CdtTrfTxInf/Amt/InstdAmt',
    ns: '',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>MSG-20261005-001</MsgId>
      <CreDtTm>2026-10-05T14:30:00Z</CreDtTm>
      <NbOfTxs>2</NbOfTxs>
      <CtrlSum>12500.50</CtrlSum>
      <InitgPty><Nm>Acme Treasury Corp</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PMT-001</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <ReqdExctnDt><Dt>2026-10-06</Dt></ReqdExctnDt>
      <Dbtr><Nm>Acme Treasury Corp</Nm></Dbtr>
      <CdtTrfTxInf>
        <PmtId><EndToEndId>E2E-1001</EndToEndId></PmtId>
        <Amt><InstdAmt Ccy="EUR">7500.00</InstdAmt></Amt>
        <Cdtr><Nm>Global Logistics Ltd</Nm></Cdtr>
      </CdtTrfTxInf>
      <CdtTrfTxInf>
        <PmtId><EndToEndId>E2E-1002</EndToEndId></PmtId>
        <Amt><InstdAmt Ccy="EUR">5000.50</InstdAmt></Amt>
        <Cdtr><Nm>Cloud Services AG</Nm></Cdtr>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>`
  },
  pom: {
    name: 'Maven Project Model (Deep Hierarchy)',
    xpath: '//dependency[scope="test"]/artifactId',
    ns: '',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.oxmllib</groupId>
  <artifactId>enterprise-gateway</artifactId>
  <version>0.0.10</version>
  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.17.0</version>
      <scope>compile</scope>
    </dependency>
  </dependencies>
</project>`
  }
};

const ERROR_SCENARIOS = {
  unclosed: {
    name: 'Unclosed tag (<title>...<author>)',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title>The Great Gatsby
    <author>F. Scott Fitzgerald</author>
  </book>
</bookstore>`
  },
  ampersand: {
    name: 'Unescaped & entity (AT&T)',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<company>
  <name>AT&T Telecommunications</name>
</company>`
  },
  root_mismatch: {
    name: 'Root tag mismatch (<root>...</catalog>)',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <item>Sample Content</item>
</catalog>`
  },
  unquoted_attr: {
    name: 'Unquoted attribute value (id=b1)',
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id=b101>Rust Systems</book>
</library>`
  }
};

let wasmReady = false;
let currentDoc = null;
let currentOutputTab = 'matches';

async function bootstrap() {
  const statusEl = document.getElementById('playground-status');
  const samplesSelect = document.getElementById('sample-select');
  const scenarioSelect = document.getElementById('scenario-select');
  const recipeSelect = document.getElementById('recipe-select');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const pasteBtn = document.getElementById('paste-btn');
  const clearBtn = document.getElementById('clear-btn');
  const xmlArea = document.getElementById('playground-xml');
  const xpathInput = document.getElementById('playground-xpath');
  const nsInput = document.getElementById('playground-ns');
  const evalBtn = document.getElementById('btn-eval-xpath');
  const wfBtn = document.getElementById('btn-check-wf');
  const formatBtn = document.getElementById('btn-format-xml');
  const copyBtn = document.getElementById('copy-btn');
  const downloadXmlBtn = document.getElementById('download-xml-btn');
  const downloadOutBtn = document.getElementById('download-out-btn');
  const outputEl = document.getElementById('output-view');
  const errorBanner = document.getElementById('error-banner');
  const errorText = document.getElementById('error-text');

  // Telemetry stats
  const statRoot = document.getElementById('stat-root');
  const statNodes = document.getElementById('stat-nodes');
  const statTime = document.getElementById('stat-time');
  const statMatches = document.getElementById('stat-matches');
  const statChars = document.getElementById('stat-chars');

  // Layered checklist
  const layerWf = document.getElementById('layer-state-wf');
  const layerMem = document.getElementById('layer-state-mem');
  const layerScan = document.getElementById('layer-state-scan');
  const layerXpath = document.getElementById('layer-state-xpath');

  // Tabs
  const tabMatches = document.getElementById('tab-matches');
  const tabFormatted = document.getElementById('tab-formatted');
  const tabStats = document.getElementById('tab-stats');
  const tabJson = document.getElementById('tab-json');

  if (!statusEl || !xmlArea) return;

  async function loadWasmWithRetry(maxAttempts = 3) {
    const wasmUrl = new URL('./wasm/oxml_wasm_bg.wasm', import.meta.url);
    let lastError = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const resp = await fetch(wasmUrl);
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status} (${resp.statusText || 'Service Temporarily Unavailable'})`);
        }
        const bytes = await resp.arrayBuffer();
        await initWasm({ module_or_path: bytes });
        return;
      } catch (e) {
        lastError = e;
        if (attempt < maxAttempts) {
          statusEl.textContent = `Retrying engine load (attempt ${attempt + 1}/${maxAttempts})...`;
          await new Promise((r) => setTimeout(r, attempt * 400));
        }
      }
    }
    throw lastError;
  }

  try {
    statusEl.textContent = 'Loading oxml-wasm WebAssembly binary...';
    await loadWasmWithRetry(3);
    wasmReady = true;
    statusEl.textContent = 'oxml-wasm 0.0.10 engine active (#![forbid(unsafe_code)])';
    statusEl.className = 'status-tag status-success';
  } catch (err) {
    statusEl.textContent = 'WASM initialization failed: ' + (err.message || err);
    statusEl.className = 'status-tag status-error';
    if (outputEl) {
      outputEl.textContent = 'Error loading WebAssembly module:\n' + (err.stack || err) + '\n\nPlease check your network connection or click below to retry.';
    }
    if (!document.getElementById('btn-retry-wasm')) {
      const retryBtn = document.createElement('button');
      retryBtn.type = 'button';
      retryBtn.id = 'btn-retry-wasm';
      retryBtn.className = 'pill pill-primary';
      retryBtn.style.marginTop = '0.5rem';
      retryBtn.textContent = 'Retry Engine Load';
      retryBtn.addEventListener('click', () => {
        retryBtn.remove();
        bootstrap();
      });
      statusEl.parentNode.appendChild(retryBtn);
    }
    return;
  }

  function autoDetectNamespaces(xml) {
    const nsMap = [];
    const prefixMatches = xml.matchAll(/xmlns:([a-zA-Z0-9_-]+)=["']([^"']+)["']/g);
    for (const match of prefixMatches) {
      nsMap.push(`${match[1]}=${match[2]}`);
    }
    const defaultMatch = xml.match(/xmlns=["']([^"']+)["']/);
    if (defaultMatch && !nsMap.some(n => n.startsWith('default='))) {
      nsMap.push(`ns=${defaultMatch[1]}`);
    }
    return nsMap.join(', ');
  }

  function updateCharCount() {
    if (statChars) {
      statChars.textContent = `${xmlArea.value.length.toLocaleString()} bytes`;
    }
  }

  function setSample(key) {
    const s = SAMPLES[key];
    if (!s) return;
    xmlArea.value = s.xml;
    xpathInput.value = s.xpath;
    nsInput.value = s.ns || autoDetectNamespaces(s.xml);
    updateCharCount();
    runEvaluation();
  }

  function setErrorScenario(key) {
    const scenario = ERROR_SCENARIOS[key];
    if (!scenario) return;
    xmlArea.value = scenario.xml;
    xpathInput.value = '/*';
    nsInput.value = '';
    updateCharCount();
    runEvaluation();
  }

  function simpleXmlToJson(xml) {
    try {
      const parser = new DOMParser();
      const dom = parser.parseFromString(xml, 'text/xml');
      function nodeToObj(node) {
        if (node.nodeType === 3) return node.nodeValue.trim();
        const obj = {};
        if (node.attributes && node.attributes.length > 0) {
          obj['@attributes'] = {};
          for (let i = 0; i < node.attributes.length; i++) {
            const a = node.attributes[i];
            obj['@attributes'][a.nodeName] = a.nodeValue;
          }
        }
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (child.nodeType === 3) {
            const txt = child.nodeValue.trim();
            if (txt) obj['#text'] = txt;
          } else if (child.nodeType === 1) {
            if (!obj[child.nodeName]) {
              obj[child.nodeName] = nodeToObj(child);
            } else {
              if (!Array.isArray(obj[child.nodeName])) {
                obj[child.nodeName] = [obj[child.nodeName]];
              }
              obj[child.nodeName].push(nodeToObj(child));
            }
          }
        }
        return obj;
      }
      return JSON.stringify({ [dom.documentElement.nodeName]: nodeToObj(dom.documentElement) }, null, 2);
    } catch {
      return '{\n  "error": "Could not convert malformed XML to JSON twin"\n}';
    }
  }

  function computeStats(xml, doc) {
    const tagMatches = xml.matchAll(/<([a-zA-Z0-9_:-]+)[\s>]/g);
    const frequencies = {};
    for (const m of tagMatches) {
      if (!m[1].startsWith('/') && !m[1].startsWith('?')) {
        frequencies[m[1]] = (frequencies[m[1]] || 0) + 1;
      }
    }
    const freqList = Object.entries(frequencies)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `  <${k}> : ${v}`)
      .join('\n');

    let maxDepth = 0;
    let curDepth = 0;
    for (const char of xml) {
      if (char === '<') curDepth++;
      if (char === '>') {
        if (curDepth > maxDepth) maxDepth = curDepth;
        curDepth = Math.max(0, curDepth - 1);
      }
    }

    return `DOCUMENT INSPECTION REPORT\n==========================\n\n` +
      `Root Element       : <${doc.rootName() || 'none'}>\n` +
      `Total Node Count   : ${doc.size.toLocaleString()}\n` +
      `Approximate Depth  : ${maxDepth}\n` +
      `Raw Input Size     : ${xml.length.toLocaleString()} bytes\n` +
      `Memory Footprint   : Arena-managed generational contiguous buffer\n\n` +
      `ELEMENT TAG FREQUENCIES:\n` +
      `${freqList || '  (none)'}\n`;
  }

  function renderOutput() {
    if (!currentDoc) return;
    const xpath = xpathInput.value.trim();
    const nsStr = nsInput.value.trim();
    const namespaces = nsStr ? nsStr.split(',').map((s) => s.trim()).filter(Boolean) : null;

    if (currentOutputTab === 'matches') {
      if (!xpath) {
        outputEl.textContent = '<!-- XML is well-formed. Specify an XPath query above to evaluate. -->';
        return;
      }
      try {
        let isScalar = false;
        let scalarVal = '';
        let count = 0;
        let results = [];
        try {
          count = currentDoc.queryCount(xpath, namespaces);
          results = currentDoc.queryText(xpath, namespaces);
        } catch (countErr) {
          try {
            scalarVal = currentDoc.queryValue(xpath, namespaces);
            isScalar = true;
          } catch {
            throw countErr;
          }
        }

        if (isScalar) {
          outputEl.textContent = `Result (XPath scalar value):\n\n${scalarVal}`;
        } else {
          if (results.length === 0) {
            outputEl.textContent = `XPath query returned 0 matches for:\n${xpath}`;
          } else {
            outputEl.textContent = `MATCHED NODES (${count} total):\n====================\n\n` +
              results.map((r, i) => `[${i + 1}] ${r}`).join('\n\n');
          }
        }
      } catch (err) {
        outputEl.textContent = `XPath Evaluation Error:\n${err.message || err}`;
      }
    } else if (currentOutputTab === 'formatted') {
      try {
        outputEl.textContent = currentDoc.toXml();
      } catch (err) {
        outputEl.textContent = `Serialization Error:\n${err.message || err}`;
      }
    } else if (currentOutputTab === 'stats') {
      outputEl.textContent = computeStats(xmlArea.value, currentDoc);
    } else if (currentOutputTab === 'json') {
      outputEl.textContent = simpleXmlToJson(xmlArea.value);
    }
  }

  function runEvaluation() {
    if (!wasmReady) return;
    const xml = xmlArea.value;
    const xpath = xpathInput.value.trim();
    const nsStr = nsInput.value.trim();
    const namespaces = nsStr ? nsStr.split(',').map((s) => s.trim()).filter(Boolean) : null;

    updateCharCount();
    const t0 = performance.now();

    try {
      currentDoc = parse(xml);
      const parseTime = performance.now() - t0;

      // Hide error alert
      if (errorBanner) errorBanner.hidden = true;

      // Update telemetry
      statRoot.textContent = currentDoc.rootName() || '(none)';
      statNodes.textContent = currentDoc.size.toLocaleString();
      layerWf.textContent = 'Passed (Well-Formed XML 1.0)';
      layerWf.className = 'layer-state-pass';
      layerMem.textContent = 'Arena recycled (Generational O(1))';
      layerMem.className = 'layer-state-pass';
      layerScan.textContent = 'SWAR SIMD 8-byte chunked';
      layerScan.className = 'layer-state-pass';

      // Evaluate XPath
      if (!xpath) {
        statMatches.textContent = '0';
        statTime.textContent = parseTime.toFixed(2) + ' ms';
        layerXpath.textContent = 'Idle (No expression specified)';
        layerXpath.className = '';
      } else {
        let count = 0;
        let isScalar = false;
        try {
          count = currentDoc.queryCount(xpath, namespaces);
        } catch {
          try {
            currentDoc.queryValue(xpath, namespaces);
            isScalar = true;
          } catch (e) {
            throw e;
          }
        }
        const totalTime = performance.now() - t0;
        statTime.textContent = totalTime.toFixed(2) + ' ms';
        if (isScalar) {
          statMatches.textContent = '1 (scalar)';
          layerXpath.textContent = `Executed scalar (${totalTime.toFixed(2)} ms)`;
        } else {
          statMatches.textContent = `${count} match${count === 1 ? '' : 'es'}`;
          layerXpath.textContent = `Evaluated (${count} matches in ${totalTime.toFixed(2)} ms)`;
        }
        layerXpath.className = 'layer-state-pass';
      }

      renderOutput();
    } catch (err) {
      statTime.textContent = (performance.now() - t0).toFixed(2) + ' ms';
      statMatches.textContent = 'Error';
      layerWf.textContent = 'Failed (Syntax / Parser Error)';
      layerWf.className = 'layer-state-fail';
      layerXpath.textContent = 'Aborted';
      layerXpath.className = 'layer-state-fail';

      if (errorBanner && errorText) {
        errorBanner.hidden = false;
        errorText.textContent = err.message || err;
      }
      outputEl.textContent = `Parser / XPath Diagnostics Error:\n\n${err.message || err}\n\nReview the document around the indicated location or click 'Fix it' if available.`;
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
      if (errorBanner) errorBanner.hidden = true;
      try {
        const doc = parse(xml);
        currentDoc = doc;
        statRoot.textContent = doc.rootName() || '(none)';
        statNodes.textContent = doc.size.toLocaleString();
        statMatches.textContent = 'Valid';
        outputEl.textContent = `WELL-FORMEDNESS GATE: PASSED (100% Conforming XML 1.0)\n======================================================\n\n` +
          `• Syntax          : Well-formed\n` +
          `• Root Element    : <${doc.rootName()}>\n` +
          `• Arena Nodes     : ${doc.size.toLocaleString()}\n` +
          `• Processing Time : ${elapsed} ms\n` +
          `• Memory Security : Pure safe Rust (#![forbid(unsafe_code)])\n`;
      } catch (e) {
        outputEl.textContent = `Well-Formedness: PASSED (${elapsed} ms)`;
      }
    } else {
      if (errorBanner && errorText) {
        errorBanner.hidden = false;
        errorText.textContent = 'The document is NOT well-formed XML 1.0.';
      }
      statMatches.textContent = 'Invalid';
      outputEl.textContent = `WELL-FORMEDNESS GATE: FAILED\n============================\n\nThe XML document violates W3C XML 1.0 syntax rules.`;
    }
  }

  function formatXml() {
    if (!wasmReady) return;
    try {
      const doc = parse(xmlArea.value);
      const formatted = doc.toXml();
      xmlArea.value = formatted;
      currentDoc = doc;
      currentOutputTab = 'formatted';
      updateTabButtons();
      renderOutput();
    } catch (err) {
      outputEl.textContent = `Formatting Error:\n${err.message || err}`;
    }
  }

  function updateTabButtons() {
    [
      { id: 'matches', btn: tabMatches },
      { id: 'formatted', btn: tabFormatted },
      { id: 'stats', btn: tabStats },
      { id: 'json', btn: tabJson }
    ].forEach(({ id, btn }) => {
      if (btn) {
        btn.setAttribute('aria-selected', id === currentOutputTab ? 'true' : 'false');
      }
    });
  }

  // Tab switching
  [
    { id: 'matches', btn: tabMatches },
    { id: 'formatted', btn: tabFormatted },
    { id: 'stats', btn: tabStats },
    { id: 'json', btn: tabJson }
  ].forEach(({ id, btn }) => {
    if (btn) {
      btn.addEventListener('click', () => {
        currentOutputTab = id;
        updateTabButtons();
        renderOutput();
      });
    }
  });

  // Dropzone drag & drop handlers
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFile(e.target.files[0]);
      }
    });
  }

  function handleFile(file) {
    if (file.size > 10 * 1024 * 1024) {
      alert('File exceeds 10 MB limit for client-side evaluation.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      xmlArea.value = e.target.result;
      nsInput.value = autoDetectNamespaces(e.target.result);
      xpathInput.value = '/*';
      updateCharCount();
      runEvaluation();
    };
    reader.readAsText(file);
  }

  // Paste button
  if (pasteBtn) {
    pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          xmlArea.value = text;
          nsInput.value = autoDetectNamespaces(text);
          updateCharCount();
          runEvaluation();
        }
      } catch {
        xmlArea.focus();
      }
    });
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      xmlArea.value = '';
      xpathInput.value = '';
      nsInput.value = '';
      outputEl.textContent = '<!-- Editor cleared. Paste or select a sample XML document above. -->';
      updateCharCount();
      statRoot.textContent = '—';
      statNodes.textContent = '—';
      statTime.textContent = '—';
      statMatches.textContent = '—';
    });
  }

  // Copy button
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(outputEl.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
      } catch (e) {
        console.error('Clipboard copy failed:', e);
      }
    });
  }

  // Download XML button
  if (downloadXmlBtn) {
    downloadXmlBtn.addEventListener('click', () => {
      const blob = new Blob([xmlArea.value], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (currentDoc ? currentDoc.rootName() : 'document') + '.xml';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Download Output button
  if (downloadOutBtn) {
    downloadOutBtn.addEventListener('click', () => {
      const ext = currentOutputTab === 'json' ? '.json' : (currentOutputTab === 'formatted' ? '.xml' : '.txt');
      const blob = new Blob([outputEl.textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oxml-output${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (samplesSelect) {
    samplesSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        if (scenarioSelect) scenarioSelect.value = '';
        setSample(e.target.value);
      }
    });
  }

  if (scenarioSelect) {
    scenarioSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        if (samplesSelect) samplesSelect.value = '';
        setErrorScenario(e.target.value);
      }
    });
  }

  if (recipeSelect) {
    recipeSelect.addEventListener('change', (e) => {
      if (e.target.value) {
        xpathInput.value = e.target.value;
        runEvaluation();
      }
    });
  }

  if (evalBtn) evalBtn.addEventListener('click', runEvaluation);
  if (wfBtn) wfBtn.addEventListener('click', checkWellFormed);
  if (formatBtn) formatBtn.addEventListener('click', formatXml);

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

  xmlArea.addEventListener('input', updateCharCount);

  // Initialize with books sample
  setSample('books');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
