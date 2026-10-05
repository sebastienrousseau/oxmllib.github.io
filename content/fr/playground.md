---
name: "oxml"
short_name: "OXML"
title: "Bac à Sable WebAssembly Interactif — oxml"
description: "Testez vos requêtes XPath 1.0, validez la conformité et formatez vos documents XML directement dans votre navigateur avec Rust WebAssembly pur et sûr."
keywords: "analyseur xml rust, bac a sable xpath, wasm xml, testeur xpath en ligne, validateur xml, rust pur"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "playground"
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
label_skip: "Aller au contenu principal"
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
label_docs_nav: "Rubriques de la documentation"
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
nav_cookbook: "Livre de recettes"
nav_playground: "Bac à sable"
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Outil Interactif"
headline: "Bac à Sable XML WebAssembly"
lead: "Évaluez des expressions XPath 1.0, vérifiez la bonne formation et formatez vos documents en temps réel grâce à oxml-wasm."
prev_href: "/fr/cookbook/"
prev_label: "Livre de recettes"
next_href: "/fr/accessibility/"
next_label: "Accessibilité"
toc_1: "Moteur Interactif"
toc_1_id: "playground"
toc_2: "Fonctionnalités du Bac à Sable"
toc_2_id: "capabilities"
toc_3: "Architecture & Sécurité"
toc_3_id: "security"
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
screenshot_alt: "Le bac à sable interactif WebAssembly oxml évaluant des requêtes XPath dans le navigateur."
---

## Moteur Interactif

Testez le traitement XML sans rien installer. Le bac à sable ci-dessous exécute le binaire Rust WebAssembly directement dans l'onglet de votre navigateur, sans aucun aller-retour serveur.

<div class="playground-box" id="oxml-playground">
<div class="playground-header">
<div>
<h2 class="playground-title">Moteur WebAssembly en Temps Réel</h2>
<p class="field-hint">Exécution en Rust pur sécurisé directement dans le bac à sable de votre navigateur.</p>
</div>
<span id="playground-status" class="status-tag">Initialisation du moteur...</span>
</div>

<div class="playground-grid">
<div class="playground-col">
<div class="playground-field">
<label for="playground-samples">Charger un Exemple de Document XML</label>
<select id="playground-samples" class="playground-select">
<option value="books">Catalogue de Librairie (Filtres XPath &amp; Prédicats Numériques)</option>
<option value="rss">Flux RSS 2.0 (Extraction des Canaux &amp; Articles)</option>
<option value="atom">Flux Atom avec Espaces de Noms (Liaison de Préfixe)</option>
<option value="svg">Graphique Vectoriel SVG (Attributs &amp; Opérateurs d'Union)</option>
</select>
</div>

<div class="playground-field">
<label for="playground-xml">Source du Document XML</label>
<textarea id="playground-xml" class="playground-textarea" spellcheck="false" rows="12" aria-label="Source du Document XML"></textarea>
</div>

<div class="playground-field">
<label for="playground-xpath">Expression XPath 1.0</label>
<input type="text" id="playground-xpath" class="playground-input" placeholder="//book[price &lt; 30]/title" value="//book[price &lt; 30]/title" spellcheck="false" />
</div>

<div class="playground-field">
<label for="playground-ns">Liaisons d'Espaces de Noms (Optionnel : prefix=uri, ...)</label>
<input type="text" id="playground-ns" class="playground-input" placeholder="ex: atom=http://www.w3.org/2005/Atom" spellcheck="false" />
</div>

<div class="playground-actions">
<button type="button" id="btn-eval-xpath" class="playground-btn btn-primary">Évaluer XPath</button>
<button type="button" id="btn-check-wf" class="playground-btn">Vérifier la Syntaxe</button>
<button type="button" id="btn-format-xml" class="playground-btn">Formater XML</button>
</div>
</div>

<div class="playground-col">
<div class="playground-stats" aria-label="Statistiques du document">
<div class="stat-pill">
<span class="stat-label">Nœud Racine</span>
<span id="stat-root" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Total Nœuds</span>
<span id="stat-nodes" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Temps d'Exéc</span>
<span id="stat-time" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Correspondances</span>
<span id="stat-matches" class="stat-val">—</span>
</div>
</div>

<div class="playground-field playground-output-box">
<label for="playground-output">Résultats de l'Évaluation</label>
<pre id="playground-output" class="playground-output" tabindex="0" role="region" aria-live="polite">Évaluation en cours...</pre>
</div>
</div>
</div>
</div>

<script type="module" src="/assets/playground.js"></script>

## Fonctionnalités du Bac à Sable

Le bac à sable utilise exactement le même moteur que les versions serveur Rust, `oxml-cli` et `oxml-mcp` :

1. **Spécification Complète XPath 1.0 :**
   - Chemins de localisation (`/rss/channel/item`), axes d'attributs (`/@lang`, `//@width`), et opérateur d'union (`path1 | path2`).
   - Prédicats relationnels et arithmétiques (`//book[price < 30]`, `//item[position() <= 2]`).
   - Fonctions XPath principales (`count(...)`, `string(...)`, `contains(...)`, `starts-with(...)`).
2. **Espaces de Noms XML Explicites :**
   - Résolution de requêtes préfixées sur des documents avec espaces de noms par défaut ou personnalisés via `prefix=URI`.
3. **Vérification Sub-Milliseconde :**
   - L'arène générationnelle et l'analyse vectorielle SWAR s'exécutent en moins de 0,20 ms pour des documents typiques.

## Architecture & Sécurité

Pourquoi `oxml` propose-t-il un bac à sable dans le navigateur alors que les bibliothèques C (`lxml`, `libxml2`, `xml2`) n'en ont pas ?

- **Zéro Dépendance C :** `lxml` et `xml2` reposent sur plus de 200 000 lignes de code C hérité de `libxml2`. Compiler `libxml2` en WebAssembly nécessite des chaînes Emscripten lourdes et génère des binaires de plusieurs mégaoctets sujets aux fuites de mémoire.
- **Rust Pur Sécurisé :** `oxml-wasm` se compile nativement via `wasm-pack` avec `#![forbid(unsafe_code)]`. Le binaire pèse moins de 220 Ko compressé.
- **Bac à Sable Côté Client :** Aucune donnée n'est transmise à un serveur distant. Vos documents, charges utiles et requêtes restent à 100 % dans votre session de navigation locale.
