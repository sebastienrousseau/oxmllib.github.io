---
name: "oxml"
short_name: "OXML"
title: "Studio WebAssembly Interactif — oxml"
description: "Studio XML et XPath 1.0 haute performance dans votre navigateur : évaluateur XPath en direct, formateur XML, inspection structurelle et diagnostics instantanés propulsés par WebAssembly en Rust pur et sûr."
keywords: "analyseur xml rust, bac a sable xpath, wasm xml, testeur xpath en ligne, validateur xml, rust pur, inspecteur xml"
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
eyebrow: "Studio Interactif"
headline: "Studio XML & XPath WebAssembly"
lead: "Déposez un fichier XML, choisissez un exemple d'entreprise ou collez votre document. L'analyse syntaxique, l'évaluation XPath et l'inspection s'exécutent instantanément dans votre navigateur sans aller-retour serveur."
prev_href: "/fr/cookbook/"
prev_label: "Livre de recettes"
next_href: "/fr/accessibility/"
next_label: "Accessibilité"
toc_1: "Studio Interactif"
toc_1_id: "studio"
toc_2: "Pourquoi Tester Ici ?"
toc_2_id: "why"
toc_3: "Garantie Architecturale"
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
screenshot_alt: "Le studio interactif WebAssembly oxml évaluant des requêtes XPath et inspectant du XML dans le navigateur."
---

<div class="playground-box" id="oxml-playground">
<div class="playground-header">
<div>
<h2 class="playground-title">Moteur WebAssembly (Bac à Sable Local)</h2>
<p class="field-hint">Propulsé par <code>oxml-wasm 0.0.10</code> · 100 % Rust Sûr Côté Client · Zéro Donnée Transmise</p>
</div>
<span id="playground-status" class="status-tag">Initialisation du moteur...</span>
</div>

<!-- Étape 1 : Ajouter des données -->
<div class="demo-step">
<div class="step-head">
<span class="step-num" aria-hidden="true">1</span>
<h3 class="step-title">Ajouter Votre Document XML</h3>
</div>

<div class="dropzone" id="dropzone" role="button" tabindex="0" aria-label="Déposez le fichier XML ici ou cliquez pour parcourir">
<p><strong>Glissez-déposez un fichier XML, RSS, Atom ou SVG ici</strong> ou cliquez pour parcourir</p>
<p class="hint">Maximum 10 Mo · Traitement local dans le bac à sable du navigateur, jamais envoyé à un serveur</p>
</div>
<input type="file" id="file-input" class="visually-hidden" accept=".xml,.rss,.atom,.svg,.txt,text/xml,application/xml" aria-label="Choisir un fichier XML à évaluer" tabindex="-1" />

<div class="demo-toolbar">
<label class="visually-hidden" for="sample-select">Charger un lot d'exemples</label>
<select id="sample-select" class="pill-select">
<option value="books">Exemple : Catalogue de librairie (Prix &amp; Catégories)</option>
<option value="rss">Exemple : Flux RSS 2.0 (Canaux &amp; Articles)</option>
<option value="atom">Exemple : Flux Atom 1.0 avec espaces de noms</option>
<option value="svg">Exemple : Graphique vectoriel SVG</option>
<option value="pain001">Exemple : Virement financier ISO 20022 (pain.001)</option>
<option value="pom">Exemple : Modèle de projet Maven (Hiérarchie profonde)</option>
<option value="soap">Exemple : Enveloppe de service web SOAP 1.2</option>
<option value="sitemap">Exemple : Plan de site XML pour moteurs de recherche</option>
<option value="xhtml">Exemple : Document XHTML 1.0 Strict</option>
</select>

<label class="visually-hidden" for="scenario-select">Injecter un scénario d'erreur</label>
<select id="scenario-select" class="pill-select">
<option value="">Injecter un scénario d'erreur...</option>
<option value="unclosed">Erreur : Balise non fermée (&lt;title&gt;...&lt;author&gt;)</option>
<option value="ampersand">Erreur : Entité &amp; non échappée (AT&amp;T)</option>
<option value="root_mismatch">Erreur : Incompatibilité de balise racine (&lt;root&gt;...&lt;/catalog&gt;)</option>
<option value="unquoted_attr">Erreur : Valeur d'attribut non entourée de guillemets (id=b101)</option>
<option value="undeclared_ns">Erreur : Préfixe d'espace de noms non déclaré (&lt;atom:entry&gt;)</option>
<option value="misnested">Erreur : Chevauchement de balises incorrect (&lt;a&gt;&lt;b&gt;&lt;/a&gt;&lt;/b&gt;)</option>
</select>

