---
name: "oxml"
short_name: "OXML"
title: "Protocole de Contexte de Modèle (oxml-mcp) — oxml"
description: "Dotez les assistants IA d'outils natifs d'analyse XML, requêtes XPath et validation XSD."
keywords: "parseur rust xml, xpath 1.0, oxml, zero code unsafe, schema xml, webassembly xml, mcp xml"
author: "Sebastien Rousseau"
date: "2026-10-04"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "mcp"
locale_path: "/fr/"
base_path: "/"
en_current: ""
fr_current: " aria-current=\"true\""
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
label_skip: "Passer au contenu principal"
label_menu: "Menu"
label_nav: "Principal"
label_langs: "Langue"
label_theme: "Thème"
label_theme_system: "Système"
label_theme_light: "Clair"
label_theme_dark: "Sombre"
label_docs: "Documentation"
label_footer_nav: "Documentation"
label_made_with: "Créé avec SSG"
label_docs_nav: "Sections de documentation"
label_crumbs: "Fil d'Ariane"
label_pager: "Page"
label_prev: "Précédent"
label_next: "Suivant"
label_toc: "Sur cette page"
nav_home: "Accueil"
nav_install: "Installation"
nav_cli: "Outil CLI"
nav_xpath: "XPath 1.0"
nav_wasm: "WebAssembly"
nav_mcp: "Serveur MCP"
nav_lsp: "Serveur de langage"
nav_schema: "Schéma XML"
nav_arch: "Architecture"
nav_conformance: "Conformité"
nav_a11y: "Accessibilité"
nav_migrate_lxml: "Migration depuis lxml"
nav_migrate_roxmltree: "Migration depuis roxmltree"
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Documentation"
headline: "oxml-mcp — Serveur Model Context Protocol"
lead: "Capacités XML transparentes pour Claude Desktop, Cursor, Gemini CLI et agents autonomes."
prev_href: "/fr/xpath/"
prev_label: "XPath 1.0"
next_href: "/fr/wasm/"
next_label: "WebAssembly"
toc_1: "Outils Agent"
toc_1_id: "tools"
toc_2: "Configuration"
toc_2_id: "config"
toc_3: "Transports"
toc_3_id: "transports"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: " aria-current=\"page\""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: ""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "The oxml documentation website showing navigation, code examples, and architecture guides."
---

## Outils Agent

`oxml-mcp` expose cinq outils structurés pour les modèles de langage :

- **`xml_check`** : Diagnostic instantané de syntaxe et de conformité sans construire d'arbre en mémoire.
- **`xml_format`** : Mise en forme, indentation personnalisable et minification avec gestion des balises vides (`self-closing`, `spaced`, `expanded`).
- **`xml_inspect`** : Inspection structurelle (racine, profondeur, fréquences des éléments, espaces de noms).
- **`xml_query`** : Évaluation d'expressions XPath 1.0 retournant les valeurs textuelles ou comptages.
- **`xml_validate`** : Validation stricte selon les schémas W3C XML Schema (XSD) avec localisation précise des erreurs.

## Configuration

Ajoutez `oxml-mcp` à votre configuration `claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "oxml": {
      "command": "oxml-mcp",
      "args": []
    }
  }
}
```

## Transports

`oxml-mcp` supporte plusieurs protocoles de transport :

1. **Standard I/O (`stdio`) :** Par défaut pour les applications locales.
2. **Server-Sent Events (`sse`) :** Flux HTTP pour grappes d'agents distantes.
3. **WebSockets :** Communication RPC bidirectionnelle à faible latence.
