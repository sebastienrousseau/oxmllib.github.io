#!/usr/bin/env python3
"""
Generate standardized llms.txt and llms-full.txt for oxmllib.com following
the https://llmstxt.org specification for AI coding assistants and LLMs.
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content"
PUBLIC_DIR = ROOT / "public"

PAGES = [
    {
        "title": "Quickstart & Installation",
        "url": "https://oxmllib.com/installation/",
        "md_url": "https://oxmllib.com/installation.md",
        "file": "installation.md",
        "desc": "Adding oxml to Cargo.toml, feature flags (alloc, std, xpath, schema, wasm, json), and minimum supported Rust version (MSRV 1.80+)."
    },
    {
        "title": "XPath 1.0 Query Engine",
        "url": "https://oxmllib.com/xpath/",
        "md_url": "https://oxmllib.com/xpath.md",
        "file": "xpath.md",
        "desc": "Evaluating W3C XPath 1.0 expressions, 13 axes navigation, standard function library, and namespace-aware queries."
    },
    {
        "title": "XML Schema (XSD) Validator",
        "url": "https://oxmllib.com/schema/",
        "md_url": "https://oxmllib.com/schema.md",
        "file": "schema.md",
        "desc": "Validating documents against W3C XML Schema 1.0 definitions with 95.2% conformance on the official W3C test suite."
    },
    {
        "title": "Command-Line Tool (CLI)",
        "url": "https://oxmllib.com/cli/",
        "md_url": "https://oxmllib.com/cli.md",
        "file": "cli.md",
        "desc": "Fast terminal XML processing: query with XPath, validate schemas, format indentation, and inspect arena nodes."
    },
    {
        "title": "Model Context Protocol (MCP) Server",
        "url": "https://oxmllib.com/mcp/",
        "md_url": "https://oxmllib.com/mcp.md",
        "file": "mcp.md",
        "desc": "Providing LLMs and AI agents (Claude Code, Cursor, Windsurf) with safe XML parsing, XPath queries, formatting, and XSD validation."
    },
    {
        "title": "WebAssembly Runtime (WASM)",
        "url": "https://oxmllib.com/wasm/",
        "md_url": "https://oxmllib.com/wasm.md",
        "file": "wasm.md",
        "desc": "High-performance zero-copy browser and Node.js XML engine under 220 KB with no C dependencies or Emscripten glue."
    },
    {
        "title": "Language Server Protocol (LSP)",
        "url": "https://oxmllib.com/lsp/",
        "md_url": "https://oxmllib.com/lsp.md",
        "file": "lsp.md",
        "desc": "Real-time editor analysis, syntax diagnostics, and schema-assisted completion for Neovim, VS Code, and Helix."
    },
    {
        "title": "Core Architecture & Generational Arena",
        "url": "https://oxmllib.com/architecture/",
        "md_url": "https://oxmllib.com/architecture.md",
        "file": "architecture.md",
        "desc": "Internal design of the cache-friendly generational arena DOM, O(1) slot recycling, SWAR SIMD scanning, and zero-unsafe compile-time proof."
    },
    {
        "title": "Architectural Peer Comparisons",
        "url": "https://oxmllib.com/compare/",
        "md_url": "https://oxmllib.com/compare.md",
        "file": "compare.md",
        "desc": "Transparent head-to-head comparison against quick-xml, roxmltree, xot, xee, and libxml2 with clear guidance on when to choose each crate."
    },
    {
        "title": "Reproducible Benchmarks",
        "url": "https://oxmllib.com/benchmarks/",
        "md_url": "https://oxmllib.com/benchmarks.md",
        "file": "benchmarks.md",
        "desc": "Criterion streaming and DOM throughput numbers, memory overhead ratios, and XPath latency metrics on real-world datasets."
    },
    {
        "title": "W3C Standards Conformance",
        "url": "https://oxmllib.com/conformance/",
        "md_url": "https://oxmllib.com/conformance.md",
        "file": "conformance.md",
        "desc": "Verification metrics for W3C XML 1.0 (xmlts20130923), W3C XML Schema (34,226 passing tests across 39,420 cases), and XPath 1.0."
    },
    {
        "title": "Security Architecture & Threat Model",
        "url": "https://oxmllib.com/security/",
        "md_url": "https://oxmllib.com/security.md",
        "file": "security.md",
        "desc": "Compile-time memory safety, proactive mitigations against XXE, Billion Laughs, quadratic blowup attacks, and continuous fuzzing."
    },
    {
        "title": "Cookbook & Code Recipes",
        "url": "https://oxmllib.com/cookbook/",
        "md_url": "https://oxmllib.com/cookbook.md",
        "file": "cookbook.md",
        "desc": "Practical Rust code snippets: XML namespaces, SOAP envelope extraction, SVG manipulation, RSS parsing, and JSON twin conversion."
    },
    {
        "title": "Migration Guide from lxml (Python)",
        "url": "https://oxmllib.com/migrate-lxml/",
        "md_url": "https://oxmllib.com/migrate-lxml.md",
        "file": "migrate-lxml.md",
        "desc": "Step-by-step guide for Python developers moving from lxml/libxml2 to memory-safe Rust with API mappings."
    },
    {
        "title": "Migration Guide from roxmltree",
        "url": "https://oxmllib.com/migrate-roxmltree/",
        "md_url": "https://oxmllib.com/migrate-roxmltree.md",
        "file": "migrate-roxmltree.md",
        "desc": "Transitioning from read-only roxmltree to oxml when mutable DOM operations or XPath 1.0 queries are required."
    }
]

def clean_markdown(content: str) -> str:
    # Strip YAML frontmatter
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            content = parts[2].strip()
    # Strip raw HTML comments and simple layout tags
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    # Strip <div class="..."> and </div> tags while keeping content
    content = re.sub(r'</?(?:div|aside|article|nav|section|header|footer)[^>]*>', '', content)
    # Convert <h(\d)[^>]*>(.*?)</h\1> to markdown hashes
    content = re.sub(r'<h1[^>]*>(.*?)</h1>', r'# \1', content)
    content = re.sub(r'<h2[^>]*>(.*?)</h2>', r'## \1', content)
    content = re.sub(r'<h3[^>]*>(.*?)</h3>', r'### \1', content)
    content = re.sub(r'<h4[^>]*>(.*?)</h4>', r'#### \1', content)
    # Convert basic inline tags
    content = re.sub(r'<code>(.*?)</code>', r'`\1`', content)
    content = re.sub(r'<strong>(.*?)</strong>', r'**\1**', content)
    content = re.sub(r'<em>(.*?)</em>', r'*\1*', content)
    content = re.sub(r'<p>(.*?)</p>', r'\1\n\n', content)
    # Clean multiple empty lines
    content = re.sub(r'\n{3,}', '\n\n', content)
    return content.strip()

def build_llms_txt() -> str:
    lines = [
        "# oxml",
        "",
        "> A high-performance, memory-safe XML toolkit for Rust and WebAssembly with zero unsafe code. Engineered with a contiguous generational arena DOM, a complete W3C XPath 1.0 engine, partial W3C XML Schema (XSD) validation, a CLI binary, and an official Model Context Protocol (MCP) server for AI agents.",
        "",
        "## Core Capabilities",
        ""
    ]

    for p in PAGES[:8]:
        lines.append(f"- [{p['title']}]({p['url']}): {p['desc']}")

    lines.extend([
        "",
        "## Comparison & Migration Guides",
        ""
    ])
    for p in PAGES[8:12]:
        lines.append(f"- [{p['title']}]({p['url']}): {p['desc']}")

    lines.extend([
        "",
        "## Practical Recipes & Integrations",
        ""
    ])
    for p in PAGES[12:]:
        lines.append(f"- [{p['title']}]({p['url']}): {p['desc']}")

    lines.extend([
        "",
        "## Machine-Readable Full Context",
        "",
        "- [Full Documentation Text (Markdown)](https://oxmllib.com/llms-full.txt): Complete documentation concatenated into a single file for LLM ingestion.",
        "- [MCP Server Tool Definition](https://oxmllib.com/mcp/): Configuration snippets for Claude Code, Cursor, and VS Code.",
        "- [Interactive Playground](https://oxmllib.com/playground/): In-browser WASM evaluation with shareable permalinks and CLI translation.",
        "",
        "## Ecosystem Repositories",
        "",
        "- [oxml Core](https://github.com/sebastienrousseau/oxml): Streaming parser, arena tree, and XPath 1.0 engine.",
        "- [oxml-cli](https://github.com/sebastienrousseau/oxml-cli): Terminal XML query, formatting, inspection, and validation tool.",
        "- [oxml-mcp](https://github.com/sebastienrousseau/oxml-mcp): Model Context Protocol server exposing XML tools to LLMs.",
        "- [oxml-wasm](https://github.com/sebastienrousseau/oxml-wasm): WebAssembly bindings for browser and Node.js runtimes.",
        "- [xmlschema](https://github.com/sebastienrousseau/xmlschema): Pure-Rust W3C XML Schema validator with 95.2% conformance."
    ])

    return "\n".join(lines) + "\n"

def build_llms_full_txt() -> str:
    chunks = [
        "# oxml — Complete Documentation & Reference Manual",
        "",
        "This file contains the complete technical documentation for oxml, a pure Rust XML toolkit with zero unsafe code (`#![forbid(unsafe_code)]`).",
        "",
        "================================================================================"
    ]

    for p in PAGES:
        filepath = CONTENT_DIR / p["file"]
        if not filepath.exists():
            continue
        raw = filepath.read_text(encoding="utf-8")
        body = clean_markdown(raw)
        chunks.append(f"\n\n# Document: {p['title']}\nCanonical URL: {p['url']}\n\n{body}\n\n" + ("=" * 80))

    return "\n".join(chunks) + "\n"

def main():
    llms_txt = build_llms_txt()
    llms_full = build_llms_full_txt()

    # Write root copies
    (ROOT / "llms.txt").write_text(llms_txt, encoding="utf-8")
    (ROOT / "llms-full.txt").write_text(llms_full, encoding="utf-8")

    # Write to public/ if it exists
    if PUBLIC_DIR.exists():
        (PUBLIC_DIR / "llms.txt").write_text(llms_txt, encoding="utf-8")
        (PUBLIC_DIR / "llms-full.txt").write_text(llms_full, encoding="utf-8")

        # Copy markdown versions of docs to public/
        for p in PAGES:
            src = CONTENT_DIR / p["file"]
            if src.exists():
                clean_body = clean_markdown(src.read_text(encoding="utf-8"))
                # Place at public/<name>.md and public/<name>/index.md
                (PUBLIC_DIR / f"{p['file']}").write_text(clean_body, encoding="utf-8")
                slug_dir = PUBLIC_DIR / Path(p["file"]).stem
                if slug_dir.exists():
                    (slug_dir / "index.md").write_text(clean_body, encoding="utf-8")

    print(f"Generated llms.txt ({len(llms_txt)} bytes) and llms-full.txt ({len(llms_full)} bytes).")

if __name__ == "__main__":
    main()