<button type="button" id="paste-btn" class="pill pill-ghost">Coller XML</button>
<button type="button" id="clear-btn" class="pill pill-ghost">Effacer</button>
<button type="button" id="share-btn" class="pill pill-primary">Partager le lien</button>
</div>

<div class="playground-field">
<label for="playground-xml">Examiner et éditer la source XML</label>
<textarea id="playground-xml" class="playground-textarea" spellcheck="false" rows="11" aria-label="Source du document XML"></textarea>
</div>
</div>

<!-- Étape 2 : Atelier XPath -->
<div class="demo-step">
<div class="step-head">
<span class="step-num" aria-hidden="true">2</span>
<h3 class="step-title">Atelier XPath 1.0 &amp; Espaces de Noms</h3>
</div>

<div class="demo-toolbar">
<label class="visually-hidden" for="recipe-select">Recettes XPath</label>
<select id="recipe-select" class="pill-select">
<option value="">Recettes XPath rapides...</option>
<option value="//book[price &lt; 30]/title/text()">Filtre : Livres à moins de 30 $</option>
<option value="count(//book)">Fonction : count(//book)</option>
<option value="//book[1]/title | //book[last()]/title">Union : Titres du premier &amp; dernier livre</option>
<option value="//@category">Axe : Tous les attributs @category</option>
<option value="//item[contains(title, 'Release')]/link">Prédicat texte : contains(title, 'Release')</option>
<option value="//atom:entry/atom:title/text()">Espace de noms : //atom:entry/atom:title</option>
</select>
</div>

<div class="playground-field" style="margin-bottom: 0.75rem;">
<label for="playground-xpath">Expression XPath 1.0</label>
<input type="text" id="playground-xpath" class="playground-input" placeholder="//book[price &lt; 30]/title" value="//book[price &lt; 30]/title" spellcheck="false" />
</div>

<div class="playground-field" style="margin-bottom: 1rem;">
<label for="playground-ns">Liaisons d'espaces de noms (Optionnel : prefix=URI, ...)</label>
<input type="text" id="playground-ns" class="playground-input" placeholder="ex : atom=http://www.w3.org/2005/Atom, default=urn:isbn:0-486-27557-4" spellcheck="false" />
<span class="field-hint">Détecté automatiquement à partir de la déclaration du document si disponible.</span>
</div>

<div class="demo-toolbar">
<button type="button" id="btn-eval-xpath" class="pill pill-primary">Évaluer XPath</button>
<button type="button" id="btn-check-wf" class="pill pill-ghost">Vérifier la bonne formation</button>
<button type="button" id="btn-format-xml" class="pill pill-ghost">Formater XML</button>
</div>
</div>

<!-- Étape 3 : Vérification par couches & Résultats -->
<div class="demo-step">
<div class="step-head">
<span class="step-num" aria-hidden="true">3</span>
<h3 class="step-title">Vérification par Couches &amp; Résultats d'Inspection</h3>
</div>

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
<span class="stat-label">Temps d'Exécution</span>
<span id="stat-time" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Nœuds Correspondants</span>
<span id="stat-matches" class="stat-val">—</span>
</div>
<div class="stat-pill">
<span class="stat-label">Taille d'Entrée</span>
<span id="stat-chars" class="stat-val">—</span>
</div>
</div>

<div class="layer-summary-wrap">
<table class="layer-summary" aria-label="Liste de contrôle des couches de validation">
<tbody>
<tr>
<th scope="row">Conformité W3C XML 1.0</th>
<td id="layer-state-wf" class="layer-state-pass">Évaluation en cours...</td>
</tr>
<tr>
<th scope="row">Modèle Mémoire du Parseur</th>
<td id="layer-state-mem" class="layer-state-pass">Arène Contiguë Générationnelle (O(1))</td>
</tr>
<tr>
<th scope="row">Scanner de Délimiteurs</th>
<td id="layer-state-scan" class="layer-state-pass">SWAR SIMD Vectorisé 8 Octets</td>
</tr>
<tr>
<th scope="row">Moteur XPath 1.0 W3C</th>
<td id="layer-state-xpath" class="layer-state-pass">Conformité Intégrale aux Spécifications</td>
</tr>
</tbody>
</table>
</div>

<div id="error-banner" class="error-banner" hidden>
<h4>Alerte Diagnostic du Parseur</h4>
<p id="error-text">Erreur de syntaxe détectée dans le document XML.</p>
</div>

<div id="diag-container" hidden></div>

<!-- Terminal CLI Command Equivalent Generator -->
<div class="cli-preview-box" id="cli-box" aria-label="Équivalent commande terminal">
<div class="cli-preview-header">
<span class="cli-preview-title">Équivalent CLI (Terminal &amp; CI/CD)</span>
<button type="button" id="copy-cli-btn" class="pill pill-ghost" style="min-height:30px;padding:0.25rem 0.75rem;font-size:0.75rem;">Copier la commande</button>
</div>
<pre class="cli-code"><code id="cli-cmd-output">oxml query "//book[price &lt; 30]/title" input.xml</code></pre>
</div>

<div class="output-tab-list" role="tablist" aria-label="Modes de visualisation des résultats">
<button type="button" id="tab-matches" class="output-tab-btn" role="tab" aria-selected="true" aria-controls="output-view">Résultats XPath</button>
<button type="button" id="tab-formatted" class="output-tab-btn" role="tab" aria-selected="false" aria-controls="output-view">XML Formaté</button>
<button type="button" id="tab-stats" class="output-tab-btn" role="tab" aria-selected="false" aria-controls="output-view">Structure &amp; Fréquences</button>
<button type="button" id="tab-json" class="output-tab-btn" role="tab" aria-selected="false" aria-controls="output-view">Jumeau JSON</button>
</div>

<pre id="output-view" class="output-view" tabindex="0" role="region" aria-live="polite">Évaluation en cours...</pre>

<div class="demo-toolbar" style="margin-top: 1rem;">
<button type="button" id="copy-btn" class="pill pill-primary">Copier le Résultat</button>
<button type="button" id="download-xml-btn" class="pill pill-ghost">Télécharger .xml</button>
<button type="button" id="download-out-btn" class="pill pill-ghost">Télécharger le Résultat</button>
</div>

<div id="share-toast" class="share-toast" hidden role="status" aria-live="polite">
<span>✓ Lien copié dans le presse-papiers ! (État complet inclus)</span>
</div>
</div>
</div>

<script type="module" src="/assets/playground.js"></script>

## Pourquoi Tester Ici ?

1. **Exécution Sub-Milliseconde :**
   - Propulsé par `oxml-wasm 0.0.10`, le cœur du moteur d'analyse alloue des arènes contiguës générationnelles sans pause de ramasse-miettes. Les requêtes s'exécutent généralement en moins de 0,20 ms.
2. **Spécification XPath 1.0 Intégrale :**
   - Prise en charge complète des axes (`child`, `parent`, `ancestor`, `descendant`, `following-sibling`, `attribute`), comparaisons relationnelles, prédicats numériques, fonctions standard (`count`, `string`, `contains`, `starts-with`) et opérateurs d'union (`path1 | path2`).
3. **Diagnostics & Scénarios d'Erreurs Réalistes :**
   - Sélectionnez une option dans le menu **« Injecter un scénario d'erreur... »** pour observer en temps réel la précision avec laquelle le parseur localise les défauts de syntaxe, balises non fermées et erreurs d'encodage.

## Garantie Architecturale

- **Zéro Donnée Transmise Hors de Votre Machine :**
  - Ouvrez DevTools &rarr; Network. Les seules requêtes sont des requêtes GET vers le même domaine pour charger les ressources statiques et le binaire WebAssembly de 219 Ko. Vos documents XML, charges utiles et requêtes ne quittent jamais le bac à sable local de votre navigateur.
- **Rust Pur et Sûr (#![forbid(unsafe_code)]) :**
  - Contrairement aux bibliothèques C historiques (`libxml2`, `lxml`) sujettes aux corruptions de mémoire et vulnérabilités CVE, `oxml` est développé à 100 % en Rust sûr. Aucun débordement de tampon, pointeur pendant ou déréférencement nul.
