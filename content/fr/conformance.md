---
name: "oxml"
short_name: "OXML"
title: "Conformité W3C & Benchmarks — oxml"
description: "Tests rigoureux face à la suite officielle W3C XML et mesures de performances comparatives."
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
translation_key: "conformance"
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
nav_cookbook: "Livre de recettes"
nav_playground: "Bac à sable"
nav_compare: "Comparatif des bibliothèques"
nav_benchmarks: "Benchmarks"
nav_security: "Sécurité"
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Standards & Vérification"
headline: "Conformité aux standards W3C"
lead: "Validation rigoureuse face aux suites officielles W3C XML 1.0, W3C XML Schema (XSD) et XPath 1.0 avec cliquets anti-régression continus."
prev_href: "/fr/benchmarks/"
prev_label: "Benchmarks"
next_href: "/fr/security/"
next_label: "Sécurité"
toc_1: "Suite XML 1.0"
toc_1_id: "xml-conformance"
toc_2: "Suite Schéma XML (XSD)"
toc_2_id: "xsd-conformance"
toc_3: "Validation XPath 1.0"
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

<h2 id="xml-conformance">Suite de conformité W3C XML 1.0</h2>

<p><code>oxml</code> intègre la suite officielle de conformité W3C XML (<code>xmlts20130923</code>) dans son pipeline d'intégration continue :</p>

<ul>
  <li><strong>Conformité XML 1.0 (Cinquième Édition) :</strong> Validation des plages de caractères, décodage UTF-8/UTF-16, imbrication et substitution d'entités.</li>
  <li><strong>Porte de bienveillance syntaxique :</strong> 100 % de réussite sur l'ensemble des documents valides et invalides du jeu principal W3C.</li>
  <li><strong>Diagnostics déterministes :</strong> Rejet immédiat avec coordonnées précises de ligne, colonne et décalage d'octets.</li>
</ul>

<h2 id="xsd-conformance">Conformité W3C XML Schema (XSD)</h2>

<p><code>xmlschema</code> est vérifié en continu contre la suite officielle de tests W3C XML Schema (<code>xsts-2007-06-20</code>), figée par empreinte SHA-256 :</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Indicateur de test</th>
        <th scope="col">Nombre / Taux</th>
        <th scope="col">Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Cas de test totaux</th>
        <td>39 420 tests</td>
        <td class="matrix-badge-pass">Exécutés en CI automatisée</td>
      </tr>
      <tr>
        <th scope="row">Cas de test tranchés</th>
        <td>35 942 tests</td>
        <td class="matrix-badge-pass">Évalués en mode release</td>
      </tr>
      <tr>
        <th scope="row">Tests réussis</th>
        <td>34 226 réussites</td>
        <td class="matrix-badge-pass"><strong>95,2 % de réussite</strong></td>
      </tr>
      <tr>
        <th scope="row">Tests échoués</th>
        <td>1 716 échecs</td>
        <td>Répertoriés dans le cliquet de référence</td>
      </tr>
      <tr>
        <th scope="row">Nombre de paniques</th>
        <td><strong>0 panique</strong></td>
        <td class="matrix-badge-pass">Exécution 100 % sécurisée</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="xpath-conformance">Conformité à la spécification XPath 1.0</h2>

<p>Le moteur XPath d'<code>oxml</code> est validé face aux suites de spécification OASIS et W3C XPath 1.0 :</p>

<ul>
  <li><strong>Navigation sur les axes :</strong> Prise en charge intégrale des 13 axes XPath (child, descendant, parent, ancestor, etc.).</li>
  <li><strong>Fonctions standard :</strong> <code>count()</code>, <code>id()</code>, <code>string()</code>, <code>concat()</code>, <code>starts-with()</code>, <code>contains()</code>, <code>sum()</code>, <code>boolean()</code>, etc.</li>
  <li><strong>Optimisation de position :</strong> Les prédicats d'index 1-based (ex. <code>[1]</code>, <code>[last()]</code>) s'évaluent en temps O(1).</li>
</ul>

<p>Pour consulter les débits mesurés et les comparaisons de latence, consultez la page dédiée aux <a href="/fr/benchmarks/">Benchmarks</a>.</p>
